import Page from './components/Page';
import PageLayout from './components/PageLayout';

export function AdminLayoutPlugin(Vue) {
  Vue.component('page', Page);
  Vue.component('page-layout', PageLayout);
}
