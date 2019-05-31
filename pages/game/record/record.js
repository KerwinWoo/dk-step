// pages/game/record/record.js
const utils = require('../../../utils/util.js')
const api = require('../../../api/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rewardsList: []
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
  toGame () {
    wx.navigateTo({
      url: '/pages/game/luckywheel/luckywheel'
    })
  },
  backTo (e) {
    wx.navigateBack()
  },
  loadData () {
    let that = this
    utils.request(api.REWARDRECORDS).then(function(res){
      /* if(res.errno === 0){
        that.setData({
          rewardsList: res.data
        })
      } */
      res.map(function(value, index){
        switch (value.award_name){
        	case '蛋壳':
            value.img = 'https://dkstep.oss-cn-beijing.aliyuncs.com/dkstep-img/gift04.png'
        		break;
          case '步数':
            value.img = 'https://dkstep.oss-cn-beijing.aliyuncs.com/dkstep-img/gift02.png'
            value.award_name = '步数'
            break;
          case 'iPhone XS':
            value.img = 'https://dkstep.oss-cn-beijing.aliyuncs.com/dkstep-img/gift01.png'
            value.award_num = ''
            break;
          case '手环':
            value.img = 'https://dkstep.oss-cn-beijing.aliyuncs.com/dkstep-img/gift03.png'
            value.award_num = ''
            break;
        	default:
        		break;
        }
        value.award_time = utils.formatTime(new Date(value.award_time))
      })
      that.setData({
        rewardsList: res
      })
    })
  }
})