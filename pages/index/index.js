//index.js
//获取应用实例
const app = getApp()
const utils = require('../../utils/util.js')
const api = require('../../api/api.js')
const user = require('../../services/user.js')

Page({
  data: {
    itemsNew: [],
    itemsInvite: [],
    itemsValue: [],
    itemsBuyou: [],
    myDk:{
      it:0,
      ft:0
    },
    jcpercent: 0,
    jcpercent2: 100,
    ssteps: [],
    userStep: 0,
    settingStatus: 'off',
    statusBarHeight: 128,
    pageTitle: '蛋壳步数换',
    isHongbaoShow: false,
    showMask: false,
    innerAudioContext: null,
    tipShow: false,
    inviteGoodsPage: 2,
    buyouGoodsPage: 2,
    inviteMoreShow: true,
    buyouMoreShow: true
  },
  onShow () {
    let that = this
    let token = wx.getStorageSync('token')
    if(!token){
      wx.navigateTo({
      	url: '/pages/auth/btnAuth/btnAuth'
      })
    }
    else{
      wx.login({
        success: function (res) {
          utils.request(api.AUTH_GETSESSIONKEY,{
            code: res.code
          },'POST','application/json').then(function(res){
            if(res.errno === 0){
              wx.setStorageSync('sessionkey', res.data.sessionkey)
              that.initData().then(function(){
                that.initPageData()
              })
            }
          })
        },
        fail: function (err) {
          console.error('login fail')
        }
      });
    }
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
  initPageData () {
    this.loadUserDkInfo()
    this.loadStepsInfo()
    this.loadUserWXStepInfo()
    this.loadGoodsInfo()
    this.loadJiachengInfo()
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
  //获取用户微信步数信息
  loadUserWXStepInfo () {
    let that = this
    wx.getSetting({
      success(res) {
        //用户拒绝授权或者用户在设置页面中取消了授权
        if(res.authSetting['scope.werun'] != undefined && res.authSetting['scope.werun'] == false){
          
        }
        //用户从未授权
        else{
          that.getWXStepInfo()
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
        let data = res.data
        data.map(function(value,index){
          let leftmin = (index % 2 == 0) ? defaultLeftMin : defaultLeftMin2
          let leftmax = (index % 2 == 0) ? defaultLeftMax : defaultLeftMax2
          let color = ''
          value.type = utils.randomNum(0, 3)
          switch(value.type){
            case 0: 
              color = '#FF7110'
              value.imgSrc = 'https://dkstep.oss-cn-beijing.aliyuncs.com/dkstep-img/ball-s.png'
              break
            case 1:
              color = '#DA881D'
              value.imgSrc = 'https://dkstep.oss-cn-beijing.aliyuncs.com/dkstep-img/ball-s2.png'
              break
            case 2:
              color = '#2462B9'
              value.imgSrc = 'https://dkstep.oss-cn-beijing.aliyuncs.com/dkstep-img/ball-s3.png'
              break
            case 3:
              color = '#20A19E'
              value.imgSrc = 'https://dkstep.oss-cn-beijing.aliyuncs.com/dkstep-img/ball-s4.png'
              break
          }
          value.style = {
            left: utils.randomNum(leftmin, leftmax),
            top: utils.randomNum(defaultTopMin, defaultTopMax),
            animationDelay: utils.randomNum(defaultDelayMin, defaultDelayMax) + 'ms',
            color: color
          }
          value.statusCls = 'sstep withAnimation'
        })
        that.setData({
          ssteps: data
        })
    })
  },
  loadJiachengInfo () {
    let that = this
    utils.request(api.HOME_QUERY_FRIENDADD).then(function(res){
      res.data.percent
      if(res.errno === 0){
        that.setData({
          jcpercent: res.data.percent,
          jcpercent2: 100 - res.data.percent
        })
      }
    })
  },
  loadGoodsInfo () {
    let that = this
    utils.request(api.HOME_QUERY_DKINDEX_CATEGORY,{
    }, 'Get').then(function (res) {
      let data = res.data
      that.setData({
        itemsNew: (data.newPersonList) ? data.newPersonList.goodsList : [],
        itemsInvite: data.invitationList.goodsList,
        itemsBuyou: data.dkMoneyChange.goodsList,
        itemsValue:data.dkchangeList.goodsList
      })
    })
  },
  getWXStepInfo () {
    let that = this
    wx.getWeRunData({
      success(res) {
        utils.request(api.HOME_QUERY_DKSTEP,{
          sessionkey: wx.getStorageSync('sessionkey'),
          encryptedData: res.encryptedData,
          iv: res.iv
        }, 'POST', 'application/json').then(resData => {
          that.setData({
            userStep: resData.data.step
          })
        })
      },
      fail(res) {
      }
    })
  },
  /**
   * 收取气泡
   */
  pickStep (e) {
    let that = this
    const index = e.currentTarget.dataset.index
    const step = e.currentTarget.dataset.step * 1
    const name = e.currentTarget.dataset.name
    const id = e.currentTarget.dataset.id
    
    utils.request(api.HOME_PICKSTEP,{
      taskId: id,
      stepNum: step,
      name: name
    }).then(function(res){
      if(res.data == 'success'){
        // 增加气泡收取动效样式
        that.data.ssteps[index].statusCls = 'sstep close'
        that.setData({
          userStep: that.data.userStep + step,
          ssteps: that.data.ssteps
        })
        //播放收取音效
        that.playVoice()
      }
      else{
        switch(name) {
          case '邀请好友':
            break
          case '签到':
            wx.navigateTo({
              url: '/pages/game/qiandao/qiandao'
            })
            break
          case '浏览商品':
            wx.navigateTo({
              url: '/pages/mall/index'
            })
            break
          case '每日分享':
            break
          case '幸运抽奖':
            wx.navigateTo({
              url: '/pages/game/luckywheel/luckywheel'
            })
            break
          case '关注公众号':
            break
          default:
            break
        }
      }
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
    /* this.setData({
      showMask: true,
      isHongbaoShow: true
    }) */
    wx.navigateTo({
      url: '/pages/game/qiandao/qiandao'
    })
  },
  initData () {
    return new Promise(function(resolve, reject){
      utils.request(api.INIT_DKDATA).then(function(){
        resolve()
      })
    })
  },
  closeHongbao () {
    this.setData({
      showMask: false,
      isHongbaoShow: false
    })
  },
  viewIvtGoodsDetail () {
    wx.navigateTo({
      url: '/pages/mall/ivtgoodsdetail/ivtgoodsdetail'
    })
  },
  doExchange () {
    let that = this
    const R = 1250
    if(that.data.userStep > 100){
      that.setData({
        tipShow: true,
        exchangeDk: (that.data.userStep/R).toFixed(2)
      })
    }
    else{
      wx.showToast({
        title: '步数超过100步才可以兑换',
        icon: 'none',
        duration: 2000
      })
    }
  },
  playVoice () {
    this.innerAudioContext.stop()
    this.innerAudioContext.play()
  },
  closeLayer () {
    this.setData({
      tipShow: false
    })
  },
  closeLayer2 () {
    this.setData({
      awardLayer: false
    })
  },
  exchangeSubmit () {
    let that = this
    utils.request(api.HOME_CHANGEDK).then(function(res){
      if(res.errno == '0'){
        that.setData({
          awardLayer: true,
          tipShow: false,
          userStep: 0
        })
        that.loadUserDkInfo()
      }
    })
  },
  getMoreGoodsInvite () {
    let that = this
    utils.request(api.MALL_QUERY_DKGOODS_LIST,{
      dkPartion: 'invitation',
      page: that.data.inviteGoodsPage,
      size: 10
    },'Get').then(function(res){
      if(res.errno == 0){
        if(res.data.goodsList.length == 0){
          that.setData({
            inviteMoreShow: false
          })
        }
        else{
          if(res.data.goodsList.length < 10){
            that.setData({
              inviteMoreShow: false
            })
          }
          else{
            that.data.inviteGoodsPage++
          }
          that.setData({
            itemsInvite: that.data.itemsInvite.concat(res.data.goodsList)
          })
        }
      }
    })
  },
  getMoreGoodsBuyou () {
    let that = this
    utils.request(api.MALL_QUERY_DKGOODS_LIST,{
      dkPartion: 'dkchange',
      page: that.data.buyouGoodsPage,
      size: 10
    },'Get').then(function(res){
      if(res.errno == 0){
        if(res.data.goodsList.length == 0){
          that.setData({
            buyouMoreShow: false
          })
        }
        else{
          if(res.data.goodsList.length < 10){
            that.setData({
              buyouMoreShow: false
            })
          }
          else{
            that.data.buyouGoodsPage++
          }
          that.setData({
            itemsBuyou: that.data.itemsBuyou.concat(res.data.goodsList)
          })
        }
      }
    })
  }
})
