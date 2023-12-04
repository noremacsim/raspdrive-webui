// Components
import App from "./App.vue";

// Composables
import {createApp} from "vue";
import {createPinia} from "pinia";
import axios from "axios";
import VueAxios from "vue-axios";
import ToastPlugin from "vue-toast-notification";
import JsonExcel from "vue-json-excel3";


// Plugins
import {registerPlugins} from "@/plugins";
// Register a component for downloading Excel files
// Set the base URL for axios
axios.defaults.baseURL = "/api";

// Create a Vue app
const app = createApp(App);

// Create a Pinia store
const pinia = createPinia();

app.component("downloadExcel", JsonExcel);

// Use Vue Toast and Axios plugins
app.use(ToastPlugin);
app.use(VueAxios, axios);

// Use Pinia for state management
app.use(pinia);

// Register additional plugins
registerPlugins(app);

// Mount the app to the specified element with id 'app'
app.mount("#app");
