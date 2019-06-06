const util = require('../../../utils/util.js');
const api = require('../../../api/api.js');

//获取应用实例
const app = getApp()
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    navUrl: '',
    code: ''
  },

  onLoad: function(options) {
    let that = this;
    let userInfo = wx.getStorageSync('userInfo');
    let token = wx.getStorageSync('token');
    if (userInfo && token) {
      return;
    }
    wx.login({
      success: function(res) {
        if (res.code) {
          that.setData({
            code: res.code
          })
        }
      }
    });
  },

  bindGetUserInfo: function(e) {
    let that = this;
    //登录远程服务器
    if (that.data.code) {
      let inviteInfo = wx.getStorageSync('inviteInfo')
      let reqData = {
        code: that.data.code,
        userInfo: e.detail
      }
      if(inviteInfo){
        reqData.type = inviteInfo.type
        reqData.business = inviteInfo.business
        reqData.push_userid = inviteInfo.push_userid
      }
      util.request(api.AuthLoginByWeixin, reqData , 'POST', 'application/json').then(res => {
        if (res.errno === 0) {
          //存储用户信息
          wx.setStorageSync('userInfo', res.data.userInfo);
          wx.setStorageSync('token', res.data.token);
          wx.setStorageSync('userId', res.data.userId);
          wx.setStorageSync('sessionkey', res.data.sessionkey);
          if(inviteInfo){
            wx.removeStorageSync('inviteInfo')
          }
          wx.navigateBack()

        } else {
          wx.showModal({
            title: '提示',
            content: res.errmsg?res.errmsg:res.msg,
            showCancel: false
          });
        }
      });
    }
  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  }
})