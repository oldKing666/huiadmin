// pages/fangyuan/fangyuan.js


import { Fangyuan } from 'fangyuan_model.js';
import { Index} from '../index/index-model.js';
import { Config } from '../../utils/config.js';

var util = require('../../utils/util.js');
var bmap = require('../../libs/bmap-wx.min.js'); 

var index = new Index(); //实例化 首页 对象
var fangyuan = new Fangyuan(); //实例化 对象
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */



  data: {
 
    objectArray: [
      // {id: 1,title: '美国'},{ id:2, name: '中国'}, { id: 3, name: '巴西'}, {id: 4, name: '日本'}
    ],
    index: '',
    cate_id:'',
    img_id:'',

    multiArray: [['1室', '2室', '3室', '4室', '5室'], ['1厅', '2厅', '3厅', '4厅', '5厅',], ['1卫', '2卫', '3卫', '4卫', '5卫']],
    objectMultiArray: [
      [
        { id: 0, name: '1室' }, { id: 1, name: '2室' }, { id: 2, name: '3室' }, { id: 3, name: '4室' }, { id: 4, name: '5室' }
      ],
      
      [{ id: 0, name: '1厅' }, { id: 1, name: '2厅' }, { id: 2, name: '3厅' }, { id: 3, name: '4厅' }, { id: 4, name: '5厅' }
  
      ],
      
  
       [
         { id: 0, name: '1卫' }, { id: 1, name: '2卫' }, { id: 2, name: '3卫' }, { id: 3, name: '4卫' }, { id: 4, name: '5卫' }
      ]

    ],

    multiIndex: [0, 0, 0],
    fileList: [],
    keyword: ''
  },



  deleteImg:function(e){
// 获取下标
    let index = e.currentTarget.dataset.index;
    let list = this.data.fileList;
    list.splice(index,1)//删除一个
    this.setData({
      fileList: list
    })
  },



// 普通选择器（租赁方式）
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，下标值为', e.detail.value)
    console.log('picker发送选择改变，携带值为', this.data.objectArray[e.detail.value].id)
    this.setData({
      index: e.detail.value,
      cate_id: this.data.objectArray[e.detail.value].id
    })
  },


// 多列选择器 （户型）
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },


  // 绑定input输入 
  bindKeyInput: function (e) {
    console.log(e)
    var that = this;
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: '1VeGvZu7NaLTXEjojzp2XNRW8G7sg0h9'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      console.log(data.result)
      var sugData = data.result

      that.setData({
        sugData: sugData
      });
    }
    // 发起suggestion检索请求 
    BMap.suggestion({
      query: e.detail.value,
      region: '武汉',
      city_limit: true,
      fail: fail,
      success: success
    });
  },

  // 将接口数据展示
  getketword: function (event) {
    var that = this;
    var keyword = event.currentTarget.dataset.name;
    var location =event.currentTarget.dataset.location;
    console.log(keyword)
    console.log(location)
    that.setData({
      keyword: keyword,
      sugData: '',
      lat: location.lat,
      lng: location.lng
    });
  },



  // 调用选择图片 
  upimg: function () {
    var that = this;
    if (that.data.fileList.length < 6) {
      wx.chooseImage({ //从本地相册选择图片或使用相机拍照
        count: 6, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // console.log(res);
          //前台显示(多次增加)
          that.setData({
            fileList: that.data.fileList.concat(res.tempFilePaths)
          });
        }
      })

    } else {
      wx.showToast({
        title: '最多上传6张图片',
        icon: 'loading',
      });
    }

  },



  /**
   * 上传图片 （函数用  传参返回ID）
   */
upload:function(formData){
  var that = this;

  for (var i = 0; i < that.data.fileList.length; i++) {
      wx.uploadFile({
        // url: 'http://thinkadmin5.com/index.php/api/v1/upload',
        url: Config.restUrl +'upload',
        filePath: that.data.fileList[i],
        name: 'file',
        formData: {'rent_id': formData},
        success(res) {
          console.log(res)
          if(res.data==1){

            wx.showToast({
              title: '发布成功',
              duration:2000,
              success: function () {
                wx.switchTab({
                  url: '/pages/my/my'
                })
              }
            });

          }else{

            wx.showToast({
              title: '图片上传失败！',
              icon: 'warn',
            });

          }



      
        },
        fail(res) {
          console.log('上传api调用失败');
        }


      });

    }


},







// 表单提交
  formSubmit(e) {
    var that=this;
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
   var all = e.detail.value;
    console.log(all);

// 验证表单

    if (that.data.fileList.length == 0) {
      util.errorMsg('请上传图片');
      return false
    }

    if (all.rent_title == '') {
      util.errorMsg('小区名称不能为空');
      return false
    }

    if(all.title==''){
      util.errorMsg('房源标题不能为空'); 
      return false
    }

    if (all.house == '') {
      util.errorMsg('户型未选择');
      return false
    }

    if (all.cate_id == '') {
      util.errorMsg('租赁方式未选择');
      return false
    }

    if (all.size == '') {
      util.errorMsg('请输入面积');
      return false
    }

    if (all.rent == '') {
      util.errorMsg('请输入租金');
      return false
    }

    if (all.content == '') {
      util.errorMsg('请输入房源详情');
      return false
    }

    if (all.name == '') {
      util.errorMsg('请输入姓名');
      return false
    }

    if (all.contact == '' || util.isphone(all.contact)== null) {
      util.errorMsg('请输入正确的手机号');
      return false
    }



   

    wx.request({
      url: Config.restUrl + 'add',
      data: all,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync('token') //token存在内存中
      },
      method: 'POST',
      success: function(res) {
        console.log(res.data);

        if (res.data.code ==0){

          util.errorMsg(res.data.msg)

          wx.redirectTo({
            url: '/pages/login/login',
          })

        }else{


          //  调用 upload（） 将返回id作为参数调用
          that.upload(res.data);

          wx.showToast({
            title: "发布中...",
            icon: "loading",
            duration: 3000
          });

        }



      },
      fail: function(res) {},
      complete: function(res) {},
    })

  },






  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {

    if (wx.getStorageSync('token') == '') {
      wx.redirectTo({
        url: '/pages/login/login',
      })
    }
 

    var that=this;

// 获取租赁方式分类
    index.getCategory(data => {
      console.log(data);
      that.setData({
        objectArray: data,
      });
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
 
    if (wx.getStorageSync('token') == '') {
      wx.redirectTo({
        url: '/pages/login/login',
      })
    }
  },



  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})