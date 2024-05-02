import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import NavigationPage from '@/views/NavigationPage.vue';
import CartPage from '@/views/CartPage.vue';
import ConfirmationOrderPage from '@/views/ConfirmationOrderPage.vue';
import TransactionInfoPage from '@/views/TransactionInfoPage.vue';
import DeliveryInfo from '@/views/DeliveryInfo.vue';
import ProductDescription from '@/views/ProductDescription.vue';
import CartDone from '@/views/CartDone.vue';
import Login from '@/views/Login.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/product-description/:id',
    name: 'product-description',
    component: ProductDescription,
  },
  {
    path: '/cart-done',
    name: 'cart-done',
    component: CartDone,
  },
  {
    path: '/cart-page',
    name: 'cart-page',
    component: CartPage,
  },
  {
    path: '/confirmation-order',
    name: 'confirmation-order',
    component: ConfirmationOrderPage,
  },
  {
    path: '/transaction-details/:id',
    name: 'transaction-details',
    component: TransactionInfoPage,
  },
  {
    path: '/delivery-details/:id',
    name: 'delivery-details',
    component: DeliveryInfo,
  },
  {
    path: '/',
    component: NavigationPage,
    children: [
      {
        path: '/',
        redirect: '/login'
      },
      {
        path: '/home',
        component: () => import('@/views/HomePage.vue')
      },
      {
        path: '/cart',
        component: () => import('@/views/CartPage.vue')
      },
      {
        path: '/transaction',
        component: () => import('@/views/TransactionPage.vue')
      },
      {
        path: '/delivery',
        component: () => import('@/views/DeliveryPage.vue')
      },
      {
        path: '/setting',
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
