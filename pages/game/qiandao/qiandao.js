// pages/game/qiandao/qiandao.js
const utils = require('../../../utils/util.js')
const api = require('../../../api/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    awardLayer:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData()
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
  loadData () {
    let that = this
    utils.request(api.QIANDAOLIST).then(function(res){
      res.data.signList.map(function(value, index){
        switch(index){
          case 0:
            value.day1 = JSON.parse(value.day1)
            break
          case 1:
            value.day2 = JSON.parse(value.day2)
            break
          case 2:
            value.day3 = JSON.parse(value.day3)
            break
          case 3:
            value.day4 = JSON.parse(value.day4)
            break
          case 4:
            value.day5 = JSON.parse(value.day5)
            break
          case 5:
            value.day6 = JSON.parse(value.day6)
            break
          case 6:
            value.day7 = JSON.parse(value.day7)
            break
          default:
            break
        }
      })
      if(res.errno === 0){
        that.setData({
          lianxu: res.data.lianxu,
          signList: res.data.signList,
          sign: res.data.sign
        })
      }
    })
  },
  doQiandao () {
    let that = this
    if(!that.data.sign){
      let day = 0
      if(that.data.lianxu < 7){
        switch(that.data.lianxu){
          case 0:
            day = 'day1'
            break
          case 1:
            day = 'day2'
            break
          case 2:
            day = 'day3'
            break
          case 3:
            day = 'day4'
            break
          case 4:
            day = 'day5'
            break
          case 5:
            day = 'day6'
            break
          case 6:
            day = 'day7'
            break
          default:
            break
        }
        utils.request(api.QIANDAO,{
          day: day
        }).then(function(res){
          if(res.errno === 0){
            that.loadData()
            that.setData({
              awardLayer: true,
              awardstep: that.data.signList[that.data.lianxu]['day'+(that.data.lianxu+1)].step,
              awarddk: that.data.signList[that.data.lianxu]['day'+(that.data.lianxu+1)].dk
            })
          }
          else{
            wx.showToast({
              title:res.errmsg?res.errmsg:res.msg,
              icon: 'none',
              duration: 2000
            })
          }
        })
      }
    }
    else{
      wx.showToast({
        title:'你今日已签到，明天继续哦~',
        icon: 'none',
        duration: 2000
      })
    }
  },
  closeLayer () {
    this.setData({
      awardLayer: false
    })
  }
})