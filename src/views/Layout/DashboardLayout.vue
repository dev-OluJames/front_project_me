<template>
  <div class="wrapper">
    <notifications></notifications>
    <side-bar>
      <template slot="links">
        <sidebar-item
          :link="{
            name: 'Dashboard',
            path: '/dashboard',
            icon: 'ni ni-tv-2 text-primary',
          }"
        >
        </sidebar-item>

        <!-- sidebar-item
          :link="{
          name: 'Icons',
          path: '/icons',
          icon: 'ni ni-planet text-blue'
          }"
        >
        </sidebar-item -->

        <sidebar-item
              v-if="checkPermission(['gerer localite', 'modifier localite', 'supprimer localite', 'creer localite'])"
              :link="{
                name: 'Localites',
                path: '/dashboard/localites',
                icon: 'ni ni-pin-3 text-orange'
              }">
        </sidebar-item>
        <sidebar-item
                v-if="checkPermission(['gerer demande', 'modifier demande', 'supprimer demande', 'creer demande'])"
                :link="{
                  name: 'Demandes',
                  path: '/dashboard/demandes',
                  icon: 'ni ni-bag-17 text-red'
                }">
        </sidebar-item>
        <sidebar-item
                v-if="checkPermission(['gerer offre', 'modifier offre', 'supprimer offre', 'creer offre'])"
                :link="{
                  name: 'Offres',
                  path: '/dashboard/offres',
                  icon: 'ni ni-basket text-blue'
                }">
        </sidebar-item>
        <sidebar-item
          v-if="checkPermission(['gerer pack', 'modifier pack', 'supprimer pack', 'creer pack'])"
                  :link="{
                    name: 'Packs',
                    path: '/dashboard/packs',
                    icon: 'ni ni-box-2 text-info'
                  }">
        </sidebar-item>
        <sidebar-item
                  v-if="checkPermission(['gerer promotion', 'modifier promotion', 'supprimer promotion', 'creer promotion'])"
                  :link="{
                    name: 'Promotions',
                    path: '/dashboard/promotions',
                    icon: 'ni ni-notification-70 text-pink'
                  }">
        </sidebar-item>
        <sidebar-item
          v-if="checkPermission(['gerer produit', 'modifier produit', 'supprimer produit', 'creer produit'])"
          :link="{
                name: 'Menu',
                path: '/menu',
                icon: 'ni ni-shop text-green',
                children: [
                  { link : {
                    name: 'Produits',
                    path: '/menu/produits',
                    icon: 'ni ni-shop text-green'
                    },
                  },
                  { link : {
                    name: 'Mesure',
                    path: '/menu/mesures',
                    icon: 'ni ni-shop text-green'
                    },
                  },
                  { link : {
                    name: 'Type Demande',
                    path: '/menu/typedemande',
                    icon: 'ni ni-circle-08 text-blue',
                    },
                  },
                  {
                    link : {
                    name: 'Type Offre',
                    path: '/menu/typeoffre',
                    icon: 'ni ni-key-25 text-warning',
                    },
                  },
                  ]
                  }">
        </sidebar-item>
      </template>
      <!-- template slot="links-after">
        <hr class="my-3">
        <h6 class="navbar-heading p-0 text-muted">ADMINISTRATION</h6>
        <template slot="link">
          <b-nav-text class="p-0" v-b-toggle.collapse-2>
            Administration
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
          </b-collapse>
        </template>

        <b-nav class="navbar-nav mb-md-3">
          <b-nav-item
               href="#"
               >
              <i class="ni ni-spaceship"></i>
              <b-nav-text class="p-0">Getting started</b-nav-text>
          </b-nav-item>
        </b-nav>
      </template -->
    </side-bar>
    <div class="main-content">
      <dashboard-navbar :type="$route.meta.navbarType"></dashboard-navbar>

      <div @click="$sidebar.displaySidebar(false)">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
      </div>
      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<script>
  /* eslint-disable no-new */
  import PerfectScrollbar from 'perfect-scrollbar';
  import 'perfect-scrollbar/css/perfect-scrollbar.css';
  import checkPermission from "../../utils/permission";

  function hasElement(className) {
    return document.getElementsByClassName(className).length > 0;
  }

  function initScrollbar(className) {
    if (hasElement(className)) {
      new PerfectScrollbar(`.${className}`);
    } else {
      // try to init it later in case this component is loaded async
      setTimeout(() => {
        initScrollbar(className);
      }, 100);
    }
  }

  import DashboardNavbar from './DashboardNavbar.vue';
  import ContentFooter from './ContentFooter.vue';
  import DashboardContent from './Content.vue';
  import { FadeTransition } from 'vue2-transitions';
  import { BCollapse } from 'bootstrap-vue';

  export default {
    components: {
      DashboardNavbar,
      ContentFooter,
      DashboardContent,
      BCollapse,
      FadeTransition
    },
    methods: {
      checkPermission,
      initScrollbar() {
        let isWindows = navigator.platform.startsWith('Win');
        if (isWindows) {
          initScrollbar('sidenav');
        }
      }
    },
    mounted() {
      this.initScrollbar()
    }
  };
</script>
<style lang="scss">
.navbar-vertical .navbar-nav .nav-link[data-bs-toggle=collapse][aria-expanded=true]:after {
  color: #212529;
  transform: rotate(180deg);
}

/* width */
::-webkit-scrollbar {
  width: 6px;
  border-radius: 18px;
}

/* Track */
::-webkit-scrollbar-track {
  background: rgba(241, 241, 241, 0.22);
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #c2c2c2;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #c2c2c2;
}
</style>
