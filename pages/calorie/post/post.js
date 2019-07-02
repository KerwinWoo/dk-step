// pages/calorie/post/post.js
const utils = require('../../../utils/util.js')
const api = require('../../../api/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    visible: false,
    faces: ['https://dankebsh.oss-cn-shanghai.aliyuncs.com/dkstep-img/xinqing01.png',
    'https://dankebsh.oss-cn-shanghai.aliyuncs.com/dkstep-img/xinqing02.png',
    'https://dankebsh.oss-cn-shanghai.aliyuncs.com/dkstep-img/xinqing03.png'],
    faceindex: 0,
    postindex: 0,
    posturl: 'https://dankebsh.oss-cn-shanghai.aliyuncs.com/dkstep-img/post1.png',
    posturllist: ['https://dankebsh.oss-cn-shanghai.aliyuncs.com/dkstep-img/post1.png',
    'https://dankebsh.oss-cn-shanghai.aliyuncs.com/dkstep-img/post2.png',
    'https://dankebsh.oss-cn-shanghai.aliyuncs.com/dkstep-img/post3.png'],
    revokeLayerShow: false,
    step: 0,
    fromtask: 0,
    shareType: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = wx.getStorageSync('userInfo')
    userInfo.postUrl = this.data.posturl
    userInfo.xinqing = this.data.faces[this.data.faceindex]
    this.setData({
      userInfo: userInfo,
      fromtask: options.fromtask?options.fromtask:0
    })
    this.postcanvas = this.selectComponent(".postcanvas")
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
    this.setData({
      revokeLayerShow: false
    })
    this.loadwxstep()
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
      title: '步数当钱花，快来一起发',
      path: '/pages/index/index?fromInvite=1&type=1&push_userid=' + wx.getStorageSync('userId'),
      imageUrl: 'https://dankebsh.oss-cn-shanghai.aliyuncs.com/dkstep-img/invitation_homepage.png'
    }
  },
  toggleface () {
    this.data.faceindex++
    if(this.data.faceindex == 3){
      this.data.faceindex = 0
    }
    let userInfo = this.data.userInfo
    userInfo.xinqing = this.data.faces[this.data.faceindex]
    this.setData({
      faceindex: this.data.faceindex,
      userInfo: userInfo
    })
  },
  show: function() {
    let that = this
    wx.getSetting({
      success(res) {
        //用户拒绝授权或者用户在设置页面中取消了授权
        if(res.authSetting['scope.writePhotosAlbum'] != undefined && res.authSetting['scope.writePhotosAlbum'] == false){
          that.setData({
            revokeLayerShow: true
          })
        }
        //用户从未授权
        else{
          that.setData({
            revokeLayerShow: false
          })
          that.setData({
            visible: true,
            shareType: true
          })
        }
      },
      fail(res){
        console.log('获取用户设置信息错误')
      }
    }) 
  },
  refreshPost () {
    this.data.postindex++
    if(this.data.postindex == this.data.posturllist.length){
      this.data.postindex = 0
    }
    this.setData({
      postindex: this.data.postindex
    })
    let userInfo = this.data.userInfo
    userInfo.postUrl = this.data.posturllist[this.data.postindex]
    this.setData({
      posturl: this.data.posturllist[this.data.postindex],
      userInfo: userInfo
    })
  },
  loadwxstep () {
    let that = this
    utils.request(api.QUERY_WXSTEP).then(function(res){
      if(res.errno === 0){
        that.data.userInfo.step = res.data.stepFirstNum
        that.setData({
          step: res.data.stepFirstNum,
          userInfo: that.data.userInfo
        })
      }
    })
  },
  changesharetype () {
    this.setData({
      shareType: false
    })
  },
  cancelRevoke () {
    this.setData({
      revokeLayerShow: false
    })
  }
})