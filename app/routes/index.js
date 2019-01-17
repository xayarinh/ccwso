import Vue from '../../public/src/vue.js'
import Router from 'vue-router'
import SeatMapApp from '../../public/src/SeatMapApp.vue'
import PurchaseFormApp from '../../public/src/PurchaseFormApp.vue'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/', // Return SeatMapApp if home page
            name: 'SeatMapApp',
            component: SeatMapApp
        },
        {
            path: '/getPurchaseForm', // Return PurchaseFormApp if clicked submit button
            name: 'PurchaseFormApp',
            component: PurchaseFormApp,
            props: true
        }
    ]
})