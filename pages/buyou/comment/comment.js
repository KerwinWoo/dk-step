// pages/buyou/comment/comment.js
const utils = require('../../../utils/util.js')
const api = require('../../../api/api.js')
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
    console.log(options)
    this.setData({
      communityId: options.communityId,
      targetUserId: options.targetUserId,
      targetName: options.targetName ? options.targetName : ''
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
  sendComment () {
    let that = this
    if(!that.data.comment){
      wx.showToast({
        title: '请添加评论信息',
        icon: 'none',
        duration: 2000
      })
    }
    else{
      utils.request(api.BUYOU_TOPICDISCUSS,{
        communityId: that.data.communityId,
        comment: that.data.comment,
        targetUserId: that.data.targetUserId
      }).then(function(res){
        if(res.errno === 0){
          wx.navigateBack()
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
  },
  bindinput (event) {
    this.setData({
      comment: event.detail.value
    });
  }
})