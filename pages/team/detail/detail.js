// pages/team/detail/detail.js
const app = getApp()
const utils = require('../../../utils/util.js')
const api = require('../../../api/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commonLayer: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      teamId: options.teamId?options.teamId:'',
      userId: wx.getStorageSync('userId'),
      frominvite: options.frominvite?options.frominvite:''
    })
    if(options.frominvite && options.frominvite == 1){
      utils.request(api.TEAM_INVITESTATUS,{
        teamId: options.teamId
      }).then(function(res){
        console.log(res)
        if(res.errno === 0){
          utils.showErrorToast(res.data)
        }
        else{
          utils.showErrorToast(res.errmsg)
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.toast = this.selectComponent(".dktoast")
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
  onShareAppMessage: function (e) {
    let that = this
    if(e.target.dataset.type == 1){
      return {
        title: '道路千万条，走路第一条，步数别浪费，快来这里兑',
        path: '/pages/index/index',
        imageUrl: 'https://dankebsh.oss-cn-shanghai.aliyuncs.com/dkstep-img/invitation_homepage.png'
      }
    }
    else{
      return {
        title: '邀你一起组团PK步数，步数还可以当钱花哦~',
        path: '/pages/index/index?fromInvite=1&type=2&business='+ that.data.teamId + '&push_userid=' + wx.getStorageSync('userId') + '&forwardUrl='+encodeURIComponent('/pages/team/detail/detail?frominvite=1&teamId='+that.data.teamId),
        imageUrl: 'https://dankebsh.oss-cn-shanghai.aliyuncs.com/dkstep-img/invitation_team.png'
      }
    }
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
            if(value.step_first_num == 0){
              value.targetStatus = 4
            }
            else{
              value.targetStatus = 3
            }
          }
          else{
            //判断是否已打赏
            if(value.reward_status == 1){
              value.targetStatus = 1
            }
            else{
              value.targetStatus = 2
            }
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
            wx.switchTab({
            	url: '/pages/team/team'
            })
          }
        })
      }
    })
  },
  rewardUser (e) {
    let that = this
    if(that.data.teamMemberList.length >= 5){
      utils.request(api.REWARD_USER, {
        targetUserId: e.currentTarget.dataset.targetid,
        rewardEggshellNum: 2
      }).then(function(res){
        if(res.errno === 0){
          that.toast.showToast('打赏成功，已将你的2枚蛋壳打赏给TA')
          that.loadTeamDetail()
        }
        else{
          wx.showToast({
            title: res.errmsg?res.errmsg:res.msg,
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
  },
  toTA (e) {
    let uid = e.currentTarget.dataset.uid
    if(uid == wx.getStorageSync('userId')){
      wx.navigateTo({
        url: '/pages/me/homepage/homepage'
      })
    }
    else{
      wx.navigateTo({
        url: '/pages/ta/ta?userid='+uid
      })
    }
  }
})