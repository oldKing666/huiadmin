import { List } from 'list-model.js';

var list = new List(); //实例化 对象

Page({

  /**
   * 页面的初始数据
   */
  data: {
    option1: [
      { text: '默认排序', value: '' },
      { text: '价格从高到低', value: '1' },
      { text: '价格从低到高', value: '2' },
    ],
    // 此处为对应上传参数 设计一致
    option2: [
      { text: '不限', value: '' },
      { text: '800元以下', value: '0-800' },
      { text: '800-1200元', value: '800-1200' },
      { text: '1200-2000元', value: '1200-2000'  },
      { text: '2000-3000元', value: '2000-3000' },
      { text: '3000-5000元', value: '3000-5000' },
      { text: '5000-10000元', value: '5000-10000'},
      { text: '10000元以上', value: '10000-50000' },
    ],

    option3: [
      { text: '一室', value: '1室' },
      { text: '二室', value: '2室' },
      { text: '三室', value: '3室' },
      { text: '四室', value: '4室' },
      { text: '五室', value: '5室' },
    ],

     // 房源列表
    recommendList:[],
    pages:1

  },


  // 修改排序事件
  changeOrder: function (e) {
    var that = this;
    console.log(e);
    var param = e.detail;
    wx.setStorageSync('order', param);
    //初始化数据
    that.setData({
      pages: 1,
      recommendList: [],
    })

    this.getMore();
  },


// 修改租金事件
  changeRent:function(e){
    var that = this;
    console.log(e);
    var param = e.detail;
    wx.setStorageSync('rent', param);
    //初始化数据
    that.setData({
      pages: 1,
      recommendList: [],
    })

   this.getMore();
  // 原始写法
    // list.getList(page,data => {
    //   console.log(data);
    //   if (data.code !== 0) {
    //     that.setData({
    //       recommendList: data.data,
    //     });
    //   }
    // });
  },

  // 改变户型事件
  changeHouse:function(e){
    var that = this;

    var param = e.detail;
    wx.setStorageSync('house', param);

    //初始化数据
    that.setData({
      pages: 1,
      recommendList: [],
    })

    this.getMore();

  },


// 事件跳转（）
  // goDate: function (event) {
  //   console.log(event)
  //   var id = event.currentTarget.dataset['id'];//获取传参过来的id
  //   console.log(id)
  //   wx.navigateTo({
  //     url: '/pages/data/data?id=' + id,
  //   })
  // },

// 下拉加载
  getMore: function () {

    wx.showToast({
      title: "正在拼命加载中...",
      icon: "loading"
    });

    var that = this;
    let page = this.data.pages;
    list.getList(page,data => {
      console.log(data);

      if (data.data.length > 0) {
        this.setData({
          recommendList: [...this.data.recommendList, ...data.data],
          pages: ++page
        })
      } else {
        // 记录没有数据
        wx.showToast({
          title: '没有更多最新的数据了！',
          icon: 'none',
          duration: 2000,
          mask: true
        });
      }



    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options)

// 搜索(有搜索走搜索))
    if (options.keywords) {
      list.searchlist(options.keywords,data=>{
        if (data.code !== 0) {
          that.setData({
            recommendList: data.data,
          });
        }

      })
    }else{

    if (options.cate_id==undefined){
      options.cate_id=''
    }
    wx.setStorageSync('cate_id', options.cate_id);
    // let pages = this.data.pages;
    // list.getList(pages,data => {
    //   console.log(data);
    //   if (data.code !== 0) {
    //     that.setData({
    //       recommendList: data.data,
    //     });
    //   }

    // })

    this.getMore();
  
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {





  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
   

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('页面关闭')
    wx.removeStorageSync('cate_id');
    wx.removeStorageSync('rent');
    wx.removeStorageSync('house');
    wx.removeStorageSync('order');
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */

  onPullDownRefresh: function () {
    console.log("下拉刷新....")
    this.onLoad(() => {
      wx.stopPullDownRefresh()////停止当前页面下拉刷新
    });

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('上拉')
    // this.getMore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})