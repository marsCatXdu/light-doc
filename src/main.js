import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import installElementPlus from './plugins/element'
import { VueShowdownPlugin } from 'vue-showdown';

const app = createApp(App)

app.use(VueShowdownPlugin, {
    flavor: 'ghost',
    // set global showdown options
    options: {
        emoji: true,
        tables: true
    }
});
app.use(VueAxios, axios)
installElementPlus(app)
app.use(router)
app.mount('#app')
