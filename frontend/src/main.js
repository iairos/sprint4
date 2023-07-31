import './assets/styles/main.scss'
import svgPlugin from './plugins/svg-plugin.js'
import ModalBg from './cmps/ModalBg.vue'

import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

const app = createApp(App)

app.component('ModalBg', ModalBg)

app.use(svgPlugin)
app.use(router)
app.use(store)

app.mount('#app')
