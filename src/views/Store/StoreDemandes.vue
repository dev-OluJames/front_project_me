<template>
  <div>
    <Load :loaded="loaded"/>
    <!-- ##### Breadcrumb Area Start ##### -->
    <div class="breadcrumb-area">
      <!-- Top Breadcrumb Area -->
      <div class="top-breadcrumb-area bg-img bg-overlay d-flex align-items-center justify-content-center" style="background-image: url(store/img/bg-img/24.jpg);">
        <h2>Demandes</h2>
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
              <div v-if="$store.getters.roles[0] !== 'admin'" class="search_by_terms">
                <base-button type="success" data-toggle="tooltip" data-original-title="Edit product" @click="ajoutDemande($event.target)">
                  <span class="btn-inner--icon"><i class="ni ni-bag-17"></i></span>
                  <span class="btn-inner--text">Faire une Demande</span>
                </base-button>
              </div>
              <!-- Search by Terms -->
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12 col-md-4 col-lg-3">
            <div class="shop-sidebar-area">

              <!-- Shop Widget -->
              <div class="shop-widget price mb-50">
                <h4 class="widget-title">Prices</h4>
                <div class="widget-desc">
                  <div class="slider-range">
                    <div data-min="8" data-max="30" data-unit="$" class="slider-range-price ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all" data-value-min="8" data-value-max="30" data-label-result="Price:">
                      <div class="ui-slider-range ui-widget-header ui-corner-all"></div>
                      <span class="ui-slider-handle ui-state-default ui-corner-all first-handle" tabindex="0"></span>
                      <span class="ui-slider-handle ui-state-default ui-corner-all" tabindex="0"></span>
                    </div>
                    <div class="range-price">Price: $8 - $30</div>
                  </div>
                </div>
              </div>

              <!-- Shop Widget -->
              <div class="shop-widget catagory mb-50">
                <h4 class="widget-title">Categories</h4>
                <div class="widget-desc">
                  <!-- Single Checkbox -->
                  <div class="custom-control custom-checkbox d-flex align-items-center mb-2">
                    <input type="checkbox" class="custom-control-input" id="customCheck1">
                    <label class="custom-control-label" for="customCheck1">All plants <span class="text-muted">(72)</span></label>
                  </div>
                  <!-- Single Checkbox -->
                  <div class="custom-control custom-checkbox d-flex align-items-center mb-2">
                    <input type="checkbox" class="custom-control-input" id="customCheck2">
                    <label class="custom-control-label" for="customCheck2">Outdoor plants <span class="text-muted">(20)</span></label>
                  </div>
                  <!-- Single Checkbox -->
                  <div class="custom-control custom-checkbox d-flex align-items-center mb-2">
                    <input type="checkbox" class="custom-control-input" id="customCheck3">
                    <label class="custom-control-label" for="customCheck3">Indoor plants <span class="text-muted">(15)</span></label>
                  </div>
                  <!-- Single Checkbox -->
                  <div class="custom-control custom-checkbox d-flex align-items-center mb-2">
                    <input type="checkbox" class="custom-control-input" id="customCheck4">
                    <label class="custom-control-label" for="customCheck4">Office Plants <span class="text-muted">(20)</span></label>
                  </div>
                  <!-- Single Checkbox -->
                  <div class="custom-control custom-checkbox d-flex align-items-center mb-2">
                    <input type="checkbox" class="custom-control-input" id="customCheck5">
                    <label class="custom-control-label" for="customCheck5">Potted <span class="text-muted">(15)</span></label>
                  </div>
                  <!-- Single Checkbox -->
                  <div class="custom-control custom-checkbox d-flex align-items-center mb-2">
                    <input type="checkbox" class="custom-control-input" id="customCheck6">
                    <label class="custom-control-label" for="customCheck6">Others <span class="text-muted">(2)</span></label>
                  </div>
                </div>
              </div>

              <!-- Shop Widget -->
              <div class="shop-widget sort-by mb-50">
                <h4 class="widget-title">Sort by</h4>
                <div class="widget-desc">
                  <!-- Single Checkbox -->
                  <div class="custom-control custom-checkbox d-flex align-items-center mb-2">
                    <input type="checkbox" class="custom-control-input" id="customCheck7">
                    <label class="custom-control-label" for="customCheck7">New arrivals</label>
                  </div>
                  <!-- Single Checkbox -->
                  <div class="custom-control custom-checkbox d-flex align-items-center mb-2">
                    <input type="checkbox" class="custom-control-input" id="customCheck8">
                    <label class="custom-control-label" for="customCheck8">Alphabetically, A-Z</label>
                  </div>
                  <!-- Single Checkbox -->
                  <div class="custom-control custom-checkbox d-flex align-items-center mb-2">
                    <input type="checkbox" class="custom-control-input" id="customCheck9">
                    <label class="custom-control-label" for="customCheck9">Alphabetically, Z-A</label>
                  </div>
                  <!-- Single Checkbox -->
                  <div class="custom-control custom-checkbox d-flex align-items-center mb-2">
                    <input type="checkbox" class="custom-control-input" id="customCheck10">
                    <label class="custom-control-label" for="customCheck10">Price: low to high</label>
                  </div>
                  <!-- Single Checkbox -->
                  <div class="custom-control custom-checkbox d-flex align-items-center">
                    <input type="checkbox" class="custom-control-input" id="customCheck11">
                    <label class="custom-control-label" for="customCheck11">Price: high to low</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- All Products Area -->
          <div class="col-12 col-md-8 col-lg-9">
            <div class="shop-products-area">
              <div class="row">

                <!-- Single Product Area -->
                <div class="col-12 col-sm-6 col-lg-4" v-for="(demande, index) in demandes" :key="index">
                  <div class="single-product-area mb-50">
                    <!-- Product Image -->
                    <div class="product-img">
                      <img v-if="demande.image" style="width:210px; height:302px"  :src="demande.image[0].lien" alt="">
                      <img v-else src="store/img/bg-img/40.png" alt="">
                      <!-- Product Tag -->
                      <div class="product-tag">
                        <a href="#">Hot</a>
                      </div>
                      <div v-if="$store.getters.roles[0] !== 'admin'" class="product-meta d-flex">
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
              <nav aria-label="Page navigation">
                <ul class="pagination">
                  <li class="page-item"><a class="page-link" href="#">1</a></li>
                  <li class="page-item"><a class="page-link" href="#">2</a></li>
                  <li class="page-item"><a class="page-link" href="#"><i class="fa fa-angle-right"></i></a></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
    <AddModal
      id="modal-demandes"
      title="Faire une Demande"
      type="demandes"
      @added="demandesList"
    />
  </div>
</template>

<script>
// import Resource from "@/api/resource";
// const storeOffer = new Resource('offres');
import {isLogged} from "../../utils/auth";
import Load from "../../components/Loading/Load";
import Resource from "../../api/resource";
import {Message} from "element-ui";

const demandeResource = new Resource('demandes');
export default {
  name: 'store-offres',
  components: {
    Load,
    AddModal: () => import('../../components/Modals/addModal')
  },
  data () {
    return {
      demandes: [],
      demandeFavoris: {},
      userFavoris: [],
      loaded: true,
      authenticated : isLogged(),
    }
  },
  created() {
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
        this.$root.$emit('bv::show::modal', "modal-demandes", btn)
      }
      // this.$bvModal.show('ajouter-offre');
    },
    demandesList(){
      // const { data } = await offreResource.list();
      // this.offres = data;
      demandeResource.list()
        .then((response) => {
        this.demandes = response.data.filter((demande)=> {
            return demande.is_active === true;
          });
        console.log('DATA DEMANDES', response.data);
        this.loaded = false;
      });
    },
    demandeDetail(id){
      this.$router.push({ path: '/store/demandes/detail/'+id });
    },
    addFavoris(id){
      this.offreFavoris.offre_id = id;
      const isUserLogged = isLogged();
      console.log('OFFRE FAVORIS', this.offreFavoris, isUserLogged);
      if (isUserLogged){
        console.log('USER CONNECTED', this.$store.getters.userId);
        new Resource('users/'+this.$store.getters.userId+'/offre_favoris').store(this.offreFavoris)
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
      const { data } = await new Resource('users/'+id+'/offre_favoris').list();
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
.btn-success {
  color: #fff;
  background-color: #384a12;
  border-color: #384a12;
}
.btn-success:hover {
  color: #fff;
  background-color: #384a12;
  border-color: #384a12;
}
</style>
