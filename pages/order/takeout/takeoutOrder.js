// pages/order/takeout/takeoutOrder.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      totalMoney:0,
      cars:[],
      takeout_price: 0,
      total:0,
      package_price:10,
      transferAddress: null,
      dispaly:0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var cars = this.data.cars;
    
    this.setData({
      totalMoney: options.totalMoney,
      takeout_price: options.takeout_price,
    })
    var totalMoney = parseInt(this.data.totalMoney);
    var takeout_price = parseInt(this.data.takeout_price);
    var package_price = parseInt(this.data.package_price);
    var total = totalMoney + takeout_price + package_price;
    this.setData({
      total: total
    })
    wx.getStorage({
      key: 'outcars',
      success: function (res) {
        that.setCarsInfo(res.data)
      }
    })

  },
  setCarsInfo:function(data) {
    var that = this;   
    this.setData({
      cars: data
    })
    that.updateImage();
  },
  updateImage: function () {
    var cars = this.data.cars;
    console.log(this.data.cars)

    for (var i = 0; i < cars.length; i++) {
      var pic = "../" + cars[i].pic;
      cars[i].pic = pic;
    }
    this.setData({
      cars: cars
    })

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
    this.setData({
      transferAddress: app.globalData.transferAddress
    });
    if (null != this.data.transferAddress){
      this.setData({
        display:1
      });
    }
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
  turnToAddress:function(){
    wx.navigateTo({
      url: '../../address/address',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})