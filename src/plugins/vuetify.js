import Vue from "vue";
import Vuetify from "vuetify/lib";
import es from "vuetify/lib/locale/es";
import en from "vuetify/lib/locale/en";
import VueI18n from 'vue-i18n'


Vue.use(Vuetify);
Vue.use(VueI18n)

const messages = {
  en: {
    $vuetify: {
      ...en,
      mycalendar: {
        add: 'Add',
        cancel: 'Cancel'
      },
      addreminder: {text:'Add Reminder'}
    },
  },
  es: {
    $vuetify: {
      ...es,
      mycalendar: {
        add: 'Añadir',
        cancel: 'Cancelar'
      },
      addreminder: {text:'Añadir recordatorio'}
    },
  }
}

const i18n = new VueI18n({
  messages, // set locale messages
})


export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: "#76B8B8",
        secondary: "#424242",
        accent: "#BF6C6B",
        error: "#FF5252",
        info: "#76B8B8",
        success: "#4CAF50",
        warning: "#FFC107",
      },
    },
  },
  lang: {
    t: (key, ...params) => i18n.t(key, params),
    locales: { es },
    current: "es",
  },
});
