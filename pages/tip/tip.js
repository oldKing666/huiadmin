// pages/tip/tip.js

var util = require('../../utils/util.js');
import { Tip } from 'tip_model.js';
var tip = new Tip();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    liyouArray: ['房源已出租', '房东是中介','房屋信息虚假','其他'],
    liyou:'',
    rent_id:''
  },


  // 普通选择器（举报理由）
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，下标值为', e.detail.value)
    console.log('picker发送选择改变，携带值为', this.data.liyouArray[e.detail.value])
    this.setData({
      liyou: this.data.liyouArray[e.detail.value]
    })
  },


  // 表单提交
  formSubmit(e) {
    var that = this;
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var all = e.detail.value;
    console.log(all);

    var pages = getCurrentPages();
    console.log(all);
    // 验证表单

    if (all.contact == '' || util.isphone(all.contact) == null) {
      util.errorMsg('请输入正确的手机号');
      return false
    }

    if (all.reason == '') {
      util.errorMsg('举报理由不能为空');
      return false
    }

    if (all.content == '') {
      util.errorMsg('补充信息不能为空');
      return false
    }

    tip.reason(all,cellback=>{
      console.log(cellback.code)
      if (cellback.code==1){
  
        wx.showToast({
          title: "成功",
          icon: "success",
          duration: 2000,
          success: function () {
            setTimeout(function () {
              wx.navigateBack();
            }, 2000);// 分钟转换毫秒
          }
       
        });

      }else{
        util.errorMsg('提交失败！');
      }
    });

  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    if (wx.getStorageSync('token') == '') {
      wx.redirectTo({
        url: '/pages/login/login',
      })
    }
    // 将房源id传递并增加到隐藏文本中
    console.log(options.id)
    this.setData({
      rent_id: options.id
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

  }
})