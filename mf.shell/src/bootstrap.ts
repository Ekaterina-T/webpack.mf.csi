import { createApp } from 'vue'
import App from '@components/App/App.vue'
import { localization } from '@localization'

createApp(App)
    .use(localization)
    .mount('#shell-app');
