<template>
  <div>
    <calendar-toolbar-header v-model="month" />
    <v-row no-gutters>
      <v-col class="elevation-2 calendar-cell" v-for="(n, index) in 7" :key="'head' + index">
        <v-alert
          border="bottom"
          colored-border
          color="deep-purple accent-4"
          elevation="2"
          class="text-capitalize mb-0 text-center text-h6 rounded-b-sm"
        >
          {{ getDayName(n) }}</v-alert
        >
      </v-col>
    </v-row>
  </div>
</template>
<script>
import CalendarToolbarHeader from "./CalendarToolbarHeader.vue";

export default {
  components: { CalendarToolbarHeader },
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      month: "",
    };
  },
  watch: {
    month(newValue) {
      this.$emit("input", newValue);
    },
  },
  created() {
    this.month = this.value;
  },
  computed: {
    daysNames() {
      return this.$vuetify.breakpoint.mobile
        ? this.$dayjs.weekdaysMin()
        : this.$dayjs.weekdays();
    },
  },
  methods: {
    getDayName(dayNumber) {
      return this.daysNames[dayNumber - 1];
    },
  },
};
</script>