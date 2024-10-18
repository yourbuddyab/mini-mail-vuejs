import { createRouter, createWebHistory } from 'vue-router';
import CampaignUpdateView from '@/views/CampaignUpdateView.vue';
import { useAuthStore } from '@/stores/authStore'; // Import the auth store

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
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/sign-in',
      name: 'Sign In',
      component: () => import('../views/auth/SignIn.vue'),
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();
        if (authStore.isAuthenticated) {
          next({ name: 'home' });
        } else {
          next();
        }
      }
    },
    {
      path: '/sign-up',
      name: 'Sign Up',
      component: () => import('../views/auth/SignUp.vue'),
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();
        if (authStore.isAuthenticated) {
          next({ name: 'home' });
        } else {
          next();
        }
      }
    },
    {
      path: '/forget-password',
      name: 'Forget Password',
      component: () => import('../views/auth/ForgetPassword.vue'),
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();
        if (authStore.isAuthenticated) {
          next({ name: 'home' });
        } else {
          next();
        }
      }
    },
    {
      path: '/campaign/create',
      name: 'Campaign Create',
      component: () => import('../views/CampaignCreateView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/campaign/index',
      name: 'Campaign Index',
      component: () => import('../views/CampaignIndexView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/campaigns/update/:id',
      name: 'Campaign Update',
      component: CampaignUpdateView,
      meta: { requiresAuth: true }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore(); 
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!authStore.isAuthenticated) {
      next({ name: 'home' }); 
    } else {
      next(); 
    }
  } else {
    next(); 
  }
});

export default router;
