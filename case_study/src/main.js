import { createApp } from 'vue'
import App from './App.vue'
import WaveUI from 'wave-ui'
import 'wave-ui/dist/wave-ui.css'


//createApp(App).mount('#app')


const app = createApp(App)

app.use(WaveUI, { /* Some Wave UI options */ })
// Or in Wave UI 2.x:
// new WaveUI(app, { /* Some Wave UI options */ })

app.mount('#app')

