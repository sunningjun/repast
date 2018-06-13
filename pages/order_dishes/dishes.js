var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categorylist: [],
    productList: [],
    currentitem: 0,
    animationData: [],
    animationData: [],
    maskVisual: 'hidden',
    product: null,
    carts: []
  },
  cascadeToggle: function (e) {
    var that = this;      //切换购物车开与关
    if (that.data.maskVisual == 'show') {
      that.cascadeDismiss();
    } else {
      that.cascadePopup(e);
    }
  },
  cascadePopup: function (e) {    // 购物车打开动画
    // console.log(e)
    var that = this;
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-in-out',
    });
    this.animation = animation;
    animation.translateY(0).step();
    this.setData({
      animationData: this.animation.export(),
      maskVisual: 'show'
    });
    var id = e.currentTarget.id;
    wx.request({
      url: 'http://localhost:8083/search/findById?id=' + id,
      success: function (res) {
        that.addProduct(res.data)
      }
    });
  },
  cascadeDismiss: function () {        // 购物车关闭动画
    this.animation.translateY(285).step(); this.setData({
      animationData: this.animation.export(),
      maskVisual: 'hidden'
    });
  },
  addProduct: function (data) {
    data.num = 1;
    this.setData({
      product: data
    })
  },
  bindPlus: function (e) {
    var id = e.currentTarget.id;
    var num = this.data.product.num;
    num++;
    var product = this.data.product;
    product.num = num;
    this.setData({
      product: product
    })

  },
  bindMinus: function (e) {
    var id = e.currentTarget.id;
    var num = this.data.product.num;
    if (num > 1) {
      num--;
      var product = this.data.product;
      product.num = num;
      this.setData({
        product: product
      })
    }

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
    wx.request({
      url: 'http://localhost:8083/search/findAllCategory',
      success: function (res) {
        that.addData(res.data)
      }
    });
    var experation = wx.getStorageSync("experation");
    var time = Date.parse(new Date);
    if (experation > time) {
      wx.getStorage({
        key: 'cars',
        success: function (res) {
          that.setCarsInfo(res.data)
        }
      })
    } else {
      wx.clearStorage();
    }
  },
  setCarsInfo: function (data) {
    this.setData({
      carts: data
    })
  },
  addData: function (data) {
    var that = this;
    this.setData({
      categorylist: data,
      currentitem: data[0].id
    })
    wx.request({
      url: 'http://localhost:8083/search/findByCategory?category=' + data[0].name,
      success: function (res) {
        that.addProductList(res.data)
      }
    })
  },
  addIntoCarts: function (e) {
    var length = this.data.carts.length;
    var carts = this.data.carts;
    var count = 0;
    for (var i = 0; i < length; i++) {
      var id = carts[i].id;
      if (id == this.data.product.id) {
        var num = carts[i].num;
        carts[i].num = num + 1;
        count++;
        this.setData({
          carts: carts
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
        num: this.data.product.num,
        isSelect: false
      };
      carts[length] = car;
      console.log(carts);
      this.setData({
        carts: carts
      })
    }

    var timeStamp = Date.parse(new Date());
    var experation = timeStamp + 60000;
    try {
      wx.setStorageSync('cars', this.data.carts)
      wx.setStorageSync('experation', experation)
    } catch (e) {
    }
    wx.showToast({
      title: '加入购物车成功',
      icon: 'success',
      duration: 2000
    });
  },
  clickHeader: function (e) {
    var category = e.currentTarget.dataset.value
    var that = this;
    this.setData({
      currentitem: e.currentTarget.id
    })
    wx.request({
      url: 'http://localhost:8083/search/findByCategory?category=' + category,
      success: function (res) {
        that.addProductList(res.data)
      }
    })
  },
  addProductList: function (data) {
    this.setData({
      productList: data
    })
  },
  turnToDetail: function (e) {
    var that = this;
    var id = e.currentTarget.id;
    wx.request({
      url: 'http://localhost:8083/search/findById?id=' + id,
      success: function (res) { that.addProduct(res.data) },
      complete: function () {
        that.redirectToDetail();
      }
    })
  },
  redirectToDetail: function () {
    var product = this.data.product;
    app.globalData.product = product;
    wx.navigateTo({
      url: '../product_detail/detail',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
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
  clickClose: function () {
    this.setData({
      maskVisual: 'hidden'
    })
  }

})