//index.js
//获取应用实例
const app = getApp()
const utils = require('../../utils/util.js')
const api = require('../../api/api.js')
const user = require('../../services/user.js')

Page({
  data: {
    version:'2.0.1',
    itemsNew: [],
    itemsInvite: [],
    itemsValue: [],
    itemsBuyou: [],
    myDk:0,
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
    buyouMoreShow: true,
    qiandaoNum: 0,
    sessionErrTimes: 0,
    gzhLayerShow: false,
    timer:null,
    finalleft:0,
    finaltop:0,
    revokeLayerShow: false,
    currentGuideStep: 1,
    guideShow: false,
    hasBg: false,
    homepageBg: '',
    circleBg: false
  },
  onShow () {
    let that = this
    let token = wx.getStorageSync('token')
    if(this.data.previewing){
      this.data.previewing = false
    }
    else{
      if(!token){
        that.setData({
          guideShow: true
        })
        //新用户通过邀请链接进入
        if(that.data.fromInvite && that.data.fromInvite == 1){
          let data = {
            type: that.data.type,
            push_userid: that.data.push_userid,
            business: that.data.business
          }
          wx.setStorageSync('inviteInfo', data)
        }
        wx.navigateTo({
        	url: '/pages/auth/btnAuth/btnAuth'
        })
      }
      else{
        if(that.data.fromInvite && that.data.fromInvite == 1){
          //老用户通过邀请链接进入
          let data = {
            type: that.data.type,
            push_userid: that.data.push_userid,
            business: that.data.business
          }
          utils.request(api.COMMON_INVITATION, data,'POST','application/json').then(function(res){
            if(res.errno === 0){
              console.log('forwardUrl:' + that.data.forwardUrl)
              that.setData({
                type: '',
                push_userid: '',
                business: '',
                fromInvite: ''
              })
              if(that.data.forwardUrl){
                wx.navigateTo({
                  url: decodeURIComponent(that.data.forwardUrl)
                })
              }
              else{
                that.initData().then(function(){
                  that.initPageData()
                })
              }
            }
            else{
              console.error('通用邀请链接接口异常')
              that.setData({
                type: '',
                push_userid: '',
                business: '',
                fromInvite: ''
              })
              wx.showToast({
                title: res.errmsg?res.errmsg:res.msg,
                icon: 'none',
                duration: 2000
              })
            }
          })
        }
        else{
          that.initData().then(function(){
            that.initPageData()
          })
        }
      }
    }
  },
  onLoad (options) {
    console.log('options', options)
    
    let that = this
    // 刷新组件
    that.refreshView = that.selectComponent(".refreshView")
    
    that.innerAudioContext = wx.createInnerAudioContext()
    that.innerAudioContext.autoplay = false
    that.innerAudioContext.src = 'https://dankebsh.oss-cn-shanghai.aliyuncs.com/dkstep-img/ball.mp3'
    that.innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    that.innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
    
    that.innerAudioContext2 = wx.createInnerAudioContext()
    that.innerAudioContext2.autoplay = false
    that.innerAudioContext2.src = 'https://dankebsh.oss-cn-shanghai.aliyuncs.com/dkstep-img/award.mp3'
    that.innerAudioContext2.onPlay(() => {
      console.log('开始播放2')
    })
    that.innerAudioContext2.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
    
    that.setData({
      business: options.business?options.business:'',
      forwardUrl: options.forwardUrl?options.forwardUrl:'',
      fromInvite: options.fromInvite?options.fromInvite:'',
      push_userid: options.push_userid?options.push_userid:'',
      type: options.type?options.type:'',
      navHeight: app.globalData.navHeight
    })
  },
  onShareAppMessage (option) {
    //分享回调
    let that = this
    if(option.from == 'menu'){
      return {
        title: '要想富，先走路，走路也能成首富',
        path: '/pages/index/index?fromInvite=1&type=1&push_userid=' + wx.getStorageSync('userId'),
        imageUrl: 'https://dankebsh.oss-cn-shanghai.aliyuncs.com/dkstep-img/invitation_team.png'
      }
    }
    else{
      let linkfrom = option.target.dataset.linkfrom
      that.data.previewing = true
      if(linkfrom == 'type1'){
        return {
          title: '步数当钱花，快来一起发',
          path: '/pages/index/index?fromInvite=1&type=1&push_userid=' + wx.getStorageSync('userId'),
          imageUrl: 'https://dankebsh.oss-cn-shanghai.aliyuncs.com/dkstep-img/invitation_homepage.png'
        }
      }
      else if(linkfrom == 'type2'){
        return {
          title: '要想富，先走路，走路也能成首富',
          path: '/pages/index/index?fromInvite=1&type=1&push_userid=' + wx.getStorageSync('userId'),
          imageUrl: 'https://dankebsh.oss-cn-shanghai.aliyuncs.com/dkstep-img/invitation_team.png'
        }
      }
    }
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
    that.loadUserDkInfo()
    that.loadStepsInfo()
    that.loadUserWXStepInfo()
    that.loadGoodsInfo()
    that.loadJiachengInfo()
    that.loadQiandaoNum()
  },
  initPageData () {
    this.loadUserDkInfo()
    this.loadStepsInfo()
    this.loadUserWXStepInfo()
    this.loadGoodsInfo()
    this.loadJiachengInfo()
    this.loadQiandaoNum()
    this.loadStepBg()
  },
  loadStepBg () {
    let that = this
    utils.request(api.HOMEPAGE_BG,{
    }, 'GET').then(function (res) {
      if(res.errno == 0){
        if(res.data && res.data.data && res.data.data.image){
          that.setData({
            hasBg: true,
            homepageBg: res.data.data.image,
            circleBg: (res.data.data.color == 0)?false:true
          })
        }
        else{
          that.setData({
            hasBg: false,
            circleBg: (res.data.data.color == 0)?false:true
          })
        }
      }
      else{
        console.error('获取背景图失败')
        that.setData({
          hasBg: false
        })
      }
    })
  },
  loadUserDkInfo () {
    let that = this
    utils.request(api.HOME_QUERY_USERDK,{
    }).then(function (res) {
      that.setData({
        myDk: res.data.eggshellNum
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
          that.setData({
            revokeLayerShow: true
          })
        }
        //用户从未授权
        else{
          that.setData({
            revokeLayerShow: false
          })
          that.getWXStepInfo()
        }
      }
    }) 
  },
  loadQiandaoNum () {
    let that = this
    utils.request(api.QIANDAONUM).then(function(res){
      if(res.errno === 0){
        that.setData({
          qiandaoNum: res.data.count
        })
      }
    })
  },
  //获取步数(小泡泡)信息
  loadStepsInfo () {
    let that = this
    const query = wx.createSelectorQuery()
    query.selectAll('.stepelement').boundingClientRect()
    query.exec(function(res1){
      //上方title导航宽高
      let navwidth = app.globalData.windowWidth
      let navheight = app.globalData.navHeight
      //可移动区域宽高
      let cwidth = utils.rpx2px()(750)
      let cheight = utils.rpx2px()(600)
      //大泡泡宽高
      let bwidth = utils.rpx2px()(310)
      let bheight = utils.rpx2px()(310)
      //小泡泡宽高
      let mwidth = utils.rpx2px()(101)
      let mheight = utils.rpx2px()(130)
      that.setData({
        finalleft: res1[0][0].left + mwidth/2,
        finaltop: utils.rpx2px()(169) + mheight/2
      })
      
      const [defaultTopMin,defaultTopMax,defaultLeftMin,defaultLeftMax,
      defaultLeftMin2,defaultLeftMax2,defaultDelayMin,defaultDelayMax] = 
            [mheight,cheight-(mheight*2),20,(cwidth - bwidth)/2 - mwidth,((cwidth - bwidth)/2) + bwidth,cwidth - mwidth,0,300]
      utils.request(api.HOME_QUERY_STEPTASK,{
      }).then(function (res) {
          that.refreshView.stopPullRefresh()
          if(res.errno === 0){
            let data = res.data
            data.map(function(value,index){
              let leftmin = (index % 2 == 0) ? defaultLeftMin : defaultLeftMin2
              let leftmax = (index % 2 == 0) ? defaultLeftMax : defaultLeftMax2
              let color = ''
              value.type = utils.randomNum(0, 3)
              switch(value.type){
                case 0: 
                  color = '#FF7110'
                  value.imgSrc = 'https://dankebsh.oss-cn-shanghai.aliyuncs.com/dkstep-img/ball-s.png'
                  break
                case 1:
                  color = '#DA881D'
                  value.imgSrc = 'https://dankebsh.oss-cn-shanghai.aliyuncs.com/dkstep-img/ball-s2.png'
                  break
                case 2:
                  color = '#2462B9'
                  value.imgSrc = 'https://dankebsh.oss-cn-shanghai.aliyuncs.com/dkstep-img/ball-s3.png'
                  break
                case 3:
                  color = '#20A19E'
                  value.imgSrc = 'https://dankebsh.oss-cn-shanghai.aliyuncs.com/dkstep-img/ball-s4.png'
                  break
              }
              if(value.task_name == '邀请好友' || value.task_name == '好友加成'){
                if(value.task_status != 1){
                  value.isInvite = true
                }
              }
              if(value.task_status == 1){
                value.comp_name = '点击领取'
              }
              value.style = {
                left: utils.randomNum(leftmin, leftmax),
                top: utils.randomNum(defaultTopMin, defaultTopMax),
                animationDelay: utils.randomNum(defaultDelayMin, defaultDelayMax) + 'ms',
                color: color
              }
              value.statusCls = 'sstep withAnimation'
              if(value.task_id == 1){
                value.index = index
                that.setData({
                  gzhTask: value
                })
              }
            })
            that.setData({
              ssteps: data
            })
          }
          else{
            utils.showErrorToast(res.errmsg?res.errmsg:res.msg)
          }
      })
    })
    
  },
  loadJiachengInfo () {
    let that = this
    utils.request(api.HOME_QUERY_FRIENDADD).then(function(res){
      if(res.errno === 0){
        that.setData({
          jcpercent: Number.isInteger(res.data.percent)?res.data.percent:res.data.percent.toFixed(2),
          jcpercent2: Number.isInteger(100 - res.data.percent)?(100 - res.data.percent):(100 - res.data.percent).toFixed(2)
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
          if(resData.errno === 0){
            that.setData({
              userStep: resData.data.step
            })
          }
          else if(resData.errno === 408){
            that.data.sessionErrTimes++
            if(that.data.sessionErrTimes <= 1){
              wx.login({
                success: function (res) {
                  utils.request(api.AUTH_GETSESSIONKEY,{
                    code: res.code
                  },'POST','application/json').then(function(res){
                    if(res.errno === 0){
                      wx.setStorageSync('sessionkey', res.data.sessionkey)
                      that.getWXStepInfo()
                    }
                  })
                },
                fail: function (err) {
                  console.error('login fail')
                }
              });
            }
          }
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
    let status = that.data.ssteps[index].task_status
    let taskid = that.data.ssteps[index].task_id
    if(status == 1){
      let param = {
        stepNum: step,
        name: name
      }
      if(taskid || taskid == 0){
        param.taskId = taskid
      }
      utils.request(api.HOME_PICKSTEP,param).then(function(res){
        if(res.errno === 0){
          if(res.data == 'success'){
            // 增加气泡收取动效样式
            that.data.ssteps[index].mvCls = 'close'
            that.data.ssteps[index].style.left = that.data.finalleft
            that.data.ssteps[index].style.top = that.data.finaltop
            that.setData({
              userStep: that.data.userStep + step,
              ssteps: that.data.ssteps
            })
            //播放收取音效
            that.playVoice()
          }
          else{
            
          }
        }
      })
    }
    else{
      switch(name) {
        case '签到':
          wx.navigateTo({
            url: '/pages/game/qiandao/qiandao'
          })
          break
        case '关注公众号':
          that.setData({
            gzhLayerShow: true
          })
          utils.request(api.GZH_QUERY,{},'GET').then(function(res){
            if(res.errno === 0){
              that.setData({
                gzhType: res.data.data
              })
            }
          })
          break
        case '每日分享':
          //todo
          wx.navigateTo({
            url: '/pages/calorie/post/post?fromtask=1'
          })
          break
        case '邀请好友':
          break
        case '好友加成':
          break
        case '幸运抽奖':
          wx.navigateTo({
            url: '/pages/game/luckywheel/luckywheel'
          })
          break
        case '浏览商品60秒':
          wx.navigateTo({
            url: '/pages/mall/index?fromTask=1'
          })
          break
        case '创建团队':
          wx.switchTab({
            url: '/pages/team/team'
          })
          break
        case '发布动态':
          wx.navigateTo({
            url: '/pages/buyou/fabu/fabu'
          })
          break
        case '给步友打赏':
          wx.switchTab({
            url: '/pages/buyou/index'
          })
          break
        case '获取打赏':
          wx.switchTab({
            url: '/pages/buyou/index'
          })
          break
        default:
          break
      }
    }
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
    console.log('初始化数据')
    return new Promise(function(resolve, reject){
      utils.request(api.INIT_DKDATA).then(function(){
        resolve()
      })
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
  playVoice2 () {
    this.innerAudioContext2.stop()
    this.innerAudioContext2.play()
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
  closeLayerGzh () {
    this.setData({
      gzhLayerShow: false
    })
  },
  exchangeSubmit (e) {
    let that = this
    utils.request(api.HOME_CHANGEDK,{
      formId: e.detail.formId
    },'POST','application/json').then(function(res){
      if(res.errno == '0'){
        that.setData({
          awardLayer: true,
          tipShow: false,
          userStep: 0
        })
        that.playVoice2()
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
  },
  getAward () {
    this.setData({
      awardLayer: false
    })
  },
  gzhGetStep () {
    let that = this
    utils.request(api.GZH_REWARD, {}, 'GET').then(function(res){
      if(res.errno === 0){
        that.setData({
          gzhLayerShow: false
        })
        let gzhtask = that.data.gzhTask
        utils.request(api.HOME_PICKSTEP,{
          stepNum: gzhtask.task_dk_num,
          name: gzhtask.task_name,
          taskId: gzhtask.task_id
        }).then(function(res){
          if(res.errno === 0){
            if(res.data == 'success'){
              // 增加气泡收取动效样式
              that.data.ssteps[gzhtask.index].mvCls = 'close'
              that.data.ssteps[gzhtask.index].style.left = that.data.finalleft
              that.data.ssteps[gzhtask.index].style.top = that.data.finaltop
              that.setData({
                userStep: that.data.userStep + gzhtask.task_dk_num,
                ssteps: that.data.ssteps
              })
              //播放收取音效
              that.playVoice()
            }
            else{
              
            }
          }
        })
      }
    })
  },
  onMoveChange (e) {
    let that = this
    let idx = e.currentTarget.dataset.idx
    if(that.data.timer){
      clearTimeout(that.data.timer)
    }
    that.data.timer = setTimeout(function(){
      let e2 = e
      that.data.ssteps[idx].style.left = e2.detail.x
      that.data.ssteps[idx].style.top = e2.detail.y
      that.setData({
        ssteps: that.data.ssteps
      })
      that.data.timer = undefined
    }, 200)
  },
  cancelRevoke () {
    this.setData({
      revokeLayerShow: false
    })
  },
  changeStep (e) {
    let data = e.currentTarget.dataset
    let currentStep = data.value
    if(this.data.currentGuideStep < 5){
      if(currentStep == 2){
        wx.setTabBarItem({
          index: 1,
          iconPath: '/resources/image/navicn_buyou_a.png'
        })
      }
      else{
        wx.setTabBarItem({
          index: 1,
          iconPath: '/resources/image/navicn_buyou_b.png'
        })
      }
      if(currentStep == 3){
        wx.setTabBarItem({
          index: 2,
          iconPath: '/resources/image/navicn_gift_a.png'
        })
      }
      else{
        wx.setTabBarItem({
          index: 2,
          iconPath: '/resources/image/navicn_gift_b.png'
        })
      }
      this.data.currentGuideStep++
      this.setData({
        currentGuideStep: this.data.currentGuideStep
      })
    }
    else{
      this.setData({
        guideShow:false
      })
    }
  }
})
