// pages/activity/lottery/lottery.js
const app = getApp()
const utils = require('../../../utils/util.js')
const api = require('../../../api/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currenttab: 'tabing',
    currentPage: 1,
    currentPage2: 1,
    currentPage3: 1,
    awardingList: [],
    awardedList: [],
    awardmeList: [],
    userInfo: wx.getStorageSync('userInfo'),
    tablistFixed: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //this.refreshView = this.selectComponent(".refreshView")
    this.loadAwardlist()
    //this.loadAwardEdlist()
    //this.loadAwardMelist()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },
  //页面滚动
  onPageScroll: function (event) {
    let that = this
    let scrollTop = event.scrollTop
    if (scrollTop >= 84) {
      if(!that.data.tablistFixed){
        that.setData({
          tablistFixed: true
        })
      }
    }
    else {
      if(that.data.tablistFixed){
        that.setData({
          tablistFixed: false
        })
      }
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    /* this.data.currentPage = 1
    this.data.currentPage2 = 1
    this.data.awardingList = []
    this.data.awardedList = []
    this.loadAwardlist()
    this.loadAwardEdlist() */
  },
  
  //触摸开始
/*  handletouchstart: function (event) {
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
  }, */

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.currenttab == 'tabing'){
      this.loadAwardlist()
    }
    else if(this.data.currenttab == 'tabed'){
      this.loadAwardEdlist()
    }
    else if(this.data.currenttab == 'me'){
      this.loadAwardMelist()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {
    let that = this
    if(e.from == 'menu'){
      return {
        title: that.data.userInfo.nickname + '邀请你免费参加抽奖活动',
        path: '/pages/index/index',
        imageUrl: 'https://dankebsh.oss-cn-shanghai.aliyuncs.com/dkstep-img/invitation_team.png'
      }
    }
    else if(e.target.dataset.type && e.target.dataset.type == 1){
      let data = e.target.dataset
      return {
        title: that.data.userInfo.nickname + '邀请你免费参加【'+data.name+'】抽奖活动',
        path: '/pages/index/index?fromInvite=1&type=4&business='+ data.id + '&push_userid=' + wx.getStorageSync('userId') + '&forwardUrl='+encodeURIComponent('/pages/activity/lottery/awarddetail/awarddetail?id='+data.id),
        imageUrl: data.img
      }
    }
  },
  changeType (e) {
    this.setData({
      currenttab: e.currentTarget.dataset.type
    })
    if(this.data.currenttab == 'tabing'){
      this.data.currentPage = 1
      this.data.awardingList = []
      this.loadAwardlist()
    }
    else if(this.data.currenttab == 'tabed'){
      this.data.currentPage2 = 1
      this.data.awardedList = []
      this.loadAwardEdlist()
    }
    else if(this.data.currenttab == 'me'){
      this.data.currentPage3 = 1
      this.data.awardmeList = []
      this.loadAwardMelist()
    }
  },
  toAwardDetail (e) {
    let id = e.currentTarget.dataset.awardid
    wx.navigateTo({
      url: '/pages/activity/lottery/awarddetail/awarddetail?id=' + id
    })
  },
  loadAwardlist () {
    let that = this
    wx.showLoading()
    utils.request(api.LOTTERY_LISTLOTTERY,{
      page: that.data.currentPage,
      size: 5,
      status: 0
    }).then(function(res){
      wx.hideLoading()
      if(res.errno === 0){
        let data = res.data
        if(data && data.length > 0){
          that.data.currentPage++
          that.setData({
            awardingList: that.data.awardingList.concat(data)
          })
        }
        else{
          if(that.data.currentPage != 1){
            //utils.nomoreData()
          }
        }
      }
      else{
        utils.showErrorToast(res.errmsg?res.errmsg:res.msg)
      }
    })
  },
  loadAwardEdlist () {
    let that = this
    wx.showLoading()
    utils.request(api.LOTTERY_LISTLOTTERY,{
      page: that.data.currentPage2,
      size: 5,
      status: 1
    }).then(function(res){
      wx.hideLoading()
      if(res.errno === 0){
        let data = res.data
        if(data && data.length > 0){
          that.data.currentPage2++
          that.setData({
            awardedList: that.data.awardedList.concat(data)
          })
        }
        else{
          if(that.data.currentPage2 != 1){
            //utils.nomoreData()
          }
        }
      }
      else{
        utils.showErrorToast(res.errmsg?res.errmsg:res.msg)
      }
    })
  },
  loadAwardMelist () {
    let that = this
    wx.showLoading()
    utils.request(api.LOTTERY_LISTLOTTERY,{
      page: that.data.currentPage3,
      size: 5,
      status: 2
    }).then(function(res){
      wx.hideLoading()
      if(res.errno === 0){
        let data = res.data
        if(data && data.length > 0){
          that.data.currentPage3++
          that.setData({
            awardmeList: that.data.awardmeList.concat(data)
          })
        }
        else{
          if(that.data.currentPage3 != 1){
            //utils.nomoreData()
          }
        }
      }
      else{
        utils.showErrorToast(res.errmsg?res.errmsg:res.msg)
      }
    })
  }
})