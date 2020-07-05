import {
  Index
} from 'index-model.js';
var index = new Index(); //实例化 首页 对象


Page({

  /**
   * 页面的初始数据
   */
  data: {
    recommendList:''
    
  },



  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    // wx.showToast({
    //   title: "加载中...",
    //   icon: "loading"
    // });

    var that = this;


    //首页获取分类
    index.getCategory(data => {
      console.log(data);
      that.setData({
        catrgory: data,
      });

    });


    //首页获取轮播图
    index.getBanner(data => {
      // console.log(data);
      that.setData({
        bannerArr: data,
      });

    });



    //首页推荐
    index.getRecommend(data => {
      console.log(data);
      if(data.code !==0){
        that.setData({
          recommendList: data,
        });
      }
  

    });


  },


  // 跳转详情页
  goDate: function (event) {
    console.log(event)
    var id = event.currentTarget.dataset['id'];//获取传参过来的id
    console.log(id)
    wx.navigateTo({
      url: '/pages/data/data?id=' + id,
    })

  },


// 使用百度地图接口
search:function(){
  wx.navigateTo({
    url: '/pages/search/search'
  })
},


  // search:function(e){
  //   if (!e.detail) {
  //     return;
  //   }
  //   // console.log(e.detail)

  //   wx.navigateTo({
  //     url: '/pages/list/list?keywords=' + e.detail,
  //   })


  // },







  //分享效果
  onShareAppMessage: function () {
    return {
      title: '首页',
      path: 'pages/index/index'
    }
  }


})







// /**
//  * 生命周期函数--监听页面加载
//  */
// onLoad: function (options) {
//   var that = this;
//   // getNewArticle(that);
// },

/** 私有方法*/
// function getNewArticle (that) {
//   wx.request({
//     url: API_URL ,
//     header: {
//       "Content-Type": "json"
//     },
//     success: function (res) {
//       console.log(res.data.data.data);
//       that.setData({
//         list:res.data.data.data,      
//       });
//     },
//     fail: function () {
//       console.log("网络请求失败");
//     }
//   })
// }