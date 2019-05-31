// pages/order/paydetail/paydetail.js
const utils = require('../../../utils/util.js')
const api = require('../../../api/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressInfo:{
      userName: '',
      telNumber: '',
      detailInfo: ''
    },
    goodsInfo:null,
    goodsId: '',
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部',
    postscript: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.stepper = that.selectComponent("#stepper")
    that.setData({
      goodsId: options.goodsId,
      goodsType: options.goodsType ? options.goodsType : ''
    })
    utils.request(api.MALL_QUERY_GOODS_DETAIL,{
      id: options.goodsId
    },'GET').then(function(res){
      if(res.errno == 0){
        that.setData({
          goodsInfo: res.data.info
        })
      }
    })
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
    let that = this
    if(that.data.addressId){
      utils.request(api.AddressDetail,{
        id: that.data.addressId
      }).then(function(res){
        if(res.errno === 0){
          that.setData({
            addressInfo: res.data
          })
        }
      })
    }
    else{
      that.loadUserAddress()
    }
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
  backTo () {
    wx.navigateBack()
  },
  chooseAddress () {
    let that = this
    wx.navigateTo({
    	url: '/pages/address/addresslist'
    })
  },
  openAddress () {
    wx.navigateTo({
    	url: '/pages/address/addresslist'
    })
  },
  postscriptChange (event) {
    this.setData({
      postscript: event.detail.value
    });
  },
  getFormId (e) { 
    let that = this
    let address = that.data.addressInfo
    if(address.id){
      utils.request(api.DKORDER_SUBMIT,{
        goodsId: that.data.goodsId,
        addresssId: address.id,
        goodsNumber: that.stepper.data.num,
        postscript: that.data.postscript,
        formId: e.detail.formId
      },'POST','application/json').then(function(res){
        if(res.errno === 0){
          let goodsInfo = that.data.goodsInfo
          if((goodsInfo.retail_price*1 + goodsInfo.mailCost*1) > 0){
            that.data.orderId = res.data.orderId
            that.requestPayParam()
          }
          else{
            wx.navigateTo({
              url: '/pages/order/success/success'
            })
          }
        }
        else{
          wx.showToast({
            title: res.errmsg,
            icon: 'none',
            duration: 2000
          })
        }
      })
    }
    else{
      wx.showToast({
        title: '请您填写地址信息',
        icon: 'none',
        duration: 2000
      })
    }
  },
  //向服务请求支付参数
  requestPayParam() {
    let that = this
    utils.request(api.PayPrepayId, { orderId: that.data.orderId, payType: 1 }, 'POST', 'application/json').then(function (res) {
      if (res.errno === 0) {
        let payParam = res.data;
        wx.requestPayment({
          'timeStamp': payParam.timeStamp,
          'nonceStr': payParam.nonceStr,
          'package': payParam['package'],
          'signType': payParam.signType,
          'paySign': payParam.paySign,
          'success': function (res) {
            wx.navigateTo({
              url: '/pages/order/success/success'
            })
          },
          'fail': function (res) {
            console.error('支付失败', res)
          }
        })
      }
    });
  },
  loadUserAddress () {
    let that = this
    utils.request(api.ADDRESS_LIST).then(function(res){
      if(res.errno === 0){
        let data = res.data
        if(res.data.length == 1){
          that.setData({
            addressInfo: data[0],
            addressId: data[0].id
          })
        }
        else{
          for(let i = 0; i < data.length; i++){
            if(data[i].is_default == 1){
              that.setData({
                addressInfo: data[i],
                addressId: data[i].id
              })
              break
            }
          }
        }
      }
    })
  }
})