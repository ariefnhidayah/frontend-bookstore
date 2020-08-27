import Vue from 'vue'
import Router from 'vue-router'

import LandingPage from './pages/LandingPage.vue'
import Product from './pages/product/Id.vue'
import Cart from './pages/Cart.vue'
import Payment from './pages/Payment.vue'
import OrderDetail from './pages/order/Id.vue'
import OrderHistory from './pages/order/Index.vue'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: LandingPage
        },
        {
            path: '/product/:seo_url',
            name: 'productView',
            component: Product
        },
        {
            path: '/cart',
            name: 'cart',
            component: Cart
        },
        {
            path: '/payment',
            name: 'payment',
            component: Payment
        },
        {
            path: '/order/detail/:id',
            name: 'order_detail',
            component: OrderDetail
        },
        {
            path: '/order',
            name: 'order',
            component: OrderHistory
        }
    ]
})

export default router;