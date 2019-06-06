// pages/team/detail/detail.js
const app = getApp()
const utils = require('../../../utils/util.js')
const api = require('../../../api/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: wx.getStorageSync('userId'),
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
    this.toast = this.selectComponent("#toast")
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
      title: '邀你一起组团PK步数，步数还可以当钱花哦~',
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
        let targetNum = res.data.teamDetails.step_day_num
        res.data.teamMemberList.map(function(value, index){
          if(value.step_first_num < targetNum){
            value.targetStatus = 3
          }
          else{
            value.targetStatus = 0
          }
        })
        that.setData({
          teamDetail: res.data.teamDetails,
          teamMemberList: res.data.teamMemberList
        })
      }
    })
  },
  exitTeam () {
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
    utils.request(api.TEAM_DETAIL_EXIT, {
      teamId: that.data.teamDetail.teamId
    }).then(function(res){
      if(res.errno === 0){
        wx.showToast({
          title: '已退出团队',
          icon: 'success',
          duration: 2000,
          success: function(){
            wx.navigateTo({
              url: '/pages/team/myteam/myteam'
            })
          }
        })
      }
    })
  },
  rewardUser (e) {
    let that = this
    if(e.currentTarget.dataset.targetid == that.data.userId){
      wx.showToast({
        title: '不能打赏自己哦~',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if(that.data.teamMemberList.length >= 5){
      utils.request(api.REWARD_USER, {
        targetUserId: e.currentTarget.dataset.targetid,
        rewardEggshellNum: 1
      }).then(function(res){
        if(res.errno === 0){
          that.toast.showToast('打赏成功，已将你的1枚蛋壳打赏给TA')
          that.loadData()
        }
        else{
          wx.showToast({
            title: res.errmsg,
            duration: 2000,
            icon: 'none'
          })
        }
      })
    }
    else{
      wx.showToast({
        title: '团队人数不足5人，无法打赏',
        icon: 'none',
        duration: 2000
      })
    }
  }
})