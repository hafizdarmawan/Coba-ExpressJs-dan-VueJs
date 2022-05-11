import {
    createApp
} from 'vue'
import App from './App.vue'

// import router
import router from './router'

// import Bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.min'

const app = createApp(App)

app.use(router)

app.mount('#app')
