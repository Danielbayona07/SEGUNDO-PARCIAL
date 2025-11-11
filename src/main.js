import { createApp } from 'vue'
// Importar el CSS y JS de Bootstrap 5.3
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap' 

// Importar estilos personalizados de la marca
import './assets/main.css'

import App from './App.vue'
import router from './router' 

const app = createApp(App)

app.use(router) 

app.mount('#app')