import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () =>
      import(/* webpackChunkName: "about" */ '../pages/Home.vue'),
  },
  {
    path: '/meeting',
    name: 'Meeting',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../pages/Meeting.vue'),
    children: [
      {
        path: 'create',
        name: 'Schedule Meeting',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/CreateMeeting.vue'),
      },
      {
        path: 'initiate',
        name: 'Initiate Meeting',
        component: () =>
          import(
            /* webpackChunkName: "about" */ '../views/InitiateMeeting.vue'
          ),
      },
      {
        path: 'options',
        name: 'meeting options',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/MeetingOptions.vue'),
      },
      {
        path: ':id',
        name: 'meeting poll',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/MeetingPoll.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
