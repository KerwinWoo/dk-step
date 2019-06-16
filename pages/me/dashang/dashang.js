// pages/me/dashang/dashang.js
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
    this.setData({
      fromta: options.fromta?options.fromta:'',
      userid: options.userid?options.userid:''
    })
    wx.setNavigationBarTitle({
    	title: ((options.fromta && options.fromta == 1)?'TA':'我') + '收到的打赏'
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
  loadData () {
    let that = this
    let apiUrl = (that.data.fromta)?api.TA_REWARDLIST:api.BUYOU_DASHANGLIST
    let params = {
      page: that.data.currentPage,
      size:30,
      sort:'',
      order:''
    }
    if(that.data.fromta){
      params.targetUserId = that.data.userid
    }
    utils.request(apiUrl,params).then(function(res){
      if(res.errno === 0){
        res.data.data.map(function(value){
          value.rewardTime = utils.formatDate(new Date(value.rewardTime), 'MM-dd hh:mm:ss')
        })
        that.setData({
          list: that.data.list.concat(res.data.data)
        })
        if(res.data.data && res.data.data.length != 0){
          that.data.currentPage++
        }
        else{
          if(that.data.currentPage != 1){
            utils.nomoreData()
          }
        }
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