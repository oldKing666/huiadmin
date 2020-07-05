
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


 
// 错误提示
function errorMsg(title){
  wx.showToast({
    title: title,
    icon: 'none',
    duration:1500,
  });

};

// 判断是否是手机号
function isphone(phone){
  var mobile = /^[1][3,4,5,7,8,9][0-9]{9}$/;
  // exec() 方法用于检索字符串中的正则表达式的匹配。
 return  mobile.exec(phone)  //校验手机号

};





//（作用：将模块接口暴露出来），否则会报错：util.trim is not a function;
module.exports = {
  formatTime: formatTime,
  errorMsg: errorMsg,
  isphone: isphone

}
