
// var Base = require('../../utils/base.js').base;
import { Base } from '../../utils/base.js';

class Fangyuan extends Base {
  constructor() {
    super();
  }


  //获取分类信息
  getCategory(cellback) {
    // var that=this;
    var params = {
      url: 'cate',
      sCallback: function (data) {
        // console.log(data);
        cellback && cellback(data);
      }
    };

    this.request(params);
  };


  add(cellback) {
    var params = {
      url: 'add',
      type: 'POST',
      header: {
//由于POST和GET传送数据的方式不一样，POST的header必须是
// "Content-Type": "application/x-www-form-urlencoded"
        'content-type': 'application/x-www-form-urlencoded',
      },
    
      sCallback: function (data) {
        console.log(data);
      }
    };
  
    this.request(params);
  }












};
export {Fangyuan };

