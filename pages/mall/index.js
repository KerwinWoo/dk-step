// pages/mall/index.js
const app = getApp()
const utils = require('../../utils/util.js')
const api = require('../../api/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsTypeData: [],
    currentType: 0,
    navbarLeft: 0,
    goodListData: [],
    navbarWidth: 2000,
    currentCategoryId: '',
    pageSize: 12,
    allData: [],
    firstLoad: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    // 刷新组件
    that.refreshView = that.selectComponent("#refreshView")
    
    that.loadGoodsData()
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
    this.loadGoodsData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

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
      that.refreshView.stopPullRefresh()
    },1500)
  },
  loadGoodsData () {
    let that = this
    let param = {
      dkPartion: 'dkMoneyChange',
      page: (!that.data.firstLoad)?that.data.allData[that.data.currentType].currentPage:1,
      size: that.data.pageSize,
      isHot:(that.data.currentType == 0)?1:0,
      categoryId:(that.data.goodsTypeData && that.data.goodsTypeData.length > 1) ? that.data.goodsTypeData[that.data.currentType].id:''
    }
    if(that.data.currentType != 0){
      param = {
        dkPartion: 'dkMoneyChange',
        page: (!that.data.firstLoad)?that.data.allData[that.data.currentType].currentPage:1,
        size: that.data.pageSize,
        categoryId:(that.data.goodsTypeData && that.data.goodsTypeData.length > 1) ? that.data.goodsTypeData[that.data.currentType].id:''
      }
    }
    utils.request(api.MALL_QUERY_DKGOODS_LIST, param, 'Get').then(function (res) {
      if(res.errno === 0){
        let data = res.data
        //首页加载
        if(that.data.firstLoad){
          data.categoryList.unshift({
            id: 0,
            name: '热门推荐'
          })
          data.categoryList.forEach(function(value, index){
            that.data.allData.push({
              currentPage: 1,
              list: [],
              gooslistContHeight: 0
            })
          })
          that.setData({
            goodsTypeData: data.categoryList,
            firstLoad: false,
            allData: that.data.allData
          })
        }
        let curData = that.data.allData[that.data.currentType]
        if(data.goodsList.length != 0){
          curData.currentPage++
        }
        curData.list = curData.list.concat(data.goodsList)
        curData.gooslistContHeight = Math.ceil(curData.list.length/2)*545+30
        that.data.allData[that.data.currentType] = curData
        that.setData({
          allData: that.data.allData
        })
      }
    })
  },
  changeType (e) {
    /*获取可视窗口宽度*/
  　this.setData({
      currentType: e.target.dataset.index
    })
  },
  backTo () {
    wx.navigateBack()
  },
  swiperchange (e) {
    let that = this
    let w = wx.getSystemInfoSync().windowWidth;
  　var leng= that.data.goodsTypeData.length;
  　var idx = e.detail.current;
  　var disX = (idx - 1) * w / leng;
  　if(idx != that.data.currentType){
  　　that.setData({
  　　　currentType : idx
  　　})
  　}
    that.data.allData[idx].currentPage = 1
    that.data.allData[idx].list = []
  　that.setData({
      navbarLeft : disX,
      currentCategoryId: that.data.goodsTypeData[idx].id,
      allData: that.data.allData
  　})
    wx.pageScrollTo({scrollTop: 0,duration: 0})
    that.loadGoodsData()
  }
})