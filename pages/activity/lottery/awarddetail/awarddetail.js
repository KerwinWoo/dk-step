// pages/activity/lottery/awarddetail/awarddetail.js
const app = getApp()
const utils = require('../../../../utils/util.js')
const api = require('../../../../api/api.js')
const WxParse = require('../../../../pages/mall/goodsdetail/wxParse/wxParse.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    awardId: '',
    awardDetail: {},
    joinLayer: false,
    defaultGiftLayer: false,
    defaultGiftNum: 888,
    currentPageJoinedUser: 1,
    userInfo: wx.getStorageSync('userInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      awardId: options.id
    })
    this.loadDetail()
    this.loadJoinedUserlist()
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: this.data.userInfo.nickname + '邀请你免费参加【'+this.data.awardDetail.lottery.name+'】抽奖活动',
      path: '/pages/index/index?fromInvite=1&type=4&business='+ this.data.awardDetail.lottery.id + '&push_userid=' + wx.getStorageSync('userId') + '&forwardUrl='+encodeURIComponent('/pages/activity/lottery/awarddetail/awarddetail?id='+this.data.awardDetail.lottery.id),
      imageUrl: this.data.awardDetail.lottery.imgsOne
    }
  },
  loadDetail (isRefresh) {
    let that = this
    utils.request(api.LOTTERY_DETAIL,{
      lottery_id: that.data.awardId
    }).then(function(res){
      if(res.errno === 0){
        let data = res.data.result
        data.lottery.openTime = utils.formatDate(new Date(data.lottery.openTime), 'yyyy.MM.dd hh:mm')
        data.isAwardGet = (data.isGetStep && data.isGetStep == 1)?true:false
        if(!isRefresh){
          WxParse.wxParse('goodsDetail', 'html', '<div style="color:red;">'+data.lotteryDesc+'</div>', that);
        }
        that.setData({
          awardDetail: data
        })
      }
    })
  },
  getFormId (e) {
    let that = this
    let formId = e.detail.formId
    utils.request(api.LOTTERY_JOIN,{
      formId: formId,
      lottery_id: that.data.awardId
    }).then(function(res){
      if(res.errno === 0){
        that.loadDetail(true)
        that.loadJoinedUserlist()
         that.setData({
          joinLayer: true
        })
      }
      else{
        utils.showErrorToast(res.errmsg?res.errmsg:res.msg)
      }
    })
  },
  closeSuccessLayer () {
    this.setData({
      joinLayer: false
    })
  },
  closeDefaultGiftLayer () {
    this.setData({
      defaultGiftLayer: false
    })
  },
  getDefaultGift () {
    let that = this
    utils.request(api.LOTTERY_GETSTEP,{
      lottery_id: that.data.awardId
    }).then(function(res){
      if(res.errno === 0){
        let awardDetail = that.data.awardDetail
        awardDetail.isAwardGet = true
        that.setData({
          defaultGiftLayer: true,
          awardDetail: awardDetail
        })
      }
      else{
        utils.showErrorToast(res.errmsg?res.errmsg:res.msg)
      }
    })
  },
  copyCode (e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
  },
  loadJoinedUserlist () {
    let that = this
    utils.request(api.LOTTERY_JOINUSER,{
      lottery_id: that.data.awardId,
      page: that.data.currentPageJoinedUser,
      size: 20
    }).then(function(res){
      if(res.errno === 0){
        that.setData({
          joinedUserList: res.data
        })
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