import Vue from 'vue'
import App from './App.vue'
import router from './router'
import $ from 'jquery'
import 'lib-flexible'
import './libs/fixIosInput'
import dfmain from "./assets/lib/js/dfmain"

Vue.prototype.dfmain=dfmain;

import weui from 'weui.js'
import 'weui'


import "bootstrap"
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import './styles/common.less'

Vue.prototype.$weui = weui
Vue.config.productionTip = false
Vue.prototype.URL='http://139.196.220.58:8321'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
