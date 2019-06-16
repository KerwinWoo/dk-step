// pages/address/addresslist.js
const utils = require('../../utils/util.js')
const api = require('../../api/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addresslist: [],
    addLayer: false,
    address: {
      id:'0',
      province_id: 0,
      city_id: 0,
      district_id: 0,
      address: '',
      full_region: '',
      userName: '',
      telNumber: '',
      is_default: 0
    },
    addressId: 0,
    openSelectRegion: false,
    selectRegionList: [
      { id: 0, name: '省份', parent_id: 1, type: 1 },
      { id: 0, name: '城市', parent_id: 1, type: 2 },
      { id: 0, name: '区县', parent_id: 1, type: 3 }
    ],
    regionType: 1,
    regionList: [],
    selectRegionDone: false
  },
  bindinputMobile(event) {
    let address = this.data.address;
    address.telNumber = event.detail.value;
    this.setData({
      address: address
    });
  },
  bindinputName(event) {
    let address = this.data.address;
    address.userName = event.detail.value;
    this.setData({
      address: address
    });
  },
  bindinputAddress (event){
    let address = this.data.address;
    address.detailInfo = event.detail.value;
    this.setData({
      address: address
    });
  },
  bindIsDefault(){
    let address = this.data.address;
    address.is_default = !address.is_default;
    this.setData({
      address: address
    });
  },
  getAddressDetail() {
    let that = this;
    utils.request(api.AddressDetail, { id: that.data.addressId }).then(function (res) {
      if (res.errno === 0) {
        if(res.data){
            that.setData({
                address: res.data
            });
        }
      }
    });
  },
  setRegionDoneStatus() {
    let that = this;
    let doneStatus = that.data.selectRegionList.every(item => {
      return item.id != 0;
    });

    that.setData({
      selectRegionDone: doneStatus
    })

  },
  chooseRegion() {
    let that = this;
    this.setData({
      openSelectRegion: !this.data.openSelectRegion
    });

    //设置区域选择数据
    let address = this.data.address;
    if (address.province_id > 0 && address.city_id > 0 && address.district_id > 0) {
      let selectRegionList = this.data.selectRegionList;
      selectRegionList[0].id = address.province_id;
      selectRegionList[0].name = address.province_name;
      selectRegionList[0].parent_id = 1;

      selectRegionList[1].id = address.city_id;
      selectRegionList[1].name = address.city_name;
      selectRegionList[1].parent_id = address.province_id;

      selectRegionList[2].id = address.district_id;
      selectRegionList[2].name = address.district_name;
      selectRegionList[2].parent_id = address.city_id;

      this.setData({
        selectRegionList: selectRegionList,
        regionType: 3
      });

      this.getRegionList(address.city_id);
    } else {
      this.setData({
        selectRegionList: [
          { id: 0, name: '省份', parent_id: 1, type: 1 },
          { id: 0, name: '城市', parent_id: 1, type: 2 },
          { id: 0, name: '区县', parent_id: 1, type: 3 }
        ],
        regionType: 1
      })
      this.getRegionList(1);
    }

    this.setRegionDoneStatus();

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadUserAddress()
    // 页面初始化 options为页面跳转所带来的参数
    if (options.id) {
      this.setData({
        addressId: options.id
      });
      this.getAddressDetail();
    }

    this.getRegionList(1);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  loadUserAddress () {
    let that = this
    utils.request(api.ADDRESS_LIST).then(function(res){
      that.setData({
        addresslist: res.data
      })
    })
  },
  openAddress () {
    this.setData({
      addLayer: true,
      address: {
        id:'0',
        province_id: 0,
        city_id: 0,
        district_id: 0,
        address: '',
        full_region: '',
        userName: '',
        telNumber: '',
        is_default: 0
      }
    })
  },
  cancel () {
    this.setData({
      addLayer: false
    })
  },
  selectRegionType(event) {
    let that = this;
    let regionTypeIndex = event.target.dataset.regionTypeIndex;
    let selectRegionList = that.data.selectRegionList;

    //判断是否可点击
    if (regionTypeIndex + 1 == this.data.regionType || (regionTypeIndex - 1 >= 0 && selectRegionList[regionTypeIndex-1].id <= 0)) {
      return false;
    }

    this.setData({
      regionType: regionTypeIndex + 1
    })
    
    let selectRegionItem = selectRegionList[regionTypeIndex];

    this.getRegionList(selectRegionItem.parent_id);

    this.setRegionDoneStatus();

  },
  selectRegion(event) {
    let that = this;
    let regionIndex = event.target.dataset.regionIndex;
    let regionItem = this.data.regionList[regionIndex];
    let regionType = regionItem.type;
    let selectRegionList = this.data.selectRegionList;
    selectRegionList[regionType - 1] = regionItem;


    if (regionType != 3) {
      this.setData({
        selectRegionList: selectRegionList,
        regionType: regionType + 1
      })
      this.getRegionList(regionItem.id);
    } else {
      this.setData({
        selectRegionList: selectRegionList
      })
    }

    //重置下级区域为空
    selectRegionList.map((item, index) => {
      if (index > regionType - 1) {
        item.id = 0;
        item.name = index == 1 ? '城市' : '区县';
        item.parent_id = 0;
      }
      return item;
    });

    this.setData({
      selectRegionList: selectRegionList
    })


    that.setData({
      regionList: that.data.regionList.map(item => {

        //标记已选择的
        if (that.data.regionType == item.type && that.data.selectRegionList[that.data.regionType - 1].id == item.id) {
          item.selected = true;
        } else {
          item.selected = false;
        }

        return item;
      })
    });

    this.setRegionDoneStatus();

  },
  doneSelectRegion() {
    if (this.data.selectRegionDone === false) {
      return false;
    }

    let address = this.data.address;
    let selectRegionList = this.data.selectRegionList;
    address.province_id = selectRegionList[0].id;
    address.city_id = selectRegionList[1].id;
    address.district_id = selectRegionList[2].id;
    address.province_name = selectRegionList[0].name;
    address.city_name = selectRegionList[1].name;
    address.district_name = selectRegionList[2].name;
    address.full_region = selectRegionList.map(item => {
      return item.name;
    }).join('');

    this.setData({
      address: address,
      openSelectRegion: false
    });

  },
  cancelSelectRegion() {
    this.setData({
      openSelectRegion: false,
      regionType: this.data.regionDoneStatus ? 3 : 1
    });

  },
  getRegionList(regionId) {
    let that = this;
    let regionType = that.data.regionType;
    utils.request(api.RegionList, { parentId: regionId }).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          regionList: res.data.map(item => {

            //标记已选择的
            if (regionType == item.type && that.data.selectRegionList[regionType - 1].id == item.id) {
              item.selected = true;
            } else {
              item.selected = false;
            }

            return item;
          })
        });
      }
    });
  },
  cancelAddress(){
    wx.navigateBack({
      url: '/pages/ucenter/address/address',
    })
  },
  saveAddress(){
    let address = this.data.address;

    if (address.userName == '') {
      utils.showErrorToast('请输入联系人名称');

      return false;
    }

    if (address.telNumber == '') {
      utils.showErrorToast('请输入手机号码');
      return false;
    }

    if (address.district_id == 0) {
      utils.showErrorToast('请输入省市区');
      return false;
    }

    if (!address.detailInfo) {
      utils.showErrorToast('请输入详细地址');
      return false;
    }

    let that = this;
    utils.request(api.AddressSave, { 
      id: address.id,
      userName: address.userName,
      telNumber: address.telNumber,
      province_id: address.province_id,
      city_id: address.city_id,
      district_id: address.district_id,
      is_default: address.is_default,
      provinceName: address.province_name,
      cityName: address.city_name,
      countyName: address.district_name,
      detailInfo: address.detailInfo,
    }, 'POST', 'application/json').then(function (res) {
      if (res.errno === 0) {
        /* wx.navigateBack({
          url: '/pages/ucenter/address/address',
        }) */
        that.setData({
          addLayer: false
        })
        that.loadUserAddress()
      }
    });

  },
  deleteAddress(event){
    let that = this;
    wx.showModal({
      title: '',
      content: '确定要删除地址？',
      success: function (res) {
        if (res.confirm) {
          let addressId = event.currentTarget.dataset.addressid;
          utils.request(api.AddressDelete, { id: addressId },'POST', 'application/json').then(function (res) {
            if (res.errno === 0) {
              that.loadUserAddress();
            }
          });
        }
      }
    })
    return false;
    
  },
  bindIsDefault(e){
    let index = e.currentTarget.dataset.index
    this.data.addresslist[index].is_default = (this.data.addresslist[index].is_default == '0') ? '1' : '0',
    this.data.address = this.data.addresslist[index]
    if(this.data.addresslist[index].is_default == '1'){
      this.data.addresslist.map(function(value, idx){
        if(idx != index){
          value.is_default = '0'
        }
      })
    }
    this.saveAddress()
    this.setData({
      addresslist: this.data.addresslist
    })
  },
  openEdit (e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      addLayer: true,
      address: this.data.addresslist[index]
    })
  },
  chooseAddress (e) {
    let id = e.currentTarget.dataset.id
    let pages = getCurrentPages()
    let prevPage = pages[pages.length - 2 ]
    prevPage.setData({
      addressId: id
    })
    wx.navigateBack({
      delta: 1
    })
  }
})