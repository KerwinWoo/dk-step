// pages/me/pinglun/pinglun.js
const utils = require('../../../utils/util.js')
const api = require('../../../api/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentPage: 1,
    list: []
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
    this.data.currentPage = 1
    this.data.list = []
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
    this.loadData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  backTo () {
    wx.navigateBack()
  },
  loadData () {
    let that = this
    utils.request(api.MESSAGENUM_COMMENT,{
      page: that.data.currentPage,
      size: 20
    }).then(function(res){
      if(res.errno === 0){
        res.data.data.map(function(value){
          value.createTime = utils.formatDate(new Date(value.createTime), 'MM-dd hh:mm:ss')
          if(value.imgSrc){
            value.imgSrc = value.imgSrc.split(',')[0]
          }
        })
        if(res.data.data && res.data.data.length != 0){
          that.data.currentPage++
        }
        else{
          if(that.data.currentPage != 1){
            utils.nomoreData()
          }
        }
        that.setData({
          list: that.data.list.concat(res.data.data)
        })
        that.readAll()
      }
    })
  },
  readAll () {
    let that = this
    utils.request(api.MESSAGENUM_CHANGESTATUS_BATCH,{
      noticeType: 2
    }).then(function(res){
      if(res.errno === 0){
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