// pages/game/record/record.js
const utils = require('../../../utils/util.js')
const api = require('../../../api/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rewardsList: [],
    offset: 0,
    size: 30
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
    this.loadData()
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
    utils.request(api.REWARDRECORDS,{
      offset: that.data.offset,
      size: that.data.size
    }).then(function(res){
      res.map(function(value, index){
        switch (value.award_name){
        	case '蛋壳':
            value.img = 'https://dankebsh.oss-cn-shanghai.aliyuncs.com/dkstep-img/gift04.png'
        		break;
          case '步数':
            value.img = 'https://dankebsh.oss-cn-shanghai.aliyuncs.com/dkstep-img/gift02.png'
            value.award_name = '步数'
            break;
          case 'iPhone XS':
            value.img = 'https://dankebsh.oss-cn-shanghai.aliyuncs.com/dkstep-img/gift01.png'
            value.award_num = ''
            break;
          case '手环':
            value.img = 'https://dankebsh.oss-cn-shanghai.aliyuncs.com/dkstep-img/gift03.png'
            value.award_num = ''
            break;
        	default:
        		break;
        }
        value.award_time = utils.formatTime(new Date(value.award_time))
      })
      if(res && res.length > 0){
        that.data.offset = that.data.offset + that.data.size
      }
      else{
        if(that.data.offset != 0){
          utils.nomoreData()
        }
      }
      that.setData({
        rewardsList: that.data.rewardsList.concat(res)
      })
    })
  }
})