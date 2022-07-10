import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { auth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/loginView.vue'),
      meta: { auth: false },
    },
    {
      path: '/category',
      name: 'category',
      component: () => import('../views/categoryView.vue'),
      meta: { auth: true },
    },
    {
      path: '/subcategory',
      name: 'subcategory',
      component: () => import('../views/subcategoryView.vue'),
      meta: { auth: true },
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('../views/productView.vue'),
      meta: { auth: true },
    },
    {
      path: '/promociones',
      name: 'promociones',
      component: () => import('../views/productView.vue'),
      meta: { auth: true },
    },
    {
      path: '/avisos',
      name: 'avisos',
      component: () => import('../views/productView.vue'),
      meta: { auth: true },
    },
    {
      path: '/multimedia',
      name: 'multimedia',
      component: () => import('../views/multimediaView.vue'),
      meta: { auth: true },
    },
  ]
});

router.beforeEach(async (to, from, next) => {
  const isLoged = window.localStorage.getItem("isloged");
  if (to.name !== 'login' && !isLoged) next({ name: 'login' })
  else if (to.name == 'login' && isLoged) next({ name: this.$route.name});
  else next();
});

export default router
