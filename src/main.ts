import Vue from 'vue';
import App from './App.vue';

import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
Vue.use(BootstrapVue);

import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faMinus, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
library.add(faPlus, faMinus, faExternalLinkAlt);
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
Vue.component('font-awesome-icon', FontAwesomeIcon);

import TreeList from '@/components/TreeList.vue';
Vue.component('TreeList', TreeList);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
