import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toast from 'components/common/toast'
import FastClick from 'fastclick'
import LazyLoad from 'vue-lazyload'

Vue.config.productionTip = false
//事件总线
Vue.prototype.$bus = new Vue()
// fastclick解决移动端300ms的延迟问题
FastClick.attach(document.body)
//图片懒加载
Vue.use(LazyLoad,{
  loading:require('assets/img/common/placeholder.png')
})
Vue.use(Toast)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
