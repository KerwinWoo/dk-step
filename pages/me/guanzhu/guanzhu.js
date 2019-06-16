// pages/me/guanzhu/guanzhu.js
const utils = require('../../../utils/util.js')
const api = require('../../../api/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentPage: 1,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      fromta: options.fromta?options.fromta:'',
      userid: options.userid?options.userid:'',
      myuserId: wx.getStorageSync('userId')
    })
     wx.setNavigationBarTitle({
    	title: ((options.fromta && options.fromta == 1)?'TA':'我') + '的关注'
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
    this.data.currentPage = 1
    this.data.list = []
    this.loadGuanzhuData()
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
    this.loadGuanzhuData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  loadGuanzhuData () {
    let that = this
    let apiUrl = (that.data.fromta)?api.TA_ATTENTIONUSERLIST:api.BUYOU_ATTENTIONUSER
    let params = {
      page: that.data.currentPage,
      size:30,
      sort:'',
      order:''
    }
    if(that.data.fromta){
      params.targetUserId = that.data.userid
    }
    utils.request(apiUrl,params).then(function(res){
      if(res.errno === 0){
        if(!that.data.fromta){
          res.data.data.map(function(value, index){
            value.status = 1
          })
        }
        if(res.data.data && res.data.data.length != 0){
          that.data.currentPage++
        }
        else{
          if(that.data.currentPage != 1){
            utils.nomoreData()
          }
        }
        that.setData({
          list: that.data.list.concat(res.data.data)
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
    if(data.status == 1){
      utils.request(api.USER_ATTENTION_CANCEL, {
        attentionUserId: data.uid
      }).then(function(res){
        if(res.errno == 0){
          wx.showToast({
            title: '已取消关注',
            icon: 'success',
            duration: 2000
          })
          if(that.data.fromta != 1){
            that.data.list.splice(data.index,1)
          }
          else{
            that.data.list[data.index].status = 0
          }
          that.setData({
            list: that.data.list
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
      if(that.data.fromta == 1){
        utils.request(api.USER_ATTENTION, {
          attentionUserId: data.uid
        }).then(function(res){
          if(res.errno == 0){
            utils.showSuccessToast('关注成功')
            that.data.list[data.index].status = 1
            that.setData({
              list: that.data.list,
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