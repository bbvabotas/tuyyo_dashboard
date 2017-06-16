import Vue from 'vue'
import Router from 'vue-router'
import Landing from '@/main_pages/Landing'
import CustomerFeedback from '@/main_pages/Customer-Feedback'
import Errors from '@/main_pages/Errors'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/overview'
        },
        {
            path: '/overview',
            name: 'Landing',
            component: Landing
        },
        {
            path: '/customer-feedback',
            name: 'Customer-Feedback',
            component: CustomerFeedback
        },
        {
            path: '/errors',
            name: 'Errors',
            component: Errors
        }
    ]
})
