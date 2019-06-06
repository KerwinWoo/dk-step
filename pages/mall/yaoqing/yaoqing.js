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
      title: '就差你了，你帮我点一下就能用步数兑换到这个商品了~',
      imageUrl: that.data.info.list_pic_url,
      path: '/pages/index/index?fromInvite=1&type=3&business='+ that.data.info.id + '&push_userid=' + wx.getStorageSync('userId') + '&forwardUrl='+encodeURIComponent('/pages/mall/goodsdetail/goodsdetail'),
    }
  },
  backTo () {
    wx.navigateBack()
  }
})