import Vue, { VueConstructor } from 'vue';
import { ExtendedVue } from 'vue/types/vue';

export type ToastVariant = 'success' | 'warning' | 'danger';

export type ToastParams = {
  variant: ToastVariant;
  title: string;
  body: string;
};

export type ToastItem = ToastParams & {
  id: number;
};

export type ToastFunction = (params: ToastParams) => void;

declare module 'vue/types/vue' {
  // 3. Declare augmentation for Vue
  interface Vue {
    $toast: ToastFunction;
  }
  interface VueConstructor {
    $toast: ToastFunction;
  }
}

export type MenuItemType = {
  id: string;
  name: string;
  path: string;
  icon: string;
  children?: Array<{ name: string; path: string }>;
};

export declare const BaseLayout: ExtendedVue<
  Vue,
  {},
  {},
  {},
  { sidebarMenuList: Array<MenuItemType> }
>;

export declare const NotFound: VueConstructor<Vue>;
