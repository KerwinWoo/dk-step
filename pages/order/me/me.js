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
    if(options.orderStatus){
      that.setData({
        order_status : options.orderStatus
      })
    }
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
    wx.navigateBack()
  },
  changeType (e) {
    let that = this
    that.setData({
      order_status: e.currentTarget.dataset.type
    })
    that.loadOrderlist()
  },
  toWuliu () {
    wx.navigateTo({
      url: '/pages/order/wuliu/wuliu'
    })
  },
  gotoPay () {
    wx.navigateTo({
      url: '/pages/order/paydetail/paydetail'
    })
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
  }
})