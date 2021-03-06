import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import VueSlider from 'vue-slider-component';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBed,
  faBath,
  faArrowsAlt,
  faMoneyBillAlt,
  faSearch,
  faGlobe,
  faUndo,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import App from './App.vue';
import store from './store';
import router from './router';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'vue-slider-component/theme/default.css';

library.add(faBed, faBath, faArrowsAlt, faMoneyBillAlt, faSearch, faGlobe, faUndo);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('VueSlider', VueSlider);

Vue.use(BootstrapVue);
Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
