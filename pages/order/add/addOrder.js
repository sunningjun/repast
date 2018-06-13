var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product: null,
    cars:[],
    totalMoney:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var cars=this.data.cars;
    this.setData({
      product: app.globalData.product,
      totalMoney: options.totalMoney
    })
    wx.getStorage({
      key: 'cars',
      success: function (res) {
        that.setCarsInfo(res.data)
      }
    })
    if(null!=this.data.product){
      cars[cars.lengtg]=product;
      this.setData({
        cars:cars,
        totalMoney:product.price
      })
     that.updateImage();
    }
    
  },
  setCarsInfo(data) {
    var cars=new Array();
    var that=this;
    console.log(data)
    for(var i=0;i<data.length;i++){
      if (data[i].isSelect){
        cars[i]=data[i]
      }
    }
    console.log(cars)

    this.setData({
      cars: cars
    })
    console.log(this.data.cars)

    that.updateImage();
  },
  updateImage:function(){
    var cars=this.data.cars;
    for(var i=0;i<cars.length;i++){
      var pic = "../" + cars[i].pic;
      cars[i].pic = pic;
    }
    this.setData({
      cars:cars
    })
    console.log(cars)

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
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
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
  addAddress:function(){
    wx.navigateTo({
      url: '../../address/address',
    })
  }
})