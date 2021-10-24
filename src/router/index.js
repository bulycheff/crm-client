import {
  createRouter,
  createWebHistory
} from 'vue-router'

const routes = [ {
  path: '/',
  name: 'Orders',
  meta: {
    requireAuth: true,
    requireAdmin: false
  },
  component: () => import('../views/Orders')
},

  {
    path: '/registration',
    name: 'Registration',
    meta: {
      requireAuth: false,
      requireAdmin: false
    },
    component: () => import('../views/Registration')
  },

  {
    path: '/login',
    name: 'Login',
    meta: {
      requireAuth: false,
      requireAdmin: false
    },
    component: () => import('../views/Login')
  },

  {
    path: '/users',
    name: 'Users',
    meta: {
      requireAuth: true,
      requireAdmin: true
    },
    component: () => import('../views/Users')
  },

  {
    path: '/day',
    name: 'Day',
    meta: {
      requireAuth: true,
      requireAdmin: false
    },
    component: () => import('../views/Day')
  },

  {
    path: '/order/:id',
    name: 'OrderId',
    meta: {
      requireAuth: true,
      requireAdmin: false
    },
    component: () => import('../views/OrderId')
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// router.beforeEach(( to, next ) => {
//   if (to.matched.some())
// })

export default router
