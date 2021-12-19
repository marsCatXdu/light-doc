import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import installElementPlus from './plugins/element'

const app = createApp(App)

app.use(VueAxios, axios)
installElementPlus(app)
app.use(router)
app.mount('#app')
