// pages/task/task.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tasklistData: [{
      id: 1,
      name: '关注公众号',
      desc: '随时随地获得最新活动',
      step: 50,
      pic: 'https://dkstep.oss-cn-beijing.aliyuncs.com/dkstep-img/task_gzh.png'
    },{
      id: 1,
      name: '每日分享',
      desc: '生成运动海报并转发至朋友圈',
      step: 50,
      pic: 'https://dkstep.oss-cn-beijing.aliyuncs.com/dkstep-img/task_share.png'
    },{
      id: 1,
      name: '邀请好友',
      desc: '分享给亲朋好友',
      step: 50,
      pic: 'https://dkstep.oss-cn-beijing.aliyuncs.com/dkstep-img/task_friend.png'
    },{
      id: 1,
      name: '幸运抽奖',
      desc: '幸运之外可额外获得步数',
      step: 50,
      pic: 'https://dkstep.oss-cn-beijing.aliyuncs.com/dkstep-img/task_gift.png'
    },{
      id: 1,
      name: '浏览商品',
      desc: '每日浏览商品一分钟',
      step: 50,
      pic: 'https://dkstep.oss-cn-beijing.aliyuncs.com/dkstep-img/task_view.png'
    },{
      id: 1,
      name: '创建团队',
      desc: '邀请好友一起创建走路团队',
      step: 50,
      pic: 'https://dkstep.oss-cn-beijing.aliyuncs.com/dkstep-img/task_team.png'
    },{
      id: 1,
      name: '发布话题',
      desc: '去步友广场发布话题',
      step: 50,
      pic: 'https://dkstep.oss-cn-beijing.aliyuncs.com/dkstep-img/task_huati.png'
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
  backTo (e) {
    wx.switchTab({
    	url: '/pages/index/index'
    })
  }
})