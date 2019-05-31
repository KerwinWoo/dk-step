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
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    currentId: '',
    needInvite: 0,
    exchangeShow: false,
    inviteShow: false,
    shaidan: [],
    loaded: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.info('options',options)
    if(options.type){
      wx.setStorageSync('inviteInfo', {
        type: options.type,
        business: options.business,
        push_userid: options.push_userid
      })
    }
    let that = this
    that.setData({
      currentId: options.id,
      isInvite: options.isInvite?options.isInvite:'',
      goodsType: options.goodsType?options.goodsType:''
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
    return {
      title: '跟我一起来免费兑换"' + that.data.info.name + '"',
      path: '/pages/mall/goodsdetail/goodsdetail?type=3&business='+ that.data.currentId + '&push_userid=' + wx.getStorageSync('userId')
    }
  },
  backTo () {
    wx.navigateBack()
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
          if(res2.data.eggshellNum*1 > res.data.info.dkEshellNum*1){
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
                inviteShow: false
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
      topicTag: 'showMyList'
    }).then(function(res){
      if(res.errno == 0){
        if(res.data.data.length > 0){
          let data = res.data.data[0]
          if(data.img_src){
            data.img_src = data.img_src.split(',')
          }
          if(data.img_src.length == 1){
            data.imgmode = 'aspectFill'
          }
          else if(data.img_src.length == 4){
            data.type3 = ' type3'
          }
          else{
            data.imgmode = 'aspectFill'
          }
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
  bindPlus () {
    console.log(34343434)
  },
  bindMinus () {
    console.log(90990)
  },
  bindManual () {
    console.log(66666)
  }
})