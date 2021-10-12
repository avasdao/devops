/* Import modules. */
import Vue from 'vue'
import VueSVGIcon from 'vue-svgicon'
import SessionManager from './libs/SessionManager'

/* Import (local) modules. */
import router from './router'
import store from './store'

/* Import (3rd-party) plugins. */
// require('./plugins/bugsnag')

/* Import main application. */
import App from './_App'

/* Import tailwind. */
import 'tailwindcss/tailwind.css'

/* Initialize session manager. */
Vue.use(SessionManager)

/* Initialize SVG icons. */
Vue.use(VueSVGIcon)

/* Set production flag. */
Vue.config.productionTip = false

/* Initialize Vue. */
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
