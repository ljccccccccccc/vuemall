// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'


//图片懒加载插件
Vue.use(VueLazyLoad,{
  preLoad: 3,
  loading: '/static/loading-svg/loading-spinning-bubbles.svg',
  attempt: 3
});

//滚动加载插件
Vue.use(infiniteScroll);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
