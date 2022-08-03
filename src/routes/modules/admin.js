/** On peut décomposer les routes par module**/
import DashboardLayout from "../../views/Layout/DashboardLayout";

const adminRoutes = {
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
      name: 'RoleList',
      meta: { title: 'rolePermission', icon: 'el-icon-key' },
    },
  ],
};

export default adminRoutes;
