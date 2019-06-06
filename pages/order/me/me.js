// pages/order/me/me.js
const utils = require('../../../utils/util.js')
const api = require('../../../api/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_status: '',
    orderList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options', options)
    let that = this
    that.setData({
      order_status : options.orderStatus?options.orderStatus:'',
      fromIndex : options.fromIndex?options.fromIndex:''
    })
    that.loadOrderlist()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.toast = this.selectComponent("#toast");
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
  backTo () {
    if(this.data.fromIndex && this.data.fromIndex == 0){
      wx.switchTab({
        url: '/pages/me/index'
      })
    }
    else{
      wx.navigateBack()
    }
  },
  changeType (e) {
    let that = this
    that.setData({
      order_status: e.currentTarget.dataset.type
    })
    that.loadOrderlist()
  },
  toWuliu (e) {
    let orderid = e.currentTarget.dataset.orderid
    wx.navigateTo({
      url: '/pages/order/wuliu/wuliu?orderid=' + orderid
    })
  },
  gotoPay (e) {
    let data = e.currentTarget.dataset
    let goodsId = data.goodsid
    let orderId = data.orderid
    utils.request(api.PayPrepayId, { orderId: orderId, payType: 1 }, 'POST', 'application/json').then(function (res) {
      if (res.errno === 0) {
        let payParam = res.data;
        console.log('prepay', res)
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
      else{
        wx.showToast({
          title: res.errmsg,
          icon: 'none',
          duration: 2000
        })
      }
    });
  },
  loadOrderlist () {
    let that = this
    utils.request(api.DKORDER_LIST,{
      page:1,
      size:10,
      order_status: (that.data.order_status) ? that.data.order_status*1 : ''
    },'POST').then(function(res){
      if(res.errno === 0){
        that.setData({
          orderList: res.data.data
        })
      }
    })
  },
  bindTzFahuo () {
    let that = this
    that.toast.showToast('已通知商家尽快发货，请耐心等待')
  },
  toShouhuo (e) {
    let that = this
    utils.request(api.DKORDER_CONFIRM, {
      orderId: e.currentTarget.dataset.orderid
    }).then(function(res){
      if(res.errno === 0){
        wx.showToast({
          title: '订单已完成',
          icon: 'success',
          duration: 2000
        })
        that.setData({
          order_status: '301'
        })
        that.loadOrderlist()
      }
    })
  }
})