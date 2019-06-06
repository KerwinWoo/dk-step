// pages/team/myteam/myteam.js
const app = getApp()
const utils = require('../../../utils/util.js')
const api = require('../../../api/api.js')
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
    this.loadMyTeamData()
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
  createTeam () {
    app.globalData.teamFromUrl = 'myteam'
    wx.switchTab({
      url: '/pages/team/team'
    })
  },
  backTo () {
    this.createTeam()
  },
  loadMyTeamData () {
    let that = this
    utils.request(api.TEAM_LIST).then(function(res){
      if(res.errno === 0){
        that.setData({
          teamList: res.data
        })
      }
    })
  }
})