// pages/game/luckywheel/luckywheel.js
const app = getApp()
const utils = require('../../../utils/util.js')
const api = require('../../../api/api.js')

//计数器
var interval = null;

//值越大旋转时间越长  即旋转速度
var intime = 50;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tipShow: true,
    awards: [],
    clickLuck:'clickLuck',
    luckPosition:0,
    giftImg: '',
    giftName: '',
    messageTop: 0,
    awardindex: 0,
    isReal: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadAwardsData()
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
  loadAwardsData () {
    let that = this
    utils.request(api.GAME_WHEEL_AWORD).then(function(res){
      res.map(function(value, index){
        switch (value.id){
        	case 1: case 2: case 3:
            value.img = 'https://dankebsh.oss-cn-shanghai.aliyuncs.com/dkstep-img/gift04.png'
        		break;
          case 4: case 5: case 7:
            value.img = 'https://dankebsh.oss-cn-shanghai.aliyuncs.com/dkstep-img/gift02.png'
            value.award_name = '步'
            break;
          case 6:
            value.img = 'https://dankebsh.oss-cn-shanghai.aliyuncs.com/dkstep-img/gift01.png'
            value.award_num = ''
            break;
          case 8:
            value.img = 'https://dankebsh.oss-cn-shanghai.aliyuncs.com/dkstep-img/gift03.png'
            value.award_num = ''
            break;
        	default:
        		break;
        }
      })
      that.setData({
        awards: res
      })
    })
  },
    //点击抽奖按钮
  clickLuck:function(){

    var that = this;
    if(that.data.myDk < 10){
      utils.showErrorToast('蛋壳不足，无法抽奖')
    }
    else{
      that.setData({
        myDk: (that.data.myDk - 10).toFixed(2)
      })
      utils.request(api.GAME_GETWHEEL_AWORD).then(function(res){
        if(res.code == 500){
          that.setData({
            myDk: (that.data.myDk + 10).toFixed(2)
          })
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
        }
        else{
          //设置按钮不可点击
          that.setData({
            clickLuck:'',
          })
          //清空计时器
          clearInterval(interval);
          var index = 0;
          interval = setInterval(function () {
            if (index > 7) {
              index = 0;
              that.data.awards[7].active = false
            } else if (index != 0) {
              that.data.awards[index - 1].active = false
            }
            that.data.awards[index].active = true
            that.setData({
              awards: that.data.awards
            })
            index++;
          }, intime);
          
          var stoptime = 2000;
          for(let i = 0; i < that.data.awards.length; i++){
            if(that.data.awards[i].id == res.id){
              setTimeout(function(){
                that.stop(i)
                let giftName = ''
                let giftImg = ''
                let isReal = false
                switch (res.id){
                	case 1: case 2: case 3:
                    giftImg = 'https://dankebsh.oss-cn-shanghai.aliyuncs.com/dkstep-img/gift04.png'
                		giftName = res.award_num + '蛋壳'
                    break;
                  case 4: case 5: case 7:
                    giftImg = 'https://dankebsh.oss-cn-shanghai.aliyuncs.com/dkstep-img/gift02.png'
                    giftName = res.award_num + '步'
                    break;
                  case 6:
                    giftImg = 'https://dankebsh.oss-cn-shanghai.aliyuncs.com/dkstep-img/gift01.png'
                    giftName = res.award_name
                    isReal = true
                    break;
                  case 8:
                    giftImg = 'https://dankebsh.oss-cn-shanghai.aliyuncs.com/dkstep-img/gift03.png'
                    giftName = res.award_name
                    isReal = true
                    break;
                	default:
                		break;
                }
                that.setData({
                  giftName: giftName,
                  giftImg: giftImg,
                  awardType: res.type,
                  goods_id: res.goods_id?res.goods_id:'',
                  isReal: isReal
                })
              }, stoptime)
              return
            }
          }
        }
      })
    }
  },

  stop: function (which){
    var that = this;
    //清空计数器
    clearInterval(interval);
    //初始化当前位置
    var current = -1;
    var data = that.data.awards;
    for (var i = 0; i < data.length; i++) {
      if (data[i].active == true) {
        current = i;
      }
    }
    //下标从1开始
    var index = current + 1;

    that.stopLuck(which, index, intime, 10);
  },


/**
 * which:中奖位置
 * index:当前位置
 * time：时间标记
 * splittime：每次增加的时间 值越大减速越快
 */
  stopLuck: function (which, index,time,splittime){
    var that = this;
    //值越大出现中奖结果后减速时间越长
    var awards = that.data.awards;
    setTimeout(function () {
      //重置前一个位置
      if (index > 7) {
        index = 0;
        awards[7].active = false
      } else if (index != 0) {
        awards[index - 1].active = false
      }
      awards[index].active = true;
      that.setData({
        awards: that.data.awards
      })
          //如果旋转时间过短或者当前位置不等于中奖位置则递归执行
          //直到旋转至中奖位置
        if (time < 400 || index != which){
          //越来越慢
          splittime++;
          time += splittime;
          //当前位置+1
          index++;
          that.stopLuck(which, index, time, splittime);
        }else{
        //1秒后显示弹窗
          setTimeout(function () {
            that.setData({
              awardLayer: true,
              clickLuck: 'clickLuck'
            })
            that.loadUserDkInfo()
          }, 1000);
        }
    }, time);
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
    this.loadAwardsInfo()
    this.calculate()
    this.loadUserDkInfo()
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
      title: '抽疯了，华为P30 Pro每日限量大派送~',
      path: '/pages/index/index?fromInvite=1&type=1&push_userid=' + wx.getStorageSync('userId') + '&forwardUrl='+encodeURIComponent('/pages/game/luckywheel/luckywheel'),
      imageUrl: 'https://dankebsh.oss-cn-shanghai.aliyuncs.com/dkstep-img/invitelink.gif'
    }
  },
  backTo (e) {
    wx.navigateBack()
  },
  closeLayer (e) {
    let key = e.currentTarget.dataset.layerid
    this.setData({
      [key]: false
    })
    this.data.awards.map(function(value){
      value.active = false
    })
    this.setData({
      awards: this.data.awards
    })
  },
  viewRule () {
    this.setData({
      ruleLayer: true
    })
  },
  getAward () {
    this.data.awards.map(function(value){
      value.active = false
    })
    this.setData({
      awards: this.data.awards,
      awardLayer: false
    })
    this.loadAwardsInfo()
    /* if(this.data.awardType == 3 && this.data.goods_id){
      wx.navigateTo({
      	url: '/pages/order/paydetail/paydetail?goodsId='+this.data.goods_id+'&goodsType=newperson&num=1'
      })
    }
    else{
      
    } */
  },
  loadAwardsInfo () {
    let that = this
    utils.request(api.GAME_GETWHEEL_AWORDRECORD,{
      offset: 0,
      size: 20
    }).then(function(res){
      if(res.errno === 0){
        that.setData({
          rewardList: res.data
        })
        if(that.data.awardInterval){
          //
        }
        else{
          that.data.awardInterval = setInterval(function(){
            that.data.messageTop -= that.data.messageheight
            that.data.awardindex++
            if(that.data.awardindex == (res.data.length - 1)){
              that.data.messageTop = 0
              that.data.awardindex = 0
            }
            that.setData({
              messageTop: that.data.messageTop
            })
          }, 5*1000)
        }
      }
    })
  },
  calculate () {
    let that = this
    const query = wx.createSelectorQuery()
    query.select('#element').boundingClientRect()
    query.selectViewport().scrollOffset()
    const ratio = 0.08877285
    query.exec(function(res){
      that.setData({
        messageheight: res[0].height*ratio
      })
    })
  }
})