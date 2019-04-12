var that
Page({
  data: {
    number: 1000000
  },
  onLoad:function(){
    that = this
  },
  start: ()=> {
      var random = Math.floor(Math.random() * 900000 + 100000)
      that.setData({
        newNumber: random
      })
      change(random) 
  }
})
var change = number => {
  console.log('====new number====',number)
  var baseNumber = that.data.number //原数字
  var difference = number - that.data.number //与原数字的差
  var absDifferent = Math.abs(difference) //差取绝对值
  var changeTimes = absDifferent < 6 ? absDifferent : 6 //最多变化6次
  var changeUnit = absDifferent < 6 ? 1 : Math.floor(difference / 6)  //绝对差除以变化次数
  // 依次变化
  for (var i = 0; i < changeTimes; i += 1){
    // 使用闭包传入i值，用来判断是不是最后一次变化
    (function(i){
      setTimeout(()=>{
        that.setData({
          number: that.data.number += changeUnit
        })        
        // 差值除以变化次数时，并不都是整除的，所以最后一步要精确设置新数字
        if (i == changeTimes - 1 ){
          that.setData({
            number: baseNumber + difference          
          })        
        }
      },100*(i+1))
    })(i)
  }  
}