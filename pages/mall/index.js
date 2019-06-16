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
    currentCategoryId: '',
    pageSize: 12,
    allData: [],
    firstLoad: true,
    intime: 0,
    outtime: 0,
    timer: null,
    timercount: 60
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.loadGoodsData()
    
    that.setData({
      fromTask: options.fromTask?options.fromTask:''
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
    let that = this
    console.log('进入页面')
    if(that.data.fromTask && that.data.fromTask == 1){
      that.resetTimer()
    }
  },
  resetTimer () {
    let that = this
    clearInterval(that.data.timer)
    that.data.timer = null
    that.data.timercount = 60
    that.data.timer = setInterval(function(){
      that.data.timercount--
      console.log('任务倒计时', that.data.timercount)
      that.setData({
        timercount: that.data.timercount
      })
      if(that.data.timercount == 0){
        clearInterval(that.data.timer)
        utils.request(api.UPDATETASK,{
          taskId: 5
        }).then(function(res){
          if(res.errno === 0){
            console.log('浏览任务完成')
            utils.showSuccessToast('浏览任务完成')
          }
        })
      }
    }, 1000)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    if(this.data.timer){
      clearInterval(this.data.timer)
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log(909090)
    if(this.data.timer){
      clearInterval(this.data.timer)
    }
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
  loadGoodsData () {
    let that = this
    let param = {
      dkPartion: 'dkMoneyChange',
      page: (!that.data.firstLoad)?that.data.allData[that.data.currentType].currentPage:1,
      size: that.data.pageSize,
      isHot:(that.data.currentType == 0)?1:0,
    }
    if(that.data.currentType != 0){
      param = {
        dkPartion: 'dkMoneyChange',
        page: (!that.data.firstLoad)?that.data.allData[that.data.currentType].currentPage:1,
        size: that.data.pageSize,
        categoryId:(that.data.goodsTypeData && that.data.goodsTypeData.length > 1) ? that.data.goodsTypeData[that.data.currentType].id:''
      }
    }
    wx.showLoading()
    utils.request(api.MALL_QUERY_DKGOODS_LIST, param, 'Get').then(function (res) {
      if(res.errno === 0){
        wx.hideLoading()
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
              gooslistContHeight: '0'
            })
          })
          that.setData({
            goodsTypeData: data.categoryList,
            firstLoad: false,
            allData: that.data.allData
          })
        }
        let curData = that.data.allData[that.data.currentType]
        curData.list = curData.list.concat(data.goodsList)
        curData.gooslistContHeight = Math.ceil(curData.list.length/2)*545+30
        that.data.allData[that.data.currentType] = curData
        that.setData({
          allData: that.data.allData
        })
        if(data.goodsList.length != 0){
          curData.currentPage++
        }
        else{
          /* that.setData({
            inBottom: true
          }) */
        }
      }
    })
  },
  changeType (e) {
    /*获取可视窗口宽度*/
  　this.setData({
      currentType: e.target.dataset.index
    })
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