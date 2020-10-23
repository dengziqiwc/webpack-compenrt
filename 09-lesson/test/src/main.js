// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios';
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vuex from 'vuex'
import Highchart from "highcharts/highcharts";
import HighchartsVue from "highcharts-vue";
import stockInit from "highcharts/modules/stock";

stockInit(Highchart);
Vue.use(HighchartsVue);

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    manydevice:[]
  },
  mutations: {

  }
})
Vue.use(ElementUI);
Vue.prototype.$axios = axios;
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
