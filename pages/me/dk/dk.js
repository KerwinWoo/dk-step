// pages/me/dk/dk.js
const app = getApp()
const utils = require('../../../utils/util.js')
const api = require('../../../api/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    offset: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.loadUserDkInfo()
    that.loadDkList()
  },
  loadUserDkInfo () {
    let that = this
    utils.request(api.HOME_QUERY_USERDK,{
    }).then(function (res) {
      let myDk = (res.data.eggshellNum+'').split('.')
      that.setData({
        myDk: {
          it: myDk[0],
          ft: myDk[1] ? myDk[1] : '0'  
        }
      })
    })
  },
  loadDkList () {
    let that = this
    utils.request(api.DK_HISTORY,{
      size: 10,
      offset: that.data.offset
    }).then(function(res){
      res.map(function(value, index){
        if(value.flag == 1){
          value.symbol = '-'
          switch (value['consume_type']){
          	case 1:
              value.name = '购物'
          		break;
            case 2:
              value.name = '打赏'
              break;
            case 3:
              value.name = '转盘抽奖消费'
              break;
          	default:
          		break;
          }
        }
        else if(value.flag == 2){
          value.symbol = '+'
          switch (value['consume_type']){
          	case 1:
              value.name = '步数兑换'
          		break;
            case 2:
              value.name = '被打赏'
              break;
            case 3:
              value.name = '转盘抽奖中奖'
              break;
          	default:
          		break;
          }
        }
        value.time = utils.formatTime(new Date(value.consume_time))
      })
      that.setData({
        dklist: res
      })
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
  backTo (e) {
    wx.switchTab({
    	url: '/pages/index/index'
    })
  }
})