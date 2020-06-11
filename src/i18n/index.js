import { configStore } from '@tager/admin-services';

import english from './locales/en';
import russian from './locales/ru';

const LOCALE_MAP = {
  EN: english,
  RU: russian
};

export function t(key, options) {
  const currentLanguage = configStore.getConfig().LANGUAGE;

  if (options?.debug) {
    console.log('%c Translate: ', 'color: green', [
      currentLanguage,
      key,
      LOCALE_MAP[currentLanguage][key]
    ]);
  }
  return LOCALE_MAP[currentLanguage][key];
}

export const TranslatePlugin = VueConstructor => {
  VueConstructor.prototype.$t = t;
  VueConstructor.$t = t;
};
