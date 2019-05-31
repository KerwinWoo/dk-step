// pages/buyou/dashang/dashang.js
const utils = require('../../../utils/util.js')
const api = require('../../../api/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentPage: 1,
    firstLoad: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      currentTopicId: options.topicid
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
    this.loadTopicInfo()
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
    this.loadTopicInfo()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  backTo () {
    wx.navigateBack()
  },
  loadTopicInfo () {
    let that = this
    utils.request(api.BUYOU_REWARDLIST,{
      communityId: that.data.currentTopicId,
      page: that.data.currentPage,
      size: 20
    }).then(function(res){
      if(res.errno === 0){
        if(res.data.rewardList.data.length > 0){
          res.data.rewardList.data.map(function(value, index){
            value.reward_time = utils.formatTime(new Date(value.reward_time))
          })
          that.data.currentPage++
          let tempData = res.data.rewardList.data
          if(that.data.firstLoad){
            that.data.rewardUsersList = res.data.rewardList.data
            that.data.firstLoad = false
          }
          else{
            that.data.rewardUsersList = that.data.rewardUsersList.concat(res.data.rewardList.data)
          }
          that.setData({
            currentPage: that.data.currentPage,
            rewardUsersList: that.data.rewardUsersList,
            rewarduserCount: res.data.rewarduserCount
          })
        }
      }
    })
  }
})