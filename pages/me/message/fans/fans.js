// pages/me/message/fans/fans.js
const utils = require('../../../../utils/util.js')
const api = require('../../../../api/api.js')
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
    this.loadMessageNum()
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
  loadMessageNum () {
    let that = this
    utils.request(api.MESSAGENUM_FANS,{
      page: 1,
      size: 100
    }).then(function(res){
      if(res.errno === 0){
        res.data.data.map(function(value){
          value.createTime = utils.formatDate(new Date(value.createTime), 'MM-dd hh:mm:ss')
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