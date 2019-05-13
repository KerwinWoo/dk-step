// pages/service/questions/questions.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questions: [{
      q: '什么是蛋壳步数换？',
      a: '蛋壳步数换，让你的运动不再浪费，可累积步数兑换各种奖励，让健康和惊喜伴你左右，一起走一起来！',
      status: 'open'
    },{
      q: '怎么兑换商品？',
      a: '蛋壳步数换，让你的运动不再浪费，可累积步数兑换各种奖励，让健康和惊喜伴你左右，一起走一起来！',
      status: 'close'
    },{
      q: '怎么组团？',
      a: '蛋壳步数换，让你的运动不再浪费，可累积步数兑换各种奖励，让健康和惊喜伴你左右，一起走一起来！',
      status: 'close'
    },{
      q: '怎么参加挑战赛？',
      a: '蛋壳步数换，让你的运动不再浪费，可累积步数兑换各种奖励，让健康和惊喜伴你左右，一起走一起来！',
      status: 'close'
    },{
      q: '什么是好友加成？',
      a: '蛋壳步数换，让你的运动不再浪费，可累积步数兑换各种奖励，让健康和惊喜伴你左右，一起走一起来！',
      status: 'close'
    }]
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
  toggle (e) {
    let status = e.currentTarget.dataset.status
    let index = e.currentTarget.dataset.index
    let currentStatus = this.data.questions[index].status
    this.data.questions[index].status = (currentStatus == 'open') ? 'close' : 'open'
    this.setData({
      questions: this.data.questions
    })
  }
})