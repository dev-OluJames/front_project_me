<template>
  <div>
    <Load :loaded="loaded"/>
    <!-- ##### Breadcrumb Area Start ##### -->
    <div class="breadcrumb-area">
      <!-- Top Breadcrumb Area -->
      <div class="top-breadcrumb-area bg-img bg-overlay d-flex align-items-center justify-content-center" style="background-image: url(store/img/bg-img/24.jpg);">
        <h2>Offres & Demandes</h2>
      </div>

      <div class="container">
        <div class="row">
          <div class="col-12">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item"><router-link to="/"><i class="fa fa-home"></i>Home</router-link></li>
                <li class="breadcrumb-item active" aria-current="page">Shop</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </div>
    <!-- ##### Breadcrumb Area End ##### -->
    <!-- ##### Shop Area Start ##### -->
    <section class="shop-page section-padding-0-100" style="padding-bottom: 0px">
      <div class="container">
        <div class="row">
          <!-- Shop Sorting Data -->
          <div class="col-12">
            <div class="shop-sorting-data d-flex flex-wrap align-items-center justify-content-between" style="padding-bottom: 0rem">
              <!-- Shop Page Count -->

              <div class="shop-page-count">
                <h1 class="display-4">Offres</h1>
              </div>
              <div class="search_by_terms">
<!--                <base-button class="alazea-btn" data-toggle="tooltip" data-original-title="Edit product" @click="ajoutDemande($event.target)">Faire une Offre</base-button>-->
                <router-link to="/store/offres" style="color: #51515e;font-family: 'Dosis',serif;">Toutes les offres</router-link>
              </div>
              <!-- Search by Terms -->
            </div>
          </div>
        </div>

        <div class="row">
          <!-- All Products Area -->
          <div class="col-12 col-md-12 col-lg-12">
            <div class="shop-products-area">
              <div class="row">

                <!-- Single Product Area -->
                <div class="col-12 col-sm-4 col-lg-2" v-for="(offre, index) in offres" :key="index">
                  <div class="single-product-area mb-50">
                    <!-- Product Image -->
                    <div class="product-img">
                      <a href="#"><img src="store/img/bg-img/40.png" alt=""></a>
                      <!-- Product Tag -->
                      <div class="product-tag">
                        <a href="#">Hot</a>
                      </div>
                      <div class="product-meta d-flex">
                        <a v-if="isFavoris(offre.id)" href="javascript:undefined;" class="wishlist-btn" style="background-color: #70c745;" @click="addFavoris(offre.id)"><i class="icon_heart_alt"></i></a>
                        <a v-else href="javascript:undefined;" class="wishlist-btn" @click="addFavoris(offre.id)"><i class="icon_heart_alt"></i></a>
<!--                        <a href="#" class="compare-btn"><i class="arrow_left-right_alt"></i></a>-->
                      </div>
                    </div>
                    <!-- Product Info -->
                    <div class="product-info mt-15 text-center">
                      <router-link :to="'/store/offres/detail/'+offre.id">
                        <p>{{ offre.libelle }}</p>
                      </router-link>
                      <h6>{{ offre.prix_plateforme }} FCFA</h6>
                    </div>
                  </div>
                </div>

              </div>

              <!-- Pagination -->
              <!-- nav aria-label="Page navigation">
                <ul class="pagination">
                  <li class="page-item"><a class="page-link" href="#">1</a></li>
                  <li class="page-item"><a class="page-link" href="#">2</a></li>
                  <li class="page-item"><a class="page-link" href="#"><i class="fa fa-angle-right"></i></a></li>
                </ul>
              </nav -->
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="shop-page section-padding-0-100">
      <div class="container">
        <div class="row">
          <!-- Shop Sorting Data -->
          <div class="col-12">
            <div class="shop-sorting-data d-flex flex-wrap align-items-center justify-content-between" style="padding-bottom: 0px">
              <!-- Shop Page Count -->
              <div class="shop-page-count">
                <h1 class="display-4">Demandes</h1>
              </div>
              <div class="search_by_terms">
                <router-link to="/store/demandes" style="color: #51515e;font-family: 'Dosis',serif;">Toutes les demandes</router-link>
              </div>
              <!-- Search by Terms -->
            </div>
          </div>
        </div>

        <div class="row">
          <!-- All Products Area -->
          <div class="col-12 col-md-12 col-lg-12">
            <div class="shop-products-area">
              <div class="row">

                <!-- Single Product Area -->
                <div class="col-12 col-sm-4 col-lg-2" v-for="(demande, index) in demandes" :key="index">
                  <div class="single-product-area mb-50">
                    <!-- Product Image -->
                    <div class="product-img">
                      <a href="#"><img src="store/img/bg-img/40.png" alt=""></a>
                      <!-- Product Tag -->
                      <div class="product-tag">
                        <a href="#">Hot</a>
                      </div>
                      <div class="product-meta d-flex">
                        <a v-if="isFavoris(demande.id)" href="javascript:undefined;" class="wishlist-btn" style="background-color: #70c745;" @click="addFavoris(demande.id)"><i class="icon_heart_alt"></i></a>
                        <a v-else href="javascript:undefined;" class="wishlist-btn" @click="addFavoris(demande.id)"><i class="icon_heart_alt"></i></a>
<!--                        <a href="#" class="compare-btn"><i class="arrow_left-right_alt"></i></a>-->
                      </div>
                    </div>
                    <!-- Product Info -->
                    <div class="product-info mt-15 text-center">
                      <router-link :to="'/store/demandes/detail/'+demande.id">
                        <p>{{ demande.libelle }}</p>
                      </router-link>
<!--                      <h6>{{ demande.prix_plateforme }} FCFA</h6>-->
                    </div>
                  </div>
                </div>

              </div>

              <!-- Pagination -->
              <!-- nav aria-label="Page navigation">
                <ul class="pagination">
                  <li class="page-item"><a class="page-link" href="#">1</a></li>
                  <li class="page-item"><a class="page-link" href="#">2</a></li>
                  <li class="page-item"><a class="page-link" href="#"><i class="fa fa-angle-right"></i></a></li>
                </ul>
              </nav-->
            </div>
          </div>
        </div>
      </div>
    </section>
    <AddModal
      id="modal-4"
      title="Faire une Demande"
      type="demandes"
    />
  </div>
</template>

<script>
// import Resource from "@/api/resource";
// const storeOffer = new Resource('offres');
import {isLogged} from "../../utils/auth";
import Load from "../../components/Loading/Load";
import request from "../../utils/request";
import {Message} from "element-ui";
export default {
  name: 'store-items',
  components: {
    Load,
    AddModal: () => import('../../components/Modals/addModal')
  },
  data () {
    return {
      offres: [],
      demandes: [],
      offreFavoris: {},
      demandeFavoris: {},
      userFavoris: [],
      loaded: true,
      authenticated : isLogged(),
    }
  },
  created() {
    this.offresList();
    this.demandesList();
    if (this.authenticated){
      this.getUserOffresFavoris(this.$store.getters.userId);
    }
  },
  methods: {
    ajoutDemande(btn){
      if (!this.authenticated){
        Message({
          message: 'Veuillez vous connecter avant d\' effectuer cette action ',
          type: 'info',
          duration: 5 * 1000,
        });
        this.$router.push(`/login?redirect=${this.$route.fullPath}`);
      } else {
        console.log('Button', btn);
        this.$root.$emit('bv::show::modal', "modal-4", btn)
      }
      // this.$bvModal.show('ajouter-offre');
    },
    offresList(){
      // const { data } = await offreResource.list();
      // this.offres = data;
      request({
        url: '/offres',
        method: 'get',
      }).then((response) => {
        this.offres = response.data;
        console.log('DATA OFFRES', response.data);
        this.loaded = false;
      });
    },
    demandesList(){
      // const { data } = await offreResource.list();
      // this.offres = data;
      request({
        url: '/demandes',
        method: 'get',
      }).then((response) => {
        this.demandes = response.data;
        console.log('DATA DEMANDES', response.data);
        this.loaded = false;
      });
    },
    demandeDetail(id){
      this.$router.push({ path: '/store/demandes/detail/'+id });
    },
    offreDetail(id){
      this.$router.push({ path: '/store/offres/detail/'+id });
    },
    addFavoris(id){
      this.offreFavoris.offre_id = id;
      const isUserLogged = isLogged();
      console.log('OFFRE FAVORIS', this.offreFavoris, isUserLogged);
      if (isUserLogged){
        console.log('USER CONNECTED', this.$store.getters.userId);
        request({
          url: 'users/'+this.$store.getters.userId+'/offre_favoris',
          method: 'post',
          data: this.offreFavoris,
        })
        .then((response) => {
          console.log(response);
          Message({
            message: response.message,
            type: response.success ? "success" : "error",
            duration: 5 * 1000,
          })
        })
        .finally(() => {
          this.getUserOffresFavoris(this.$store.getters.userId);
        });
      } else {
        Message({
          message: 'Veuillez vous connecter avant d\' effectuer cette action ',
          type: 'info',
          duration: 5 * 1000,
        });
        this.$router.push(`/login?redirect=${this.$route.fullPath}`);
      }
    },
    async getUserOffresFavoris(id){
      const { data } = await request({
        url: 'users/'+id+'/offre_favoris',
        method: 'get'
      });
      this.userFavoris = [];
      const favoris_ids = [];
      data.forEach((favoris)=> {
        favoris_ids.push(favoris.id);
      })
      this.userFavoris = favoris_ids;
      console.log('USERS FAVORIS ', this.userFavoris);
    },
    isFavoris(id){
      console.log('FAVORIS ', this.userFavoris);
      return this.userFavoris.includes(id);
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
