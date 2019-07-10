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
      avatar:"",
      collection_num:0,
      collection_status:0,
      comment_num:0,
      content:"蛋壳步数换",
      create_time:"2019-05-16 10:45:11",
      create_user_id:38,
      eshell_num:0,
      forward_num:0,
      id:22,
      img_src:[],
      location:"",
      nickname:"蛋壳步数换",
      reward_status:1,
      topic_tag:"蛋壳步数换",
      update_time:1557974711000
    },{
      attention_status:0,
      avatar:"",
      collection_num:0,
      collection_status:0,
      comment_num:0,
      content:"蛋壳步数换",
      create_time:"2019-05-16 10:45:11",
      create_user_id:38,
      eshell_num:0,
      forward_num:0,
      id:22,
      img_src:[],
      nickname:"蛋壳步数换",
      reward_status:1,
      topic_tag:"蛋壳步数换",
      update_time:1557974711000
    }],
    topicDataLoaded: false,
    topicDataLoaded_ME: false,
    topicDataFirstLoad:true,
    topicDataFirstLoad_ME:true,
    topicNameFirstLoad:true,
    showTab1Skeleton: true,
    showTab2Skeleton: false,
    topicDataList_ME: [{
      id:1,
      name: '蛋壳步数换',
      photo: '',
      topicName: '蛋壳步数换',
      content: '蛋壳步数换',
      imglist: [],
      addr:'',
      time: ''
    }],
    topicType : 'recomment',
    sliderWidth: 864,
    tabListToTop: 0,
    tablistFixed: false,
    timer: null,
    releaseBtnShow: true,
    currentTopic: '',
    tuijianCurpage: 1,
    guanzhuCurpage: 1,
    toastShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      userId: wx.getStorageSync('userId'),
      navHeight: app.globalData.navHeight,
      fixedtop: app.globalData.navHeight
    })
    
    this.toast = this.selectComponent(".dktoast")
    this.refreshView = this.selectComponent(".refreshView")
    wx.createSelectorQuery().select('#tablist').boundingClientRect(function (rect) {
      that.setData({
        tabListToTop: rect.top
      })
    }).exec()
  },
  onShow () {
     if(this.data.previewing){
      this.data.previewing = false
    }
    else{
      this.loadMessageNum()
    }
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
    /* that.data.tuijianCurpage = 1
    that.data.guanzhuCurpage = 1
    that.data.topicDataLoaded = false
    that.data.topicDataLoaded_ME = false
    that.loadTopicNameData()
    that.loadTopicData()
    that.loadMyTopicData() */
    that.refreshPage('innerrefresh')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.refreshPage()
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
      this.loadTopicData()
    }
    else if(type == 'me'){
      this.data.topicDataLoaded_ME = false
      this.loadMyTopicData()
    }
  },
  refreshPage (fromParam) {
    let that = this
    that.setData({
      topicList: [{
        id: 1,
        name: '蛋壳步数换',
        imgsrc: ''
      },{
        id: 2,
        name: '蛋壳步数换',
        imgsrc: ''
      },{
        id: 3,
        name: '蛋壳步数换',
        imgsrc: ''
      }],
      topicDataList: (fromParam == 'innerrefresh') ? []:[{
        attention_status:0,
        avatar:"",
        collection_num:0,
        collection_status:0,
        comment_num:0,
        content:"蛋壳步数换",
        create_time:"2019-05-16 10:45:11",
        create_user_id:38,
        eshell_num:0,
        forward_num:0,
        id:22,
        img_src:[],
        location:"",
        nickname:"蛋壳步数换",
        reward_status:1,
        topic_tag:"蛋壳步数换",
        update_time:1557974711000
      },{
        attention_status:0,
        avatar:"",
        collection_num:0,
        collection_status:0,
        comment_num:0,
        content:"蛋壳步数换",
        create_time:"2019-05-16 10:45:11",
        create_user_id:38,
        eshell_num:0,
        forward_num:0,
        id:22,
        img_src:[],
        nickname:"蛋壳步数换",
        reward_status:1,
        topic_tag:"蛋壳步数换",
        update_time:1557974711000
      }],
      topicDataLoaded: false,
      topicDataLoaded_ME: false,
      topicDataFirstLoad:true,
      topicDataFirstLoad_ME:true,
      showTab1Skeleton: (fromParam == 'innerrefresh') ? false : true,
      showTab2Skeleton: false,
      topicDataList_ME: (fromParam == 'innerrefresh') ? []:[{
        id:1,
        name: '蛋壳步数换',
        photo: '',
        topicName: '蛋壳步数换',
        content: '蛋壳步数换',
        imglist: [],
        addr:'',
        time: ''
      }],
      topicType : 'recomment',
      currentTopic: '',
      tuijianCurpage: 1,
      guanzhuCurpage: 1
    })
    that.loadTopicNameData()
    that.loadTopicData()
    //that.loadMyTopicData()
    that.loadMessageNum()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (option) {
    if(option.from == 'menu'){
      return {
        title: '要想富，先走路，走路也能成首富',
        path: '/pages/index/index?fromInvite=1&type=1&push_userid=' + wx.getStorageSync('userId'),
        imageUrl: 'https://dankebsh.oss-cn-shanghai.aliyuncs.com/dkstep-img/invitation_team.png'
      }
    }
    else{
      let topicIndex = option.target.dataset.topicindex
      let topic = null
      this.data.previewing = true
      if(this.data.topicType == 'recomment'){
        topic = this.data.topicDataList[topicIndex]
      }
      else if(this.data.topicType == 'me'){
        topic = this.data.topicDataList_ME[topicIndex]
      }
      if(this.data.userId != topic.create_user_id){
        this.forward(topic.id, topicIndex)
      }
      let name = (topic.tag_name?('#'+topic.tag_name+'#'):'') + topic.content
      return {
        title: name,
        path: '/pages/index/index?fromInvite=1&type=1&push_userid=' + wx.getStorageSync('userId') + '&forwardUrl='+encodeURIComponent('/pages/buyou/commentdetail/commentdetail?id='+topic.id),
        imageUrl: topic.img_src?topic.img_src[0]:'https://dankebsh.oss-cn-shanghai.aliyuncs.com/dkstep-img/invitation_homepage.png'
      }
    }
  },
  forward (id, topicIndex) {
    let that = this
    utils.request(api.TOPIC_FORWARD,{
      communityId:id
    }).then(function(res){
      if(res.errno === 0){
        if(that.data.topicType == 'recomment'){
          that.data.topicDataList[topicIndex].forward_num++
          that.setData({
            topicDataList: that.data.topicDataList
          })
        }
        else if(that.data.topicType == 'me'){
          that.data.topicDataList_ME[topicIndex].forward_num++
          that.setData({
            topicDataList_ME: that.data.topicDataList_ME
          })
        }
      }
    })
  },
  loadTopicNameData () {
    let that = this
    utils.request(api.BUYOU_QUERY_COMMUNITYLIST,{
    }).then(function (res) {
      that.data.topicNameFirstLoad = false
      res.data.map(function(value, index){
        let obj = JSON.parse(value.remark)
        value.comment = obj.TagInfo
        value.imgsrc = obj.backdropPic
        value.award = (obj.isAward && obj.isAward == 1)?true:false
      })
      that.setData({
        sliderWidth: res.data.length * 288,
        topicList: res.data
      })
    })
  },
  loadTopicData () {
    let that = this
    
    if(!that.data.topicDataLoaded){
      wx.showLoading()
      utils.request(api.BUYOU_RECOMMENT_TOPICLIST,{
        topicTag: that.data.currentTopic,
        page: that.data.tuijianCurpage,
        size: 10
      }).then(function(res){
        that.refreshView.stopPullRefresh()
        wx.hideLoading()
        if(res.errno === 0){
          let tmpTopicData = res.data.communityList.data.map(function(value,index){
            if(value.img_src){
              value.img_src = value.img_src.split(',')
            }
            if(value.img_src.length == 4){
              value.type3 = ' type3'
            }
            value.imgmode = 'aspectFill'
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
          if(res.data.communityList.data && res.data.communityList.data.length != 0){
            that.data.tuijianCurpage++
          }
          else{
            utils.nomoreData()
          }
        }
      })
    }
  },
  loadMyTopicData () {
    let that = this
    wx.showLoading()
    utils.request(api.BUYOU_ATTENTIONUSER_LIST,{
      topicTag: that.data.currentTopic,
      page: that.data.guanzhuCurpage,
      size: 10
    }).then(function(res){
      wx.hideLoading()
      if(res.errno === 0){
        let tmpTopicData = res.data.data.map(function(value,index){
          if(value.img_src){
            value.img_src = value.img_src.split(',')
          }
          if(value.img_src.length == 4){
            value.type3 = ' type3'
          }
          value.imgmode = 'aspectFill'
          if(value.create_time){
            value.create_time = utils.formatTime(new Date(value.create_time))
          }
          return value
        })
        if(that.data.topicDataFirstLoad_ME){
          that.data.topicDataList_ME = tmpTopicData
          that.data.topicDataFirstLoad_ME = false
        }
        else{
          that.data.topicDataList_ME = that.data.topicDataList_ME.concat(tmpTopicData)
        }
        that.setData({
          topicDataLoaded_ME: true,
          topicDataList_ME: that.data.topicDataList_ME,
          showTab2Skeleton: false
        })
        if(res.data.data && res.data.data.length != 0){
          that.data.guanzhuCurpage++
        }
        else{
          if(that.data.guanzhuCurpage != 1){
            utils.nomoreData()
          }
        }
      }
    })
  },
  giveEgg (e) {
   /* if(true){
      this.toast.showToast('收藏成功')
      return
    } */
    const data = e.currentTarget.dataset
    let that = this
    if(data.uid == that.data.userId){
      wx.showToast({
        title:'不能打赏自己哦~',
        icon: 'none',
        duration: 2000
      })
      return
    }
    let list = (that.data.topicType == 'recomment') ? that.data.topicDataList: that.data.topicDataList_ME
    let itemData = list[data.parentindex]
    if(itemData.reward_status == 0){
      utils.request(api.BUYOU_DASHANG,{
        communityId: data.id,
        targetUserId: data.uid
      }).then(function(res){
        if(res.errno == 0){
          that.toast.showToast('打赏成功，已将你的2枚蛋壳打赏给TA')
          list[data.parentindex].reward_status = 1
          list[data.parentindex].eshell_num = list[data.parentindex].eshell_num + 2
          if(that.data.topicType == 'recomment'){
            that.setData({
              topicDataList: list
            })
          }
          else{
            that.setData({
              topicDataList_ME: list
            })
          }
        }
        else{
          utils.showErrorToast(res.errmsg?res.errmsg:res.msg)
        }
      })
    }
  },
  changeType (e) {
    const type = e.currentTarget.dataset.type
    this.setData({
      topicType: type,
      showTab1Skeleton: (type == 'recomment' && !this.data.topicDataLoaded) ? true : false,
      //showTab2Skeleton: (type == 'me' && !this.data.topicDataLoaded_ME) ? true : false
    })
    if(type == 'recomment'){
      this.loadTopicData()
    }
    else if(type == 'me'){
      wx.pageScrollTo({
        scrollTop:0,
        duration:0
      })
      this.data.topicDataList_ME = []
      this.data.guanzhuCurpage = 1
      this.loadMyTopicData()
    }
  },
  previewTopicImg (e) {
    const data = e.currentTarget.dataset
    let that = this
    that.data.previewing = true
    if(that.data.topicType == 'recomment'){
      wx.previewImage({
        current: data.current,
        urls: that.data.topicDataList[data.parentindex].img_src
      })
    }
    else if(that.data.topicType == 'me'){
      wx.previewImage({
        current: data.current,
        urls: that.data.topicDataList_ME[data.parentindex].img_src
      })
    }
  },
  shouCang (e) {
    let that = this
    const data = e.currentTarget.dataset
    let list = (that.data.topicType == 'recomment') ? that.data.topicDataList: that.data.topicDataList_ME
    let currentTopic = list[data.parentindex]
    let colStatus = currentTopic.collection_status
    if(colStatus == 1){
      //取消收藏
      utils.request(api.BUYOU_SHOUCANGTOPIC_CANCEL,{
        communityId: data.id
      }).then(function(res){
        if(res.errno == 0){
          that.toast.showToast('已取消收藏')
          currentTopic.collection_status = 0
          currentTopic.collection_num--
          list[data.parentindex] = currentTopic
          if(that.data.topicType == 'recomment'){
            that.setData({
              topicDataList: list
            })
          }
          else{
            that.setData({
              topicDataList_ME: list
            })
          }
        }
        else{
          utils.showErrorToast(res.errmsg?res.errmsg:res.msg)
        }
      })
    }
    else if(colStatus == 0){
      //收藏
      utils.request(api.BUYOU_SHOUCANGTOPIC,{
        communityId: data.id
      }).then(function(res){
        if(res.errno == 0){
          that.toast.showToast('收藏成功')
          currentTopic.collection_status = 1
          currentTopic.collection_num++
          list[data.parentindex] = currentTopic
          if(that.data.topicType == 'recomment'){
            that.setData({
              topicDataList: list
            })
          }
          else{
            that.setData({
              topicDataList_ME: list
            })
          }
        }
        else{
          utils.showErrorToast(res.errmsg?res.errmsg:res.msg)
        }
      })
    }
  },
  guanzhu (e) {
    let that = this
    const data = e.currentTarget.dataset
    let status = that.data.topicDataList[data.parentindex].attention_status
    if(status == 1){
      utils.request(api.USER_ATTENTION_CANCEL, {
        attentionUserId: data.uid
      }).then(function(res){
        if(res.errno == 0){
          that.toast.showToast('已取消关注')
          that.data.topicDataList.map(function(value, index){
            if(value.create_user_id == data.uid){
              value.attention_status = 0
            }
          })
  /*        that.data.topicDataList_ME.map(function(value, index){
            if(value.create_user_id == data.uid){
              value.attention_status = 0
            }
          }) */
          that.setData({
            topicDataList: that.data.topicDataList,
            //topicDataList_ME: that.data.topicDataList_ME
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
    else{
      utils.request(api.USER_ATTENTION, {
        attentionUserId: data.uid
      }).then(function(res){
        if(res.errno == 0){
          that.toast.showToast('关注成功')
          that.data.topicDataList.map(function(value, index){
            if(value.create_user_id == data.uid){
              value.attention_status = 1
            }
          })
          /* that.data.topicDataList_ME.map(function(value, index){
            if(value.create_user_id == data.uid){
              value.attention_status = 0
            }
          }) */
          that.setData({
            topicDataList: that.data.topicDataList,
            //topicDataList_ME: that.data.topicDataList_ME
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
  loadMessageNum () {
    let that = this
    utils.request(api.MESSAGENUM_TOTAL).then(function(res){
      if(res.errno === 0){
        that.setData({
          messageNum: res.data
        })
      }
    })
  },
  toTA (e) {
    let uid = e.currentTarget.dataset.uid
    if(uid == wx.getStorageSync('userId')){
      wx.navigateTo({
        url: '/pages/me/homepage/homepage'
      })
    }
    else{
      wx.navigateTo({
        url: '/pages/ta/ta?userid='+uid
      })
    }
  }
})