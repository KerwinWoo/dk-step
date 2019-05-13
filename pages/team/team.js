// pages/team/team.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [5000, 10000, 15000, 20000],
    index: 0,
    teamName: '',
    teamSlogan: ''
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
    return false
  },
  backTo (e) {
    wx.switchTab({
    	url: '/pages/index/index'
    })
  },
  bindPickerChange(e) {
    this.setData({
      index: e.detail.value
    })
  },
  createTeam () {
    console.error('点击邀请之前需要校验团队名称和宣言是否为空，但是这个分享动作如何阻止？？？')
    wx.navigateTo({
      url: '/pages/team/myteam/myteam'
    })
    /* if(this.data.teamName != '' && this.data.teamSlogan != ''){
      wx.navigateTo({
        url: '/pages/team/myteam/myteam'
      })
    }
    else{
      console.log('bull shit')
    } */
  }
})