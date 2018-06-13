var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected: false,
    indicatordots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    product: null,
    cars: new Array()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      product: app.globalData.product
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
  tapShoppingCar: function () {
    wx.switchTab({
      url: '../shoppingcar/shoppingcar',
    })
  },
  tapLike: function (e) {
    var name = this.data.selected;
    var productId = e.currentTarget.id;
    if (true == name) {
      this.setData({
        selected: false
      })
    }
    else {
      this.setData({
        selected: true
      })
    }
    if (this.data.selected) {
      wx.request({
        url: 'http://localhost:8083/collection/saveCollection?productId=' + productId,
      })
    } else {
      wx.request({
        url: 'http://localhost:8083/collection/deleteCollection?productId=' + productId
      })
    }
  },
  clickBuy: function () {
    wx.navigateTo({
      url: '../order/add/addOrder',
    })
  },
  addIntoCar: function () {
    var that = this;
    var count=0;
    wx.getStorage({
      key: 'cars',
      success: function (res) {
        count++;
        that.setCarsInfo(res.data)
      },
      complete:function(){
        if(count==0){
          that.setCarsInfo(new Array())
        }
      }
    })

  },
  setCarsInfo: function (data) {
    this.setData({
      cars: data
    })
    let cars = this.data.cars;
    var length = cars.length;
    var count = 0;
    for (var i = 0; i < length; i++) {
      var id = cars[i].id;
      if (id == this.data.product.id) {
        var num = cars[i].num;
        cars[i].num=num+1;
        count++;
        this.setData({
          cars: cars
        })
        break;
      }
    }
    if (count == 0) {
      var car = {
        id: this.data.product.id,
        name: this.data.product.name,
        price: this.data.product.price,
        pic: this.data.product.image,
        num: 1,
        isSelect: false
      };
      cars[length] = car;
    }
    this.setData({
      cars: cars
    })
    var timeStamp=Date.parse(new Date());
    var experation=timeStamp+60000;
    console.log(experation)
    try {
      wx.setStorageSync('cars', this.data.cars)
      wx.setStorageSync('experation', experation)
    } catch (e) {
    }
    wx.showToast({
      title: '加入购物车成功',
      icon: 'success',
      duration: 2000
    });
  }
})