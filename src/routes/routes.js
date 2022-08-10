import DashboardLayout from '@/views/Layout/DashboardLayout.vue';
import Store from "../views/Store/Store";
import StoreOffres from "../views/Store/StoreOffres";
import AuthLayout from '@/views/Pages/AuthLayout.vue';
import NotFoundPage from "../views/NotFoundPage";
const constantRoutes = [
  {
    path: '/',
    redirect: '/store/offres',
    component: Store,
    // alwaysShow: true,
    children: [
      {
        path: '/store/offres',
        component: () => import(/* webpackChunkName: "users" */ '../views/Store/StoreOffres'),
        name: 'Store-offres',
        meta: { title: 'store-offres', icon: 'el-icon-user-solid' },
      },
      {
        path: '/store/offres/detail/:id(\\d+)',
        component: () => import(/* webpackChunkName: "roles" */ '@/views/Store/OffresDetail'),
        name: 'Detail',
        meta: { title: 'detailOffre', icon: 'el-icon-key' },
      },
      {
        path: '/store/favoris',
        component: () => import(/* webpackChunkName: "roles" */ '@/views/Admin/Roles'),
        name: 'Favoris',
        meta: { title: 'favoris', icon: 'el-icon-key' },
      },
      {
        path: '/store/presentation',
        component: () => import(/* webpackChunkName: "roles" */ '@/views/Store/Presentation'),
        name: 'presentation',
        meta: { title: 'Presentation', icon: 'el-icon-key' },
      },
      {
        path: '/store/dashboard',
        component: () => import(/* webpackChunkName: "roles" */ '@/views/Store/Dashboard/UserDetail'),
        name: 'presentation',
        meta: { title: 'Presentation', icon: 'el-icon-key' },
      },
    ],
  },
  {
    path: '/dashboard',
    redirect: 'dashboard',
    component: DashboardLayout,
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "demo" */ '../views/Dashboard.vue')
      },
      {
        path: 'promotions',
        name: 'promotions',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Promotions/Promotions')
      },
      {
        path: 'promotions/:id(\\d+)',
        component: () => import(/* webpackChunkName: "Packsdetail" */ '@/views/Promotions/detail'),
        name: 'promotion',
        meta: { title: 'Promotion', noCache: true },
        hidden: true,
      },
      {
        path: 'produits',
        name: 'produits',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Produits/Produits')
      },
      {
        path: 'produits/:id(\\d+)',
        component: () => import(/* webpackChunkName: "Packsdetail" */ '@/views/Promotions/detail'),
        name: 'produits-detail',
        meta: { title: 'Produits', noCache: true },
        hidden: true,
      },
      {
        path: 'packs',
        name: 'packs',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Packs/Packs.vue')
      },
      {
        path: 'packs/:id(\\d+)',
        component: () => import(/* webpackChunkName: "Packsdetail" */ '@/views/Packs/detail'),
        name: 'pack',
        meta: { title: 'Pack', noCache: true },
        hidden: true,
      },
      {
        path: 'localites',
        name: 'localites',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Localites/Localites')
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/UserProfile.vue')
      },
      {
        path: 'maps',
        name: 'maps',
        component: () => import(/* webpackChunkName: "demo" */ '../views/GoogleMaps.vue')
      },
      {
        path: 'demandes',
        name: 'demandes',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Commandes.vue')
      },
      {
        path: 'offres',
        name: 'offres',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Offres.vue')
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true, component: NotFoundPage },
  {
    path: '/login',
    redirect: 'login',
    component: AuthLayout,
    children: [
      {
        path: '/login',
        name: 'login',
        hidden: true,
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/Login.vue')
      },
      {
        path: '/auth-redirect',
        component: () => import(/* webpackChunkName: "auth-redirect" */ '../views/Pages/AuthRedirect'),
        hidden: true,
      },
      {
        path: '/register',
        name: 'register',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/Register.vue')
      },
    ]
  },
  {
    path: '/administration',
    redirect: '/administration/users',
    name: 'Administration',
    component: DashboardLayout,
    // alwaysShow: true,
    children: [
      /** Gestion des utilisateurs */
      /** {
      path: 'users/edit/:id(\\d+)',
      component: () => import('@/views/users/UserProfile'),
      name: 'UserProfile',
      meta: { title: 'userProfile', noCache: true, permissions: ['gerer user'] },
      hidden: true,
    }, */
      {
        path: 'users',
        component: () => import(/* webpackChunkName: "users" */ '@/views/Admin/Utilisateurs'),
        name: 'Utilisateurs',
        meta: { title: 'users', icon: 'el-icon-user-solid' },
      },
      /** Roles et permissions */
      {
        path: 'roles',
        component: () => import(/* webpackChunkName: "roles" */ '@/views/Admin/Roles'),
        name: 'Roles',
        meta: { title: 'rolePermission', icon: 'el-icon-key' },
      },
    ],
  },
];

export default constantRoutes;
