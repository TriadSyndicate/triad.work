import { createApp } from "vue";
import { createPinia } from "pinia";
import "./index.css";
//import App from "./App.vue";
import MainDash from "@/components/main/main.vue"
import router from "./router";
const app = createApp(MainDash);

app.use(createPinia());
app.use(router);
app.mount("#app");
