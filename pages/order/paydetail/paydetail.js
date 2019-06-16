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
    postscript: '',
    choosedGoodsInfo: {
      retail_price: 0,
      dkEshellNum: 0,
      num: 1
    },
    payable: true,
    isOrdered: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options', options)
    let that = this
    that.stepper = that.selectComponent(".numstepper")
    that.setData({
      goodsId: options.goodsId,
      goodsType: options.goodsType ? options.goodsType : '',
      isInvite: options.isInvite ? options.isInvite : '',
      'choosedGoodsInfo.num': options.num ? options.num : 1
    })
    utils.request(api.MALL_QUERY_GOODS_DETAIL,{
      id: options.goodsId
    },'GET').then(function(res){
      if(res.errno == 0){
        res.data.info.mailCost = res.data.info.mailCost?res.data.info.mailCost:0
        that.setData({
          goodsInfo: res.data.info,
          choosedGoodsInfo : options.num ? {
            retail_price: (res.data.info.retail_price*options.num).toFixed(2),
            dkEshellNum: res.data.info.dkEshellNum*options.num,
            num: options.num
          } : {
            retail_price: res.data.info.retail_price,
            dkEshellNum: res.data.info.dkEshellNum,
            num: 1
          }
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
    that.loadUserDknum()
    if(that.data.addressId){
      utils.request(api.AddressDetail,{
        id: that.data.addressId
      }).then(function(res){
        if(res.errno === 0){
          that.setData({
            addressInfo: res.data
          })
        }
        else{
          that.loadUserAddress()
        }
      })
    }
    else{
      that.loadUserAddress()
    }
    
    /* if(that.data.orderId){
      wx.redirectTo({
      	url: '/pages/mall/goodsdetail/goodsdetail?id='+that.data.goodsId+'&isInvite='+that.data.isInvite+'&goodsType='+that.data.goodsType
      })
    } */
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
    return {
      title: '我用步数兑换了这个宝贝，你也可以哦~',
      path: '/pages/index/index?fromInvite=1&type=1&push_userid=' + wx.getStorageSync('userId'),
      imageUrl: this.data.goodsInfo.primary_pic_url
    }
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
  loadUserDknum () {
    let that = this
    utils.request(api.HOME_QUERY_USERDK,{
    }).then(function (res) {
      if(res.errno === 0){
        that.setData({
          userDknum: res.data.eggshellNum
        })
      }
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
    if(address && address.id){
      that.setData({
        payable: false
      })
      utils.request(api.DKORDER_SUBMIT,{
        goodsId: that.data.goodsId,
        addressId: address.id,
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
            /* wx.navigateTo({
              url: '/pages/order/success/success?goodsid='+that.data.goodsId+'&goodsurl='+encodeURIComponent(that.data.goodsInfo.primary_pic_url)
            }) */
            that.setData({
              isOrdered: true
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
      if(that.data.goodsInfo.dkIsReal == 1){
        utils.request(api.DKORDER_SUBMIT,{
          goodsId: that.data.goodsId,
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
              /* wx.navigateTo({
                url: '/pages/order/success/success?goodsid='+that.data.goodsId+'&goodsurl='+encodeURIComponent(that.data.goodsInfo.primary_pic_url)
              }) */
              that.setData({
                isOrdered: true
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
          title: '请填写地址信息',
          icon: 'none',
          duration: 2000
        })
      }
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
            utils.request(api.PAYQUERY,{
              orderId: that.data.orderId
            },'POST','application/json').then(function(res){
              if(res.errno === 0){
                /* wx.navigateTo({
                  url: '/pages/order/success/success?goodsid='+that.data.goodsId+'&goodsType='+that.data.goodsType+'&isInvite='+that.data.isInvite+'&goodsurl='+encodeURIComponent(that.data.goodsInfo.primary_pic_url)
                }) */
                that.setData({
                  isOrdered: true
                })
              }
            })
          },
          'fail': function (res) {
            console.error('支付取消', res)
            wx.navigateTo({
              url: '/pages/order/detail/detail?orderid='+that.data.orderId+'&fromIndex=0'
            })
          }
        })
      }
      else{
        utils.showErrorToast(res.errmsg?res.errmsg:res.msg)
      }
    });
  },
  loadUserAddress () {
    let that = this
    utils.request(api.ADDRESS_LIST).then(function(res){
      if(res.errno === 0){
        let data = res.data
        if(res.data.length > 0){
          let hasdefault = false
          for(let i = 0; i < data.length; i++){
            if(data[i].is_default == 1){
              hasdefault = true
              that.setData({
                addressInfo: data[i],
                addressId: data[i].id
              })
              break
            }
          }
          if(!hasdefault){
            that.setData({
              addressInfo: data[0],
              addressId: data[0].id
            })
          }
        }
        else{
          that.setData({
            addressInfo: null,
            addressId: ''
          })
        }
      }
    })
  },
  bindPlus (e) {
    let that = this
    let choosedGoodsInfo = that.data.choosedGoodsInfo
    let userDknum = that.data.userDknum
    let choosednum = that.selectComponent(".numstepper").data.num
    let goodsInfo = that.data.goodsInfo
    let totalDk = choosednum*(goodsInfo.dkEshellNum)
    if(totalDk > userDknum){
      wx.showToast({
        title: '蛋壳数不足',
        icon: 'none',
        duration: 2000
      })
      that.selectComponent(".numstepper").setData({
        num: --choosednum
      })
    }
    else{
      if(choosednum > goodsInfo.goods_number){
        wx.showToast({
          title: '超出商品库存',
          icon: 'none',
          duration: 2000
        })
        that.selectComponent(".numstepper").setData({
          num: --choosednum
        })
      }
      else{
        that.setData({
          choosedGoodsInfo: {
            retail_price: (choosednum*(goodsInfo.retail_price)).toFixed(2),
            dkEshellNum: choosednum*(goodsInfo.dkEshellNum),
            num: choosednum
          }
        })
      }
    }
  },
  bindMinus () {
    let that = this
    let choosedGoodsInfo = that.data.choosedGoodsInfo
    let userDknum = that.data.userDknum
    let choosednum = that.selectComponent(".numstepper").data.num
    let goodsInfo = that.data.goodsInfo
    let totalDk = choosednum*(goodsInfo.dkEshellNum)
    that.setData({
      choosedGoodsInfo: {
        retail_price: (choosednum*(goodsInfo.retail_price)).toFixed(2),
        dkEshellNum: choosednum*(goodsInfo.dkEshellNum),
        num: choosednum
      }
    })
  },
  bindManual () {
    let that = this
    let choosedGoodsInfo = that.data.choosedGoodsInfo
    let userDknum = that.data.userDknum
    let choosednum = that.selectComponent(".numstepper").data.num
    let goodsInfo = that.data.goodsInfo
    let totalDk = choosednum*(goodsInfo.dkEshellNum)
    if(choosednum <= 0){
      wx.showToast({
        title: '购买数量要大于0哦~',
        icon: 'none',
        duration: 2000
      })
      that.setData({
        choosedGoodsInfo: {
          retail_price: goodsInfo.retail_price,
          dkEshellNum: goodsInfo.dkEshellNum,
          num: 1
        }
      })
      choosednum = 1
    }
    if(totalDk > userDknum){
      wx.showToast({
        title: '蛋壳数不足',
        icon: 'none',
        duration: 2000
      })
      that.setData({
        choosedGoodsInfo: {
          retail_price: goodsInfo.retail_price,
          dkEshellNum: goodsInfo.dkEshellNum,
          num: 1
        }
      })
    }
    else{
      if(choosednum > goodsInfo.goods_number){
        wx.showToast({
          title: '超出商品库存',
          icon: 'none',
          duration: 2000
        })
        that.setData({
          choosedGoodsInfo: {
            retail_price: goodsInfo.retail_price,
            dkEshellNum: goodsInfo.dkEshellNum,
            num: 1
          }
        })
      }
      else{
        that.setData({
          choosedGoodsInfo: {
            retail_price: (choosednum*(goodsInfo.retail_price)).toFixed(2),
            dkEshellNum: choosednum*(goodsInfo.dkEshellNum),
            num: choosednum
          }
        })
      }
    }
  }
})