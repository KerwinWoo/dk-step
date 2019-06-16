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
    index: 0,
    pageType: '',
    hasBackBtn: false
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let that = this
    return {
      title: '加入我的步友团',
      path: '/pages/index/index?fromInvite=1&type=2&business='+ that.data.teamId + '&push_userid=' + wx.getStorageSync('userId') + '&forwardUrl='+encodeURIComponent('/pages/team/myteam/myteam')
    }
  },
  bindPickerChange(e) {
    this.setData({
      index: e.detail.value
    })
  },
  doCreateTeam () {
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
        that.setData({
          pageType: 'me'
        })
        wx.setNavigationBarTitle({
        	title: '我的团队'
        })
        that.loadMyTeamData()
      }
      else{
        wx.showToast({
          title: res.errmsg?res.errmsg:res.msg,
          icon: 'none',
          duration: 2000
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
          that.setData({
            pageType: 'me',
            teamList: res.data
          })
          wx.setNavigationBarTitle({
          	title: '我的团队'
          })
        }
        else{
          that.setData({
            pageType: 'team'
          })
          wx.setNavigationBarTitle({
          	title: '创建团队'
          })
        }
      }
    })
  }
})