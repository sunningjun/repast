// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected_wait:true,
    selected_yet:false,
    selected_sent:false,
    selected_all:false,
    display:true
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
  selectWait : function(e){
    if ('wait' == e.currentTarget.dataset.wait){
      // selected=true;
      this.setData({
        selected_wait:true,
        selected_yet: false,
        selected_sent: false,
        selected_all: false
      })
    }
  },
  selectYet: function (e) {
    if ('yet' == e.currentTarget.dataset.yet) {
      // selected=true;
      this.setData({
        selected_wait: false,
        selected_yet: true,
        selected_sent: false,
        selected_all: false
      })
    }
  },
  selectSent: function (e) {
    if ('sent' == e.currentTarget.dataset.sent) {
      // selected=true;
      this.setData({
        selected_wait: false,
        selected_yet: false,
        selected_sent: true,
        selected_all: false
      })
    }
  },
  selectAll: function (e) {
    if ('all' == e.currentTarget.dataset.all) {
      // selected=true;
      this.setData({
        selected_wait: false,
        selected_yet: false,
        selected_sent: false,
        selected_all: true
      })
    }
  }
})
