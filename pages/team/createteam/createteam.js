// pages/team/createteam/createteam.js
const app = getApp()
const utils = require('../../../utils/util.js')
const api = require('../../../api/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [5000, 10000, 15000, 20000],
    teamName: '',
    teamSlogan: '',
    userInfo: wx.getStorageSync('userInfo'),
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
        wx.navigateBack()
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
  }
})