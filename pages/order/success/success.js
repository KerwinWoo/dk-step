// pages/order/success/success.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      imgUrl: options.goodsurl?decodeURIComponent(options.goodsurl):'',
      goodsid: options.goodsid?options.goodsid:'',
      isInvite: options.isInvite?options.isInvite:'',
      goodsType: options.goodsType?options.goodsType:''
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
    wx.reLaunch({
      url: '/pages/mall/goodsdetail/goodsdetail?id='+that.data.goodsid+'&isInvite='+that.data.isInvite+'&goodsType='+that.data.goodsType
    })
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
      imageUrl: this.data.imgUrl
    }
  }
})