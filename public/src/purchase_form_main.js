import Vue from './vue.js'
import PurchaseFormApp from './PurchaseFormApp.vue'
import BootstrapVue from 'bootstrap-vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
Vue.use(BootstrapVue);

new Vue({
    el: 'purchase-form-app',
    components: {PurchaseFormApp}
});
