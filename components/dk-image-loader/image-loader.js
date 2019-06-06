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
        let w = e.detail.width
        let h = e.detail.height
        //获取高宽比例
        let ratio = h/w
        let tempWidth = 0
        if(ratio <=1 && w < 550){
          tempWidth = w
        }
        if(ratio <=1 && w >=550){
          tempWidth = 500
        }
        if(ratio > 1 && ratio <= 2){
          tempWidth = 300
        }
        if(ratio > 2){
          tempWidth = 200
        }
        this.setData({
          width: tempWidth + 'rpx',
          height: tempWidth*ratio + 'rpx'
        })
      }
      this.setData({
        finishLoadFlag: true
      })
    }
  }
})