// pages/mall/yaoqing/yaoqing.js
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
   let that = this
   utils.request(api.MALL_QUERY_GOODS_DETAIL,{
     id: options.id
   },'GET').then(function(res){
     res.data.invitationHistory.map(function(value, index){
       value.add_time = utils.formatTime(new Date(value.add_time))
     })
     that.setData({
       info: res.data.info,
       invitationHistory: res.data.invitationHistory
     })
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
    let that = this
    return {
      title: '跟我一起来免费兑换"' + that.data.info.name + '"',
      path: '/pages/mall/goodsdetail/goodsdetail?type=3&business='+ that.data.info.id + '&push_userid=' + wx.getStorageSync('userId')
    }
  },
  backTo () {
    wx.navigateBack()
  }
})