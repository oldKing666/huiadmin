import { MyFavorite } from 'myFavorite_model.js';
var myFavorite = new MyFavorite(); 


Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden:true
  },



  goDate: function (event) {
    console.log(event)
    var id = event.currentTarget.dataset['id'];//获取传参过来的id
    console.log(id)
    wx.navigateTo({
      url: '/pages/data/data?id=' + id,
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    myFavorite.getMyFavorite(data => {
      console.log(data);

      if (data.code != 0) {
      that.setData({
        recommendList: data,
      });
      }else{
        that.setData({
          hidden: false,
        });
      }

    });

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
    
    if (wx.getStorageSync('token') == '') {
      wx.redirectTo({
        url: '/pages/login/login',
      })
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

  }
})