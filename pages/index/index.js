//index.js
//获取应用实例
import NumberAnimate from "../../utils/NumberAnimate";

const app = getApp()
const utils = require('../../utils/util.js')
const api = require('../../api/api.js')

Page({
  data: {
    itemsNew: [{
      id:1,
      name: '小狗摆件',
      egg: 99,
      person: 19,
      picUrl: 'https://img10.360buyimg.com/mobilecms/s250x250_jfs/t1/22403/21/11012/106626/5c8b94f0Ee57197b6/0a21e115bcf0bf2a.jpg'
    },{
      id:2,
      name: '小狗摆件2',
      egg: 199,
      person: 129,
      picUrl: 'https://img14.360buyimg.com/n0/jfs/t1/14170/12/431/175747/5c09dac1E48482df7/8c80520525c5daa9.jpg'
    },{
      id:3,
      name: '小狗摆件2',
      egg: 199,
      person: 129,
      picUrl: 'https://img14.360buyimg.com/n0/jfs/t1/14170/12/431/175747/5c09dac1E48482df7/8c80520525c5daa9.jpg'
    },{
      id:4,
      name: '小狗摆件2',
      egg: 199,
      person: 129,
      picUrl: 'https://img14.360buyimg.com/n0/jfs/t1/14170/12/431/175747/5c09dac1E48482df7/8c80520525c5daa9.jpg'
    },{
      id:5,
      name: '小狗摆件2',
      egg: 199,
      person: 129,
      picUrl: 'https://img14.360buyimg.com/n0/jfs/t1/14170/12/431/175747/5c09dac1E48482df7/8c80520525c5daa9.jpg'
    },{
      id:6,
      name: '小狗摆件2',
      egg: 199,
      person: 129,
      picUrl: 'https://img14.360buyimg.com/n0/jfs/t1/14170/12/431/175747/5c09dac1E48482df7/8c80520525c5daa9.jpg'
    }],
    itemsInvite: [],
    itemsValue: [],
    ssteps: [],
    userStep: 2000,
    settingStatus: 'off',
    statusBarHeight: 128,
    pageTitle: '蛋壳步数换',
    isHongbaoShow: false,
    showMask: false,
  },
  onLoad (option) {
    let that = this
    // 刷新组件
    that.refreshView = that.selectComponent("#refreshView")
    that.loadStepsInfo()
    
    /* utils.request({
      url: api.HOME_QUERY_GOODS,
      method: 'GET' 
    }).then(function (res) {
      if (res.errno === 0) {
        if(res.data && res.data.length > 0){
          let ary = res.data[0]
          that.setData({
            itemsNew: ary.dkchangeList[0].goodsList,
            itemsInvite: ary.invitationList[0].goodsList,
            itemsValue: ary.dkMoneyChange[0].goodsList
          })
        }
      }
    }); */
  },
  onShareAppMessage (option) {
    //分享回调
  },
  //触摸开始
  handletouchstart: function (event) {
    this.refreshView.handletouchstart(event)
  },
  //触摸移动
  handletouchmove: function (event) {
    this.refreshView.handletouchmove(event)
  },
  //触摸结束
  handletouchend: function (event) {
    this.refreshView.handletouchend(event)
  },
  //触摸取消
  handletouchcancel: function (event) {
    this.refreshView.handletouchcancel(event)
  },
  //页面滚动
  onPageScroll: function (event) {
    this.refreshView.onPageScroll(event)
  },
  onPullDownRefresh:function(){
    let that = this
    setTimeout(function(){
      that.loadStepsInfo()
      that.refreshView.stopPullRefresh()
    },1500)
  },
  //获取步数信息
  loadStepsInfo () {
    let that = this
    const [defaultTopMin,defaultTopMax,defaultLeftMin,defaultLeftMax,defaultLeftMin2,defaultLeftMax2,defaultDelayMin,defaultDelayMax] = 
          [80,320,20,110,480,600,0,300]
    let ssteps = [{
      id:0,
      name: '奖励红包',
      value: 1000,
      type:0,
      style: {
        left: utils.randomNum(defaultLeftMin, defaultLeftMax),
        top: utils.randomNum(defaultTopMin, defaultTopMax),
        animationDelay: utils.randomNum(defaultDelayMin, defaultDelayMax) + 'ms'
      },
      statusCls: 'sstep withAnimation'
    }, {
      id: 1,
      name: '奖励红包',
      value: 2567,
      type:1,
      style: {
        left: utils.randomNum(defaultLeftMin, defaultLeftMax),
        top: utils.randomNum(defaultTopMin, defaultTopMax),
        animationDelay: utils.randomNum(defaultDelayMin, defaultDelayMax) + 'ms'
      },
      statusCls: 'sstep withAnimation'
    }, {
      id:2,
      name: '奖励红包',
      value: 2200,
      type:1,
      style: {
        left: defaultLeftMin2,
        top: utils.randomNum(defaultTopMin, defaultTopMax),
        animationDelay: utils.randomNum(defaultDelayMin, defaultDelayMax) + 'ms'
      },
      statusCls: 'sstep withAnimation'
    }, {
      id:3,
      name: '奖励红包',
      value: 2200,
      type:0,
      style: {
        left: utils.randomNum(defaultLeftMin2, defaultLeftMax2),
        top: utils.randomNum(defaultTopMin, defaultTopMax),
        animationDelay: utils.randomNum(defaultDelayMin, defaultDelayMax) + 'ms'
      },
      statusCls: 'sstep withAnimation'
    }]
    that.setData({
      ssteps: ssteps
    })
  },
  /**
   * 收取气泡
   */
  pickStep (e) {
    let that = this
    
    const index = e.currentTarget.dataset.id*1
    const step = e.currentTarget.dataset.step * 1
    
    // 增加气泡收取动效样式
    that.data.ssteps[index].statusCls = 'sstep close'
    that.setData({
      userStep: that.data.userStep + step,
      ssteps: that.data.ssteps
    })
    // 总步数增加动效
    /* let stepNum = that.data.userStep
    let n1 = new NumberAnimate({
      from: stepNum,//开始时的数字
      speed: 300,// 总时间
      refreshTime: 50,//  刷新一次的时间
      decimals: 0,//小数点后的位数
      onUpdate: () => {//更新回调函数
        that.setData({
          userStep: n1.tempValue*1
        });
      }
    }); */
  },
  /**
   * 设置红包提醒
   */
  switchTap () {
    this.setData({
      settingStatus: (this.data.settingStatus == 'off') ? 'on' : 'off'
    })
  },
  pullRefresh () {
    wx.startPullDownRefresh()
  },
  //开红包
  kaiHongbao () {
    this.setData({
      showMask: true,
      isHongbaoShow: true
    })
  },
  closeHongbao () {
    this.setData({
      showMask: false,
      isHongbaoShow: false
    })
  }
})
