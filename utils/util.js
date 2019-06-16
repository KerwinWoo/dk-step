var api = require('../api/api.js');
var utils = require('../utils/util.js');

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

function request(url, data = {}, method = "POST", header = "application/x-www-form-urlencoded", redirectOrNot = true) {
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

          if (res.data.errno == 401 || res.data.errno == 409) {
            if(redirectOrNot){
              wx.navigateTo({
                url: '/pages/auth/btnAuth/btnAuth',
              })
            }
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
    icon: 'none',
    duration: 2000
  })
}

function showSuccessToast(msg) {
  wx.showToast({
    title: msg,
    duration: 2000
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

function nomoreData(){
  wx.showToast({
    title: '没有更多信息了',
    icon: 'none',
    duration: 2000
  })
}

function checkMessage () {
  utils.request(api.MESSAGENUM_TOTAL).then(function(res){
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


function getDay(day){  
   var today = new Date();  
      
   var targetday_milliseconds=today.getTime() + 1000*60*60*24*day;          

   today.setTime(targetday_milliseconds); //注意，这行是关键代码
      
   var tYear = today.getFullYear();  
   var tMonth = today.getMonth();  
   var tDate = today.getDate();  
   tMonth = doHandleMonth(tMonth + 1);  
   tDate = doHandleMonth(tDate);  
   return tYear+"-"+tMonth+"-"+tDate;  
}
function doHandleMonth(month){  
   var m = month;  
   if(month.toString().length == 1){  
      m = "0" + month;  
   }  
   return m;  
}

function get7days(){
  let result = []
  for(let i = 0; i > -7; i--){
    result.push(getDay(i))
  }
  return result
}

const rpx2px = function createRpx2px() {
  const { windowWidth } = wx.getSystemInfoSync()

  return function(rpx) {
    return windowWidth / 750 * rpx
  }
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
  checkUserPermisson,
  nomoreData,
  get7days,
  rpx2px
}