import { Data } from 'data_model.js';

var data = new Data(); //实例化 对象


Page({

  /**
   * 页面的初始数据
   */
  data: {
    ellipsis: true, // 文字是否收起，默认收起
    // 初始地图显示的位置
    lat: 23.099994,
    lng: 113.324520,
    // 地图标记点
    markers: [{
        id:'',
        latitude: 23.099994,
        longitude: 113.324520,
        iconPath: '/images/location.png',
      }],

  },


  /**
 * 收起/展开按钮点击事件
 */
  ellipsis: function () {
    var value = !this.data.ellipsis;
    this.setData({
      ellipsis: value
    })
  },



// 点击拨打电话
  callPhone:function(e){
    // console.log(e)  直接打印不出
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone, 
    })
  },

  // 举报事件跳转（）
  goTip: function (event) {
    console.log(event)
    var id = event.currentTarget.dataset['id'];//获取传参过来的id
    console.log(id)
    wx.navigateTo({
      url: '/pages/tip/tip?id=' + id,
    })
  },
 


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options)

    data.getData(options.id, cellbackData => {
      console.log(cellbackData);
      that.setData({
        data: cellbackData,
        markers: [{
          id: cellbackData.id ,
          title: cellbackData.rent_title,
          latitude: cellbackData.lat,
          longitude: cellbackData.lng,
        }],

        
      });
    })

    that.setData({
      collectData: options.id//把获取的id存到data中，当作一个变量供下边调用
    })


    that.getlike();//此方法是：页面加载时，获取缓存中的状态

  },


  // 获取缓存状态方法
  getlike(){
    let CollectState = wx.getStorageSync("like");//获取全部文章缓存状
    //这里我们做一个判断，如果缓存中有这个值，取到id对应在缓存中的状态，存到data中，
    //如果没有这个值，把id对应在缓存中的状态设置为false
    if (CollectState) {// 判断如果缓存中有这个值 
      // 获取当前文章对应在缓存中的状态
      let collcetState = CollectState[this.data.collectData];
      this.setData({
        isShow: collcetState//把这个状态存到data中
      })
    } else {
      let CollectState = {};
      CollectState[this.data.collectData] = false;//没有这个值，默认把点赞的这个状态设置为false，
      // 当然不设置false，它默认也是false，未选中的状态
      wx.setStorageSync("like", CollectState);
    }


  },


  like: function (e) {
    // console.log(e.currentTarget.dataset.id)

    // 获取当前缓存中的所有状态
    let getSecCollect = wx.getStorageSync("like");
    // 获取当前页面的收藏按钮的状态  this.data.collectData就是当前的页面的id，在data中存储的
    let getSecCollectState = getSecCollect[this.data.collectData];
    // 然后当前收藏按钮的状态取反
    getSecCollectState = !getSecCollectState;
    // 把取反的值的状态 在赋给 当前按钮的状态
    getSecCollect[this.data.collectData] = getSecCollectState;
    wx.setStorageSync("like", getSecCollect)//在缓存中设置改变之后的状态
    this.setData({
      isShow: getSecCollectState//把更新过的收藏按钮的状态赋值给isShow
    })

    // this.showTips('操作成功','成功',false)

  },


  /*
   * 提示窗口
   * params:
   * title - {string}标题
   * content - {string}内容
   * flag - {bool}是否跳转到 "我的页面"
   */
  showTips: function (title, content, flag) {
    wx.showModal({
      title: title,
      content: content,
      showCancel: false,
      success: function (res) {
        if (flag) {
          wx.switchTab({
            url: '/pages/my/my'
          });
        }
      }
    });
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})