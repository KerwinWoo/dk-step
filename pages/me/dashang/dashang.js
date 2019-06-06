// pages/me/dashang/dashang.js
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
    this.setData({
      fromMsgCenter: options.fromMsgCenter?options.fromMsgCenter:0
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
    if(this.data.fromMsgCenter == 1){
      this.loadMessageNum()
    }
    else{
      this.loadData()
    }
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
  loadData () {
    let that = this
    utils.request(api.BUYOU_DASHANGLIST,{
      page: 1,
      size: 100,
      sort: '',
      order: ''
    }).then(function(res){
      if(res.errno === 0){
        res.data.data.map(function(value){
          value.rewardTime = utils.formatDate(new Date(value.rewardTime), 'MM-dd hh:mm:ss')
        })
        that.setData({
          list: res.data.data
        })
      }
    })
  },
  loadMessageNum () {
    let that = this
    utils.request(api.MESSAGENUM_REWARD).then(function(res){
      if(res.errno === 0){
        res.data.data.map(function(value){
          value.rewardTime = utils.formatDate(new Date(value.createTime), 'MM-dd hh:mm:ss')
        })
        that.setData({
          list: res.data.data
        })
        that.readAll()
      }
    })
  },
  readAll () {
    let that = this
    let ids = []
    that.data.list.map(function(value, index){
      if(value.readStatus == '0'){
        ids.push(value.noticeId)
      }
    })
    if(ids.length > 0){
      utils.request(api.MESSAGENUM_CHANGESTATUS_BATCH,{
        ids: ids
      }).then(function(res){
        if(res.errno === 0){
        }
      })
    }
  }
})