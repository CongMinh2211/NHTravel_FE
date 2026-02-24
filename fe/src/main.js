import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Default from "./layout/wrapper/index.vue";
import Staff from "./layout/wrapper/staff.vue";
import Customer from "./layout/wrapper/customer.vue";
import Toaster from "@meforma/vue-toaster";

// Nhi import Bootstrap CSS va JS
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || '/api';

// Đảm bảo tất cả các request đều có tiền tố /api nếu chưa có
axios.interceptors.request.use(config => {
  if (config.url && config.url.startsWith('/') && !config.url.startsWith('/api') && !config.url.startsWith('http')) {
    config.url = '/api' + config.url;
  }
  return config;
});


const app = createApp(App);

app.use(router);
app.use(Toaster, {
  position: "top-right",
});
app.component("default-layout", Default);
app.component("staff-layout", Staff);
app.component("customer-layout", Customer);

app.mount("#app");
