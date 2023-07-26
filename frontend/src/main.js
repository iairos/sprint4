import './assets/styles/main.scss'
import svgPlugin from './plugins/svg-plugin.js'

import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

const app = createApp(App)

app.use(svgPlugin)
app.use(router)
app.use(store)

app.mount('#app')
