import Login from '@/views/Login.vue';
import Sessions from '@/views/Sessions.vue';
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/sessions'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/sessions',
      name: 'sessions',
      component: Sessions
    },
    {
      path: '/sessions/:id/detail',
      name: 'details',
      component: () => import('./components/SessionDetail.vue'),
      props: true
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('./views/Favorites.vue')
    },
    {
      path: '/tag/:name',
      name: 'tag',
      component: () => import('./views/Tag.vue'),
      props: true
    }
  ]
});
