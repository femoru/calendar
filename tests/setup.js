import Vue from 'vue'
import Vuetify from 'vuetify'
import dayjs from 'dayjs'

import 'dayjs/locale/es'
import localeData from 'dayjs/plugin/localeData'

dayjs.locale('es')
dayjs.extend(localeData)


Vue.config.productionTip = false;
Vue.prototype.$dayjs = dayjs

Vue.use(Vuetify)