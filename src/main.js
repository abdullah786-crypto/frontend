
import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import './assets/tailwind.css';
import './assets/main.css' //
import 'primevue/resources/themes/aura-light-green/theme.css' // Tailwind-based theme
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import routers from './routes/routes';
import { createPinia } from 'pinia'
import ToastService from 'primevue/toastservice';
import 'primevue/resources/themes/lara-light-blue/theme.css'; // ya koi aur theme
import 'quill/dist/quill.snow.css'; // for Editor
import Editor from 'primevue/editor'
import './assets/main.css'
import Toast from 'primevue/toast';
// Toast

const pinia = createPinia();

const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.my-app-dark'
    }
  }
})

app.use(ToastService)
app.use(routers)
app.use(pinia);
app.component('Toast', Toast);
app.component('Editor', Editor)
app.mount('#app')
