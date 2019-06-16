const utils = require('../../utils/util.js')
const api = require('../../api/api.js')

function getImageInfo(url) {
  return new Promise((resolve, reject) => {
    console.log(url)
    wx.getImageInfo({
      src: url,
      success: resolve,
      fail: function(res){
      },
    })
  })
}

function createRpx2px() {
  const { windowWidth } = wx.getSystemInfoSync()

  return function(rpx) {
    return windowWidth / 750 * rpx
  }
}

const rpx2px = createRpx2px()

function canvasToTempFilePath(option, context) {
  return new Promise((resolve, reject) => {
    wx.canvasToTempFilePath({
      ...option,
      success: resolve,
      fail: reject,
    }, context)
  })
}

function saveImageToPhotosAlbum(option) {
  return new Promise((resolve, reject) => {
    wx.saveImageToPhotosAlbum({
      ...option,
      success: resolve,
      fail: function(res){
        console.log('保存图片到相册失败', res)
        utils.showErrorToast(res)
      },
    })
  })
}

Component({
  properties: {
    visible: {
      type: Boolean,
      value: false,
      observer(visible) {
        if (visible && !this.data.beginDraw) {
          this.draw()
          this.data.beginDraw = true
        }
      }
    },
    userInfo: {
      type: Object,
      value: false
    },
    fromtask: {
      type: Boolean,
      value: false
    }
  },

  data: {
    beginDraw: false,
    isDraw: false,

    canvasWidth: 750,
    canvasHeight: 1334,

    imageFile: '',

    responsiveScale: 1,
    fromtask: false
  },

  lifetimes: {
    ready() {
      const designWidth = 375
      const designHeight = 667 // 这是在顶部位置定义，底部无tabbar情况下的设计稿高度

      // 以iphone6为设计稿，计算相应的缩放比例
      const { windowWidth, windowHeight } = wx.getSystemInfoSync()
      const responsiveScale =
        windowHeight / ((windowWidth / designWidth) * designHeight)
      if (responsiveScale < 1) {
        this.setData({
          responsiveScale,
        })
      }
    },
  },

  methods: {
    handleClose() {
      this.triggerEvent('close')
    },
    handleSave() {
      let that = this
      const { imageFile,fromtask } = this.data
      if (imageFile) {
        console.log(imageFile)
        saveImageToPhotosAlbum({
          filePath: imageFile,
        }).then(() => {
          if(that.data.fromtask && that.data.fromtask == 1){
            utils.request(api.UPDATETASK,{
              taskId: 2
            }).then(function(res){
              if(res.errno === 0){
                console.log('每日分享任务完成')
                utils.showSuccessToast('分享任务完成')
              }
            })
          }
          wx.showToast({
            icon: 'none',
            title: '分享图片已保存至相册',
            duration: 2000,
          })
        })
      }
    },
    draw() {
      wx.showLoading({
        title: '正在生成海报'
      })
      const { userInfo, canvasWidth, canvasHeight } = this.data
      const { avatar, nickname, postUrl, step } = userInfo
      const avatarPromise = getImageInfo(avatar)
      const backgroundPromise = getImageInfo(postUrl)
      const codeimgPromise = getImageInfo('https://dankebsh.oss-cn-shanghai.aliyuncs.com/dkstep-img/code.jpg')
      Promise.all([avatarPromise, backgroundPromise, codeimgPromise])
        .then(([avatar, background, code]) => {
          const ctx = wx.createCanvasContext('share', this)

          const canvasW = rpx2px(canvasWidth * 2)
          const canvasH = rpx2px(canvasHeight * 2)
          const bgheight = canvasH*0.83396226

          // 绘制背景
          ctx.drawImage(
            background.path,
            0,
            0,
            canvasW,
            bgheight
          )
          //绘制头像边框
          const bdrwidth = rpx2px(120*2)
          const r = bdrwidth/2
          const left = rpx2px(30*2)
          ctx.save()
          ctx.arc(r + left, (bgheight - bdrwidth - rpx2px(260*2) + r), r, 0, 2 * Math.PI)
          ctx.strokeStyle = '#eee'
          ctx.stroke()
          ctx.clip()
          // 绘制头像
          ctx.drawImage(
            avatar.path,
            left,
            bgheight - bdrwidth - rpx2px(260*2),
            bdrwidth,
            bdrwidth,
          )
          ctx.restore()
          
          //绘制用户名
          ctx.beginPath()
          ctx.setFontSize(rpx2px(24*2))
          ctx.setStrokeStyle('#fff')
          ctx.setFillStyle('#fff')
          ctx.fillText(
            nickname,
            left,
            bgheight - rpx2px(230*2),
          )
          
          //绘制今日步数
          ctx.beginPath()
          ctx.setFontSize(rpx2px(32*2))
          ctx.setStrokeStyle('#fff')
          ctx.setFillStyle('#fff')
          ctx.font = 'normal bold '+rpx2px(32*2)+'px sans-serif';
          ctx.fillText(
            '今日步数',
            left,
            bgheight - rpx2px(120*2),
          )
          
          //绘制步数信息
          ctx.beginPath()
          ctx.setFontSize(rpx2px(70*2))
          ctx.setStrokeStyle('#fff')
          ctx.setFillStyle('#fff')
          ctx.fillText(
            step,
            left - rpx2px(5*2),
            bgheight - rpx2px(40*2),
          )
          
          //绘制今日心情
          
          
          //绘制底部背景
          ctx.beginPath()
          ctx.rect(0,bgheight,canvasW,canvasH - bgheight);
          ctx.setFillStyle('#fff')
          ctx.fill()
          //绘制口号信息
          ctx.setFontSize(rpx2px(32*2))
          ctx.setStrokeStyle('#333')
          ctx.setFillStyle('#333')
          ctx.fillText(
            '蛋壳步数换',
            left,
            bgheight + rpx2px(96*2),
          )
          ctx.setFontSize(rpx2px(32*2))
          ctx.setStrokeStyle('#333')
          ctx.setFillStyle('#333')
          ctx.fillText(
            '在乎你的每一步',
            left,
            bgheight + rpx2px(150*2),
          )
          
          //绘制二维码信息
          ctx.beginPath()
          const codewidth = rpx2px(100*2)
          ctx.drawImage(
            code.path,
            canvasW - codewidth - rpx2px(50*2),
            bgheight + rpx2px(40*2),
            codewidth,
            codewidth
          )
          ctx.setFontSize(rpx2px(24*2))
          ctx.setStrokeStyle('#333')
          ctx.setFillStyle('#333')
          ctx.fillText(
            '长按扫码加入',
            canvasW - codewidth - rpx2px(76*2),
            bgheight + rpx2px(40*2) + codewidth + rpx2px(30*2),
          )
          

          ctx.draw(false, () => {
            canvasToTempFilePath({
              canvasId: 'share',
            }, this).then(({ tempFilePath }) => {
              this.setData({ 
                imageFile: tempFilePath,
                visible: false, 
                beginDraw: false,
              })
              this.handleSave()
            })
          })
          wx.hideLoading()
          this.setData({ isDraw: true})
        })
        .catch(() => {
          this.setData({ beginDraw: false })
          wx.hideLoading()
        })
    }
  }
})