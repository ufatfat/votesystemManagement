import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store"
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import "vue-wysiwyg/dist/vueWysiwyg.css"
import axios from "./utils/axios";
import wysiwyg from "vue-wysiwyg"

Vue.config.productionTip = false
Vue.prototype.axios = axios

Vue.prototype.escape = function(sHtml) {
  return sHtml.replace(/[<>&"]/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c];});
}
Vue.prototype.unescape = function (str) {
  let arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
  return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
}

Vue.use(ElementUI)
Vue.use(wysiwyg, {
  hideModules: {
    "code": true,
  },
  image: {
    uploadURL: "/manageapi/system/image",
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
