import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue'),
    },
    {
      path: '/admin/auctions',
      name: 'admin-auctions',
      component: () => import('../views/AuctionsView.vue'),
    },
    {
      path: '/admin/listings/:id',
      name: 'admin-listings',
      component: () => import('../views/ListingView.vue'),
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/UserView.vue'),
    },
    {
      path: '/auction',
      name: 'auction',
      component: () => import('../views/AuctionView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'page-not-found',
      component: () => import('../views/PageNotFoundView.vue'),
    },
  ],
})

export default router
