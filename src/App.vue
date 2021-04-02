<template>
  <v-app>
    <v-main>
      <Calendar v-model="month" @click:day="click" />
    </v-main>
  </v-app>
</template>

<script>
import Calendar from "./components/Calendar";

export default {
  name: "App",

  components: {
    Calendar,
  },

  data: () => ({
    month: new Date().toISOString().substr(0, 7),
  }),
  methods: {
    click(day) {
      alert(day)
    }
  },
};
</script>
