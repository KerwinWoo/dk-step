// pages/buyou/fabusuccess/fabusuccess.js
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
      topicId: options.topicid?options.topicid:''
    })
    this.loadTopicInfo()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  onUnload: function () {
    wx.reLaunch({
      url: '/pages/buyou/index'
    })
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
    let topic = that.data.topic
    let name = (topic.tag_name?('#'+topic.tag_name+'#'):'') + topic.content
    return {
      title: name,
      path: '/pages/index/index?fromInvite=1&type=1&push_userid=' + wx.getStorageSync('userId') + '&forwardUrl='+encodeURIComponent('/pages/buyou/commentdetail/commentdetail?id='+topic.id),
      imageUrl: topic.img_src?topic.img_src[0]:'https://dankebsh.oss-cn-shanghai.aliyuncs.com/dkstep-img/invitation_homepage.png'
    }
  },
  loadTopicInfo () {
    let that = this
    utils.request(api.BUYOU_TOPICCOMMENT,{
      communityId: that.data.topicId,
      page: 1,
      size: 10
    }).then(function(res){
      if(res.errno === 0){
        if(res.data.communityVo.img_src){
          res.data.communityVo.img_src = res.data.communityVo.img_src.split(',')
        }
        that.setData({
          topic: res.data.communityVo
        })
      }
    })
  },
  backTo () {
    wx.switchTab({
      url: '/pages/buyou/index'
    })
  }
})