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
      path: '/admin/listings',
      name: 'admin-listings-all',
      component: () => import('../views/ListingsView.vue'),
    },
    {
      path: '/admin/listings/:id',
      name: 'admin-listings',
      component: () => import('../views/ListingView.vue'),
    },
    {
      path: '/admin/users',
      name: 'admin-users',
      component: () => import('../views/UsersView.vue'),
    },
    {
      path: '/admin/bids',
      name: 'admin-bids',
      component: () => import('../views/BidsView.vue'),
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/UserView.vue'),
    },
    {
      path: '/auction/:id',
      name: 'auction',
      component: () => import('../views/AuctionView.vue'),
    },
    {
      path: '/bids/:id/:listing_id',
      name: 'bids',
      component: () => import('../views/UserBidView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'page-not-found',
      component: () => import('../views/PageNotFoundView.vue'),
    },
  ],
})

export default router
