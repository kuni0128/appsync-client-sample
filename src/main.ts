import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
// import store from './store'
import Amplify from 'aws-amplify'
import { appsyncConfig } from './aws-exports'

Amplify.configure(appsyncConfig)
// createApp(App).use(store).use(router).mount('#app')
createApp(App).use(router).mount('#app')
