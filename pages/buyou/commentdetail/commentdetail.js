// pages/buyou/commentdetail/commentdetail.js
const app = getApp()
const utils = require('../../../utils/util.js')
const api = require('../../../api/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTopicId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      currentTopicId: options.id
    })
  },
  loadTopicInfo () {
    let that = this
    utils.request(api.BUYOU_TOPICCOMMENT,{
      communityId: that.data.currentTopicId,
      page: 1,
      size: 10
    }).then(function(res){
      if(res.errno === 0){
        let data = res.data.communityVo
        if(data.img_src){
          data.img_src = data.img_src.split(',')
        }
        if(data.img_src.length == 1){
          data.imgmode = 'aspectFill'
        }
        else if(data.img_src.length == 4){
          data.type3 = ' type3'
        }
        else{
          data.imgmode = 'aspectFill'
        }
        res.data.commentList.data.map(function(value, index){
          value.create_time = utils.formatTime(new Date(value.create_time))
        })
        that.setData({
          communityVo: data,
          commentList: res.data.commentList,
          rewardUsersList: res.data.rewardList.data,
          rewardUserCount: res.data.rewardUserCount
        })
      }
    })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  backTo () {
    wx.navigateBack()
  },
  doComment (e) {
    let data = e.currentTarget.dataset
    wx.navigateTo({
    	url: '/pages/buyou/comment/comment?communityId='+data.id+'&targetUserId='+data.uid
    })
  },
  doCommentWithName (e) {
    let data = e.currentTarget.dataset
    let currentUserId = wx.getStorageSync('userId')
    if(currentUserId === data.uid){
      wx.showToast({
        title: '不能回复自己',
        icon: 'none',
        duration: 2000
      })
    }
    else{
      wx.navigateTo({
      	url: '/pages/buyou/comment/comment?targetName='+data.name+'&communityId='+data.id+'&targetUserId='+data.uid
      })
    }
  },
  previewTopicImg (e) {
    const data = e.currentTarget.dataset
    let that = this
    wx.previewImage({
      current: data.current,
      urls: that.data.communityVo.img_src
    })
  },
  giveEgg (e) {
    const data = e.currentTarget.dataset
    let that = this
    if(that.data.communityVo.create_user_id == wx.getStorageSync('userId')){
      wx.showToast({
        title:'不能打赏自己哦~',
        icon: 'none',
        duration: 2000
      })
      return
    }
    let itemData = that.data.topicDataList[data.parentindex]
    if(itemData.reward_status == 0){
      let communityVo = that.data.communityVo
      utils.request(api.BUYOU_DASHANG,{
        communityId: communityVo.id,
        targetUserId: communityVo.create_user_id
      }).then(function(res){
        if(res.errno == 0){
          that.toast.showToast('打赏成功，已将你的2枚蛋壳打赏给TA')
          communityVo.reward_status = 1
          that.setData({
            communityVo: communityVo
          })
        }
        else{
          wx.showToast({
            title: res.errmsg,
            icon: 'none',
            duration: 2000
          })
        }
      })
    }
  },
  shouCang (e) {
    let that = this
    const data = e.currentTarget.dataset
    let currentTopic = that.data.communityVo
    let colStatus = currentTopic.collection_status
    if(colStatus == 1){
      //取消收藏
      utils.request(api.BUYOU_SHOUCANGTOPIC_CANCEL,{
        communityId: currentTopic.id
      }).then(function(res){
        if(res.errno == 0){
          currentTopic.collection_status = 0
          currentTopic.collection_num--
          that.data.communityVo = currentTopic
          that.setData({
            communityVo: that.data.communityVo
          })
        }
        else{
          wx.showToast({
            title: res.errmsg,
            icon: 'none',
            duration: 2000
          })
        }
      })
    }
    else if(colStatus == 0){
      //收藏
      utils.request(api.BUYOU_SHOUCANGTOPIC,{
        communityId: currentTopic.id
      }).then(function(res){
        if(res.errno == 0){
          that.toast.showToast('收藏成功')
          currentTopic.collection_status = 1
          currentTopic.collection_num++
          that.data.communityVo = currentTopic
          that.setData({
            communityVo: that.data.communityVo
          })
        }
        else{
          wx.showToast({
            title: res.errmsg,
            icon: 'none',
            duration: 2000
          })
        }
      })
    }
  },
  guanzhu (e) {
    let that = this
    const data = e.currentTarget.dataset
    let status = that.data.communityVo.attention_status
    if(status == 1){
      utils.request(api.USER_ATTENTION_CANCEL, {
        attentionUserId: data.uid
      }).then(function(res){
        if(res.errno === 0){
          that.data.communityVo.attention_status = 0
          that.setData({
            communityVo: that.data.communityVo
          })
          that.toast.showToast('已取消关注')
        }
        else{
          wx.showToast({
            title: res.errmsg,
            icon: 'none',
            duration: 2000
          })
        }
      })
    }
    else{
      utils.request(api.USER_ATTENTION, {
        attentionUserId: data.uid
      }).then(function(res){
        if(res.errno === 0){
          that.data.communityVo.attention_status = 1
          that.setData({
            communityVo: that.data.communityVo
          })
          that.toast.showToast('关注成功')
        }
        else{
          wx.showToast({
            title: res.errmsg,
            icon: 'none',
            duration: 2000
          })
        }
      })
    }
  }
})