function UUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

export const store = {
    namespaced: true,
    // states
    state: {
        reminders: []
    },

    // actions
    actions: {
        changeLocale(context, { vm }) {
            const newLocale = vm.$dayjs.locale() === "es" ? "en" : "es";
            vm.$dayjs.locale(newLocale);
            vm.$vuetify.lang.current = newLocale;
            vm.$forceUpdate()
        }
    },

    // mutations
    mutations: {
        initStore(state) {
            const reminders = localStorage.getItem('reminders')
            if (reminders) {
                state.reminders = JSON.parse(reminders)
            }
        },
        saveStore(state) {
            localStorage.setItem("reminders", JSON.stringify(state.reminders))
        },
        addReminder(state, reminder) {
            reminder.id = UUID();
            state.reminders.push({ ...reminder })
            this.commit('store/saveStore')
        },
        editReminder(state, reminder) {
            const index = state.reminders.findIndex(r => r.id === reminder.id)
            state.reminders.splice(index, 1, reminder)
            this.commit('store/saveStore')
        },
        deleteReminder(state, reminder) {
            const index = state.reminders.findIndex(r => r.id === reminder.id)
            state.reminders.splice(index, 1)
            this.commit('store/saveStore')
        },
        deleteAllReminder(state) {
            state.reminders = []
            this.commit('store/saveStore')
        }
    }
}
