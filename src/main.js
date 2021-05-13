import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Router from 'vue-router'
import Axios from "axios";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import './assets/onenet_sdk/sdk.js'; //引入onenet平台的sdk 使用nodejs 作为中间层作jsonp代理转发
import "./assets/iconfont/iconfont.css";

Vue.use(ElementUI);

Vue.config.productionTip = false;
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
Vue.prototype.onenetApi = new OneNetApi('mvPOhagXpWh4W8Isg23tZYZUFik=');//10271224 apikeys
Vue.prototype.$http = Axios;//在原型中引入axios 就能全局引用


new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
