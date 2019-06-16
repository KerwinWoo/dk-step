// pages/me/homepage/homepage.js
const utils = require('../../../utils/util.js')
const api = require('../../../api/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num_guanzhu: 0,
    num_fensi: 0,
    num_shang: 0,
    num_tiezi: 0,
    currentType: 'me',
    currentpage1: 1,
    currentpage2: 1,
    fabulist: [],
    shouchanglist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: wx.getStorageSync('userInfo'),
      userId: wx.getStorageSync('userId')
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
    if(this.data.previewing){
      this.data.previewing = false
    }
    else{
      this.data.currentpage1 = 1
      this.data.currentpage2 = 1
      this.data.fabulist = []
      this.data.shouchanglist = []
      this.loadMyTopicList()
      this.loadMySCTopicList()
      this.loadInfoNum()
    }
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
    if(this.data.currentType == 'me'){
      this.loadMyTopicList()
    }
    else{
      this.loadMySCTopicList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (option) {
    let data = option.target.dataset
    let type = data.type
    if(type && type == 'share'){
      return {
        title: '',
        path: '/pages/index/index',
        imageUrl: 'https://dankebsh.oss-cn-shanghai.aliyuncs.com/dkstep-img/invitation_team.png'
      }
    }
    else{
      let topicIndex = data.topicindex
      let topic = null
      this.data.previewing = true
      if(this.data.currentType == 'me'){
        topic = this.data.fabulist[topicIndex]
      }
      else{
        topic = this.data.shouchanglist[topicIndex]
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
  loadInfoNum () {
    let that = this
    utils.request(api.ME_INFONUM, {
      userId: wx.getStorageSync('userId')
    }).then(function(res){
      if(res.errno === 0){
        that.setData({
          num_guanzhu: res.data.attentionUserNum,
          num_fensi: res.data.fansNum,
          num_shang: res.data.rewardEggshellNum,
          num_tiezi: res.data.myCommunityNum
        })
      }
      else{
        wx.showToast({
          title: res.errmsg?res.errmsg:res.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  loadMyTopicList () {
    let that = this
    utils.request(api.BUYOU_MYTOPICLIST, {
      page: that.data.currentpage1,
      size:20,
      sort:'',
      order:''
    }).then(function(res){
      if(res.errno === 0){
        //debugger
        let tmpTopicData = res.data.data.map(function(value,index){
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
          return value
        })
        if(res.data.data && res.data.data.length != 0){
          that.data.currentpage1++
        }
        else{
          if(that.data.currentpage1 > 1){
            utils.nomoreData()
          }
        }
        that.setData({
          fabulist: that.data.fabulist.concat(tmpTopicData)
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
  loadMySCTopicList () {
    let that = this
    utils.request(api.BUYOU_MYSCTOPICLIST, {
      page: that.data.currentpage2,
      size: 20,
      sort:'',
      order:''
    }).then(function(res){
      if(res.errno === 0){
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
            value.create_time = utils.formatDate(new Date(value.create_time), 'MM/dd hh:mm')
          }
          return value
        })
        if(res.data.data && res.data.data.length != 0){
          that.data.currentpage2++
        }
        else{
          if(that.data.currentpage2 > 1){
            utils.nomoreData()
          }
        }
        that.setData({
          shouchanglist: that.data.shouchanglist.concat(tmpTopicData)
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
  changeType (e) {
    let data = e.currentTarget.dataset
    this.setData({
      currentType: data.type
    })
  },
  previewTopicImg (e) {
    const data = e.currentTarget.dataset
    let that = this
    that.data.previewing = true
    if(that.data.currentType == 'me'){
      wx.previewImage({
        current: data.current,
        urls: that.data.fabulist[data.parentindex].img_src
      })
    }
    else{
      wx.previewImage({
        current: data.current,
        urls: that.data.shouchanglist[data.parentindex].img_src
      })
    }
  },
  deleteFabu (e) {
    const data = e.currentTarget.dataset
    let that = this
    wx.showModal({
      content: '确定删除？',
      success (res) {
        if (res.confirm) {
          utils.request(api.BUYOU_DELETETOPIC, {
            id: data.id
          }).then(function(res){
            if(res.errno === 0){
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 2000
              })
              that.data.fabulist.splice(data.parentindex, 1)
              that.setData({
                fabulist: that.data.fabulist
              })
            }
            else{
              
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  giveEgg (e) {
    const data = e.currentTarget.dataset
    let that = this
    let list = (that.data.currentType == 'me') ? that.data.fabulist :that.data.shouchanglist
    if(data.uid != that.data.userId){
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
            if(that.data.currentType == 'me'){
              that.setData({
                fabulist: list
              })
            }
            else{
              that.setData({
                shouchanglist: list
              })
            }
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
    let list = (that.data.currentType == 'me') ? that.data.fabulist :that.data.shouchanglist
    let currentTopic = list[data.parentindex]
    let colStatus = currentTopic.collection_status
    if(colStatus == 1){
      //取消收藏
      utils.request(api.BUYOU_SHOUCANGTOPIC_CANCEL,{
        communityId: data.id
      }).then(function(res){
        if(res.errno == 0){
          that.data.currentpage2 = 1
          that.data.shouchanglist = []
          that.loadMySCTopicList()
          utils.showSuccessToast('已取消收藏')
          if(that.data.currentType == 'me'){
            currentTopic.collection_status = 0
            currentTopic.collection_num--
            list[data.parentindex] = currentTopic
            that.setData({
              fabulist: list
            })
          }
          else{
            let idx = -1
            that.data.fabulist.forEach(function(value,index){
              if(currentTopic.id == value.id){
                idx = index
                return false
              }
            })
            if(idx != -1){
              /* that.setData({
                fabulist: that.data.fabulist
              }) */
              that.data.fabulist[idx].collection_status = 0
              that.data.fabulist[idx].collection_num--
            }
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
          that.data.currentpage2 = 1
          that.data.shouchanglist = []
          that.loadMySCTopicList()
          utils.showSuccessToast('收藏成功')
          if(that.data.currentType == 'me'){
            currentTopic.collection_status = 1
            currentTopic.collection_num++
            list[data.parentindex] = currentTopic
            that.setData({
              fabulist: list
            })
          }
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
        if(that.data.currentType == 'me'){
          that.data.fabulist[topicIndex].forward_num++
          that.setData({
            fabulist: that.data.fabulist
          })
        }
        else{
          that.data.shouchanglist[topicIndex].forward_num++
          that.setData({
            shouchanglist: that.data.shouchanglist
          })
        }
      }
    })
  }
})