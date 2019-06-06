// pages/service/bushu/bushu.js
const app = getApp()
const utils = require('../../../utils/util.js')
const api = require('../../../api/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userStep: 0
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
    this.loadData()
    this.loadUserWXStepInfo()
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
  loadData () {
    let that = this
    utils.request(api.STEPRECORD,{
      size:1000,
      offset:0
    }).then(function(res){
      /* if(res.errno == 0){
        debugger
      } */
      if(res){
        res.map(function(value, index){
          value.produce_time = utils.formatTime(new Date(value.produce_time))
        })
        that.setData({
          list: res
        })
      }
    })
  },
  //获取用户微信步数信息
  loadUserWXStepInfo () {
    let that = this
    wx.getSetting({
      success(res) {
        //用户拒绝授权或者用户在设置页面中取消了授权
        if(res.authSetting['scope.werun'] != undefined && res.authSetting['scope.werun'] == false){
          
        }
        //用户从未授权
        else{
          that.getWXStepInfo()
        }
      }
    }) 
  },
  getWXStepInfo () {
    let that = this
    wx.getWeRunData({
      success(res) {
        utils.request(api.HOME_QUERY_DKSTEP,{
          sessionkey: wx.getStorageSync('sessionkey'),
          encryptedData: res.encryptedData,
          iv: res.iv
        }, 'POST', 'application/json').then(resData => {
          if(resData.errno === 0){
            that.setData({
              userStep: resData.data.step
            })
          }
          else if(resData.errno === 408){
            that.data.sessionErrTimes++
            if(that.data.sessionErrTimes > 1){
              wx.login({
                success: function (res) {
                  utils.request(api.AUTH_GETSESSIONKEY,{
                    code: res.code
                  },'POST','application/json').then(function(res){
                    if(res.errno === 0){
                      wx.setStorageSync('sessionkey', res.data.sessionkey)
                      that.getWXStepInfo()
                    }
                  })
                },
                fail: function (err) {
                  console.error('login fail')
                }
              });
            }
          }
        })
      },
      fail(res) {
      }
    })
  }
})