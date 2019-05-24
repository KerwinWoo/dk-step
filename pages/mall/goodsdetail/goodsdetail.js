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
    shaidan: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.info('options',options)
    let that = this
    utils.request(api.MALL_QUERY_GOODS_DETAIL,{
      id: options.id
    },'GET').then(function(res){
      if(res.errno == 0){
        //校验用户蛋壳数是否足够兑换商品
        utils.request(api.HOME_QUERY_USERDK,{
        }).then(function (res2) {
          if(res2.data.eggshellNum*1 >= res.data.info.dkEshellNum*1){
            that.setData({
              exchangeShow: true,
              newInviteShow: false
            })
          }
          else{
            that.setData({
              exchangeShow: false,
              newInviteShow: true
            })
          }
        })
        that.setData({
          currentId: options.id,
          info: res.data.info,
          changeHistory: res.data.changeHistory ? res.data.changeHistory : [],
          invitationHistory: res.data.invitationHistory ? res.data.invitationHistory : [],
          imgUrls: res.data.gallery,
          needInvite: res.data.info.dkInvitationNum*1 - (res.data.changeHistory?res.data.changeHistory.lenth:0),
          isInvite: options.isInvite
        })
        that.loadHeartDetail()
        WxParse.wxParse('goodsDetail', 'html', res.data.info.goods_desc, that);
      }
    })
    that.loadBuyouShareData()
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
    let that = this
    return {
      title: '一起来赚钱',
      path: '/pages/mall/goodsdetail/goodsdetail?goodsId='+ that.data.currentId
    }
  },
  backTo () {
    wx.navigateBack()
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
            data.imgmode = 'widthFix'
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
  }
})