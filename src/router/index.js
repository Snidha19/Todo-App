import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from '@/plugins/firebase';

const Todos = () => import('@/components/Todo.vue');
const Login = () => import('@/components/Login.vue');
const Register = () => import('@/components/Register.vue');

Vue.use(VueRouter);

const routes = [
  {
    path: '/todos',
    name: 'todos',
    component: Todos,
    meta: {
      requiresLogin: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    alias: '/',
    component: Login,
    meta: {
      requiresLogin: false,
    },
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      requiresLogin: false,
    },
  },
];

const router = new VueRouter({
  mode: 'hash',
  routes,
});

// router.beforeEach((to, from, next) => {
//   const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
//   // eslint-disable-next-line prefer-destructuring
//   const currentUser = firebase.auth.currentUser;

//   if (requiresAuth && !currentUser) next({ path: '/login', query: { redirect: to.fullPath } });
//   else if (requiresAuth && currentUser) next('/todos');
//   else if (!requiresAuth && !currentUser) next();
//   else next();
// });

router.beforeEach(async (to, from, next) => {
  const requiresLogin = to.matched.some((record) => record.meta.requiresLogin);
  if (requiresLogin && !await firebase.getCurrentUser()) {
    next('login');
  } else if (!requiresLogin && await firebase.getCurrentUser()) {
    next('todos');
  } else {
    next();
  }
});

Vue.$router = router;

export default router;
