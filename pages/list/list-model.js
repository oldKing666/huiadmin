
import { Base } from '../../utils/base.js';

class List extends Base {
  constructor() {
    super();
  }


  //获取房源列表
  getList(pages,cellback) {
    
    var params = {
      url: 'allList',
      data: { 'cate_id': wx.getStorageSync('cate_id'), 'rent': wx.getStorageSync('rent'), 'house': wx.getStorageSync('house'), 'order': wx.getStorageSync('order'),'page':pages},
      sCallback: function (data) {
        // console.log(data);
        cellback && cellback(data);
      }
    };

    this.request(params);
  }


  //搜索房源列表
  searchlist(keyword,cellback) {
    var params = {
      url: 'allList',
      data: { 'keywords': keyword},
      sCallback: function (data) {
        // console.log(data);
        cellback && cellback(data);
      }
    };

    this.request(params);
  }



};
export { List };

