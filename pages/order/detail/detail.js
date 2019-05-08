// pages/order/detail/detail.js
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
    isPay: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  backTo () {
    wx.navigateBack()
  },
  gotoPay () {
    wx.navigateTo({
      url: '/pages/order/paydetail/paydetail'
    })
  }
})