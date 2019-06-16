// pages/me/index.js
const utils = require('../../utils/util.js')
const api = require('../../api/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num_guanzhu: 0,
    num_fensi: 0,
    num_shang: 0,
    num_tiezi: 0,
    numfk: 0,
    numfh: 0,
    numsh: 0,
    numth: 0,
    revokeLayerShow: false
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
    this.loadOrderlist()
    this.loadInfoNum()
    this.setData({
      messagenum: wx.getStorageSync('messagenum')
    })
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
        let [numfk,numfh,numsh,numth] = [0,0,0,0]
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
          else if(e.order_status == '401' || e.order_status == '402'){
            numth++
          }
        })
        that.setData({
          numfk: numfk,
          numfh: numfh,
          numsh: numsh,
          numth: numth
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
  },
  bindGetUserInfo: function(e) {
    let that = this;
    wx.login({
      success: function(res1) {
        if (res1.code) {
          wx.getSetting({
            success(res) {
              //用户拒绝授权或者用户在设置页面中取消了授权
              if(res.authSetting['scope.userInfo'] != undefined && res.authSetting['scope.userInfo'] == false){
                that.setData({
                  revokeLayerShow: true
                })
              }
              //用户从未授权
              else{
                that.setData({
                  revokeLayerShow: false
                })
                //登录远程服务器
                let reqData = {
                  code: res1.code,
                  userInfo: e.detail,
                  isUpdate: 0
                }
                utils.request(api.AuthLoginByWeixin, reqData , 'POST', 'application/json').then(res => {
                  if (res.errno === 0) {
                    //存储用户信息
                    wx.setStorageSync('userInfo', res.data.userInfo);
                    wx.setStorageSync('token', res.data.token);
                    wx.setStorageSync('userId', res.data.userId);
                    wx.setStorageSync('sessionkey', res.data.sessionkey);
                    that.setData({
                      userId: res.data.userId,
                      userInfo: res.data.userInfo
                    })
                    utils.showSuccessToast('更新成功')
                  } else {
                    wx.showModal({
                      title: '提示',
                      content: res.errmsg?res.errmsg:res.msg,
                      showCancel: false
                    });
                  }
                });
              }
            }
          }) 
        }
      }
    })
  },
  cancelRevoke () {
    this.setData({
      revokeLayerShow: false
    })
  }
})