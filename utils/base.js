
import { Config } from 'config.js';

class Base {
  // 构造方法
  constructor() {

  }




  //封装 http 请求类,

  request(params) {
    var url = Config.restUrl+params.url;
    if (!params.type) {
      params.type = 'GET';
    }


    wx.request({
      url: url,
      data: params.data,
      method: params.type,
      header: {
        'content-type': 'application/json',
        'token': wx.getStorageSync('token') //token存在内存中
      },
      success: function (res) {
        params.sCallback && params.sCallback(res.data);
      },
      fail: function (err) {
        params.eCallback && params.eCallback(err);

      }

    })


  }

  /*获得元素上的绑定的值*/
  getDataSet(event, key) {
    return event.currentTarget.dataset[key];
  };












}



export {
  Base
};


