<template>
  <v-app>
    <v-main :key="$dayjs.locale()">
      <Calendar
        v-model="month"
        :reminders="reminders"
        @click:day="callNew"
        @click:reminder="callUpdate"
        @delete:day="callDeleteDate"
      />
      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            elevation="2"
            fab
            bottom
            right
            fixed
            dark
            v-bind="attrs"
            v-on="on"
            color="primary"
            @click="callNew(month)"
            ><v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>New Reminder</span>
      </v-tooltip>
      <v-menu absolute :close-on-content-click="false">
        <template v-slot:activator="{ on, attrs }">
          <v-btn elevation="2" fab top right fixed v-bind="attrs" v-on="on">
            <v-icon>mdi-cog</v-icon>
          </v-btn>
        </template>
        <v-list two-line>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-translate</v-icon>
            </v-list-item-icon>
            <v-switch true-value="en" false-value="es" @click="changeLocale" />
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-theme-light-dark</v-icon>
            </v-list-item-icon>
            <v-switch v-model="$vuetify.theme.dark" />
          </v-list-item>
        </v-list>
      </v-menu>
      <form-reminder
        v-model="dialogReminder"
        :reminder="editReminder"
        @update:reminder="save"
        @delete="deleteReminder"
      />
    </v-main>
  </v-app>
</template>

<script>
import FormReminder from "./components/FormReminder.vue";
import Calendar from "./components/Calendar";

export default {
  name: "App",

  components: {
    Calendar,
    FormReminder,
  },

  data: () => ({
    editReminder: {
      id: null,
      day: "",
      color: "#FF0000",
      text: "",
      time: "",
      weather: null,
    },
    dialogReminder: false,
    month: new Date().toISOString().substr(0, 10),
    reminders: [
      {
        id: 1,
        text: "Almorzar con mi esposa en chipichape",
        city: "Cali, Valle del Cauca, Colombia",
        day: "2021-04-02",
        time: "12:00",
        color: "green",
        weather: null,
      },
      {
        id: 2,
        text: "Trabajar en el proyecto de Jobsify",
        city: "Cali, Valle del Cauca, Colombia",
        day: "2021-04-02",
        time: "13:00",
        color: "pink",
        weather: null,
      },
      {
        id: 3,
        text: "Gimnasio",
        city: "Cali, Valle del Cauca, Colombia",
        day: "2021-04-02",
        time: "19:00",
        color: "blue",
        weather: null,
      },
      {
        id: 4,
        text: "Almorzar con mi esposa en chipichape",
        city: "Cali, Valle del Cauca, Colombia",
        day: "2021-04-03",
        time: "12:00",
        color: "green",
        weather: null,
      },
      {
        id: 5,
        text: "Almorzar con mi esposa en chipichape",
        city: "Cali, Valle del Cauca, Colombia",
        day: "2021-04-04",
        time: "12:00",
        color: "green",
        weather: null,
      },
      {
        id: 6,
        text: "Almorzar con mi esposa en chipichape",
        city: "Cali, Valle del Cauca, Colombia",
        day: "2021-04-05",
        time: "12:00",
        color: "green",
        weather: null,
      },
    ],
  }),
  created() {
    this.restoreEditReminder();
  },
  methods: {
    callNew(day) {
      this.restoreEditReminder();
      this.editReminder.day = day;
      this.dialogReminder = true;
    },
    callUpdate(reminder) {
      this.editReminder = { ...reminder };
      this.dialogReminder = true;
    },
    save(reminder) {
      if (reminder.id === null) {
        reminder.id = this.reminders.length;
        this.reminders.push(reminder);
      } else {
        const indexOf = this.reminders.findIndex((r) => r.id === reminder.id);
        this.reminders.splice(indexOf, 1, reminder);
      }
      this.restoreEditReminder();
    },
    restoreEditReminder() {
      const today = this.$dayjs();
      this.editReminder = {
        id: null,
        day: today.format("YYYY-MM-DD"),
        color: "#FF0000",
        text: "",
        time: today.format("HH:mm"),
        weather: null,
      };
    },
    changeLocale() {
      const newLocale = this.$dayjs.locale() === "es" ? "en" : "es";
      this.$dayjs.locale(newLocale);
      this.$vuetify.lang.current = newLocale;
      this.$forceUpdate();
    },
    deleteReminder(reminder) {
      const indexOf = this.reminders.findIndex((r) => r.id === reminder.id);
      this.reminders.splice(indexOf, 1);
    },
    callDeleteDate(day){
      const toDelete = this.reminders.filter(r => r.day === day)
      toDelete.forEach(this.deleteReminder)
    }
  },
};
</script>
