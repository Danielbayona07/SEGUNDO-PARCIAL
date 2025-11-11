import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'

// Importar Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

// Importar estilos personalizados
import './assets/main.css'

createApp(App).use(router).mount('#app')
