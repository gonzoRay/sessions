import Vue from 'vue';
import Router from 'vue-router';

import Sessions from './views/Sessions.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/sessions'
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
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
});
