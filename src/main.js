import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

//fontawesome
import {library} from '@fortawesome/fontawesome-svg-core'
import {faBolt, faCloudRain, faCloudShowersHeavy, faSnowflake, faSmog, faSun, faCloud, faTint, faUser, faMoon, faChevronLeft, faChevronRight, faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

library.add(faBolt, faCloudRain, faCloudShowersHeavy, faSnowflake, faSmog, faSun, faCloud, faTint, faUser, faMoon, faChevronLeft, faChevronRight, faMapMarkerAlt)

const app = createApp(App)

app.component('fa-icon', FontAwesomeIcon)

app.mount('#app')
