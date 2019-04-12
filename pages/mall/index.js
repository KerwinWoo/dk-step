// pages/mall/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsTypeData: [{
      id: 1,
      name: '热门推荐'
    },{
      id: 2,
      name: '抖音同款'
    },{
      id: 3,
      name: '生活日用'
    },{
      id: 4,
      name: '美妆护肤'
    },{
      id: 5,
      name: '电子数码'
    },{
      id: 6,
      name: '家用电器'
    },{
      id: 7,
      name: '母婴用品'
    }],
    currentType: 1,
    goodListData: [{
      id: 1,
      name: '小狗摆件',
      dk: 99,
      person: 232,
      photo: 'https://img30.360buyimg.com/babel/s170x180_jfs/t1/14532/21/15291/38093/5cae9621Ef20d5a0f/0d0fed6ecac3fd4b.jpg'
    },{
      id: 2,
      name: '小狗摆件',
      dk: 99,
      person: 232,
      photo: 'https://img11.360buyimg.com/babel/s170x180_jfs/t1/34003/9/2429/57738/5caf0af7E214c6e8b/93c6f91cbb920ab5.jpg'
    },{
      id: 3,
      name: '小狗摆件',
      dk: 99,
      person: 232,
      photo: 'https://img13.360buyimg.com/babel/s170x180_jfs/t1/2231/33/14640/79157/5bdc1be4Ec59247c8/ec47353a00cc9d25.jpg'
    }],
    navbarWidth: 2000
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    // 刷新组件
    that.refreshView = that.selectComponent("#refreshView")
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
  changeType (e) {
    this.setData({
      currentType : e.currentTarget.dataset.id
    })
  }
})