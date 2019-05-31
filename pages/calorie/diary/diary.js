// pages/calorie/diary/diary.js
import F2 from '../../../components/f2-canvas/lib/f2';
const utils = require('../../../utils/util.js')
const api = require('../../../api/api.js')
let chart = null;

function initChart(canvas, width, height) {
  const data = [
  { "date": "2019-04-01", "value": 12000 }, 
  { "date": "2019-04-02", "value": 13675 }, 
  { "date": "2019-04-03", "value": 8767 }, 
  { "date": "2019-04-04", "value": 10976 }, 
  { "date": "2019-04-05", "value": 6865 }, 
  { "date": "2019-04-06", "value": 3486 }, 
  { "date": "2019-04-07", "value": 8967 }];
  chart = new F2.Chart({
    el: canvas,
    width,
    height
  });
  
  chart.legend(false);
  chart.axis('value', {
    line: {
      lineWidth: 1,
      stroke: '#eee',
    },
    grid: null,
    label: null
  });
  chart.axis('date', {
    line: {
      lineWidth: 1,
      stroke: '#eee',
    },
    grid: null
  });
  chart.source(data, {
    date: {
      type: 'timeCat',
      mask: 'MM/DD'
    },
    value: {
      tickCount: 3,
      alias: '步数'
    }
  });

  chart.line().position('date*value').color('#FFB304').shape('smooth');
  chart.render();
  
  var item = data[0]
  var point = chart.getPosition(item); // 获取该数据的画布坐标
  chart.showTooltip(point); // 展示该点的 tooltip
  return chart;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    opts: {
      onInit: initChart
    },
    userInfo: wx.getStorageSync('userInfo'),
    visible: false
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
  show: function() {
    this.setData({ visible: true })
  },
  close: function() {
    this.setData({ visible: false })
  },
  backTo (e) {
    wx.navigateBack()
  }
})