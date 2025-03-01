import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './style.css'

import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/el-icon.css';

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')