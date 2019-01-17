import Vue from './vue.js'
import router from '../../app/routes/index.js'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
Vue.use(BootstrapVue);

new Vue({
    el: 'app',
    router,
    components: {App}
});