import { i18n } from "@tager/admin-services";

import { RU } from "./ru";
import { EN } from "./en";

export function applyTranslations() {
  i18n.addTranslations("ru", "layout", RU);
  i18n.addTranslations("en", "layout", EN);
}
