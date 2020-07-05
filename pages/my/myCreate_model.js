import { Base } from '../../utils/base.js';

class MyCreate extends Base {
  constructor() {
    super();
  }




  //我的发布
 getMyCreate(cellback) {
    var param = {
      url: 'myCreate',
      sCallback: function (data) {
        // console.log(data);
        cellback && cellback(data);
      }
    };

    this.request(param);
  }


  //删除我的发布
  delMyCreate(id,cellback) {
    var param = {
      data: {'id':id},//数据必须是数组或json
      url: 'delMyCreate',
      sCallback: function (data) {
        // console.log(data);
        cellback && cellback(data);
      }
    };
    this.request(param);
  }
// 刷新
  updateMyCreate(id, cellback) {
    var param = {
      data: { 'id': id },//数据必须是数组或json
      url: 'updateMyCreate',
      sCallback: function (data) {
        // console.log(data);
        cellback && cellback(data);
      }
    };
    this.request(param);
  }



};
export {MyCreate};

