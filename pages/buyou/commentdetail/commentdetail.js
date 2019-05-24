// pages/buyou/commentdetail/commentdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTopicId: '',
    topic: {
      id: 1,
      name: '小兔子',
      photo: 'https://img30.360buyimg.com/babel/s350x180_jfs/t22660/197/997998956/85092/652504db/5b4c45bfNcfd19212.jpg',
      topicName: '我的国名女神',
      content: '在我的生命中，运动就像温柔地吹拂着我，带我走出自我的暖暖春风；我最难忘、最刻骨铭心的记忆都和它相关；因为我爱运动，而运动是我对待度。',
      imglist: ['https://img11.360buyimg.com/mobilecms/s140x140_jfs/t1/16081/33/1514/306673/5c131c81E0ba11d32/de25680f996e074d.jpg',
        'https://img11.360buyimg.com/mobilecms/s140x140_jfs/t1/32519/38/9157/134003/5ca451a9E6f621a18/f822bccbe17a9950.jpg',
        'https://img14.360buyimg.com/n0/jfs/t1/14170/12/431/175747/5c09dac1E48482df7/8c80520525c5daa9.jpg'],
      addr: '武汉市江夏区',
      time: '20分钟前',
      egg: 22,
      comment: 290,
      share: 88,
      collect: 99,
      giveEgg: false
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      currentTopicId: options.id
    })
    this.loadTopicInfo()
  },
  
  loadTopicInfo () {
    let that = this
    const app = getApp()
    const utils = require('../../../utils/util.js')
    const api = require('../../../api/api.js')
    utils.request(api.BUYOU_TOPICCOMMENT,{
      communityId: that.data.currentTopicId,
      page: 1,
      size: 10
    }).then(function(res){
      debugger;
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

  },
  backTo () {
    wx.navigateBack()
  },
  doComment () {
    wx.navigateTo({
    	url: '/pages/buyou/comment/comment'
    })
  }
})