//app.js
App({
  onLaunch(parm) {
    let that = this
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function () {
                if (res.confirm) {
                  updateManager.applyUpdate()
                }
              }
            })
          })
        }
        else{
          const res = wx.getSystemInfoSync()
          that.globalData.windowHeight = res.windowHeight
          that.globalData.windowWidth = res.windowWidth
          //微信步数授权
          wx.getSetting({
            success(res) {
              //用户拒绝授权或者用户在设置页面中取消了授权
              if(res.authSetting['scope.werun'] != undefined && res.authSetting['scope.werun'] == false){
                /* wx.redirectTo({
                  url: '/pages/auth/setting/goSetting',
                }) 
                wx.authorize({
                  scope: 'scope.werun',
                  success() {
                    // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
                  },
                  fail(res) {
                  	debugger
                  }
                })*/
              }
              //用户从未授权
              else if (res.authSetting['scope.werun'] == undefined){
                wx.getWeRunData({
                  success(res) {
                    const encryptedData = res.encryptedData
                  },
                  fail(res) {
                  }
                })
              }
            }
          })
          /* wx.getWeRunData({
            success(res) {
              const encryptedData = res.encryptedData
            },
            fail(res) {
            	
            }
          }) */
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法更好体验程序，请升级到最新微信版本后重试。'
      })
    }
  },
  globalData: {
    userInfo: null,
    windowWidth: 0,
    windowHeight: 0
  }
})