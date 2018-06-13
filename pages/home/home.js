// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatordots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    imgUrls: [
      '../../images/1.jpg',
      '../../images/2.jpg',
      '../../images/3.jpg',
      '../../images/4.jpg',
      '../../images/5.jpg',
      '../../images/6.jpg'
    ],
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
  clickOrder:function(){
    wx.navigateTo({
      url: '../order_dishes/dishes',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  turnToTakeout: function () { 
    wx.navigateTo({
      url: '../takeout/takeout',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})