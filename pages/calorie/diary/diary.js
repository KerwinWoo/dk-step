// pages/calorie/diary/diary.js
import F2 from '../../../components/f2-canvas/lib/f2';
const utils = require('../../../utils/util.js')
const api = require('../../../api/api.js')
let chart = null;

function initChart(canvas, width, height) {
  let chart = null
  wx.getWeRunData({
    success(res) {
      utils.request(api.WXSTEPS,{
        sessionkey: wx.getStorageSync('sessionkey'),
        encryptedData: res.encryptedData,
        iv: res.iv
      }, 'POST', 'application/json').then(resData => {
        if(resData.errno === 0){
          /* let days = utils.get7days()
          const data = [];
          for(let i = 0; i < days.length; i++){
            data.push({
              date: days[i],
              value: resData.data[i].step
            })
          } */
          let data = []
          resData.data.map(function(value, index){
            data.push({
              date: value.timestamp*1000,
              value: value.step
            })
          })
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
            grid: null
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
        }
        else{
          utils.showErrorToast(resData.errmsg?resData.errmsg:resData.msg)
        }
      })
    },
    fail(res) {
    }
  })
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
    userInfo: null,
    visible: false,
    faces: [{
      name: '灰常开心',
      url: 'https://dankebsh.oss-cn-shanghai.aliyuncs.com/dkstep-img/face_happy02.png'
    },{
      name: '有点慵懒',
      url: 'https://dankebsh.oss-cn-shanghai.aliyuncs.com/dkstep-img/face_smile02.png'
    },{
      name: '有点低沉',
      url: 'https://dankebsh.oss-cn-shanghai.aliyuncs.com/dkstep-img/face_uhappy02.png'
    }],
    faceindex: 0,
    postindex: 0,
    posturl: 'https://dankebsh.oss-cn-shanghai.aliyuncs.com/dkstep-img/post1.png',
    posturllist: ['https://dankebsh.oss-cn-shanghai.aliyuncs.com/dkstep-img/post1.png',
    'https://dankebsh.oss-cn-shanghai.aliyuncs.com/dkstep-img/post2.png',
    'https://dankebsh.oss-cn-shanghai.aliyuncs.com/dkstep-img/post3.png'],
    revokeLayerShow: false,
    step: 0,
    fromtask: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = wx.getStorageSync('userInfo')
    userInfo.postUrl = this.data.posturl
    this.setData({
      userInfo: userInfo,
      fromtask: options.fromtask?options.fromtask:0
    })
    this.postcanvas = this.selectComponent(".postcanvas")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      revokeLayerShow: false
    })
    this.loadwxstep()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  toggleface () {
    this.data.faceindex++
    if(this.data.faceindex == 3){
      this.data.faceindex = 0
    }
    let userInfo = this.data.userInfo
    userInfo.faceindex = this.data.faceindex
    this.setData({
      faceindex: this.data.faceindex,
      userInfo: userInfo
    })
  },
  show: function() {
    let that = this
    wx.getSetting({
      success(res) {
        //用户拒绝授权或者用户在设置页面中取消了授权
        if(res.authSetting['scope.writePhotosAlbum'] != undefined && res.authSetting['scope.writePhotosAlbum'] == false){
          that.setData({
            revokeLayerShow: true
          })
        }
        //用户从未授权
        else{
          that.setData({
            revokeLayerShow: false
          })
          that.setData({
            visible: true
          })
        }
      },
      fail(res){
        console.log('获取用户设置信息错误')
      }
    }) 
  },
  refreshPost () {
    this.data.postindex++
    if(this.data.postindex == this.data.posturllist.length){
      this.data.postindex = 0
    }
    this.setData({
      postindex: this.data.postindex
    })
    let userInfo = this.data.userInfo
    userInfo.postUrl = this.data.posturllist[this.data.postindex]
    this.setData({
      posturl: this.data.posturllist[this.data.postindex],
      userInfo: userInfo
    })
  },
  loadwxstep () {
    let that = this
    utils.request(api.QUERY_WXSTEP).then(function(res){
      if(res.errno === 0){
        that.data.userInfo.step = res.data.stepFirstNum
        that.setData({
          step: res.data.stepFirstNum,
          userInfo: that.data.userInfo
        })
      }
    })
  },
  cancelRevoke () {
    this.setData({
      revokeLayerShow: false
    })
  }
})