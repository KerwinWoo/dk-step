// pages/me/guanzhu/guanzhu.js
const utils = require('../../../utils/util.js')
const api = require('../../../api/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  backTo () {
    wx.navigateBack()
  },
  loadGuanzhuData () {
    let that = this
    utils.request(api.BUYOU_ATTENTIONUSER, {
      page:1,
      size:1000,
      sort:'',
      order:''
    }).then(function(res){
      if(res.errno === 0){
        res.data.data.map(function(value, index){
          value.status = 1
        })
        that.setData({
          list: res.data.data
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
          that.data.list.splice(data.index,1)
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
  }
})