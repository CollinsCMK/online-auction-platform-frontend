import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { useThemeStore } from './stores/theme';

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia.use(piniaPluginPersistedstate))
app.use(router)

const theme = useThemeStore();

theme.initializeTheme();

app.mount('#app')
