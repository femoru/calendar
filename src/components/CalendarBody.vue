<template>
  <div class="calendar-body">
    <v-row no-gutters>
      <calendar-cell
        v-for="(n, index) in firstMonthDayWeek"
        :key="'prevMonthDay' + index"
        disabled
        :value="prevMonthDays - firstMonthDayWeek + n"
      />
      <calendar-cell @click.native.prevent="$emit('click:day',day(n))"
        :value="n"
        :month="month"
        v-for="(n, index) in monthDays"
        :key="'monthDay' + index"
      />

      <calendar-cell
        :value="n"
        disabled
        v-for="(n, index) in 42 - (monthDays + firstMonthDayWeek)"
        :key="'nextMonthDay' + index"
      />
    </v-row>
  </div>
</template>

<script>
import CalendarCell from "./CalendarCell.vue";
export default {
  components: { CalendarCell },
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      month: new Date().toISOString().substr(0, 7),
    };
  },
  methods: {
    day(day) {
      return this.$dayjs(this.month+"-"+day).format("YYYY-MM-DD");
    },
    getWeeksInMonth(month) {
      let firstDayMonth = this.$dayjs(month).startOf("month");
      let used = firstDayMonth.day() + this.monthDays;
      return Math.ceil(used / 7);
    },
  },
  watch: {
    value: {
      deep: true,
      handler(newValue) {
        this.month = newValue;
      },
    },
  },

  computed: {
    weekCount() {
      return this.getWeeksInMonth(this.month);
    },
    monthDays() {
      return this.$dayjs(this.month).endOf("month").date();
    },
    firstMonthDayWeek() {
      let dayNumber = this.$dayjs(this.month).startOf("month").day();
      return dayNumber === 0 ? 7 : dayNumber;
    },
    prevMonthDays() {
      return this.$dayjs(this.month).subtract(1, "month").endOf("month").date();
    },
  },
};
</script>
