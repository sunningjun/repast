const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    display: true,
    isAllSelect: false,
    totalMoney: 0,
    carts: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    var experation = wx.getStorageSync("experation");
    var time=Date.parse(new Date);
    if (experation>time){
      wx.getStorage({
        key: 'cars',
        success: function (res) {
          that.setCarsInfo(res.data)
        }
      })
    }else{
      wx.clearStorage();
    }
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    try {
      wx.setStorageSync('cars', this.data.carts);
      wx.setStorageSync('totalMoney', this.data.totalMoney)

    } catch (e) {
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  bindMinus: function (e) {
    const index = e.currentTarget.dataset.id;
    let carts = this.data.carts;
    let num = carts[index].num;
    if (num <= 1) {
      return false;
    }
    num = num - 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
  },
  /* 点击加号 */
  bindPlus: function (e) {
    const index = e.currentTarget.dataset.id;
    let carts = this.data.carts;
    let num = carts[index].num;
    num ++;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
  },
  /* 输入框事件 */
  bindManual: function (e) {
    var num = e.detail.value;
    // var id = e.target.dataset.id;
    var index = parseInt(e.target.dataset.index);
     this.data.carts[index].num=num;
   
  },
  switchSelect: function (e) {
    // 获取item项的id，和数组的下标值  
    var Allprice = 0, i = 0;
    let id = e.target.dataset.id,
    index = parseInt(e.target.dataset.index);
    let carts = this.data.carts;
    var select = carts[index].isSelect
    carts[index].isSelect = !select;
    //价钱统计
    if (carts[index].isSelect) {
      this.data.totalMoney = this.data.totalMoney + carts[index].price * carts[index].num;
    }
    else {
      this.data.totalMoney = this.data.totalMoney - carts[index].price * carts[index].num;
    }
    //是否全选判断
    for (i = 0; i < carts.length; i++) {
      Allprice = Allprice + carts[i].price * carts[index].num;
    }
    if (Allprice == this.data.totalMoney) {
      this.data.isAllSelect = true;
    }
    else {
      this.data.isAllSelect = false;
    }
    this.setData({
      carts: carts,
      totalMoney: this.data.totalMoney,
      isAllSelect: this.data.isAllSelect,
    })
  },
  //全选
  allSelect: function (e) {
    //处理全选逻辑
    let i = 0;
    if (!this.data.isAllSelect) {
      for (i = 0; i < this.data.carts.length; i++) {
        this.data.carts[i].isSelect = true;
        this.data.totalMoney = this.data.totalMoney + this.data.carts[i].price * this.data.carts[i].num;
      }
    }
    else {
      for (i = 0; i < this.data.carts.length; i++) {
        this.data.carts[i].isSelect = false;
      }
      this.data.totalMoney = 0;
    }
    this.setData({
      carts: this.data.carts,
      isAllSelect: !this.data.isAllSelect,
      totalMoney: this.data.totalMoney,
    })
  },
  // 去结算
  toBuy() {
    wx.showToast({
      title: '去结算',
      icon: 'success',
      duration: 1000
    });
    wx.navigateTo({
      url: '../order/add/addOrder?totalMoney=' + this.data.totalMoney,
    })
  },
  //数量变化处理
  handleQuantityChange(e) {
    var componentId = e.componentId;
    var quantity = e.quantity;
    this.data.carts[componentId].count.quantity = quantity;
    this.setData({
      carts: this.data.carts,
    });
  },
  setCarsInfo(data){
    var that=this;
    this.setData({
      carts:data
    })
    if (this.data.carts.length > 0) {
      this.setData({
        display: false
      })
    }
    wx.getStorage({
      key: 'totalMoney',
      success: function (res) {
        that.setTotalMoney(res.data)
      }
    })
  },
  setTotalMoney:function(data){
    this.setData({
      totalMoney:data
    })
  }
})