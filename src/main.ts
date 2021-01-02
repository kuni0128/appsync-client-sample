import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import Amplify from 'aws-amplify'
import { appsyncConfig } from './aws-exports'

Amplify.configure(appsyncConfig)
createApp(App).use(router).mount('#app')
