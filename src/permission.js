import router from "./routes/router";
import getters from "./store/getters";
import store from "./store";
import { Message } from 'element-ui';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import {isLogged} from "./utils/auth";
import getPageTitle from '@/utils/get-page-title';
import Cookies from "js-cookie";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ['/login', '/logout', '/auth-redirect']; // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start();
  // set page title
  document.title = getPageTitle(to.meta.title);

  // determine whether the user has logged in
  console.log('IS LOGGED', isLogged());
  const isUserLogged = isLogged();
  console.log('TP PATH', to.path.includes('store'));
  // if(to.path === '/'){
  //   next({path: 'store/offres'});
  // }
  if (isUserLogged) {
    const { roles, permissions } = await store.dispatch('user/getInfo');
    if (to.path.includes('dashboard') || to.path.includes('administration') || to.path.includes('menu')){
      if (roles[0] !== 'admin'){
        next({path: '/forbiden'});
      }
    }
    if (to.path === '/register' && roles[0] !== 'admin'){
      next({path: from.path});
      NProgress.done();
    }
    if (to.path === '/store/compte' && roles[0] === 'admin'){
      next({path: '/dashboard'});
      NProgress.done();
    }
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: from.path });
      NProgress.done();
    } else {
      console.log('LES PERMISSIONS de : ', to.meta.title);
      console.log(' SONT : ', to.meta.permissions);
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = roles && roles.length > 0;
      console.log(' PERMISSIONS UTILISATEURS : ', permissions, roles);
      if (hasRoles) {
        next();
      } else {
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['manager','editor']
          const { roles, permissions } = await store.dispatch('user/getInfo');
          console.log('INFO NEXT', roles, permissions);
          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch('permission/generateRoutes', { roles, permissions });
          console.log('NEXT ?', accessRoutes);
          router.addRoutes(accessRoutes);
          next({ ...to, replace: true });
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken');
          Message.error(error.message || "Une erreur s'est produite");
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else if(to.path === '/register' || to.path.includes('store') || to.path === '/'){
    next();
  } else {
    /* has no token*/
    console.log('TOOOOOO', to);
    if (whiteList.indexOf(to.matched[1] ? to.matched[1].path : '') !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      console.log('ERROR IS HERE ');
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
