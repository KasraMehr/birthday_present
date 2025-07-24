import { createApp } from 'vue'
import App from './App.vue'
import anime from 'animejs'

const app = createApp(App)
app.config.globalProperties.$anime = anime
app.mount('#app')