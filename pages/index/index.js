//index.js
//获取应用实例
import NumberAnimate from "../../utils/NumberAnimate";

const app = getApp()
const utils = require('../../utils/util.js')
const api = require('../../api/api.js')
const user = require('../../services/user.js')

Page({
  data: {
    itemsNew: [],
    itemsInvite: [],
    itemsValue: [],
    myDk:0,
    ssteps: [],
    userStep: 2000,
    settingStatus: 'off',
    statusBarHeight: 128,
    pageTitle: '蛋壳步数换',
    isHongbaoShow: false,
    showMask: false,
    innerAudioContext: null
  },
  onShow () {
    let that = this
    //检查用户是否授权个人信息
    utils.checkUserPermisson().then(function(){
      that.loadUserDkInfo()
      that.loadStepsInfo()
      that.loadUserWXStepInfo()
    })
  },
  onLoad (option) {
    let that = this
    // 刷新组件
    that.refreshView = that.selectComponent("#refreshView")
    
    that.innerAudioContext = wx.createInnerAudioContext()
    that.innerAudioContext.autoplay = false
    that.innerAudioContext.src = 'https://dkstep.oss-cn-beijing.aliyuncs.com/dkstep-img/audio/ball.mp3'
    that.innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    that.innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
    
    that.loadGoodsInfo()
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
    },3000)
  },
  loadUserDkInfo () {
    utils.request(api.HOME_QUERY_USERDK,{
      token: wx.getStorageSync('token')
    }).then(function (res) {
      debugger
    })
  },
  //获取用户微信步数信息
  loadUserWXStepInfo () {
     wx.getSetting({
      success(res) {
        //用户拒绝授权或者用户在设置页面中取消了授权
        if(res.authSetting['scope.werun'] != undefined && res.authSetting['scope.werun'] == false){
          
        }
        //用户从未授权
        else if (res.authSetting['scope.werun'] == undefined){
          //用户点击了允许授权微信步数
          wx.getWeRunData({
            success(res) {
              const encryptedData = res.encryptedData
              debugger
              utils.request(api.HOME_QUERY_DKSTEP,{
                session_key: wx.getStorageSync('sessionkey'),
                encryptedData: encryptedData,
                iv: res.iv
              })
            },
            fail(res) {
            }
          })
        }
      }
    }) 
  },
  //获取步数(小泡泡)信息
  loadStepsInfo () {
    let that = this
    const [defaultTopMin,defaultTopMax,defaultLeftMin,defaultLeftMax,defaultLeftMin2,defaultLeftMax2,defaultDelayMin,defaultDelayMax] = 
          [80,320,20,110,480,600,0,300]
    utils.request(api.HOME_QUERY_STEPTASK,{
    }).then(function (res) {
     // debugger
    })
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
  loadGoodsInfo () {
    let that = this
    utils.request(api.HOME_QUERY_DKINDEX_CATEGORY,{
      token: wx.getStorageSync('token')
    }, 'Get').then(function (res) {
      let data = res.data
      that.setData({
        itemsNew: data.newPersonList.goodsList,
        itemsInvite: data.invitationList.goodsList,
        itemsValue: data.dkMoneyChange.goodsList 
      })
    })
  },
  /**
   * 收取气泡
   */
  pickStep (e) {
    let that = this
    
    utils.request(api.HOME_PICKSTEP).then(function(res){
      const index = e.currentTarget.dataset.id*1
      const step = e.currentTarget.dataset.step * 1
      
      // 增加气泡收取动效样式
      that.data.ssteps[index].statusCls = 'sstep close'
      that.setData({
        userStep: that.data.userStep + step,
        ssteps: that.data.ssteps
      })
      
      that.playVoice()
    })
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
  },
  viewGoodsDetail () {
    wx.navigateTo({
      url: '/pages/mall/goodsdetail/goodsdetail'
    })
  },
  viewIvtGoodsDetail () {
    wx.navigateTo({
      url: '/pages/mall/ivtgoodsdetail/ivtgoodsdetail'
    })
  },
  doExchange () {
    utils.checkUserPermisson().then(function(){
      utils.request(api.HOME_CHANGEDK).then(function(res){
        debugger
      })
    })
  },
  playVoice () {
    this.innerAudioContext.stop()
    this.innerAudioContext.play()
  }
})
