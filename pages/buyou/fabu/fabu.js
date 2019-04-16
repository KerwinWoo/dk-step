// pages/buyou/fabu/fabu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: '',
    addressStatus: false,
    topicData: [{
      name: '话题001',
      isHot: true
    },{
      name: '话题002',
      isHot: true
    },{
      name: '话题003',
      isHot: true
    },{
      name: '话题004',
      isHot: false
    },{
      name: '话题005',
      isHot: false
    }],
    choosedTopic: ''
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
      choosedTopic: e.currentTarget.dataset.name
    })
  },
  removeTopic (e) {
    this.setData({
      choosedTopic: ''
    })
  },
  fabu () {
    wx.switchTab({
    	url: '/pages/buyou/index'
    })
  },
  chooseImg () {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
      }
    })
  }
})