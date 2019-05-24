// components/dk-toast/dk-toast.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    duration: {
      type: Number,
      value: 1500
    },
    isShow: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    animationData: {},
    content: '提示内容'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showToast(val) {
      var animation = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease',
      })
      this.animation = animation
      animation.opacity(1).step()
      this.setData({
        animationData: animation.export(),
        content: val,
        isShow: true
      })
      setTimeout(function () {
        animation.opacity(0).step()
        this.setData({
          animationData: animation.export(),
          isShow: false
        })
      }.bind(this), this.data.duration)
    }
  }
})
