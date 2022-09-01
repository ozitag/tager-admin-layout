import type { AppConfigType } from "@tager/admin-services";

export const PRESETBOX_CONFIG: AppConfigType = {
  APP_NAME: "",
  TITLE_TEMPLATE: "PresetBox Admin - {{title}}",
  LANGUAGE: "EN",
  BRAND: {
    small: {
      logo: "presetbox-logo.svg",
    },
    large: {
      logo: "presetbox-logo.svg",
      label: "Preset Box",
      "label-color": "#0b2525",
    },
    subtitle: "SubTitle",
  },
  SPLASH_SCREEN: {
    enabled: true,
    logo: "presetbox-logo.svg",
    background: "#fff",
  },
};

export const OZITAG_CONFIG: AppConfigType = {
  APP_NAME: "OZiTAG_ADMIN",
  TITLE_TEMPLATE: "OZiTAG Admin - {{title}}",
  LANGUAGE: "EN",
  BRAND: {
    small: {
      logo: "ozitag-logo-small.svg",
    },
    large: {
      logo: "ozitag-logo.svg",
      label: "OZiTAG",
      "label-color": "#DD6900",
    },
    subtitle: "",
  },
  SPLASH_SCREEN: {
    enabled: true,
    logo: "ozitag-logo-white.svg",
    background: "#1e1e1e",
  },
};

export const GETCLEAN_CONFIG: AppConfigType = {
  APP_NAME: "",
  TITLE_TEMPLATE: "GetClean Admin - {{title}}",
  LANGUAGE: "RU",
  BRAND: {
    small: {
      logo: "getclean-logo-small.svg",
    },
    large: {
      logo: "getclean-logo.svg",
    },
    subtitle: "GetClean",
  },
  SPLASH_SCREEN: {
    enabled: true,
    logo: "getclean-logo.svg",
    background: "#fff",
  },
};
