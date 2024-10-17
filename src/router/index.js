import { createRouter, createWebHistory } from 'vue-router'
import CampaignUpdateView from '@/views/CampaignUpdateView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/MainView.vue')

    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/sign-in',
      name: 'Sign In',
      component: () => import('../views/auth/SignIn.vue')
    },
    {
      path: '/sign-up',
      name: 'Sign Up',
      component: () => import('../views/auth/SignUp.vue')
    },
    {
      path: '/forget-password',
      name: 'Forget Password',
      component: () => import('../views/auth/ForgetPassword.vue')
    },
    {
      path: '/campaign/create',
      name: 'Campaign Create',
      component: () => import('../views/CampaignCreateView.vue')
    },
    {
      path: '/campaign/index',
      name: 'Campaign Index',
      component: () => import('../views/CampaignIndexView.vue')
    },
    { path: '/campaigns/update/:id', name: 'Campaign Update', component: CampaignUpdateView },

  ]
})

export default router
