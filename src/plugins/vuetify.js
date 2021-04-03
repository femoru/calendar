import Vue from "vue";
import Vuetify from "vuetify/lib";
import es from "vuetify/lib/locale/es";


Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },

  },
  lang: {
    locales: { es },
    current: "en",
  },
});
