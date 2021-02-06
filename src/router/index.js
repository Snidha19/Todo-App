import Vue from 'vue';
import VueRouter from 'vue-router';

const Todos = () => import('@/components/Todo.vue');
const Login = () => import('@/components/Login.vue');
const Register = () => import('@/components/Register.vue');

Vue.use(VueRouter);

const routes = [
  {
    path: '/todos',
    name: 'todos',
    component: Todos,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
];

const router = new VueRouter({
  mode: 'hash',
  routes,
});

Vue.$router = router;

export default router;