// pages/search/search.js

var bmap = require('../../libs/bmap-wx.min.js'); 


Page({

  /**
   * 页面的初始数据
   */
  data: {
    sugData: '' ,
    keyword:''

  },


  // 绑定input输入 
  bindKeyInput: function (e) {
    var that = this;
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: '1VeGvZu7NaLTXEjojzp2XNRW8G7sg0h9'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      console.log(data.result)
     var sugData = data.result
        that.setData({
          sugData: sugData
        });
      
    }

    // 发起suggestion检索请求 
    BMap.suggestion({
      query: e.detail.value,
      region: '武汉',
      city_limit: true,
      fail: fail,
      success: success
    });
  } ,

// 将接口数据展示
  getketword:function(event){
    var that = this;
    var keyword = event.currentTarget.dataset.name;
    console.log(keyword)
    that.setData({
      keyword: keyword,
      sugData:''
    });

    wx.navigateTo({
      url: '/pages/list/list?keywords=' + keyword,
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