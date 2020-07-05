// 引用使用es6的module引入和定义
// 全局变量以g_开头
// 私有函数以_开头
import { Config } from 'config.js';

class Token {
  constructor() {
  }

  verify() {
    var token = wx.getStorageSync('token');
    if (!token) {
      // this.getTokenFromServer();
    }
    else {
      this._veirfyFromServer(token);
    }
  }



  _veirfyFromServer(token) {
    console.log('走验证了')
    var that = this;
    wx.request({
      // url: 'http://zufang.xiaoxixi.store/index.php/api/v1/checkToken',
      url: Config.restUrl +'checkToken',
      method: 'get',
      // data: {
      //   token: token
      // },
      header: {
        'content-type': 'application/json',
        'token': token//token存在内存中
      },
      success: function (res) {
        // console.log(res.data.status)
        var valid = res.data.status;
        if (valid!=200) {
          that.getTokenFromServer();
        }
      }
    })
  }



  getTokenFromServer(callBack) {
    var that = this;
    wx.login({
      success: function (res) {
        wx.request({
          // url:  'http://zufang.xiaoxixi.store/index.php/api/v1/getOpenid',
          url: Config.restUrl + 'getOpenid',
          method: 'get',
          data: {
            code: res.code
          },
          success: function (res) {
            // console.log(res.data)
            wx.setStorageSync('token', res.data.token);
            
            callBack && callBack(res.data.token);
          }
        })
      }
    })
  }
}

export { Token };