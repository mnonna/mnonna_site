import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import 'bootstrap/dist/css/bootstrap.min.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons/faChevronCircleDown'
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub'
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars'
import { faInfo } from '@fortawesome/free-solid-svg-icons/faInfo'
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faChevronCircleDown);
library.add(faGithub);
library.add(faInfo);
library.add(faBars);
library.add(faTimes);
library.add(faSpinner);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
