import DashboardLayout from '@/views/Layout/DashboardLayout.vue';
import Store from "../views/Store/Store";
import StoreOffres from "../views/Store/StoreItems";
import AuthLayout from '@/views/Pages/AuthLayout.vue';
import NotFoundPage from "../views/NotFoundPage";
const constantRoutes = [
  {
    path: '/',
    redirect: '/',
    component: Store,
    // alwaysShow: true,
    children: [
      {
        path: '/',
        component: () => import(/* webpackChunkName: "users" */ '../views/Store/StoreItems'),
        name: 'Store-items',
        meta: { title: 'store-items', icon: 'el-icon-user-solid' },
      },
      {
        path: '/store/offres',
        component: () => import(/* webpackChunkName: "users" */ '../views/Store/StoreOffres'),
        name: 'Store-offres',
        meta: { title: 'store-offres', icon: 'el-icon-user-solid' },
      },
      {
        path: '/store/demandes',
        component: () => import(/* webpackChunkName: "users" */ '../views/Store/StoreDemandes'),
        name: 'Store-demandes',
        meta: { title: 'store-demandes', icon: 'el-icon-user-solid' },
      },
      {
        path: '/store/offres/detail/:id(\\d+)',
        component: () => import(/* webpackChunkName: "roles" */ '@/views/Store/OffresDetail'),
        name: 'DetailOffre',
        meta: { title: 'detailOffre', icon: 'el-icon-key' },
      },
      {
        path: '/store/demandes/detail/:id(\\d+)',
        component: () => import(/* webpackChunkName: "roles" */ '@/views/Store/DemandeDetail'),
        name: 'DetailDemande',
        meta: { title: 'detailDemande', icon: 'el-icon-key' },
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
        path: '/store/partenaire',
        component: () => import(/* webpackChunkName: "roles" */ '@/views/Store/Partenaires'),
        name: 'partenaire',
        meta: { title: 'Partenaire', icon: 'el-icon-key' },
      },
      {
        path: '/store/equipe',
        component: () => import(/* webpackChunkName: "roles" */ '@/views/Store/Equipe'),
        name: 'equipe',
        meta: { title: 'Equipe', icon: 'el-icon-key' },
      },
      {
        path: '/store/forum',
        component: () => import(/* webpackChunkName: "roles" */ '@/views/Store/Forum'),
        name: 'forum',
        meta: { title: 'Forum', icon: 'el-icon-key' },
      },
      {
        path: '/store/packs',
        component: () => import(/* webpackChunkName: "roles" */ '@/views/Store/Packs'),
        name: 'pack-store',
        meta: { title: 'PackStore', icon: 'el-icon-key' },
      },
      {
        path: '/store/forum/:id(\\d+)',
        component: () => import(/* webpackChunkName: "roles" */ '@/views/Store/ForumDetail'),
        name: 'forum_detail',
        meta: { title: 'ForumDetail', icon: 'el-icon-key' },
      },
      {
        path: '/store/contact',
        component: () => import(/* webpackChunkName: "roles" */ '@/views/Store/Contact'),
        name: 'contact',
        meta: { title: 'Contact', icon: 'el-icon-key' },
      },
      {
        path: '/store/compte',
        component: () => import(/* webpackChunkName: "roles" */ '@/views/Store/Dashboard/UserDetail'),
        name: 'compte',
        meta: { title: 'Compte', icon: 'el-icon-key' },
      },
    ],
  },
  {
    path: '/menu',
    redirect: 'menu',
    component: DashboardLayout,
    children: [
      {
        path: 'typedemande',
        name: 'typedemande',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Menu/TypeDemande.vue')
      },
      {
        path: 'typeoffre',
        name: 'typeoffre',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Menu/TypeOffre.vue')
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
    ]
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
      {
        path: 'users/:id(\\d+)',
        component: () => import(/* webpackChunkName: "Packsdetail" */ '@/views/Pages/UserProfile'),
        name: 'profile',
        meta: { title: 'Profile', noCache: true },
        hidden: true,
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
  {
    path: '/forbiden',
    component: () => import(/* webpackChunkName: "roles" */ '@/views/NotFoundPage'),
    name: 'Forbiden',
    meta: { title: 'rolePermission', icon: 'el-icon-key' },
  }
];

export default constantRoutes;
