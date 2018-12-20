import Vue from 'vue'
var money = Vue.filter('money',function (value) {
  value = String(value)
  var qian = '￥'
  qian += value.substr(0,3)
  return qian
})
export default money
