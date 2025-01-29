import "./assets/base.css";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import VueApexCharts from "vue3-apexcharts";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

import App from "./App.vue";
import router from "./router";
import "@mdi/font/css/materialdesignicons.css";

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi", // This is already the default value - only for display purposes
  },
});

const app = createApp(App);

app.use(createPinia());
app.use(ToastPlugin);
app.use(router);
app.use(vuetify);
app.use(VueApexCharts);
app.component("vue-apexcharts", VueApexCharts);
app.component("VueDatePicker", VueDatePicker);

app.mount("#app");
