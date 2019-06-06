var api = require('../api/api.js');

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatDate (date, fmt) {
  var o = {   
    "M+" : date.getMonth()+1,                 //月份   
    "d+" : date.getDate(),                    //日   
    "h+" : date.getHours(),                   //小时   
    "m+" : date.getMinutes(),                 //分   
    "s+" : date.getSeconds(),                 //秒   
    "q+" : Math.floor((date.getMonth()+3)/3), //季度   
    "S"  : date.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt; 
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function request(url, data = {}, method = "POST", header = "application/x-www-form-urlencoded") {
  /* wx.showLoading({
    title: '加载中...',
  }); */
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': header,
        'X-Nideshop-Token': wx.getStorageSync('token')
      },
      success: function (res) {
        //wx.hideLoading();
        if (res.statusCode == 200) {

          if (res.data.errno == 401) {
            wx.navigateTo({
              url: '/pages/auth/btnAuth/btnAuth',
            })
          } else {
            resolve(res.data);
          }
        } else {
          reject(res.errMsg);
        }

      },
      fail: function (err) {
        reject(err)
      }
    })
  });
}

/**
 * 检查微信会话是否过期
 */
function checkSession() {
  return new Promise(function (resolve, reject) {
    wx.checkSession({
      success: function () {
        console.info('session未过期', wx.getStorageSync('sessionkey'))
        resolve(true);
      },
      fail: function () {
        console.info('session过期,重新获取session')
        wx.login({
          success: function (res) {
            request(api.AUTH_GETSESSIONKEY,{
              code: res.code
            }).then(function(res){
              debugger
            })
          },
          fail: function (err) {
            console.error('login fail')
          }
        });
        reject(false);
      }
    })
  });
}

/**
 * 调用微信登录
 */
function login() {
  return new Promise(function (resolve, reject) {
    wx.login({
      success: function (res) {
        if (res.code) {
          resolve(res);
        } else {
          reject(res);
        }
      },
      fail: function (err) {
        reject(err);
      }
    });
  });
}

function redirect(url) {

  //判断页面是否需要登录
  if (false) {
    wx.redirectTo({
      url: '/pages/auth/login/login'
    });
    return false;
  } else {
    wx.redirectTo({
      url: url
    });
  }
}

function showErrorToast(msg) {
  wx.showToast({
    title: msg,
    icon: 'none'
  })
}

function showSuccessToast(msg) {
  wx.showToast({
    title: msg,
  })
}

function randomNum(minNum,maxNum){ 
  switch(arguments.length){ 
    case 1: 
      return parseInt(Math.random()*minNum+1,10); 
      break; 
    case 2: 
      return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
      break; 
    default: 
      return 0; 
      break; 
  } 
}

//校验用户是否授权登录，如果没有，引导至授权页面
function checkUserPermisson(){
  return new Promise(function(resolve, reject){
    wx.getSetting({
      success(res) {
        //用户拒绝授权或者用户在设置页面中取消了授权
        if(res.authSetting['scope.userInfo'] != undefined && res.authSetting['scope.userInfo'] == false){
          //
        }
        //用户从未授权
        else if (res.authSetting['scope.userInfo'] == undefined){
          wx.redirectTo({
            url: '/pages/auth/btnAuth/btnAuth'
          })
        }
        //用户已授权
        else{
          resolve()
        }
      }
    })
  })
}

module.exports = {
  formatTime,
  formatDate,
  request,
  redirect,
  showErrorToast,
  showSuccessToast,
  checkSession,
  login,
  randomNum,
  checkUserPermisson
}