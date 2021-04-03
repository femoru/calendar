<template>
  <v-dialog :value="dialogForm" max-width="300px">
    <v-card>
      <v-card-text>
        <v-text-field v-model="reminder.text" label="Evento" hide-details>
          <template #prepend>
            <v-menu>
              <template #activator="{ on, attrs }">
                <v-avatar
                  size="24"
                  :color="reminder.color"
                  v-bind="attrs"
                  v-on="on"
                />
              </template>
              <v-color-picker
                v-model="reminder.color"
                swatches-max-height="200"
                hide-sliders
                hide-inputs
                hide-canvas
                show-swatches
                flat
              ></v-color-picker>
            </v-menu>
          </template>
        </v-text-field>

        <v-menu
          ref="menuDatePicker"
          v-model="menuDatePicker"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="reminder.day"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              hide-details
              prepend-icon="mdi-calendar"
              v-bind="attrs"
              v-on="on"
              v-model="reminder.day"
            >
            </v-text-field>
          </template>
          <v-date-picker
            v-if="menuDatePicker"
            v-model="reminder.day"
            full-width
            @click:date="$refs.menuDatePicker.save(reminder.day)"
          ></v-date-picker>
        </v-menu>
        <v-menu
          ref="menu"
          v-model="menuTimePicker"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="reminder.time"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              label="Hora"
              prepend-icon="mdi-alarm"
              v-bind="attrs"
              v-on="on"
              v-model="reminder.time"
              hide-details
            >
            </v-text-field>
          </template>
          <v-time-picker
            v-if="menuTimePicker"
            v-model="reminder.time"
            full-width
            @click:minute="$refs.menu.save(reminder.time)"
          ></v-time-picker>
        </v-menu>
        {{reminder.city}}
        <v-autocomplete
          label="Ubication"
          :loading="isLoadingCitys"
          :search-input.sync="search"
          :items="items"
          item-text="name"
          item-value="name"
          prepend-icon="mdi-map-marker"
          v-model="reminder.city"
          @input="searchWeather"
          hide-details
        >
          <template #append-outer>
            <v-img
              max-width="24"
              contain
              v-if="reminder.weather"
              :src="reminder.weather.condition.icon"
              :title="
                reminder.weather.condition.text +
                ' ' +
                reminder.weather.feelslike_c +
                '°C'
              "
            ></v-img>
          </template>
        </v-autocomplete>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="$emit('input', false)">{{
          $vuetify.lang.t("$vuetify.mycalendar.cancel")
        }}</v-btn>
        <v-btn @click="save">{{
          $vuetify.lang.t("$vuetify.mycalendar.add")
        }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    reminder: {
      type: Object,
      default: () => ({
        day: "",
        time: "",
        weather: null,
        color: "",
        text: "",
      }),
    },
  },
  data() {
    return {
      apiKey: "de023885ab5d46bea73215733210204",
      search: "",
      dialogForm:false,
      menuDatePicker: false,
      menuTimePicker: false,
      isLoadingCitys: false,
      entries: [],
      myreminder: {
        day: "",
        time: "",
        weather: null,
        color: "",
        text: "",
      },
    };
  },
  mounted() {
    this.myreminder = {
      day: this.$dayjs().format("YYYY-MM-DD"),
      time: this.$dayjs().format("HH:mm"),
      color: "#FF0000",
      city:''
    };
  },
  methods: {
    async searchWeather(city) {
      const currentWeather = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${city}&aqi=no`
      ).then((res) => res.json());
      const { current } = currentWeather;
      this.reminder.weather = current;
    },
    save(){
      this.$emit('update:reminder', this.reminder)
      this.dialogForm = false
      this.$emit('input', false)
      this.$emit('save',this.reminder)
    }
  },
  computed: {
    items() {
      return this.entries || [];
    },
    currentWeather() {
      return this.reminder.weather;
    },
  },
  watch: {
    value: {
      deep: true,
      handler(newValue) {
        this.dialogForm = newValue
      },
    },
    reminder: {
      deep: true,
      handler(newValue) {
        this.myreminder = { ...newValue };
        this.search = newValue.city
      },
    },
    search(val, oldVal) {
      // Items have already been loaded
      if (!val || val == oldVal) return;

      // Items have already been requested
      if (this.isLoadingCitys) return;

      this.isLoadingCitys = true;

      // Lazily load input items
      fetch(
        `http://api.weatherapi.com/v1/search.json?key=${this.apiKey}&q=${val}`
      )
        .then((res) => res.json())
        .then((res) => {
          this.entries = res;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => (this.isLoadingCitys = false));
    },
  },
};
</script>

<style>
</style>