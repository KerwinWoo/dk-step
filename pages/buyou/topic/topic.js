// pages/buyou/topic/topic.js
const app = getApp()
const utils = require('../../../utils/util.js')
const api = require('../../../api/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topicDataList: [{
      id: 1,
      name: '蛋壳',
      photo: '',
      topicName: '蛋壳步数换',
      content: '在我的生命中，运动就像温柔地吹拂着我，带我走出自我的暖暖春风；我最难忘、最刻骨铭心的记忆都和它相关；因为我爱运动，而运动是我对待度。',
      imglist: [],
      addr: '',
      time: ''
    }, {
      id: 2,
      name: '蛋壳',
      photo: '',
      topicName: '蛋壳步数换',
      content: '在我的生命中，运动就像温柔地吹拂着我，带我走出自我的暖暖春风；我最难忘、最刻骨铭心的记忆都和它相关；因为我爱运动，而运动是我对待度。',
      imglist: [],
      addr: '',
      time: ''
    }],
    releaseBtnShow: true,
    currentTopic: '',
    pic: '',
    topicDataLoaded: false,
    showSkeleton: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      title: options.title ? options.title : '#蛋壳步数换',
      currentTopic: options.value,
      pic: options.pic,
      comment: options.comment
    })
    // 刷新组件
    that.refreshView = that.selectComponent("#refreshView")
    that.loadTopicData()

  },

  //触摸开始
  handletouchstart: function (event) {
    this.refreshView.handletouchstart(event)
  },
  //触摸移动
  handletouchmove: function (event) {
    this.refreshView.handletouchmove(event)
  },
  //触摸结束
  handletouchend: function (event) {
    this.refreshView.handletouchend(event)
  },
  //触摸取消
  handletouchcancel: function (event) {
    this.refreshView.handletouchcancel(event)
  },
  //页面滚动
  onPageScroll: function (event) {
    let that = this
    that.refreshView.onPageScroll(event)
    
    if(that.data.releaseBtnShow){
      that.setData({
        releaseBtnShow: false
      },() => {
        setTimeout(function(){
          that.setData({
            releaseBtnShow: true
          })
        }, 1500)
      })
    }
  },
  onPullDownRefresh: function () {
    let that = this
    that.refreshView.stopPullRefresh()
    that.loadTopicData()
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  backTo() {
    wx.navigateBack()
  },
  loadTopicData() {
    let that = this
    if(!that.data.topicDataLoaded){
      utils.request(api.BUYOU_RECOMMENT_TOPICLIST,{
        topicTag: that.data.currentTopic
      }).then(function(res){
        let topicData = res.data.data.map(function(value,index){
          if(value.img_src){
            value.img_src = value.img_src.split(',')
          }
          if(value.create_time){
            value.create_time = utils.formatTime(new Date(value.create_time))
          }
          return value
        })
        that.setData({
          topicDataLoaded: true,
          topicDataList: topicData,
          showSkeleton: false
        })
        console.log('topicdata', topicData)
      })
    }
  },
  giveEgg(e) {
    const data = e.currentTarget.dataset
    let that = this
    let itemData = that.data.topicDataList[data.parentindex]
    if (!itemData.giveEgg) {
      that.toast.showToast('打赏成功，已将您的1枚蛋壳打赏给TA')
      that.data.topicDataList[data.parentindex].giveEgg = true
      that.setData({
        topicDataList: that.data.topicDataList
      })
    }
  },
  previewTopicImg(e) {
    const data = e.currentTarget.dataset
    let that = this
    wx.previewImage({
      current: data.current,
      urls: that.data.topicDataList[data.parentindex].imglist
    })
  }
})