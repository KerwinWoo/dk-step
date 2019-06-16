// pages/team/manage/manage.js
const app = getApp()
const utils = require('../../../utils/util.js')
const api = require('../../../api/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    array: [5000, 10000, 15000, 20000],
    commonLayer: false
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

  },
  backTo () {
    wx.navigateBack()
  },
  bindPickerChange(e) {
    this.setData({
      index: e.detail.value
    })
    this.updateTeam()
  },
  updateTeam () {
    let that = this
    utils.request(api.TEAM_UPDATE, {
      teamId: that.data.teamDetail.teamId,
      teamName: that.data.teamDetail.team_name,
      declaration: that.data.teamDetail.team_declaration,
      targetNum: that.data.array[that.data.index]
    }).then(function(res){
      if(res.errno === 0){
      }
    })
  },
  loadTeamDetail () {
    let that = this
    utils.request(api.TEAM_DETAIL,{
      teamId: that.data.teamId
    }).then(function(res){
      if(res.errno === 0){
        let step_day_num = res.data.teamDetails.step_day_num
        that.setData({
          teamDetail: res.data.teamDetails,
          teamMemberList: res.data.teamMemberList,
          index: that.data.array.indexOf(step_day_num)
        })
      }
    })
  },
  dismissTeam () {
    this.setData({
      commonLayer: true
    })
  },
  cancel () {
    this.setData({
      commonLayer: false
    })
  },
  doExit () {
    let that = this
    utils.request(api.TEAM_DETAIL_DELETE, {
      teamId: that.data.teamDetail.teamId
    }).then(function(res){
      if(res.errno === 0){
        wx.showToast({
          title: '已解散团队',
          icon: 'success',
          duration: 2000,
          success: function(){
            wx.switchTab({
            	url: '/pages/team/team'
            })
          }
        })
      }
    })
  }
})