// pages/team/manage/member/member.js
const app = getApp()
const utils = require('../../../../utils/util.js')
const api = require('../../../../api/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: wx.getStorageSync('userId')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      teamId: options.teamId?options.teamId:''
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
    this.loadTeamDetail()
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
      title: '快来和我一起组团PK，步数还可以当钱花~',
      path: '/pages/index/index?fromInvite=1&type=2&business='+ that.data.teamId + '&push_userid=' + wx.getStorageSync('userId') + '&forwardUrl='+encodeURIComponent('/pages/team/detail/detail?teamId='+that.data.teamId),
      imageUrl: 'https://dkstep.oss-cn-beijing.aliyuncs.com/dkstep-img/invitation_team.png'
    }
  },
  backTo () {
    wx.navigateBack()
  },
  loadTeamDetail () {
    let that = this
    utils.request(api.TEAM_DETAIL,{
      teamId: that.data.teamId
    }).then(function(res){
      if(res.errno === 0){
        that.setData({
          teamMemberList: res.data.teamMemberList
        })
      }
    })
  },
  doExpel (e) {
    let that = this
    utils.request(api.TEAM_DETAIL_EXPEL,{
      teamId: that.data.teamId,
      userId: e.currentTarget.dataset.userid
    }).then(function(res){
      if(res.errno === 0){
        that.loadTeamDetail()
      }
    })
  }
})