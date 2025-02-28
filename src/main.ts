import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { init } from './http'

import 'element-plus/dist/index.css'
import 'md-editor-v3/lib/style.css'
import '@/styles/index.css'

init()
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
