import { Base } from '../../utils/base.js';

class Data extends Base {
  constructor() {
    super();
  }







  //获取详细
  getData(id,cellback) {
    // var that=this;
    var params = {
      url: 'data/' + id,
      sCallback: function (data) {
        // console.log(data);
        cellback && cellback(data);
      }
    };

    this.request(params);
  };









};
export {Data};
