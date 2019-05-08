import Vue from 'vue'
import './plugins/axios'
import './plugins/vuetify'
import App from './App.vue'
import store from './store'
import VueRouter from 'vue-router'
import Index from './components/Index.vue'
import Ranking from './components/Ranking.vue'
import Upload from './components/Upload.vue'
import Signup from './components/Signup.vue'
import Voting from './components/Voting.vue'
import "vue-material-design-icons/styles.css"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCoffee)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueRouter)

const router = new VueRouter({
  routes:[
  {path : '/index', component: Index},
  {path : '/voting', component: Voting},
  {path : '/ranking', component:  Ranking},
  {path : '/upload', component: Upload},
  {path : '/signup', component: Signup},
  {path : '*' , component: {template : `<h1>Page not found. </h1>`}}
  ],
  mode:'history'
});

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
  router: router
}).$mount('#app')

d