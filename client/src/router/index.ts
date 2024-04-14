import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import NavigationPage from '@/views/NavigationPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/navs/home'
  },
  {
    path: '/navs/',
    component: NavigationPage,
    children: [
      {
        path: '',
        redirect: '/navs/home'
      },
      {
        path: 'home',
        component: () => import('@/views/HomePage.vue')
      },
      {
        path: 'cart',
        component: () => import('@/views/CartPage.vue')
      },
      {
        path: 'transaction',
        component: () => import('@/views/TransactionPage.vue')
      },
      {
        path: 'delivery',
        component: () => import('@/views/DeliveryPage.vue')
      },
      {
        path: 'setting',
        component: () => import('@/views/SettingPage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
