<template>
  <v-col class="elevation-1 flex-grow-0 calendar-cell">
    <v-card :color="disabled ? 'secondary lighten-5' : ''" max-height="100%">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn :disabled="disabled" icon outlined :color="colorAvatar" small v-bind="attrs" v-on="on">
            {{ value }}
          </v-btn>
        </template>
        <span>{{ myDay }}</span>
      </v-tooltip>
      <v-card-text class="pa-0" style="height: 100%">
        <p
          v-for="n in 10"
          :key="n"
          class="text-truncate text--secondary d-block mb-0"
        >
          10am Lorem Ipsum ta asca da sama
        </p>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Number,
    },
    month: {
      type: String,
    },
  },
  data() {
    return {
      today: new Date().toISOString().substr(0, 10),
    };
  },
  computed: {
    colorAvatar() {
      return this.today === this.myDay
        ? "deep-purple accent-4 white--text"
        : "secondary lighten-5";
    },
    myDay() {
      return this.month
        ? this.$dayjs(this.month + "-" + this.value).format("YYYY-MM-DD")
        : "";
    },
  },
};
</script>
<style scoped>
.calendar-cell {
  height: calc(100vh / 8);
  overflow-y: hidden;
}
</style>