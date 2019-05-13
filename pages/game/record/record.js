// pages/game/record/record.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tasklistData: [{
      id: 1,
      pic: 'https://img12.360buyimg.com/babel/s130x130_jfs/t1/23337/28/15565/169327/5cb001c1E3dc01d1e/60bfcbc3e24ec9f1.jpg',
      name: '迪士尼（Disney）小学生书包 男童双肩儿童书包3-6年级背包9-12周岁大容量休闲书包 RL0425A',
      time: '2019-04-05  09:31:28'
    },{
      id: 2,
      pic: 'https://img12.360buyimg.com/babel/s130x130_jfs/t1/23337/28/15565/169327/5cb001c1E3dc01d1e/60bfcbc3e24ec9f1.jpg',
      name: '小学生书包',
      time: '2019-04-05  09:31:28'
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
  toGame () {
    wx.navigateTo({
      url: '/pages/game/luckywheel/luckywheel'
    })
  },
  backTo (e) {
    wx.navigateBack()
  }
})