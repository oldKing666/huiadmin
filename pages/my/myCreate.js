// pages/my/myCreate.js
var util = require('../../utils/util.js');

import {MyCreate} from 'myCreate_model.js';
var myCreate = new MyCreate(); 



Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;

    myCreate.getMyCreate(data => {
      console.log(data);
      if (data.code !== 0) {
        that.setData({
          recommendList: data,
        });
      }else{
        util.errorMsg(data.msg)
  
      }
      
    });
 
  },

//删除
  del:function(event){
    // console.log(event)
    wx.showModal({
      title: '提示',
      content: '确定要删除么？',
      success: function (res) {
        if (res.confirm) {//这里是点击了确定以后

          var id = event.currentTarget.dataset['id'];//获取传参过来的id
          myCreate.delMyCreate(id, data => {
            // console.log(data);
            if (data.code == 1) {
              wx.showToast({
                title: "成功",
                icon: "success",
                duration: 2000,
                success: function () {
                  setTimeout(function () {
                    wx.redirectTo({
                      url: '/pages/my/myCreate',
                    })
                  }, 1000);// 分钟转换毫秒
                }

              });

            } else {
              util.errorMsg('删除失败！');
            }

          })

        } else {
          console.log('用户点击取消')
        }
      }
    })

  },

  // 刷新

  update: function (event) {
    var id = event.currentTarget.dataset['id'];//获取传参过来的id
    myCreate.updateMyCreate(id, data => {
      // console.log(data);
      if (data.code == 1) {
        wx.showToast({
          title: "已刷新",
          icon: "success",
          duration: 2000,
        });

      } else {
        util.errorMsg('刷新失败！');
      }

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
    console.log("下拉刷新....")
    this.onLoad(() => {
      wx.stopPullDownRefresh()////停止当前页面下拉刷新
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})