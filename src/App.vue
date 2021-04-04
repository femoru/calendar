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
            data-testid="formReminder"
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
            <v-switch true-value="en" false-value="es" :input-value="$vuetify.lang.current" @click="changeLocale" />
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-theme-light-dark</v-icon>
            </v-list-item-icon>
            <v-switch v-model="$vuetify.theme.dark" />
          </v-list-item>
        </v-list>
      </v-menu>
      <v-dialog v-model="dialogReminder" max-width="300px">
        <form-reminder
          :reminder="editReminder"
          @update:reminder="save"
          @delete="deleteReminder"
          @cancel="dialogReminder = false"
        />
      </v-dialog>
    </v-main>
  </v-app>
</template>

<script>
import FormReminder from "./components/FormReminder.vue";
import Calendar from "./components/Calendar";
import { mapState } from 'vuex'
export default {
  name: "App",
  components: { Calendar, FormReminder },
  data: () => ({
    editReminder: {},
    dialogReminder: false,
    month: new Date().toISOString().substr(0, 10),
  }),
  created() {
    this.restoreEditReminder();
  },
  computed: {
    ...mapState('store',['reminders'])
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
        this.$store.commit("store/addReminder", reminder);
      } else {
        this.$store.commit("store/editReminder", reminder);
      }
      this.restoreEditReminder();
      this.dialogReminder = false
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
      this.$store.dispatch("store/changeLocale", { vm: this });
    },
    deleteReminder(reminder) {
      this.$store.commit("store/deleteReminder", reminder);
      this.dialogReminder = false
    },
    callDeleteDate(day) {
      const toDelete = this.reminders.filter((r) => r.day === day);
      toDelete.forEach((r) => this.$store.commit("store/deleteReminder", r));
    },
  },
};
</script>
