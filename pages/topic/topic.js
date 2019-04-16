// pages/topic/topic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topicDataList: [{
      id: 1,
      name: '蛋壳',
      photo: '',
      topicName: '蛋壳步数换',
      content: '在我的生命中，运动就像温柔地吹拂着我，带我走出自我的暖暖春风；我最难忘、最刻骨铭心的记忆都和它相关；因为我爱运动，而运动是我对待度。',
      imglist: [],
      addr: '',
      time: ''
    }, {
      id: 2,
      name: '蛋壳',
      photo: '',
      topicName: '蛋壳步数换',
      content: '在我的生命中，运动就像温柔地吹拂着我，带我走出自我的暖暖春风；我最难忘、最刻骨铭心的记忆都和它相关；因为我爱运动，而运动是我对待度。',
      imglist: [],
      addr: '',
      time: ''
    }],
    showSkeleton: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    
    that.setData({
      title: options.title
    })
    // 刷新组件
    that.refreshView = that.selectComponent("#refreshView")
    that.loadTopicData()

  },

  //触摸开始
  handletouchstart: function (event) {
    this.refreshView.handletouchstart(event)
  },
  //触摸移动
  handletouchmove: function (event) {
    this.refreshView.handletouchmove(event)
  },
  //触摸结束
  handletouchend: function (event) {
    this.refreshView.handletouchend(event)
  },
  //触摸取消
  handletouchcancel: function (event) {
    this.refreshView.handletouchcancel(event)
  },
  //页面滚动
  onPageScroll: function (event) {
    let that = this
    that.refreshView.onPageScroll(event)
  },
  onPullDownRefresh: function () {
    let that = this
    setTimeout(function () {
      that.refreshView.stopPullRefresh()
      that.loadTopicData()
    }, 1500)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.toast = this.selectComponent("#toast");
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  backTo() {
    wx.navigateBack()
  },
  loadTopicData() {
    let that = this
    setTimeout(function () {
      let data = [{
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
      }, {
        id: 2,
        name: '小狮子',
        photo: 'https://img30.360buyimg.com/babel/s350x180_jfs/t22660/197/997998956/85092/652504db/5b4c45bfNcfd19212.jpg',
        topicName: '我家有萌宠',
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
      }, {
        id: 3,
        name: '小猴子',
        photo: 'https://img30.360buyimg.com/babel/s350x180_jfs/t22660/197/997998956/85092/652504db/5b4c45bfNcfd19212.jpg',
        topicName: '我家有萌宠',
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
        giveEgg: true
      }]
      that.setData({
        topicDataList: data,
        showSkeleton: false
      })
    }, 1000)
  },
  giveEgg(e) {
    const data = e.currentTarget.dataset
    let that = this
    let itemData = that.data.topicDataList[data.parentindex]
    if (!itemData.giveEgg) {
      that.toast.showToast('打赏成功，已将您的1枚蛋壳打赏给TA')
      that.data.topicDataList[data.parentindex].giveEgg = true
      that.setData({
        topicDataList: that.data.topicDataList
      })
    }
  },
  previewTopicImg(e) {
    const data = e.currentTarget.dataset
    let that = this
    wx.previewImage({
      current: data.current,
      urls: that.data.topicDataList[data.parentindex].imglist
    })
  }
})