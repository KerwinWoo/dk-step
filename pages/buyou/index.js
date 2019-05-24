// pages/buyou/index.js
const app = getApp()
const utils = require('../../utils/util.js')
const api = require('../../api/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topicList: [],
    topicDataList: [{
      attention_status:0,
      avatar:"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJEQ6FkGMjPpibNCOyFEPhia8SF7QOzEjVibJotaHiaRszgtklNCFF3dhw64WKeq4KyvviaokcJTNSiafOw/132",
      collection_num:0,
      collection_status:0,
      comment_num:0,
      content:"就睡觉睡觉睡觉睡觉睡觉睡觉开始",
      create_time:"2019-05-16 10:45:11",
      create_user_id:38,
      eshell_num:0,
      forward_num:0,
      id:22,
      img_src:[],
      location:"",
      nickname:"Mr.Dreamer",
      reward_status:1,
      topic_tag:"话题002",
      update_time:1557974711000
    },{
      attention_status:0,
      avatar:"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJEQ6FkGMjPpibNCOyFEPhia8SF7QOzEjVibJotaHiaRszgtklNCFF3dhw64WKeq4KyvviaokcJTNSiafOw/132",
      collection_num:0,
      collection_status:0,
      comment_num:0,
      content:"就睡觉睡觉睡觉睡觉睡觉睡觉开始",
      create_time:"2019-05-16 10:45:11",
      create_user_id:38,
      eshell_num:0,
      forward_num:0,
      id:22,
      img_src:[],
      nickname:"Mr.Dreamer",
      reward_status:1,
      topic_tag:"话题002",
      update_time:1557974711000
    }],
    topicDataLoaded: false,
    topicDataFirstLoad:true,
    showTab1Skeleton: true,
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
    showTab2Skeleton: false,
    sliderWidth: 864,
    tabListToTop: 0,
    tablistFixed: false,
    timer: null,
    releaseBtnShow: true,
    currentTopic: '',
    tuijianCurpage: 1,
    toastShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    // 刷新组件
    that.refreshView = that.selectComponent("#refreshView")
    that.loadTopicNameData()

    wx.createSelectorQuery().select('#tablist').boundingClientRect(function (rect) {
      that.setData({
        tabListToTop: rect.top - 64
      })
    }).exec()
  },
  onShow () {
    let that = this
    that.loadTopicData()
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
    console.log('到底了')
    let type = this.data.topicType
    if(type == 'recomment'){
      this.data.topicDataLoaded = false
      this.data.tuijianCurpage++
      this.loadTopicData()
    }
    else if(type == 'me'){
      this.loadMyTopicData()
    }
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
    }).then(function (res) {
      res.data.map(function(value, index){
        let obj = JSON.parse(value.remark)
        value.comment = obj.TagInfo
        value.imgsrc = obj.backdropPic
      })
      console.log('topicname data', res.data)
      that.setData({
        sliderWidth: res.data.length * 288,
        topicList: res.data
      })
    })
  },
  loadTopicData () {
    let that = this
    if(!that.data.topicDataLoaded){
      utils.request(api.BUYOU_RECOMMENT_TOPICLIST,{
        topicTag: that.data.currentTopic,
        page: that.data.tuijianCurpage,
        size: 10
      }).then(function(res){
        let tmpTopicData = res.data.data.map(function(value,index){
          if(value.img_src){
            value.img_src = value.img_src.split(',')
          }
          if(value.img_src.length == 1){
            value.imgmode = 'aspectFill'
          }
          else if(value.img_src.length == 4){
            value.type3 = ' type3'
          }
          else{
            value.imgmode = 'aspectFill'
          }
          if(value.create_time){
            value.create_time = utils.formatTime(new Date(value.create_time))
          }
          return value
        })
        if(that.data.topicDataFirstLoad){
          that.data.topicDataList = tmpTopicData
          that.data.topicDataFirstLoad = false
        }
        else{
          that.data.topicDataList = that.data.topicDataList.concat(tmpTopicData)
        }
        that.setData({
          topicDataLoaded: true,
          topicDataList: that.data.topicDataList,
          showTab1Skeleton: false
        })
        console.log('topicdata', tmpTopicData)
      })
    }
  },
  loadMyTopicData () {
    let that = this
    if(!that.data.topicDataMELoaded){
      utils.request(api.BUYOU_ATTENTIONUSER_LIST,{
      }).then(function(res){
        let topicData = res.data.data.map(function(value,index){
          if(value.img_src){
            value.img_src = value.img_src.split(',')
          }
          if(value.create_time){
            value.create_time = utils.formatTime(new Date(value.create_time))
          }
          return value
        })
        that.setData({
         topicDataMELoaded: true,
         topicDataList_ME: topicData,
         showTab2Skeleton: false
       })
        console.log('mytopicdata', topicData)
      })
    }
  },
  giveEgg (e) {
   /* if(true){
      this.toast.showToast('收藏成功')
      return
    } */
    const data = e.currentTarget.dataset
    let that = this
    let itemData = that.data.topicDataList[data.parentindex]
    if(itemData.reward_status == 0){
      utils.request(api.BUYOU_DASHANG,{
        communityId: data.id,
        targetUserId: data.uid
      }).then(function(res){
        if(res.errno == 0){
          that.toast.showToast('打赏成功，已将您的2枚蛋壳打赏给TA')
          that.data.topicDataList[data.parentindex].reward_status = 1
          that.data.topicDataList[data.parentindex].eshell_num = that.data.topicDataList[data.parentindex].eshell_num + 2
          that.setData({
            topicDataList: that.data.topicDataList
          })
        }
        else{
          wx.showToast({
            title: res.errmsg,
            icon: 'none',
            duration: 2000
          })
        }
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
      urls: that.data.topicDataList[data.parentindex].img_src
    })
  },
  shouCang (e) {
    let that = this
    const data = e.currentTarget.dataset
    utils.request(api.BUYOU_SHOUCANGTOPIC,{
      communityId: data.id
    }).then(function(res){
      if(res.errno == 0){
        that.toast.showToast('收藏成功')
        that.data.topicDataList[data.parentindex].shoucang = true
        that.setData({
          topicDataList: that.data.topicDataList
        })
      }
      else{
        wx.showToast({
          title: res.errmsg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  guanzhu (e) {
    let that = this
    const data = e.currentTarget.dataset
    utils.request(api.USER_ATTENTION, {
      attentionUserId: data.uid
    }).then(function(res){
      if(res.errno == 0){
        that.toast.showToast('关注成功')
        that.data.topicDataList[data.parentindex].attention_status = 1
        that.setData({
          topicDataList: that.data.topicDataList
        })
      }
      else{
        wx.showToast({
          title: res.errmsg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  }
})