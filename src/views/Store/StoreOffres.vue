<template>
  <div>
    <Load :loaded="loaded"/>
    <!-- ##### Breadcrumb Area Start ##### -->
    <div class="breadcrumb-area">
      <!-- Top Breadcrumb Area -->
      <div class="top-breadcrumb-area bg-img bg-overlay d-flex align-items-center justify-content-center" style="background-image: url(store/img/bg-img/24.jpg);">
        <h2>Offres</h2>
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
                <h1 class="display-4">Offres</h1>
              </div>
              <div class="search_by_terms">
                <base-button type="success" data-toggle="tooltip" data-original-title="Edit product" @click="ajoutoffre($event.target)">
                  <span class="btn-inner--icon"><i class="ni ni-bag-17"></i></span>
                  <span class="btn-inner--text">Faire une offre</span>
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
              <div class="shop-widget catagory mb-50 contact-form-area">
                <h4 class="widget-title">Varietes</h4>
                <div class="widget-desc">
                  <el-select v-model="query.variete_produit_id"  filterable placeholder="Choisir" style="margin-bottom: 10px">
                    <el-option
                      v-for="variete in varietes"
                      :key="variete.id"
                      :label="variete.nom"
                      :value="variete.id"
                    >
                    </el-option>
                  </el-select>
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
                </div>
              </div>

              <!-- Shop Widget -->
              <div class="shop-widget sort-by mb-50 contact-form-area">
                <h4 class="widget-title">Village</h4>
                <div class="widget-desc">
                  <el-select v-model="query.village_id"  filterable placeholder="Choisir"  style="margin-bottom: 10px">
                    <el-option
                      v-for="village in villages"
                      :key="village.id"
                      :label="village.libelle"
                      :value="village.id"
                    >
                    </el-option>
                  </el-select>
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
                </div>
              </div>

              <div class="shop-widget sort-by mb-50">
                <h4 class="widget-title">Type Offre</h4>
                <div class="widget-desc">
                  <!-- Single Checkbox -->
                  <div class="custom-control custom-checkbox d-flex align-items-center mb-2">
                    <input type="checkbox" class="custom-control-input" id="customCheck18">
                    <label class="custom-control-label" for="customCheck7">Spontanée</label>
                  </div>
                  <!-- Single Checkbox -->
                  <div class="custom-control custom-checkbox d-flex align-items-center mb-2">
                    <input type="checkbox" class="custom-control-input" id="customCheck28">
                    <label class="custom-control-label" for="customCheck8">Prévisionnel</label>
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
                <div class="col-12 col-sm-6 col-lg-4" v-for="(offre, index) in offres" :key="index">
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
                        <p>{{ offre.variete_produit.nom }}</p>
                      </router-link>
                      <!--                      <h6>{{ offre.prix_plateforme }} FCFA</h6>-->
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
      id="modal-offre"
      title="Faire une offre"
      type="offres"
      @added="offresList"
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

const offreResource = new Resource('offres');
export default {
  name: 'store-offres',
  components: {
    Load,
    AddModal: () => import('../../components/Modals/addModal')
  },
  data () {
    return {
      offres: [],
      offreFavoris: {},
      userFavoris: [],
      villages: [],
      varietes: [],
      query: {
        village_id: null,
        variete_produit_id: null,
      },
      loaded: true,
      authenticated : isLogged(),
    }
  },
  created() {
    this.offresList(this.query);
    if (this.authenticated){
      this.getUserOffresFavoris(this.$store.getters.userId);
      this.getvillages();
      this.getVarieteList();
    }
  },
  methods: {
    async getVarieteList(){
      const {data} = await new Resource('varieteProduits').list();
      this.varietes = data;
    },
    async getvillages(){
      const { data } = await new Resource('villages').list();
      this.villages = data;
    },
    ajoutoffre(btn){
      if (!this.authenticated){
        Message({
          message: 'Veuillez vous connecter avant d\' effectuer cette action ',
          type: 'info',
          duration: 5 * 1000,
        });
        this.$router.push(`/login?redirect=${this.$route.fullPath}`);
      } else {
        console.log('Button', btn);
        this.$root.$emit('bv::show::modal', "modal-offre", btn)
      }
      // this.$bvModal.show('ajouter-offre');
    },
    offresList(){
      // const { data } = await offreResource.list();
      // this.offres = data;
      offreResource.list(this.query)
        .then((response) => {
          this.offres = response.data;
          console.log('DATA offreS', response.data);
          this.loaded = false;
        });
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
