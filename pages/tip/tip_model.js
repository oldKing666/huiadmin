import { Base } from '../../utils/base.js';

class Tip extends Base {
  constructor() {
    super();
  }


  reason(data,cellback) {
    var params = {
      url: 'reason',
      type: 'POST',
      data: data,
      header: {
        //由于POST和GET传送数据的方式不一样，POST的header必须是
        // "Content-Type": "application/x-www-form-urlencoded"
        'content-type': 'application/x-www-form-urlencoded',
      },

      sCallback: function (data) {
        // console.log(data);
        cellback && cellback(data);
      }
    };

    this.request(params);
  }












};
export { Tip };

