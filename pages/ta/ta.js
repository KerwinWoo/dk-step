// pages/ta/ta.js
const utils = require('../../utils/util.js')
const api = require('../../api/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentPage: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.userid)
    this.setData({
      userid: options.userid?options.userid:'',
      currentUserId: wx.getStorageSync('userId')
    })
    this.loadMainData()
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
    this.loadMainData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (option) {
    if(option.from == 'menu'){
      return {
        title: '要想富，先走路，走路也能成首富',
        path: '/pages/index/index?fromInvite=1&type=1&push_userid=' + wx.getStorageSync('userId') + '&forwardUrl='+encodeURIComponent('/pages/ta/ta?userid='+this.data.userid),
        imageUrl: 'https://dankebsh.oss-cn-shanghai.aliyuncs.com/dkstep-img/invitation_homepage.png'
      }
    }
    else{
      let data = option.target.dataset
      let type = data.type
      if(type && type == 'share'){
        return {
          title: '要想富，先走路，走路也能成首富',
          path: '/pages/index/index?fromInvite=1&type=1&push_userid=' + wx.getStorageSync('userId') + '&forwardUrl='+encodeURIComponent('/pages/ta/ta?userid='+this.data.userid),
          imageUrl: 'https://dankebsh.oss-cn-shanghai.aliyuncs.com/dkstep-img/invitation_homepage.png'
        }
      }
      else{
        let topicIndex = data.topicindex
        let topic = null
        this.data.previewing = true
        topic = this.data.communityList[topicIndex]
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
    }
  },
  loadMainData () {
    let that = this
    if(that.data.userid){
      utils.request(api.TA_HOMEPAGEDATA,{
        page: that.data.currentPage,
        size: 20,
        targetUserId: that.data.userid
      }).then(function(res){
        if(res.errno === 0){
          that.setData({
            info: res.data.taPage
          })
          if(res.data.taCommunityList && res.data.taCommunityList.data.length > 0){
            that.data.currentPage++
            res.data.taCommunityList.data.map(function(value, index){
              if(value.img_src){
                value.img_src = value.img_src.split(',')
              }
              if(value.img_src.length == 4){
                value.type3 = ' type3'
              }
              value.imgmode = 'aspectFill'
              if(value.create_time){
                value.create_time = utils.formatDate(new Date(value.create_time), 'MM/dd hh:mm')
              }
            })
            that.setData({
              communityList: res.data.taCommunityList.data
            })
          }
          else{
            if(that.data.currentPage != 1){
              utils.nomoreData()
            }
          }
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
      urls: that.data.communityList[data.parentindex].img_src
    })
  },
  giveEgg (e) {
    const data = e.currentTarget.dataset
    let that = this
    let list = that.data.communityList
    if(data.uid != that.data.currentUserId){
      let itemData = list[data.parentindex]
      if(itemData.reward_status == 0){
        utils.request(api.BUYOU_DASHANG,{
          communityId: data.id,
          targetUserId: data.uid
        }).then(function(res){
          if(res.errno == 0){
            wx.showToast({
              title: '打赏成功',
              icon: 'success',
              duration: 2000
            })
            list[data.parentindex].reward_status = 1
            list[data.parentindex].eshell_num = list[data.parentindex].eshell_num + 2
            that.setData({
              communityList: list
            })
          }
          else{
            utils.showErrorToast(res.errmsg?res.errmsg:res.msg)
          }
        })
      }
    }
    else{
      utils.showErrorToast('不能打赏自己哦~')
    }
  },
  shouCang (e) {
    let that = this
    const data = e.currentTarget.dataset
    let list = that.data.communityList
    let currentTopic = list[data.parentindex]
    let colStatus = currentTopic.collection_status
    if(colStatus == 1){
      //取消收藏
      utils.request(api.BUYOU_SHOUCANGTOPIC_CANCEL,{
        communityId: data.id
      }).then(function(res){
        if(res.errno == 0){
          utils.showSuccessToast('已取消收藏')
          currentTopic.collection_status = 0
          currentTopic.collection_num--
          list[data.parentindex] = currentTopic
          that.setData({
            communityList: list
          })
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
          utils.showSuccessToast('收藏成功')
          currentTopic.collection_status = 1
          currentTopic.collection_num++
          list[data.parentindex] = currentTopic
          that.setData({
            communityList: list
          })
        }
        else{
          utils.showErrorToast(res.errmsg?res.errmsg:res.msg)
        }
      })
    }
  },
  forward (id, topicIndex) {
    let that = this
    utils.request(api.TOPIC_FORWARD,{
      communityId:id
    }).then(function(res){
      if(res.errno === 0){
        that.data.communityList[topicIndex].forward_num++
        that.setData({
          communityList: that.data.communityList
        })
      }
    })
  },
  guanzhu (e) {
    let that = this
    const data = e.currentTarget.dataset
    let status = data.status
    if(status == 1){
      utils.request(api.USER_ATTENTION_CANCEL, {
        attentionUserId: data.uid
      }).then(function(res){
        if(res.errno == 0){
          utils.showSuccessToast('已取消关注')
          that.data.info.attention_status = 0
          that.setData({
            info: that.data.info
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
          utils.showSuccessToast('关注成功')
          that.data.info.attention_status = 1
          that.setData({
            info: that.data.info
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
  }
})