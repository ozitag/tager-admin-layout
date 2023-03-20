import { createApp } from "vue";
import { createPinia } from "pinia";

import { configStore, i18n, i18nPlugin } from "@tager/admin-services";
import "@tager/admin-ui/css";

import { GETCLEAN_CONFIG, OZITAG_CONFIG, PRESETBOX_CONFIG } from "../config";
import { createRouter } from "../router";
import { applyTranslations } from "../i18n/locales/apply";

import App from "./App.vue";
import { populateEnvironment } from "./env";

populateEnvironment();

configStore.setConfig(GETCLEAN_CONFIG);

const router = createRouter({}, { useTitleSync: false });

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(i18nPlugin);
app.use(pinia);

applyTranslations();

i18n.init({ debug: true, lng: "ru" }).then(() => {
  app.mount("#app");
});
