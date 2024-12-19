import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//PrimeVue UI
import PrimeVue from "primevue/config";
import { definePreset } from "@primevue/themes";
import Nora from "@primevue/themes/nora";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "animate.css";

//Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

//Custom Style
import "./assets/style/custom.css";

//Custom PrimeVue Preset
import MyPreset from "./assets/js/createPreset.js";

createApp(App)
  .use(store)
  .use(router)
  .use(PrimeVue, {
    ripple: true,
    theme: {
      preset: MyPreset,

      options: {
        prefix: "p",
        darkModeSelector: ".my-app-dark",
      },
    },
  })
  .mount("#app");
