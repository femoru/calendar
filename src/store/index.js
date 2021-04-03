import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    reminders: []
  },
  mutations: {
    initStore(state) {
      const reminders = localStorage.getItem('reminders')
      if (reminders) {
        state.reminders = JSON.parse(reminders)
      }
      console.log(state.reminders.length)
    },
    saveStore(state) {
      localStorage.setItem("reminders", JSON.stringify(state.reminders))
    },
    addReminder(state, reminder) {
      reminder.id = state.reminders.length;
      state.reminders.push({ ...reminder })
      this.commit('saveStore')
    },
    editReminder(state, reminder) {
      const index = state.reminders.findIndex(r => r.id === reminder.id)
      state.reminders.splice(index, 1, reminder)
      this.commit('saveStore')
    },
    deleteReminder(state, reminder) {
      const index = state.reminders.findIndex(r => r.id === reminder.id)
      state.reminders.splice(index, 1)
      this.commit('saveStore')
    },
    deleteAllReminder(state) {
      state.reminders = []
      this.commit('saveStore')
    }
  },
  actions: {
    changeLocale(context, { vm }) {
      const newLocale = vm.$dayjs.locale() === "es" ? "en" : "es";
      vm.$dayjs.locale(newLocale);
      vm.$vuetify.lang.current = newLocale;
      vm.$forceUpdate()
    }
  },
});
