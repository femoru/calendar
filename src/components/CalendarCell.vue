<template>
  <v-col class="elevation-2 flex-grow-0 calendar-cell align-stretch">
    <v-card class="fill-height rounded-0">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            :disabled="disabled"
            icon
            outlined
            :color="colorAvatar"
            small
            v-bind="attrs"
            v-on="on"
            @click.native.prevent="$emit('click:day', myDay)"
          >
            {{ value }}
          </v-btn>
        </template>
        <span>{{ myDay }}</span>
      </v-tooltip>
      <v-card-text class="pa-0">
        <p
          v-for="(reminder, index) in items"
          :key="value + '' + index"
          class="text-truncate d-block mb-0 font-weight-bold text-caption"
          :style="'color:' + reminder.color"
          :title="reminder.text"
          @click="$emit('click:reminder', reminder)"
        >
          <span>{{
            $dayjs(reminder.day + " " + reminder.time).format("ha")
          }}</span>
          {{ reminder.text }}
        </p>
      </v-card-text>
      <v-card-actions v-if="reminders.length > 2" class="pa-0">
        <v-menu absolute offset-y style="max-width: 600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              block
              x-small
              class="primary font-weight-bold white--text px-auto"
              v-on="on"
              v-bind="attrs"
              @click="$emit('click:more', { myDay, reminders })"
              >...</v-btn
            >
          </template>
          <v-list three-line>
            <div v-for="(reminder, index) in reminders" :key="index">
              <v-list-item @click="$emit('click:reminder', reminder)">
                <v-list-item-content>
                  <v-list-item-title :style="'color:' + reminder.color">{{
                    reminder.text
                  }}</v-list-item-title>
                  <v-list-item-subtitle>
                    <span><em class="mdi mdi-alarm" />{{ reminder.time }}</span>
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    <span
                      ><em class="mdi mdi-map-marker" />{{
                        reminder.city
                      }}</span
                    >
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-icon v-if="reminder.weather">
                  <v-img
                    contain
                    :src="reminder.weather.icon"
                    :title="
                      reminder.weather.text + ' ' + reminder.weather.temp + '°C'
                    "
                  ></v-img>
                </v-list-item-icon>
              </v-list-item>
              <v-divider />
            </div>
          </v-list>
        </v-menu>
      </v-card-actions>
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
    reminders: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      today: new Date().toISOString().substr(0, 10),
    };
  },
  computed: {
    computedReminders() {
      return this.reminders.slice(0).sort((a, b) => {
        return new Date(`${a.day} ${a.time}`) - new Date(`${b.day} ${b.time}`);
      });
    },
    colorAvatar() {
      return this.today === this.myDay
        ? "accent accent-5 white--text"
        : "primary";
    },
    myDay() {
      return this.month
        ? this.$dayjs(this.month + "-" + this.value).format("YYYY-MM-DD")
        : "";
    },
    items() {
      return this.computedReminders.slice(0, 2);
    },
  },
};
</script>
<style scoped>
.calendar-cell {
  min-height: 88px;
  overflow-y: hidden;
}
</style>