// pages/team/manage/name/name.js
const utils = require('../../../../utils/util.js')
const api = require('../../../../api/api.js')
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
      slogan: options.slogan?options.slogan:'',
      teamName: options.teamName?options.teamName:'',
      targetNum: options.targetNum?options.targetNum:'',
      teamId: options.teamId?options.teamId:'',
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
  bindinput (e) {
    this.setData({
      teamName: e.detail.value
    })
  },
  updateTeam () {
    let that = this
    if(that.data.teamName){
      utils.request(api.TEAM_UPDATE, {
        teamId: that.data.teamId,
        teamName: that.data.teamName,
        declaration: that.data.slogan,
        targetNum: that.data.targetNum
      }).then(function(res){
        if(res.errno === 0){
          wx.navigateBack()
        }
      })
    }
    else{
      wx.showToast({
        title: '请输入团队名称',
        icon:'none',
        duration:2000
      })
    }
  }
})