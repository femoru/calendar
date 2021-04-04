<template>
  <v-card>
    <v-form v-model="formReminder" name="formReminder">
      <v-card-text>
        <v-text-field
          v-model="myreminder.text"
          label="Event"
          counter="30"
          :rules="[rule.required('Event'), rule.maxLength('Event', 30)]"
        >
          <template #prepend>
            <v-menu>
              <template #activator="{ on, attrs }">
                <v-avatar
                  :alt="myreminder.color"
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
              :rules="[rule.required('Date')]"
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
              :rules="[rule.required('Time')]"
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
          :items="entries"
          item-text="name"
          item-value="name"
          prepend-icon="mdi-map-marker"
          v-model="myreminder.city"
          @input="searchWeather"
          hide-details
          :rules="[rule.required('Location')]"
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
        <v-btn
          small
          text
          color="error"
          v-if="myreminder.id"
          @click="deleteReminder"
          >Delete</v-btn
        >
        <v-spacer />
        <v-btn small text @click="$emit('cancel', false)">Cancel</v-btn>
        <v-btn small color="primary" :disabled="!formReminder" @click="save">
          Save
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import _ from "lodash";
export default {
  props: {
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
      formReminder: false,
      menuDatePicker: false,
      menuTimePicker: false,
      isLoadingCitys: false,
      entries: [],
      myreminder: {},
      rule: {
        required: (propertyType) => {
          return (v) => !!v || `${propertyType} required`;
        },
        minLength: (propertyType, minLength) => {
          return (v) =>
            (v && v.length >= minLength) ||
            `${propertyType} Min ${minLength} characters`;
        },
        maxLength: (propertyType, maxLength) => {
          return (v) =>
            (v && v.length <= maxLength) ||
            `${propertyType} Max ${maxLength} characters`;
        },
      },
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
        text: current.condition.text,
        temp: current.feelslike_c,
      };
    },
    save() {
      this.$emit("update:reminder", { ...this.myreminder });
    },
    deleteReminder() {
      this.$emit("delete", this.myreminder);
    },
  },
  watch: {
    reminder: {
      deep: true,
      handler(newValue) {
        this.myreminder = { ...newValue };
        this.search = newValue.city;
      },
    },
    search: _.debounce(async function (val, oldVal) {
      if (!val || val == oldVal) return;
      if (this.isLoadingCitys) return;
      this.isLoadingCitys = true;
      try {
        this.entries = await fetch(
          `http://api.weatherapi.com/v1/search.json?key=${this.apiKey}&q=${val}`
        ).then((res) => res.json());
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoadingCitys = false;
      }
    }, 500),
  },
};
</script>

<style>
</style>