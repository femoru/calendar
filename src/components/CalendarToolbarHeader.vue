<template>
  <v-toolbar>
    <v-row no-gutters>
      <v-col cols="auto">
        <v-btn text @click.stop="monthDown" class="calendar-prev-month">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <v-menu transition="scale-transition" offset-y min-width="auto">
          <template v-slot:activator="{ on, attrs }">
            <v-btn block text v-bind="attrs" v-on="on">
              <span :class="[$vuetify.breakpoint.mobile?'text-h6':'text-h4','calendar-title']">
              {{ $dayjs(month).format("MMMM YYYY") }}
              </span>
            </v-btn>
          </template>
          <v-date-picker
            type="month"
            v-model="month"
            no-title
            scrollable
            @input="$emit('input', $event)"
          />
        </v-menu>
      </v-col>
      <v-col cols="auto"
        ><v-btn text @click.stop="monthUp" class="calendar-next-month">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-toolbar>
</template>

<script>
export default {
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
  created() {
    this.month = this.value;
  },
  methods: {
    monthUp() {
      this.month = this.$dayjs(this.month).add(1, "month").format("YYYY-MM");
      this.$emit("input", this.month);
    },
    monthDown() {
      this.month = this.$dayjs(this.month)
        .subtract(1, "month")
        .format("YYYY-MM");
      this.$emit("input", this.month);
    },
  },
};
</script>
