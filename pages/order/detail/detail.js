// pages/order/detail/detail.js
const utils = require('../../../utils/util.js')
const api = require('../../../api/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderData: {
      orderStatus: '待支付',
      pic: 'https://img30.360buyimg.com/da/s340x200_jfs/t1/18385/15/2196/195088/5c1b04acEd5941fd5/2e814fc3defeb4f2.jpg',
      name: '小米手环3青春时尚靓丽测心率胎心',
      num: 2,
      dk: 989
    },
    isPay: true,
    countDownList: [],
    actEndTimeList: [],
    intervalHander: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options', options)
    this.setData({
      orderId: options.orderid,
      fromIndex : options.fromIndex?options.fromIndex:''
    })
    this.loadOrderDetail()
  },
  timeFormat(param){//小于10的格式化函数
    return param < 10 ? '0' + param : param; 
  },
  countDown(){
    let newTime = new Date().getTime();
    let endTime = this.data.endTime;
    let obj = null;
    // 如果活动未结束，对时间进行处理
    if (endTime - newTime > 0){
      let time = (endTime - newTime) / 1000;
      // 获取天、时、分、秒
      let day = parseInt(time / (60 * 60 * 24));
      let hou = parseInt(time % (60 * 60 * 24) / 3600);
      let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
      let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
      obj = {
        day: this.timeFormat(day),
        hou: this.timeFormat(hou),
        min: this.timeFormat(min),
        sec: this.timeFormat(sec)
      }
    }else{//活动已结束，全部设置为'00'
      obj = {
        day: '00',
        hou: '00',
        min: '00',
        sec: '00'
      }
      clearInterval(this.data.intervalHander)
      this.data.intervalHander = null
      wx.navigateTo({
        url: '/pages/order/me/me'
      })
    }
    // 渲染，然后每隔一秒执行一次倒计时函数
    this.setData({
      timer: obj
    })
  },
  loadOrderDetail () {
    let that = this
    utils.request(api.DKORDER_ORDERDETAIL,{
      orderId: that.data.orderId
    },'POST','application/json').then(function(res){
      if(res.errno === 0){
        that.setData({
          orderInfo: res.data.orderInfo,
          goodsInfo: res.data.goodsInfo,
          endTime: new Date().getTime() + (res.data.orderInfo.finalTime*1000)
        })
        if(res.data.orderInfo.order_status == '0'){
          // 执行倒计时函数
          that.countDown()
          that.data.intervalHander = setInterval(function(){
            that.countDown()
          }, 1000)
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.toast = this.selectComponent(".dktoast");
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
/*  gotoPay () {
    wx.navigateTo({
      url: '/pages/order/paydetail/paydetail'
    })
  }, */
  copyText: function (e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
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
    utils.request(api.PayPrepayId, { orderId: orderId}, 'POST', 'application/json').then(function (res) {
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
  bindTzFahuo () {
    let that = this
    that.toast.showToast('已通知商家尽快发货，请耐心等待')
  },
  doCancel () {
    let that = this
    utils.request(api.DKORDER_CANCEL,{
      orderId: that.data.orderId
    }).then(function(res){
      if(res.errno === 0){
        wx.showToast({
          title: '取消成功',
          icon: 'success',
          duration: 2000,
          success: function(){
            wx.navigateTo({
              url:'/pages/order/me/me?fromIndex=0'
            })
          }
        })
      }
    })
  }
})