import { createApp } from 'vue'
import { createPinia } from 'pinia'


import App from './App.vue'
import router from './router'
import './index.css'

import axios from 'axios'
import VueAxios from 'vue-axios'

//Element UI
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import { split } from 'lodash'

export const httpAxios = axios.create({
  // baseURL: location.protocol + '//' + location.host + '/admin/api',
  baseURL: 'http://localhost:5001/admin/api',
  headers: {
    'X-Custom-Header': 'foobar',
    'Authorization': `Bearer ${localStorage.getItem("faisanaInfo")}`,
  }
});

const app = createApp(App)

app.use(VueAxios, httpAxios);
app.use(createPinia())
app.use(router)
app.use(ElementPlus);

app.mount('#app')
