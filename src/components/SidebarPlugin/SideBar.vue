<template>
    <nav class="my-3 navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-white border-radius-xl" id="sidenav-main" style="margin-left: 1rem!important; z-index: 999;">
        <div class="container-fluid">

            <!--Toggler-->
            <navbar-toggle-button @click.native="showSidebar">

            </navbar-toggle-button>
            <router-link class="navbar-brand" to="/">
                <img :src="logo" class="navbar-brand-img" alt="..." style="max-height: 4.5rem">
            </router-link>

            <slot name="mobile-right">
                <ul class="nav align-items-center d-md-none">
                    <base-dropdown class="nav-item" menu-on-right tag="li" title-tag="a">
                        <a slot="title-container" class="nav-link nav-link-icon" href="#" role="button"
                           aria-haspopup="true" aria-expanded="false">
                            <i class="ni ni-bell-55"></i>
                        </a>

                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Something else here</a>
                    </base-dropdown>
                    <base-dropdown class="nav-item" menu-on-right tag="li" title-tag="a">
                        <a slot="title-container" class="nav-link" href="#" role="button">
                            <div class="media align-items-center">
                              <span class="avatar avatar-sm rounded-circle">
                                <img alt="Image placeholder" src="img/theme/team-1.jpg">
                              </span>
                            </div>
                        </a>

                        <div class=" dropdown-header noti-title">
                            <h6 class="text-overflow m-0">Welcome!</h6>
                        </div>
                        <router-link to="/profile" class="dropdown-item">
                            <i class="ni ni-single-02"></i>
                            <span>My profile</span>
                        </router-link>
                        <router-link to="/profile" class="dropdown-item">
                            <i class="ni ni-settings-gear-65"></i>
                            <span>Settings</span>
                        </router-link>
                        <router-link to="/profile" class="dropdown-item">
                            <i class="ni ni-calendar-grid-58"></i>
                            <span>Activity</span>
                        </router-link>
                        <router-link to="/profile" class="dropdown-item">
                            <i class="ni ni-support-16"></i>
                            <span>Support</span>
                        </router-link>
                        <div class="dropdown-divider"></div>
                        <a href="#" class="dropdown-item" @click="logout">
                            <i class="ni ni-user-run"></i>
                            <span>Logout</span>
                        </a>
                    </base-dropdown>
                </ul>
            </slot>
            <slot></slot>
            <div v-show="$sidebar.showSidebar" class="navbar-collapse collapse show" id="sidenav-collapse-main">

                <div class="navbar-collapse-header d-md-none">
                    <div class="row">
                        <div class="col-6 collapse-brand">
                            <router-link to="/">
                                <img :src="logo" style="max-height: 4.5rem">
                            </router-link>
                        </div>
                        <div class="col-6 collapse-close">
                            <navbar-toggle-button @click.native="closeSidebar"></navbar-toggle-button>
                        </div>
                    </div>
                </div>

                <ul class="navbar-nav">
                    <slot name="links">
                    </slot>
                  <!--Divider-->
                  <li>
                    <hr class="my-3" style="margin-left: 2rem; margin-right: 2rem;">
                  </li>
                  <sidebar-item
                    v-if="checkRole(['admin'])"
                    :link="{
                      name: 'Administration',
                      path: '/administration',
                      icon: 'ni ni-atom text-blue',
                      children: [
                        { link : {
                          name: 'Utilisateurs',
                          path: '/administration/users',
                          icon: 'ni ni-circle-08 text-blue',
                          },
                        },
                        {
                          link : {
                          name: 'Roles',
                          path: '/administration/roles',
                          icon: 'ni ni-key-25 text-warning',
                          },
                        },
                        {
                          link : {
                          name: 'Type Utilisateur',
                          path: '/administration/type_users',
                          icon: 'ni ni-key-25 text-warning',
                          },
                        },
                      ]
                      }">
                  </sidebar-item>
                </ul>
              <!--b-nav-text class="p-0" v-b-toggle.collapse-2>
                  <i class="ni ni-atom text-blue"></i> Administration
                </b-nav-text>
                <b-collapse id="collapse-2">
                  <sidebar-item
                    :link="{
                    name: 'Utilisateurs',
                    path: '/utilisateurs',
                    icon: 'ni ni-circle-08 text-pink'
                  }">
                  </sidebar-item>
                  <sidebar-item
                    :link="{
                    name: 'Roles',
                    path: '/roles',
                    icon: 'ni ni-circle-08 text-pink'
                  }">
                  </sidebar-item>
                </b-collapse -->
                <!-- ul class="navbar-nav mb-md-3">
                    <li class="nav-item">
                        <a class="nav-link"
                           href="https://www.creative-tim.com/learning-lab/bootstrap-vue/alerts/argon-dashboard">
                            <i class="ni ni-spaceship"></i> Getting started
                        </a>
                    </li>
                </ul -->
            </div>
            </div>
    </nav>
</template>
<script>
  import NavbarToggleButton from '@/components/NavbarToggleButton';
  import Cookies from 'js-cookie';
  import {removeToken} from "../../utils/auth";
  import checkRole from "../../utils/role";
  export default {
    name: 'sidebar',
    components: {
      NavbarToggleButton
    },
    props: {
      logo: {
        type: String,
        default: 'img/brand/green.png',
        description: 'Sidebar app logo'
      },
      autoClose: {
        type: Boolean,
        default: true,
        description: 'Whether sidebar should autoclose on mobile when clicking an item'
      }
    },
    provide() {
      return {
        autoClose: this.autoClose
      };
    },
    methods: {
      checkRole,
      closeSidebar() {
        this.$sidebar.displaySidebar(false);
      },
      showSidebar() {
        this.$sidebar.displaySidebar(true);
      },
      async logout() {
        Cookies.remove('token_key');
        removeToken();
        // await this.$store.dispatch('user/logout');
        await this.$router.push(`/login?redirect=${this.$route.fullPath}`);
      },
    },
    beforeDestroy() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.showSidebar = false;
      }
    }
  };
</script>
<style lang="scss" scoped>
.my-3 {
  margin-top: 1rem!important;
  margin-bottom: 1rem!important;
}
.border-radius-xl {
  border-radius: 1rem;
}
</style>
