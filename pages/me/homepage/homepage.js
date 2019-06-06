// pages/me/homepage/homepage.js
const utils = require('../../../utils/util.js')
const api = require('../../../api/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: wx.getStorageSync('userInfo'),
    userId: wx.getStorageSync('userId'),
    num_guanzhu: 0,
    num_fensi: 0,
    num_shang: 0,
    num_tiezi: 0,
    currentType: 'me'
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
    if(this.data.previewing){
      this.data.previewing = false
    }
    else{
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '要想富，先走路，走路也能成首富',
      path: '/pages/index/index?fromInvite=1&type=1&push_userid=' + wx.getStorageSync('userId'),
      imageUrl: 'https://dkstep.oss-cn-beijing.aliyuncs.com/dkstep-img/invitation_homepage.png'
    }
  },
  backTo () {
    wx.navigateBack()
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
      page:1,
      size:1000,
      sort:'',
      order:''
    }).then(function(res){
      if(res.errno === 0){
        //debugger
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
        console.log(tmpTopicData)
        that.setData({
          fabulist: tmpTopicData
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
      page:1,
      size:1000,
      sort:'',
      order:''
    }).then(function(res){
      if(res.errno === 0){
        //debugger
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
        console.log(tmpTopicData)
        that.setData({
          shouchanglist: tmpTopicData
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
   /* if(true){
      this.toast.showToast('收藏成功')
      return
    } */
    const data = e.currentTarget.dataset
    let that = this
    let itemData = that.data.shouchanglist[data.parentindex]
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
          that.data.shouchanglist[data.parentindex].reward_status = 1
          that.data.shouchanglist[data.parentindex].eshell_num = that.data.shouchanglist[data.parentindex].eshell_num + 2
          that.setData({
            shouchanglist: that.data.shouchanglist
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
  shouCang (e) {
    let that = this
    const data = e.currentTarget.dataset
    let currentTopic = that.data.shouchanglist[data.parentindex]
    let colStatus = currentTopic.collection_status
    if(colStatus == 1){
      //取消收藏
      utils.request(api.BUYOU_SHOUCANGTOPIC_CANCEL,{
        communityId: data.id
      }).then(function(res){
        if(res.errno == 0){
          that.data.shouchanglist.splice(data.parentindex, 1)
          that.setData({
            shouchanglist: that.data.shouchanglist
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