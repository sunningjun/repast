var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['陕西省', '西安市', '雁塔区'],
    customItem: '全部',
    detail: null,
    name: null,
    phone: null

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
  chooseLoc: function () {
    var that = this;
    qqmapsdk = new QQMapWX({
      //此key需要用户自己申请
      key: 'FRLBZ-D6ERG-CQ7Q4-ITLQ6-IWXGZ-WCBR5'
    });
    wx.chooseLocation({
      type: 'wgs84',
      success: function (res) {
        //2、根据坐标获取当前位置名称，显示在顶部:腾讯地图逆地址解析
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (addressRes) {
            that.setAddress(addressRes);
          }
        })
      }
    })
  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  setAddress: function (data) {
    console.log(data)
    var addressdetail = data.result.formatted_addresses.recommend
    var address = data.result.address_component;


    this.setData({
      region: [
        address.province,
        address.city,
        address.district
      ],
      detail: addressdetail
    });
  },
  saveAddress: function () {
    var name = this.data.name;
    var phone = this.data.phone;
    var detail = this.data.detail;
    // var address = this.data.region[0] + this.data.region[1] + this.data.region[2] + detail;
    var province = this.data.region[0];
    var city = this.data.region[1];
    var reigion = this.data.region[2];
    if (name == null) {
      wx.showToast({
        title: '请输入姓名',
        image: '../../icon/hint.png',
        duration: 2000
      });
      return false;
    } else if (phone == null) {
      wx.showToast({
        title: '请输入电话',
        image: '../../icon/hint.png',
        duration: 2000
      });
      return false;
    } else if (detail == null) {
      wx.showToast({
        title: '请输入详细地址',
        image: '../../icon/hint.png',
        duration: 2000
      });
      return false;
    }
    var openId = app.globalData.openid;
    var address = {
      name: name,
      phone: phone,
      province: province,
      city: city,
      reigion: reigion,
      detail: detail,
      user: openId
    }
    wx.request({
      url: 'http://localhost:8083/address/save',
      data: address,
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        wx.showToast({
          title: '保存成功',
          // image: '../../icon/hint.png',
          icon: 'sucess',
          duration: 5000
        });
        wx.navigateTo({
          url: '../address/address',
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '保存失败',
          image: '../../icon/hint.png',
          duration: 2000
        });
      },
      complete: function (res) { },
    })
  },
  setName: function (e) {
    console.log(e)
    if (null != e.detail.value && "" != e.detail.value) {
      this.setData({
        name: e.detail.value
      })
    }

  },
  setPhone: function (e) {
    if (null != e.detail.value && "" != e.detail.value) {
      this.setData({
        phone: e.detail.value
      })
    }
  },
  setDetail: function (e) {
    if (null != e.detail.value && "" != e.detail.value) {
      this.setData({
        detail: e.detail.value
      })
    }
  }
})