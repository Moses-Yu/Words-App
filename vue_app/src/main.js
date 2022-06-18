import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";
import router from './router'

const app = createApp(App).use(router);
app.config.globalProperties.axios = axios;

app.config.globalProperties.username = "";
app.config.globalProperties.loggedIn = false;

app.mount("#app");

