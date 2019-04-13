Page({

  /**
   * 页面的初始数据
   */
  data: {
    friendList: [{
      id: 1,
      name: '张三',
      photo: '../../../image/good01.jpg'
    }, 
    {
      id: 1,
      name: '李四',
      photo: '../../../image/good02.jpg'
    }],
    showSkeleton: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    setTimeout(function(){
      that.setData({
        showSkeleton: false
      })
    }, 1000)
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
  backTo (e) {
    wx.switchTab({
    	url: '/pages/index/index'
    })
  }
})