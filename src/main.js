import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementUI from "element-ui";

import "@galaplat/utils/src/styles/theme/index.css";
import "@galaplat/utils/src/styles/index.less";
import "element-ui/lib/theme-chalk/base.css";

Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
