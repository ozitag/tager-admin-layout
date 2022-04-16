import {i18n} from "@tager/admin-services";
import RU from "./i18n/locales/ru";
import EN from "./i18n/locales/en";

export function AdminLayoutPlugin() {
  i18n.addTranslations('ru', 'layout', RU);
  i18n.addTranslations('en', 'layout', EN);
}
