// pages/address/address.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList:[],
    currentItem:0
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
    // wx.
    // var that = this;
    // that.chooseAddress();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      var that=this;
      that.selectAddress();
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
    var transferAddress = this.data.addressList[this.data.currentItem];
    app.globalData.transferAddress = transferAddress;
    console.log(app.globalData.transferAddress)
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
  addNew: function(){
    wx.navigateTo({
      url: '../accept/accept',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  chooseAddress: function () {
    var that = this;
    if (wx.chooseAddress) {
      wx.chooseAddress({
        success: function (res) {
          var address={
            add_userName: res.userName,
            add_telNumber: res.telNumber,
            add_provinceName: res.provinceName,
            add_cityName: res.cityName,
            add_countyName: res.countyName,
            add_detailInfo: res.detailInfo,
            add_postalCode: res.postalCode,
          }
          var addressList=new Array();
          addressList[0] = address;
          that.setData({
            addressList: addressList

          })
        },
        fail: function (err) {
          wx.showToast({
            title: '授权失败',
            icon: 'success',
            duration: 20000
          })
        }
      })
    } else {
      console.log('当前微信版本不支持chooseAddress');
    }
  },
  selectAddress:function(){
    var that=this;
    wx.request({
      url: 'http://localhost:8083/address/findAll',
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        that.setAddressList(res.data);
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  setAddressList:function(data){
    this.setData({
      addressList:data
    })
  },
  selectTransferAddress:function(e){
    var id=e.currentTarget.id;
    this.setData({
      currentItem:id
    })

  }
})