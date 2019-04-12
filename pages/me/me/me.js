Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad() {
    wx.showShareMenu({
      withShareTicket: true
    })
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              console.log(res.userInfo)
            }
          })
        }
      }
    })
  },
  bindGetUserInfo(e) {
  },
  chooseAddress () {
    wx.chooseAddress({
      success: function (res) {

      },
      fail: function (res) { 
        wx.getSetting({
          success(res) {
            if (!res.authSetting['wx.chooseAddress']) {
              wx.authorize({
                scope: 'wx.chooseAddress',
                success() {
                  debugger
                },
                fail() {
                  debugger
                }
              })
            }
          }
        })
      },
      complete: function (res) { },
    })
  },
  createNewImg: function () {
    wx.saveImageToPhotosAlbum({
      success(res) { }
    })
  },
  onShareAppMessage(ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: '来跟我一起跑步赢奖品吧',
      path: '/pages/index/index?group=1212',
      imageUrl: '/image/banner1.jpg'
    }
  }
})