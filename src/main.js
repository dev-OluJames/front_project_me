/*!

=========================================================
* BootstrapVue Argon Dashboard - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/bootstrap-vue-argon-dashboard
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Vue from 'vue';
import DashboardPlugin from './plugins/dashboard-plugin';
import App from './App.vue';
// router setup
import router from './routes/router';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import store from './store';
import '@/permission'; // permission control
import 'vue-js-modal/dist/styles.css';
import Vue2Editor from "vue2-editor";
import ElementUI from "element-ui";
import Vuesax from 'vuesax';
import 'vuesax/dist/vuesax.css'; // Vuesax styles

Vue.use(Vuesax);
Vue.use(ElementUI);
Vue.use(VueSweetalert2);
Vue.use(DashboardPlugin);
Vue.use(Vue2Editor);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
