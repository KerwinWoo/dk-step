// pages/buyou/fabu/fabu.js
const app = getApp()
const utils = require('../../../utils/util.js')
const api = require('../../../api/api.js')
const uploadImage = require('../../../utils/uploadFile.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formContent: '',
    address: '',
    addressStatus: false,
    topicData: [],
    choosedTopic: '',
    choosedTopicValue: '',
    choosedImgs:[],
    topicList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadTopicNameData()
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
  loadTopicNameData () {
    let that = this
    utils.request(api.BUYOU_QUERY_COMMUNITYLIST,{
    }).then(function (res) {
      that.setData({
        topicList: res.data
      })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  backTo () {
    wx.navigateBack()
  },
  getAddress () {
    let that = this
    wx.getSetting({
      success(res) {
        const setting = res.authSetting,
          locationSetting = setting['scope.userLocation']
        if(locationSetting != undefined && locationSetting == false){
          console.log('设置按钮引导用户点击授权查位置')
        }
      }
    })
    wx.chooseLocation({
      success (res) {
        that.setData({
          address: res.address,
          addressStatus: true
        })
      },
      fail (res) {
        that.setData({
          address: '',
          addressStatus: false
        })
      }
    })
  },
  chooseTopic (e) {
    this.setData({
      choosedTopic: e.currentTarget.dataset.name,
      choosedTopicValue: e.currentTarget.dataset.value
    })
  },
  removeTopic (e) {
    this.setData({
      choosedTopic: '',
      choosedTopicValue: ''
    })
  },
  removeChoosedImg (e) {
    this.data.choosedImgs.splice(e.currentTarget.dataset.index,1)
    this.setData({
      choosedImgs: this.data.choosedImgs
    })
  },
  chooseImg () {
    let that = this
    let choosedImgs = that.data.choosedImgs
    if(choosedImgs.length >= 9){
      wx.showToast({
        title: '最多上传9张图片',
        icon: 'none'
      })
      return
    }
    wx.chooseImage({
      count: 9 - choosedImgs.length,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        that.setData({
          choosedImgs: that.data.choosedImgs.concat(res.tempFilePaths).slice(0, 9)
        })
      }
    })
  },
  previewTopicImg (e) {
    let that = this
    const data = e.currentTarget.dataset
    wx.previewImage({
      current: data.current,
      urls: that.data.choosedImgs
    })
  },
  submitForm(e) {
    const content = this.data.formContent
    let that = this
    if (content) {
      wx.showLoading({
        title: '正在发布...',
        mask: true
      })
      
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      var tempFilePaths = that.data.choosedImgs;
      var userId = wx.getStorageSync('userId')

      //支持多图上传
      let uploadedNum = 0
      let uploadedImgs = []
      for (var i = 0; i < tempFilePaths.length; i++) {
         //上传图片
         //你的域名下的/usertopic文件下的/当前年月日文件下的/图片.png
         uploadImage(tempFilePaths[i], 'usertopic/' + userId + '/',
            function (result) {
              uploadedNum++
              uploadedImgs.push(result)
              if(uploadedNum == tempFilePaths.length){
                that.createTopic(uploadedImgs.join(','))
                wx.switchTab({
                	url: '/pages/buyou/index'
                })
              }
              console.log("======上传成功图片地址为：", result);
            }, function (result) {
               console.log("======上传失败======", result);
               wx.hideLoading()
            }
         )
       }
    }
  },
  createTopic (uploadedImgs) {
    let that = this
    return new Promise(function (resolve, reject) {
      utils.request(api.BUYOU_CREATETOPIC,{
        title: '',
        content: that.data.formContent,
        imgSrc: uploadedImgs,
        topicTag: that.data.choosedTopicValue,
        location: that.data.address,
      },'POST','application/json')
    });
  },
  handleContentInput(e) {
    const value = e.detail.value
    this.setData({
      formContent: value
    })
  }
})