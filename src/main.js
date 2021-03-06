import Vue from "vue";
import Vuelidate from "vuelidate";
// import BootstrapIcons from "react-bootstrap-icons";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";

Vue.use(Vuelidate);
// Vue.use(BootstrapIcons);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App)
}).$mount("#app");
