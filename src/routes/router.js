import Vue from 'vue';
import Router from 'vue-router';
import constantRoutes from './routes';
import NotFound from '@/views/NotFoundPage.vue';
import adminRoutes from "./modules/admin";

Vue.use(Router);

// configure router
const constantRouter  = () => new Router({
  routes: constantRoutes, // short for routes: routes
  linkActiveClass: 'active',
  scrollBehavior: (to, from ,savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  },
});

export const asyncRoutes = [
  // uniques,
  { path: '*', redirect: '/404', hidden: true, component: NotFound },
];

// const constantRouter = () => new Router({
//   // mode: 'history', // require service support
//   scrollBehavior: () => ({ y: 0 }),
//   base: '/',
//   routes: constantRoutes,
// });

const router = constantRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = constantRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
