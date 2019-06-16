// pages/me/homepage/editdesc/editdesc.js
const utils = require('../../../../utils/util.js')
const api = require('../../../../api/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onLoad: function (options) {
    this.setData({
      userId: options.userId?options.userId:'',
      gender: options.gender?options.gender:'',
      desc: options.desc?options.desc:''
    })
    if(options.desc == 'null'){
      this.setData({
        desc: ''
      })
    }
  },
  sendComment () {
    let that = this
    utils.request(api.UPDATE_USERINFO,{
      userId: that.data.userId,
      userDesc: that.data.comment,
      gender: that.data.gender
    }).then(function(res){
      if(res.errno === 0){
        let userInfo = wx.getStorageSync('userInfo')
        userInfo.userDesc = that.data.comment
        wx.setStorageSync('userInfo', userInfo)
        wx.navigateBack()
      }
      else{
        wx.showToast({
          title: res.errmsg,
          duration: 2000,
          icon: 'none'
        })
      }
    })
  },
  bindinput (event) {
    this.setData({
      comment: event.detail.value
    });
  }
})