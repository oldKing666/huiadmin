import { Base } from '../../utils/base.js';

class MyFavorite extends Base {
  constructor() {
    super();
  }




  //首页获取推荐列表
  getMyFavorite(cellback) {

    var data = wx.getStorageSync('like');

    // 遍历json对象，获取键、值集合
    var keyAry = [];
    for (var key in data) {
      if (data[key] == true){
        keyAry.push(key);
      }
      // valueAry.push(data[key]);
    }
    //打印输出
    // console.log(keyAry);
    // console.log(valueAry);

    var like = keyAry;

    var param = {
      url: 'myFavorite',
      data: like,
      sCallback: function (data) {
        // console.log(data);
        cellback && cellback(data);
      }
    };

    this.request(param);
  }

};
export { MyFavorite };

