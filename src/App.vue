<template>
  <v-app>
    <v-main :key="$dayjs.locale()">
      <Calendar
        v-model="month"
        :reminders="reminders"
        @click:day="callNew"
        @click:reminder="callUpdate"
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
            @click="dialogReminder = true"
            ><v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>{{ $vuetify.lang.t("$vuetify.addreminder.text") }}</span>
      </v-tooltip>
      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            elevation="2"
            fab
            top
            right
            fixed
            v-bind="attrs"
            v-on="on"
            @click="changeLocale"
          >
            <v-icon>mdi-translate</v-icon>
          </v-btn>
        </template>
        <span>{{ $dayjs.locale() }}</span>
      </v-tooltip>
      <form-reminder v-model="dialogReminder" :reminder.sync="editReminder" />
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
    editReminder: {},
    dialogReminder: false,
    month: new Date().toISOString().substr(0, 7),
    reminders: [
      {
        text: "Almorzar con mi esposa en chipichape",
        city: "Cali, Colombia",
        day: "2021-04-02",
        time: "12:00",
        color: "green",
      },
      {
        text: "Trabajar en el proyecto de Jobsify",
        city: "Cali, Colombia",
        day: "2021-04-02",
        time: "13:00",
        color: "pink",
      },
      {
        text: "Gimnasio",
        city: "Cali, Colombia",
        day: "2021-04-02",
        time: "19:00",
        color: "blue",
      },
      {
        text: "Almorzar con mi esposa en chipichape",
        city: "Cali, Colombia",
        day: "2021-04-03",
        time: "12:00",
        color: "green",
      },
      {
        text: "Almorzar con mi esposa en chipichape",
        city: "Cali, Colombia",
        day: "2021-04-04",
        time: "12:00",
        color: "green",
      },
      {
        text: "Almorzar con mi esposa en chipichape",
        city: "Cali, Colombia",
        day: "2021-04-05",
        time: "12:00",
        color: "green",
      },
    ],
  }),
  methods: {
    callNew(day) {
      this.editReminder = {
        day,
        color: "#FF0000",
        text: "",
        time: "",
        weather: null,
      };
      this.dialogReminder = true;
    },
    callUpdate(reminder) {
      this.editReminder = reminder;
      this.dialogReminder = true;
    },
    changeLocale() {
      const newLocale = this.$dayjs.locale() === "es" ? "en" : "es";
      this.$dayjs.locale(newLocale);
      this.$vuetify.lang.current = newLocale;
      this.$forceUpdate();
    },
  },
};
</script>
