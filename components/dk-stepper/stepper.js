// components/dk-stepper/stepper.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    plusStatus: {
      type: String,
      value: ''
    },
    inputStatus: {
      type: String,
      value: ''
    },
    minusStatus: {
      type: String,
      value: ''
    },
    num: {
        type: Number,
        value:1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    num: 1,  
    // 使用data数据对象设置样式名  
    minusStatus: 'disabled',
    plusStatus: '',
    inputStatus: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /* 点击减号 */  
    bindMinus: function(e) {  
        var num = this.data.num;  
        // 如果大于1时，才可以减  
        if (num > 1) {  
            num --;  
        }  
        // 只有大于一件的时候，才能normal状态，否则disable状态  
        var minusStatus = num <= 1 ? 'disabled' : 'normal';  
        // 将数值与状态写回  
        this.setData({  
            num: num,  
            minusStatus: minusStatus  
        });
        this.triggerEvent('bindMinus', {e}, {})
    },  
    /* 点击加号 */  
    bindPlus: function(e) {
        if(this.data.plusStatus != 'disabled'){
           var num = this.data.num;  
           // 不作过多考虑自增1  
           num ++;  
           // 只有大于一件的时候，才能normal状态，否则disable状态  
           var minusStatus = num < 1 ? 'disabled' : 'normal';  
           // 将数值与状态写回  
           this.setData({  
               num: num,  
               minusStatus: minusStatus  
           });  
        }
        this.triggerEvent('bindPlus', {e}, {})
    },  
    /* 输入框事件 */  
    bindManual: function(e) {  
        var num = e.detail.value;  
        // 将数值与状态写回  
        this.setData({  
            num: num  
        });  
        e.currentTarget.dataset.num = num
        this.triggerEvent('bindManual', {e}, {})
    } 
  }
})
