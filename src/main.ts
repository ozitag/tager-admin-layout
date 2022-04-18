import { applyTranslations } from "./i18n/locales/apply";

applyTranslations();

export * from "./components/PageLayout";
export { default as Page } from "./components/Page/Page.vue";
export { default as NotFoundView } from "./views/NotFound.vue";
export { createRouter, getBreadcrumbFromRoute } from "./router";
