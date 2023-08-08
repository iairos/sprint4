import './assets/styles/main.scss'
import 'emoji-picker-element'
import svgPlugin from './plugins/svg-plugin.js'
import insertTextAtCursor from 'insert-text-at-cursor';
import ModalBg from './cmps/ModalBg.vue'
import { dynamicTextareaDirective } from "./directives/dynamic-textarea.js";

import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

const app = createApp(App)
app.config.globalProperties.window = window
app.component('ModalBg', ModalBg)
app.directive('textarea', dynamicTextareaDirective)

// app.use(insertTextAtCursor)
app.use(svgPlugin)
app.use(router)
app.use(store)

app.mount('#app')
