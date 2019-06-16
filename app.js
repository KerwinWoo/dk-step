//app.js
const utils = require('/utils/util.js')
const api = require('/api/api.js')
const config = require('/config/config.js')
App({
  onLaunch: function () {
    let that = this
    //获取小程序更新机制兼容
    if (wx.canIUse('getUpdateManager')) {
        const updateManager = wx.getUpdateManager()
        updateManager.onCheckForUpdate(function (res) {
          // 请求完新版本信息的回调
          if (res.hasUpdate) {
              updateManager.onUpdateReady(function () {
                  wx.showModal({
                      title: '更新提示',
                      content: '新版本已经准备好，是否重启应用？',
                      success: function (res) {
                          if (res.confirm) {
                              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                              updateManager.applyUpdate()
                          }
                      }
                  })
              })
              updateManager.onUpdateFailed(function () {
                  // 新的版本下载失败
                  wx.showModal({
                      title: '已经有新版本了哟~',
                      content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
                  })
              })
          }
        })
    } else {
        // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
        wx.showModal({
            title: '提示',
            content: '当前微信版本过低，无法更好体验程序，请升级到最新微信版本后重试。'
        })
    }
    
    that.checkMessage()
    setInterval(function(){
      //监测系统消息
        that.checkMessage()
        console.log('监测系统消息')
    }, (config.messageInterval)*1000)
    
        let sysinfo = wx.getSystemInfoSync()
        , statusHeight = sysinfo.statusBarHeight
        , isiOS = sysinfo.system.indexOf('iOS') > -1
        , nHeight;
    if (!isiOS) {
        nHeight = 48;
    } else {
        nHeight = 44;
    }
    that.globalData.navHeight = statusHeight + nHeight
    that.globalData.windowHeight = sysinfo.windowHeight
    that.globalData.windowWidth = sysinfo.windowWidth
  },
  globalData: {
    userInfo: {
      nickName: 'Hi,游客',
      userName: '点击去登录',
      avatarUrl: 'https://platform-wxmall.oss-cn-beijing.aliyuncs.com/upload/20180727/150547696d798c.png'
    },
    token: '',
    windowWidth: 0,
    windowHeight: 0,
    teamFromUrl: ''
  },
  // 更新小程序
  updateManager: function () {
      //获取系统信息 客户端基础库
      wx.getSystemInfo({
          success: function (res) {
              //基础库版本比较，版本更新必须是1.9.90以上
              const v = util.compareVersion(res.SDKVersion, '1.9.90');
              if (v > 0) {
                  const manager = wx.getUpdateManager();
                  manager.onCheckForUpdate(function (res) {
                      // 请求完新版本信息的回调
                      //console.log(res.hasUpdate);
                  });
                  manager.onUpdateReady(function () {
                      wx.showModal({
                          title: '更新提示',
                          content: '新版本已经准备好，是否重启应用？',
                          success: function (res) {
                              if (res.confirm) {
                                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                                  manager.applyUpdate();
                              }
                          }
                      })
                  });
                  manager.onUpdateFailed(function () {
                      // 新的版本下载失败
                  });
              } else {
                  // wx.showModal({
                  //   title: '温馨提示',
                  //   content: '当前微信版本过低，无法更好体验程序，请升级到最新微信版本后重试。'
                  // })
              }
          },
      })
  },
  onShow () {
      //wx.getShareInfo()
  },
  checkMessage () {
    utils.request(api.MESSAGENUM_TOTAL,{},'POST','application/x-www-form-urlencoded',false).then(function(res){
      if(res.errno === 0){
        wx.setStorageSync('messagenum', res.data)
        if(res.data && res.data > 0){
            wx.showTabBarRedDot({
                index: 3
            })
        }
        else{
            wx.hideTabBarRedDot({
                index: 3
            })
        }
      }
    })
  }
})