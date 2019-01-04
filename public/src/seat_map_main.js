import Vue from './vue.js'
import SeatMapApp from './SeatMapApp.vue'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue);
new Vue({
    el: 'seat-map-app',
    components: {SeatMapApp}
});

