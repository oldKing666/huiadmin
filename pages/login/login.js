// var app = getApp();
import { Config } from '../../utils/config.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
 
  // button 获取用户信息
  onGotUserInfo: function (e) {
    console.log(e.detail.errMsg)
    var that = this;
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          console.log('授权了走login方法')
          that.login();
        } else {
          console.log('拒绝了授权走')
          that.showSettingToast('请授权!');
        }
        
      },

    })

  },


  // 登录
  login: function () {
    var that = this
    wx.login({
      success: function (res) {
        console.log('wx.login成功');
        if (res.code) {
          //发起网络请求
          wx.request({
            url: Config.restUrl+'getOpenid',
            data: { code: res.code },
            success: function (res) {
              console.log(res);
              if(res.data.status== 200){

              wx.setStorageSync('token', res.data.token);

                wx.showToast({
                  title: '登录成功',
                  icon: 'success',
                  duration: 2000,
                  success: function () {
                    wx.reLaunch({
                      url: '../my/my'
                    })
                  }
                })

              }

      
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }


      },
      fail: function (res) {
        console.log("wx.login接口调用失败");
      },

    })

  },


  // 未授权提示  去打开权限设置页提示框
  showSettingToast: function (e) {
    wx.showModal({
      title: '提示！',
      confirmText: '去设置',
      showCancel: false,
      content: e,
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '../setting/setting',
          })
        }
      }
    })
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

  }
})