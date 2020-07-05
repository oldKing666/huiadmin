
// var Base = require('../../utils/base.js').base;
import { Base } from '../../utils/base.js';

class Index extends Base {
  constructor() {
    super();
  }




  //首页获取推荐列表
  getRecommend(cellback) {
    var param = {
      url: 'recommend',
      sCallback: function (data) {
        // console.log(data);
        cellback && cellback(data);
      }
    };

    this.request(param);
  }



  //首页获取分类信息
  getCategory(cellback) {
    // var that=this;
    var param = {
      url: 'cate',
      sCallback: function (data) {
        // console.log(data);
        cellback && cellback(data);
      }
    };

    this.request(param);
  }


  //首页获取banner
  getBanner(cellback) {
    // var that=this;
    var param = {
      url: 'banner',
      sCallback: function (data) {
        // console.log(data);
        cellback && cellback(data);
      }
    };

    this.request(param);
  }



};
export { Index };

