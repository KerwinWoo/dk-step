// pages/mall/goodsdetail/goodsdetail.js
const app = getApp()
const utils = require('../../../utils/util.js')
const api = require('../../../api/api.js')
const WxParse = require('wxParse/wxParse.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: null,
    changeHistory: [],
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    currentId: '',
    needInvite: 0,
    exchangeShow: false,
    inviteShow: false,
    shaidan: [],
    loaded: false,
    choosedGoodsInfo: {
      retail_price: 0,
      dkEshellNum: 0,
      num: 1
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.info('options',options)
    let that = this
    that.setData({
      currentId: options.id,
      isInvite: options.isInvite?options.isInvite:'',
      goodsType: options.goodsType?options.goodsType:'',
      fromIndex: options.fromIndex?options.fromIndex:''
    })
    
    that.stepper = that.selectComponent(".numstepper")
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
    this.loadGoodsDetail()
    this.loadBuyouShareData()
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
    let that = this
    if(that.data.isInvite){
      return {
        title: '就差你了，你帮我点一下就能用步数兑换到这个商品了~"',
        imageUrl: that.data.info.list_pic_url,
        path: '/pages/index/index?fromInvite=1&type=3&business='+ that.data.info.id 
        + '&push_userid=' + wx.getStorageSync('userId') 
        + '&forwardUrl='
        + encodeURIComponent('/pages/mall/goodsdetail/goodsdetail?id='+that.data.currentId
        +'&isInvite='+that.data.isInvite+'&goodsType='+that.data.goodsType)
      }
    }
    else{
      return {
        title: '要想富，先走路，走路也能成首富',
        imageUrl: that.data.info.list_pic_url,
        path: '/pages/index/index?fromInvite=1&type=3&business='+ that.data.info.id 
        + '&push_userid=' + wx.getStorageSync('userId') 
        + '&forwardUrl='
        + encodeURIComponent('/pages/mall/goodsdetail/goodsdetail?id='+that.data.currentId
        +'&isInvite='+that.data.isInvite+'&goodsType='+that.data.goodsType)
      }
    }
  },
  backTo () {
    if(this.data.fromIndex && this.data.fromIndex == 0){
      wx.switchTab({
        url: '/pages/index/index'
      })
    }
    else{
      wx.navigateBack()
      /* wx.navigateTo({
      	url: '/pages/mall/index?timercount=' + this.data.timercount
      }) */
    }
  },
  loadGoodsDetail () {
    let that = this
    utils.request(api.MALL_QUERY_GOODS_DETAIL,{
      id: that.data.currentId
    },'GET').then(function(res){
      if(res.errno == 0){
        
        res.data.invitationHistory = (res.data.invitationHistory) ? res.data.invitationHistory : []
        
        //校验用户蛋壳数是否足够兑换商品
        utils.request(api.HOME_QUERY_USERDK,{
        }).then(function (res2) {
          that.setData({
            userDknum: res2.data.eggshellNum
          })
          if(res2.data.eggshellNum*1 >= res.data.info.dkEshellNum*1){
            //邀请人数不足
            if(res.data.info.dkInvitationNum > res.data.invitationHistory.length){
              that.setData({
                exchangeShow: false,
                newInviteShow: false,
                inviteShow: true
              })
            }
            else{
              that.setData({
                exchangeShow: true,
                newInviteShow: false,
                inviteShow: false,
                choosedGoodsInfo: {
                  retail_price: res.data.info.retail_price,
                  dkEshellNum: res.data.info.dkEshellNum,
                  num: 1
                }
              })
            }
          }
          //蛋壳数不足
          else{
            that.setData({
              exchangeShow: false,
              newInviteShow: true,
              inviteShow: false
            })
          }
        })
        that.setData({
          info: res.data.info,
          changeHistory: res.data.changeHistory ? res.data.changeHistory : [],
          invitationHistory: res.data.invitationHistory ? res.data.invitationHistory : [],
          imgUrls: res.data.gallery,
          needInvite: res.data.info.dkInvitationNum*1 - res.data.invitationHistory.length
        })
        that.loadHeartDetail()
        if(!that.data.loaded){
          WxParse.wxParse('goodsDetail', 'html', res.data.info.goods_desc, that);
          that.data.loaded = true
        }
      }
    })
  },
  loadBuyouShareData () {
    let that = this
    utils.request(api.BUYOU_RECOMMENT_TOPICLIST,{
      topicTag: 'shaidan'
    }).then(function(res){
      if(res.errno == 0){
        if(res.data.communityList.data.length > 0){
          let data = res.data.communityList.data[0]
          if(data.img_src){
            data.img_src = data.img_src.split(',')
          }
          if(data.img_src.length == 4){
            data.type3 = ' type3'
          }
          data.imgmode = 'aspectFill'
          that.setData({
            shaidan: data
          })
        }
      }
    })
  },
  previewTopicImg (e) {
    const data = e.currentTarget.dataset
    let that = this
    wx.previewImage({
      current: data.current,
      urls: that.data.shaidan.img_src
    })
  },
  loadHeartDetail () {
    let that = this
    utils.request(api.DKWISH_DETAIL,{
      goodsId: that.data.currentId
    }, 'Get').then(function(res){
      that.setData({
        isHeart: (res.errno == '1') ? false : true,
        heartId: (res.errno == '0') ? res.data.id : ''
      })
    })
  },
  addToHeart () {
    let that = this
    if(that.data.isHeart){
      //移除心愿清单
      if(that.data.heartId){
        utils.request(api.DKWISH_DELETE,{
          id: that.data.heartId
        },'POST','application/json').then(function(res){
          if(res.errno == '0'){
            that.setData({
              isHeart: false,
              heartId: ''
            })
          }
        })
      }
    }
    else{
      utils.request(api.DKWISH_SAVE,{
        goodsId: that.data.currentId
      },'POST','application/json').then(function(res){
        if(res.errno == '0'){
          that.setData({
            isHeart: true,
            heartId: res.data.id
          })
        }
      })
    }
  },
  doExchange () {
    let that = this
    that.setData({
      previewShow: true
    })
  },
  hidePreview () {
    let that = this
    that.setData({
      previewShow: false
    })
  },
  bindPlus (e) {
    let that = this
    let choosedGoodsInfo = that.data.choosedGoodsInfo
    let userDknum = that.data.userDknum
    let choosednum = that.stepper.data.num
    let goodsInfo = that.data.info
    let totalDk = choosednum*(goodsInfo.dkEshellNum)
    if(totalDk > userDknum){
      wx.showToast({
        title: '蛋壳数不足',
        icon: 'none',
        duration: 2000
      })
      that.stepper.setData({
        num: --choosednum
      })
    }
    else{
      if(choosednum > goodsInfo.goods_number){
        wx.showToast({
          title: '超出商品库存',
          icon: 'none',
          duration: 2000
        })
        that.stepper.setData({
          num: --choosednum
        })
      }
      else{
        that.setData({
          choosedGoodsInfo: {
            retail_price: (choosednum*(goodsInfo.retail_price)).toFixed(2),
            dkEshellNum: choosednum*(goodsInfo.dkEshellNum),
            num: choosednum
          }
        })
      }
    }
  },
  bindMinus () {
    let that = this
    let choosedGoodsInfo = that.data.choosedGoodsInfo
    let userDknum = that.data.userDknum
    let choosednum = that.stepper.data.num
    let goodsInfo = that.data.info
    let totalDk = choosednum*(goodsInfo.dkEshellNum)
    that.setData({
      choosedGoodsInfo: {
        retail_price: (choosednum*(goodsInfo.retail_price)).toFixed(2),
        dkEshellNum: choosednum*(goodsInfo.dkEshellNum),
        num: choosednum
      }
    })
  },
  bindManual () {
    let that = this
    let choosedGoodsInfo = that.data.choosedGoodsInfo
    let userDknum = that.data.userDknum
    let choosednum = that.stepper.data.num
    let goodsInfo = that.data.info
    let totalDk = choosednum*(goodsInfo.dkEshellNum)
    if(choosednum <= 0){
      wx.showToast({
        title: '购买数量要大于0哦~',
        icon: 'none',
        duration: 2000
      })
      that.setData({
        choosedGoodsInfo: {
          retail_price: goodsInfo.retail_price,
          dkEshellNum: goodsInfo.dkEshellNum,
          num: 1
        }
      })
      choosednum = 1
    }
    if(totalDk > userDknum){
      wx.showToast({
        title: '蛋壳数不足',
        icon: 'none',
        duration: 2000
      })
      that.setData({
        choosedGoodsInfo: {
          retail_price: goodsInfo.retail_price,
          dkEshellNum: goodsInfo.dkEshellNum,
          num: 1
        }
      })
    }
    else{
      if(choosednum > goodsInfo.goods_number){
        wx.showToast({
          title: '超出商品库存',
          icon: 'none',
          duration: 2000
        })
        that.setData({
          choosedGoodsInfo: {
            retail_price: goodsInfo.retail_price,
            dkEshellNum: goodsInfo.dkEshellNum,
            num: 1
          }
        })
      }
      else{
        that.setData({
          choosedGoodsInfo: {
            retail_price: (choosednum*(goodsInfo.retail_price)).toFixed(2),
            dkEshellNum: choosednum*(goodsInfo.dkEshellNum),
            num: choosednum
          }
        })
      }
    }
  }
})