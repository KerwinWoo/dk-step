// components/dk-navigation/dk-nav.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: ''
    },
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
      value: '#fff'
    }
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
    }
  }
})
