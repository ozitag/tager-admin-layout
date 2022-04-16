import { createApp } from "vue";

import { configStore, i18n, i18nPlugin } from "@tager/admin-services";
import "@tager/admin-ui/dist/admin-ui.css";

import { GETCLEAN_CONFIG } from "../config";
import { createRouter } from "../router";

import App from "./App.vue";

configStore.setConfig(GETCLEAN_CONFIG);

const router = createRouter({}, { useTitleSync: false });

const app = createApp(App);

app.use(router);
app.use(i18nPlugin);

i18n.init({ debug: true, lng: "ru" }).then(() => {
  app.mount("#app");
});
