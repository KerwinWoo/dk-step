// pages/team/team.js
const app = getApp()
const utils = require('../../utils/util.js')
const api = require('../../api/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [5000, 10000, 15000, 20000],
    teamName: '',
    teamSlogan: '',
    userInfo: wx.getStorageSync('userInfo'),
/*    teamRequired: true,
    sloganRequired: true, */
    buttonDisabled: true,
    index: 0
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
    if(!app.globalData.teamFromUrl || app.globalData.teamFromUrl != 'myteam'){
      this.loadMyTeamData()
    }
    else{
      app.globalData.teamFromUrl = ''
    }
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
    let that = this
    return {
      title: '加入我的步友团',
      path: '/pages/index/index?fromInvite=1&type=2&business='+ that.data.teamId + '&push_userid=' + wx.getStorageSync('userId') + '&forwardUrl='+encodeURIComponent('/pages/team/myteam/myteam')
    }
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
    let that = this
    if(!that.data.teamName){
      wx.showToast({
        title: '请输入团队名称',
        icon: 'none'
      })
      return
    }
    if(!that.data.teamSlogan){
      wx.showToast({
        title: '请输入团队宣言',
        icon: 'none'
      })
      return
    }
    utils.request(api.TEAM_CREATE,{
      teamName: that.data.teamName,
      declaration: that.data.teamSlogan,
      targetNum: that.data.array[that.data.index]
    }).then(function(res){
      if(res.errno === 0){
        wx.navigateTo({
          url: '/pages/team/myteam/myteam'
        })
      }
    })
  },
  teamNameInput (e) {
    let teamName = e.detail.value;
    this.setData({
      teamName: teamName
    })
  }
  ,
  sloganInput (e) {
    let slogan = e.detail.value;
    this.setData({
      teamSlogan: slogan
    })
  },
  loadMyTeamData () {
    let that = this
    utils.request(api.TEAM_LIST).then(function(res){
      if(res.errno === 0){
        if(res.data.length > 0){
          wx.navigateTo({
            url: '/pages/team/myteam/myteam'
          })
        }
      }
    })
  }
})