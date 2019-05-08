// pages/order/shouhou/shouhou.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [{
      id: 1,
      pic: 'https://img10.360buyimg.com/babel/s200x200_jfs/t17929/50/1576018978/46197/67899f96/5ad4707dNf0eb8ca2.jpg',
      name: '小米手环3青春时尚靓丽测心率胎心',
      dk: 999,
      num: 1,
      status: '退款成功'
    }]
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
  }
})