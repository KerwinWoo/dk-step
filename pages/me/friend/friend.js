const utils = require('../../../utils/util.js')
const api = require('../../../api/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    friendList: []
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
    this.toast = this.selectComponent("#toast");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.loadData()
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
    return {
      title: '步数当钱花，快来一起发',
      path: '/pages/index/index?fromInvite=1&type=1&push_userid=' + wx.getStorageSync('userId'),
      imageUrl: 'https://dankebsh.oss-cn-shanghai.aliyuncs.com/dkstep-img/invitation_homepage.png'
    }
  },
  backTo (e) {
    wx.navigateBack()
  },
  loadData () {
    let that = this
    utils.request(api.HOME_QUERY_FRIENDLIST,{
      offset: 0,
      size: 1000
    }).then(function(res){
      if(res.errno === 0){
        that.setData({
          friendList: res.data.friends,
          count: res.data.count?res.data.count:0,
          nowPercent: Number.isInteger(res.data.nowPercent)?res.data.nowPercent:res.data.nowPercent.toFixed(2),
          futurePercent: Number.isInteger(res.data.futurePercent)?res.data.futurePercent:res.data.futurePercent.toFixed(2)
        })
      }
      else{
        utils.showErrorToast(res.errmsg?res.errmsg:res.msg)
      }
    })
  },
  rewardUser (e) {
    let that = this
    utils.request(api.REWARD_USER, {
      targetUserId: e.currentTarget.dataset.targetid,
      rewardEggshellNum: 2
    }).then(function(res){
      if(res.errno === 0){
        that.toast.showToast('打赏成功，已将你的2枚蛋壳打赏给TA')
        that.loadData()
      }
      else{
        utils.showErrorToast(res.errmsg?res.errmsg:res.msg)
      }
    })
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