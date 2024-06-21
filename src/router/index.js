import { createRouter, createWebHistory } from 'vue-router';
import homeView from '@/views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: homeView,
  },
  {
    path: '/show/:title?',
    name: 'show',
    component: () => import('@/views/ProgramView.vue'),
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: () => import('@/views/CheckOutView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
