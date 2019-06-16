// components/dk-navigation/dk-nav.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hasBackBtn: {
      type: Boolean,
      value: true
    },
    hasBorder:{
      type: Boolean,
      value: false
    },
    isFixed:{
      type: Boolean,
      value: false
    },
    theme: {
      type: String,
      value: 'black' //black or white
    },
    bgColor: {
        type: String,
        value: 'rgba(255, 255, 255, 1)'
    },
    color: {
        type: String,
        value: '#333'
    },
    title: {
        type: String,
        value: '导航栏'
    },
    titleImg: {
        type: String,
        value: ''
    },
    backIcon: {
        type: String,
        value: ''
    },
    homeIcon: {
        type: String,
        value: ''
    },
    fontSize: {
        type: Number,
        value: 36
    },
    iconHeight: {
        type: Number,
        value: 19
    },
    iconWidth: {
        type:Number,
        value: 58
    }
  }, 
  attached: function(){ 
    var that = this; 
    that.setNavSize(); 
    that.setStyle(); 
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    backTo(event) {
      this.triggerEvent('backTo', {event}, {})
    },
    // 通过获取系统信息计算导航栏高度
    setNavSize: function() {
      var that = this
          , sysinfo = wx.getSystemInfoSync()
          , statusHeight = sysinfo.statusBarHeight
          , isiOS = sysinfo.system.indexOf('iOS') > -1
          , navHeight;
      if (!isiOS) {
          navHeight = 48;
      } else {
          navHeight = 44;
      }
      that.setData({
          status: statusHeight,
          navHeight: navHeight
      })
    },
    setStyle: function() {
      var that  = this
          , containerStyle
          , textStyle
          , iconStyle;
      containerStyle = [
          'background:' + that.data.bgColor
          ].join(';');
      textStyle = [
          'color:' + that.data.color,
          'font-size:' + that.data.fontSize + 'rpx'
      ].join(';');
      iconStyle = [
          'width: ' + that.data.iconWidth + 'px',
          'height: ' + that.data.iconHeight + 'px'
      ].join(';');
      that.setData({
          containerStyle: containerStyle,
          textStyle: textStyle,
          iconStyle: iconStyle
      })
    },
    home: function() {
      this.triggerEvent('home', {});
    }
  }
})
