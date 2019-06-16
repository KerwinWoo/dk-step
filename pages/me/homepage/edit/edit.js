// pages/me/homepage/edit/edit.js
const utils = require('../../../../utils/util.js')
const api = require('../../../../api/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    genderindex: 0,
    genderarray: [{
      id: 1,
      name: '男'
    },{
      id: 2,
      name: '女'
    },{
      id: '',
      name: ''
    }],
    agearray: ['']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    for(let i = 16; i < 100; i++){
      this.data.agearray.push(i)
    }
    this.setData({
      agearray: this.data.agearray
    })
  },

  onShow: function () {
    let that = this
    let userInfo = wx.getStorageSync('userInfo')
    let gender = userInfo.gender
    console.log(gender)
    that.setData({
      userInfo: userInfo
    })
    let hasgender = false
    for(let i = 0; i < that.data.genderarray.length; i++){
      if(that.data.genderarray[i].id == gender){
        that.setData({
          genderindex: i
        })
        hasgender = true
        return
      }
    }
    if(!hasgender){
      that.setData({
        genderindex: 2
      })
    }
  },
  backTo () {
    wx.navigateBack()
  },
  bindPickerChange (e) {
    let that = this
    this.setData({
      genderindex: e.detail.value
    })
    utils.request(api.UPDATE_USERINFO,{
      userId: that.data.userInfo.userId,
      userDesc: that.data.userInfo.userDesc,
      gender: that.data.genderarray[e.detail.value].id
    }).then(function(res){
      if(res.errno === 0){
        let userInfo = wx.getStorageSync('userInfo')
        userInfo.gender = that.data.genderarray[e.detail.value].id
        wx.setStorageSync('userInfo', userInfo)
      }
      else{
        utils.showErrorToast(res.errmsg)
      }
    })
  },
  bindPickerChange2 (e) {
    this.setData({
      ageindex: e.detail.value
    })
  }
})