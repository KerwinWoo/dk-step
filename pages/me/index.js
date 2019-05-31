// pages/me/index.js
const utils = require('../../utils/util.js')
const api = require('../../api/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: wx.getStorageSync('userInfo'),
    num_guanzhu: 0,
    num_fensi: 0,
    num_shang: 0,
    num_tiezi: 0,
    numfk: 0,
    numfh: 0,
    numsh: 0
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
    this.loadOrderlist()
    this.loadInfoNum()
    
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
  loadOrderlist () {
    let that = this
    utils.request(api.DKORDER_LIST,{
      page:1,
      size:100,
      order_status: ''
    },'POST').then(function(res){
      if(res.errno === 0){
        let data = res.data.data
        let [numfk,numfh,numsh] = [0,0,0]
        data.forEach(function(e){
          if(e.order_status == '0'){
            numfk++
          }
          else if(e.order_status == '201'){
            numfh++
          }
          else if(e.order_status == '300'){
            numsh++
          }
        })
        that.setData({
          numfk: numfk,
          numfh: numfh,
          numsh: numsh
        })
      }
    })
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
  }
})