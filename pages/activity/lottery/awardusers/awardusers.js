// pages/activity/lottery/awardusers/awardusers.js
const app = getApp()
const utils = require('../../../../utils/util.js')
const api = require('../../../../api/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    awardId: '',
    currentPageJoinedUser: 1,
    joinedUserList: [],
    isLoadAll: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      awardId: options.id
    })
    this.loadJoinedUserlist()
  },
  loadJoinedUserlist () {
    let that = this
    wx.showLoading()
    utils.request(api.LOTTERY_JOINUSER,{
      lottery_id: that.data.awardId,
      page: that.data.currentPageJoinedUser,
      size: 100
    }).then(function(res){
      wx.hideLoading()
      if(res.errno === 0){
        if(res.data.length > 0){
          if(res.data.length < 100){
            that.setData({
              isLoadAll: true
            })
          }
          that.setData({
            joinedUserList: that.data.joinedUserList.concat(res.data)
          })
        }
        else{
          that.setData({
            isLoadAll: true
          })
        }
      }
      else{
        utils.showErrorToast(res.errmsg?res.errmsg:res.msg)
      }
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

  }
})