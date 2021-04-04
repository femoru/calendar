import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
import dayjs from 'dayjs'

import 'dayjs/locale/es'
import 'dayjs/locale/en'
import localeData from 'dayjs/plugin/localeData'

// dayjs.locale('es')
dayjs.extend(localeData)


Vue.config.productionTip = false;
Vue.prototype.$dayjs = dayjs

new Vue({
  store,
  vuetify,
  beforeCreate() { this.$store.commit('store/initStore');},
  render: (h) => h(App),
}).$mount("#app");
