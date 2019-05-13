// pages/buyou/index.js
const app = getApp()
const utils = require('../../utils/util.js')
const api = require('../../api/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topicList: [{
      id:1,
      name: '',
      photo: '',
    },{
      id:2,
      name: '',
      photo: '',
    },{
      id:3,
      name: '',
      photo: '',
    }],
    topicDataList: [{
      id:1,
      name: '蛋壳',
      photo: '',
      topicName: '蛋壳步数换',
      content: '在我的生命中，运动就像温柔地吹拂着我，带我走出自我的暖暖春风；我最难忘、最刻骨铭心的记忆都和它相关；因为我爱运动，而运动是我对待度。',
      imglist: [],
      addr:'',
      time: ''
    },{
      id:2,
      name: '蛋壳',
      photo: '',
      topicName: '蛋壳步数换',
      content: '在我的生命中，运动就像温柔地吹拂着我，带我走出自我的暖暖春风；我最难忘、最刻骨铭心的记忆都和它相关；因为我爱运动，而运动是我对待度。',
      imglist: [],
      addr:'',
      time: ''
    }],
    topicDataLoaded: false,
    topicDataList_ME: [{
      id:1,
      name: '蛋壳',
      photo: '',
      topicName: '蛋壳步数换',
      content: '在我的生命中，运动就像温柔地吹拂着我，带我走出自我的暖暖春风；我最难忘、最刻骨铭心的记忆都和它相关；因为我爱运动，而运动是我对待度。',
      imglist: [],
      addr:'',
      time: ''
    }],
    topicDataMELoaded: false,
    topicType : 'recomment',
    showTab1Skeleton: true,
    showTab2Skeleton: false,
    sliderWidth: 864,
    tabListToTop: 0,
    tablistFixed: false,
    timer: null,
    releaseBtnShow: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    // 刷新组件
    that.refreshView = that.selectComponent("#refreshView")
    that.loadTopicNameData()
    that.loadTopicData()

    wx.createSelectorQuery().select('#tablist').boundingClientRect(function (rect) {
      that.setData({
        tabListToTop: rect.top - 64
      })
    }).exec()
  },
  
  //触摸开始
  handletouchstart: function (event) {
    this.refreshView.handletouchstart(event)
  },
  //触摸移动
  handletouchmove: function (event) {
    let that = this
    that.refreshView.handletouchmove(event)
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
    
    let scrollTop = event.scrollTop
    if (scrollTop >= that.data.tabListToTop) {
      if(!that.data.tablistFixed){
        that.setData({
          tablistFixed: true
        })
      }
    }
    else {
      if(that.data.tablistFixed){
        that.setData({
          tablistFixed: false
        })
      }
    }
    
    if(that.data.releaseBtnShow){
      console.log(9090909090)
      that.setData({
        releaseBtnShow: false
      },() => {
        setTimeout(function(){
          that.setData({
            releaseBtnShow: true
          })
        }, 1500)
      })
    }
  },
  onPullDownRefresh:function(){
    let that = this
    setTimeout(function(){
      that.refreshView.stopPullRefresh()
      that.loadTopicNameData()
      that.loadTopicData()
    },1500)
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
  backTo (e) {
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  loadTopicNameData () {
    let that = this
    utils.request(api.BUYOU_QUERY_COMMUNITYLIST,{
      page: 1,
      size:10,
      sort: '',
      order: ''
    }).then(function (res) {
      that.setData({
        sliderWidth: res.data.data.length * 288,
        topicList: res.data.data
      })
    })
  },
  loadTopicData () {
    let that = this
    if(!that.data.topicDataLoaded){
      setTimeout(function(){
        let data = [{
          id:1,
          name: '小兔子',
          photo: 'https://img11.360buyimg.com/mobilecms/s350x250_jfs/t1/29706/37/12103/49766/5c959c6aEa3db99f9/6be14b8a384d545c.jpg',
          topicName: '我的国名女神',
          content: '在我的生命中，运动就像温柔地吹拂着我，带我走出自我的暖暖春风；我最难忘、最刻骨铭心的记忆都和它相关；因为我爱运动，而运动是我对待度。',
          imglist: ['https://dkstep.oss-cn-beijing.aliyuncs.com/dkstep-img/1.jpg',
          'https://dkstep.oss-cn-beijing.aliyuncs.com/dkstep-img/2.jpg',
          'https://dkstep.oss-cn-beijing.aliyuncs.com/dkstep-img/3.jpg',
          'https://dkstep.oss-cn-beijing.aliyuncs.com/dkstep-img/4.jpg',
          'https://dkstep.oss-cn-beijing.aliyuncs.com/dkstep-img/4.jpg',
          'https://dkstep.oss-cn-beijing.aliyuncs.com/dkstep-img/4.jpg',
          'https://dkstep.oss-cn-beijing.aliyuncs.com/dkstep-img/4.jpg',
          'https://dkstep.oss-cn-beijing.aliyuncs.com/dkstep-img/4.jpg',
          'https://dkstep.oss-cn-beijing.aliyuncs.com/dkstep-img/4.jpg'],
          addr:'武汉市江夏区',
          time: '20分钟前',
          egg: 22,
          comment: 290,
          share: 88,
          collect: 99,
          giveEgg: false
        },{
          id:2,
          name: '小狮子',
          photo: 'https://img11.360buyimg.com/mobilecms/s350x250_jfs/t1/20792/4/11775/95970/5c92f600Ea87790ec/6c9bf6b3150c0e4b.jpg',
          topicName: '我家有萌宠',
          content: '在我的生命中，运动就像温柔地吹拂着我，带我走出自我的暖暖春风；我最难忘、最刻骨铭心的记忆都和它相关；因为我爱运动，而运动是我对待度。',
          imglist: ['https://img11.360buyimg.com/mobilecms/s140x140_jfs/t1/16081/33/1514/306673/5c131c81E0ba11d32/de25680f996e074d.jpg',
          'https://img11.360buyimg.com/mobilecms/s140x140_jfs/t1/32519/38/9157/134003/5ca451a9E6f621a18/f822bccbe17a9950.jpg',
          'https://img14.360buyimg.com/n0/jfs/t1/14170/12/431/175747/5c09dac1E48482df7/8c80520525c5daa9.jpg'],
          addr:'武汉市江夏区',
          time: '20分钟前',
          egg: 22,
          comment: 290,
          share: 88,
          collect: 99,
          giveEgg: false
        },{
          id:3,
          name: '小猴子',
          photo: 'https://img11.360buyimg.com/mobilecms/s350x250_jfs/t1/30170/32/6694/46668/5c9077e6E52f81e28/4bc2f738ed6b4a7e.jpg',
          topicName: '我家有萌宠',
          content: '在我的生命中，运动就像温柔地吹拂着我，带我走出自我的暖暖春风；我最难忘、最刻骨铭心的记忆都和它相关；因为我爱运动，而运动是我对待度。',
          imglist: ['https://img11.360buyimg.com/mobilecms/s140x140_jfs/t1/16081/33/1514/306673/5c131c81E0ba11d32/de25680f996e074d.jpg',
          'https://img11.360buyimg.com/mobilecms/s140x140_jfs/t1/32519/38/9157/134003/5ca451a9E6f621a18/f822bccbe17a9950.jpg',
          'https://img14.360buyimg.com/n0/jfs/t1/14170/12/431/175747/5c09dac1E48482df7/8c80520525c5daa9.jpg'],
          addr:'武汉市江夏区',
          time: '20分钟前',
          egg: 22,
          comment: 290,
          share: 88,
          collect: 99,
          giveEgg: true
        }]
        that.setData({
          topicDataLoaded: true,
          topicDataList: data,
          showTab1Skeleton: false
        })
      }, 1000)
    }
  },
  loadMyTopicData () {
    let that = this
    if(!that.data.topicDataMELoaded){
      setTimeout(function(){
        let data = [{
          id:1,
          name: '小狗子',
          photo: '../../image/topic01.jpg',
          topicName: '我的国名女神',
          content: '在我的生命中，运动就像温柔地吹拂着我，带我走出自我的暖暖春风；我最难忘、最刻骨铭心的记忆都和它相关；因为我爱运动，而运动是我对待度。',
          imglist: ['https://img11.360buyimg.com/mobilecms/s140x140_jfs/t1/16081/33/1514/306673/5c131c81E0ba11d32/de25680f996e074d.jpg',
          'https://img11.360buyimg.com/mobilecms/s140x140_jfs/t1/32519/38/9157/134003/5ca451a9E6f621a18/f822bccbe17a9950.jpg',
          'https://img14.360buyimg.com/n0/jfs/t1/14170/12/431/175747/5c09dac1E48482df7/8c80520525c5daa9.jpg'],
          addr:'武汉市江夏区',
          time: '20分钟前',
          egg: 22,
          comment: 290,
          share: 88,
          collect: 99,
          giveEgg: false
        }]
        that.setData({
          topicDataMELoaded: true,
          topicDataList_ME: [],
          showTab2Skeleton: false
        })
      }, 1000)
    }
  },
  giveEgg (e) {
    const data = e.currentTarget.dataset
    let that = this
    let itemData = that.data.topicDataList[data.parentindex]
    if(!itemData.giveEgg){
      that.toast.showToast('打赏成功，已将您的1枚蛋壳打赏给TA')
      that.data.topicDataList[data.parentindex].giveEgg = true
      that.setData({
        topicDataList: that.data.topicDataList
      })
    }
  },
  changeType (e) {
    const type = e.currentTarget.dataset.type
    this.setData({
      topicType: type,
      showTab1Skeleton: (type == 'recomment' && !this.data.topicDataLoaded) ? true : false,
      showTab2Skeleton: (type == 'me' && !this.data.topicDataMELoaded) ? true : false
    })
    if(type == 'recomment'){
      this.loadTopicData()
    }
    else if(type == 'me'){
      this.loadMyTopicData()
    }
  },
  previewTopicImg (e) {
    const data = e.currentTarget.dataset
    let that = this
    wx.previewImage({
      current: data.current,
      urls: that.data.topicDataList[data.parentindex].imglist
    })
  },
  throttle(method,delay,duration){
    let that = this
    let begin = new Date()
    return function(){                
      const context = this
      const args=arguments
      const current = new Date()        
      clearTimeout(that.timer);
      if(current - begin >= duration){
        method.apply(context,args);
        begin = current;
      }else{
        that.timer = setTimeout(function(){
          method.apply(context,args);
        },delay);
      }
    }
  },
  doComment () {
    wx.navigateTo({
    	url: '/pages/buyou/commentdetail/commentdetail'
    })
  }
})