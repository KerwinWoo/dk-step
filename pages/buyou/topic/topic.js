// pages/buyou/topic/topic.js
const app = getApp()
const utils = require('../../../utils/util.js')
const api = require('../../../api/api.js')
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
    releaseBtnShow: true,
    currentTopic: '',
    pic: '',
    topicDataLoaded: false,
    showSkeleton: true,
    tuijianCurpage: 1,
    topicDataFirstLoad: true,
    noMoreDataShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      currentTopic: options.value,
      userId: wx.getStorageSync('userId')
    })
    wx.setNavigationBarTitle({
    	title:'#' + options.title
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
  onPullDownRefresh: function () {
    let that = this
    that.refreshView.stopPullRefresh()
    that.loadTopicData()
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
    this.data.topicDataLoaded = false
    this.loadTopicData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (option) {
    let topicIndex = option.target.dataset.topicindex
    let topic = null
    //this.data.previewing = true
    topic = this.data.topicDataList[topicIndex]
    if(this.data.userId != topic.create_user_id){
      this.forward(topic.id, topicIndex)
    }
    let name = (topic.tag_name?('#'+topic.tag_name+'#'):'') + topic.content
    return {
      title: name,
      path: '/pages/index/index?fromInvite=1&type=1&push_userid=' + wx.getStorageSync('userId') + '&forwardUrl='+encodeURIComponent('/pages/buyou/commentdetail/commentdetail?id='+topic.id),
      imageUrl: topic.img_src?topic.img_src[0]:'https://dankebsh.oss-cn-shanghai.aliyuncs.com/dkstep-img/invitation_homepage.png'
    }
  },
  forward (id, topicIndex) {
    let that = this
    utils.request(api.TOPIC_FORWARD,{
      communityId:id
    }).then(function(res){
      if(res.errno === 0){
        that.data.topicDataList[topicIndex].forward_num++
        that.setData({
          topicDataList: that.data.topicDataList
        })
      }
    })
  },
  loadTopicData() {
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
          if(res.data.communityList.data.length > 0){
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
            console.log('推荐', that.data.topicDataList)
            that.setData({
              topicDataLoaded: true,
              topicDataList: that.data.topicDataList,
              showSkeleton: false,
              noMoreDataShow: false
            })
            if(res.data.communityList.data && res.data.communityList.data.length != 0){
              that.data.tuijianCurpage++
            }
          }
          else{
            if(that.data.topicDataFirstLoad){
              that.setData({
                noMoreDataShow: true,
                topicDataList: [],
                showSkeleton: false
              })
            }
            else{
              that.setData({
                noMoreDataShow: true
              })
            }
          }
          
          let taginfo = res.data.tagsDetails[0]
          let obj = JSON.parse(taginfo.remark)
          that.setData({
            taginfo: {
              name: taginfo.name,
              comment: obj.TagInfo,
              pic: obj.backdropPic,
              award: (obj.isAward && obj.isAward == 1)?true:false
            }
          })
          wx.setNavigationBarTitle({
          	title:'#' + taginfo.name
          })
        }
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
    if(data.uid == that.data.userId){
      wx.showToast({
        title:'不能打赏自己哦~',
        icon: 'none',
        duration: 2000
      })
      return
    }
    let itemData = that.data.topicDataList[data.parentindex]
    if(itemData.reward_status == 0){
      utils.request(api.BUYOU_DASHANG,{
        communityId: data.id,
        targetUserId: data.uid
      }).then(function(res){
        if(res.errno == 0){
          that.toast.showToast('打赏成功，已将你的2枚蛋壳打赏给TA')
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
  previewTopicImg (e) {
    const data = e.currentTarget.dataset
    let that = this
    that.data.previewing = true
    wx.previewImage({
      current: data.current,
      urls: that.data.topicDataList[data.parentindex].img_src
    })
  },
  shouCang (e) {
    let that = this
    const data = e.currentTarget.dataset
    let currentTopic = that.data.topicDataList[data.parentindex]
    let colStatus = currentTopic.collection_status
    if(colStatus == 1){
      //取消收藏
      utils.request(api.BUYOU_SHOUCANGTOPIC_CANCEL,{
        communityId: data.id
      }).then(function(res){
        if(res.errno == 0){
          currentTopic.collection_status = 0
          currentTopic.collection_num--
          that.data.topicDataList[data.parentindex] = currentTopic
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
    else if(colStatus == 0){
      //收藏
      utils.request(api.BUYOU_SHOUCANGTOPIC,{
        communityId: data.id
      }).then(function(res){
        if(res.errno == 0){
          that.toast.showToast('收藏成功')
          currentTopic.collection_status = 1
          currentTopic.collection_num++
          that.data.topicDataList[data.parentindex] = currentTopic
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
          that.setData({
            topicDataList: that.data.topicDataList,
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
          that.setData({
            topicDataList: that.data.topicDataList,
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