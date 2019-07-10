Component({
  properties: {
    bgcolor: {
      type: String,
      value: '#fff'
    },
    selector: {
      type: String,
      value: ''
    }
  },
  data: {
    systemInfo: {},
    skeletonRectLists: [],
    skeletonCircleLists: []
  },
  attached() {
    //默认的首屏宽高，防止内容闪现
    const systemInfo = wx.getSystemInfoSync();
    this.setData({
      systemInfo: {
        width: systemInfo.windowWidth,
        height: systemInfo.windowHeight
      }
    })
  },
  ready() {
    const that = this;

    //绘制背景
    wx.createSelectorQuery().selectAll(`.${that.data.selector}`).boundingClientRect().exec(function(res) {
      that.setData({
        'systemInfo.height': res[0][0].height + res[0][0].top
      })
    });

    //绘制矩形
    this.rectHandle();

    //绘制圆形
    this.radiusHandle();

  },
  methods: {
    rectHandle: function() {
      const that = this;

      wx.createSelectorQuery().selectAll(`.${this.data.selector} >>> .${this.data.selector}-rect`).boundingClientRect().exec(function(res) {
        that.setData({
          skeletonRectLists: res[0]
        })
      });

    },
    radiusHandle: function() {
      const that = this;

      wx.createSelectorQuery().selectAll(`.${this.data.selector} >>> .${this.data.selector}-radius`).boundingClientRect().exec(function(res) {
        that.setData({
          skeletonCircleLists: res[0]
        })
      });
    },

  }

})