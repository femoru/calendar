<template>
  <v-dialog :value="dialogForm" max-width="300px">
    <v-card>
      <v-card-text>
        <v-text-field v-model="myreminder.text" label="Event" hide-details>
          <template #prepend>
            <v-menu>
              <template #activator="{ on, attrs }">
                <v-avatar
                  size="24"
                  :color="myreminder.color"
                  v-bind="attrs"
                  v-on="on"
                />
              </template>
              <v-color-picker
                v-model="myreminder.color"
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
          :return-value.sync="myreminder.day"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              label="Date"
              hide-details
              prepend-icon="mdi-calendar"
              v-bind="attrs"
              v-on="on"
              v-model="myreminder.day"
            >
            </v-text-field>
          </template>
          <v-date-picker
            v-if="menuDatePicker"
            v-model="myreminder.day"
            full-width
            @click:date="$refs.menuDatePicker.save(myreminder.day)"
          ></v-date-picker>
        </v-menu>
        <v-menu
          ref="menu"
          v-model="menuTimePicker"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="myreminder.time"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              label="Time"
              prepend-icon="mdi-alarm"
              v-bind="attrs"
              v-on="on"
              v-model="myreminder.time"
              hide-details
            >
            </v-text-field>
          </template>
          <v-time-picker
            v-if="menuTimePicker"
            v-model="myreminder.time"
            full-width
            @click:minute="$refs.menu.save(myreminder.time)"
          ></v-time-picker>
        </v-menu>
        <v-autocomplete
          label="Location"
          :loading="isLoadingCitys"
          :search-input.sync="search"
          :items="items"
          item-text="name"
          item-value="name"
          prepend-icon="mdi-map-marker"
          v-model="myreminder.city"
          @input="searchWeather"
          hide-details
        >
          <template #append-outer>
            <v-img
              max-width="24"
              contain
              v-if="myreminder.weather"
              :src="myreminder.weather.icon"
              :title="
                myreminder.weather.text + ' ' + myreminder.weather.temp + '°C'
              "
            ></v-img>
          </template>
        </v-autocomplete>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="$emit('input', false)">Cancel</v-btn>
        <v-btn @click="save">Save</v-btn>
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
        id: null,
        day: "",
        time: "",
        weather: null,
        color: "#F00",
        text: "",
      }),
    },
  },
  data() {
    return {
      apiKey: "de023885ab5d46bea73215733210204",
      search: "",
      dialogForm: false,
      menuDatePicker: false,
      menuTimePicker: false,
      isLoadingCitys: false,
      entries: [],
      myreminder: {},
    };
  },
  mounted() {
    this.myreminder = { ...this.reminder };
  },
  methods: {
    async searchWeather(city) {
      const currentWeather = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${city}&aqi=no`
      ).then((res) => res.json());
      const { current } = currentWeather;
      this.myreminder.weather = {
        icon: current.condition.icon,
        text: current.condition.icon,
        temp: current.feelslike_c,
      };
    },
    save() {
      this.$emit("update:reminder", { ...this.myreminder });
      this.dialogForm = false;
      this.$emit("input", false);
      this.$emit("save", this.myreminder);
    },
  },
  computed: {
    items() {
      return this.entries || [];
    },
  },
  watch: {
    value: {
      deep: true,
      handler(newValue) {
        this.dialogForm = newValue;
      },
    },
    reminder: {
      deep: true,
      handler(newValue) {
        this.myreminder = { ...newValue };
        this.search = newValue.city;
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