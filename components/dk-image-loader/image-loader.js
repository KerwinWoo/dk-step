/**
 * 图片预加载组件
 */
Component({
  properties: {
    //原始图片
    originalImage: String,
    width: String,
    height: String,
    //图片剪裁mode，同Image组件的mode
    mode: String,
    isSingle: Boolean
  },
  data: {
    finishLoadFlag: false,
    isSingle: false
  },
  methods: {
    finishLoad: function (e) {
      if(this.data.isSingle){
        if(e.detail.width <= 750){
          this.setData({
            width: e.detail.width + 'rpx',
            height: e.detail.height + 'rpx'
          })
        }
      }
      this.setData({
        finishLoadFlag: true
      })
    }
  }
})