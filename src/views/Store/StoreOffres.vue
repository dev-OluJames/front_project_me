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
            <div class="shop-sorting-data d-flex flex-wrap align-items-center justify-content-between">
              <!-- Shop Page Count -->
              <div class="shop-page-count">
                <p>1–9 sur 72 Resultats</p>
              </div>
              <!-- Search by Terms -->
              <div class="search_by_terms">
                <form action="#" method="post" class="form-inline">
                  <select class="custom-select widget-title">
                    <option selected>Filtrer par Popularité</option>
                    <option value="1">Short par Newest</option>
                    <option value="2">Short par Vente</option>
                    <option value="3">Short par Ealuation</option>
                  </select>
                  <select class="custom-select widget-title">
                    <option selected>Show: 9</option>
                    <option value="1">12</option>
                    <option value="2">18</option>
                    <option value="3">24</option>
                  </select>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <!-- Sidebar Area -->
          <div class="col-12 col-md-4 col-lg-3">
            <div class="shop-sidebar-area">

              <!-- Shop Widget -->
              <div class="shop-widget price mb-50">
                <h4 class="widget-title">Prix</h4>
                <div class="widget-desc">
                  <div class="slider-range">
                    <div data-min="8" data-max="30" data-unit="$" class="slider-range-price ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all" data-value-min="8" data-value-max="30" data-label-result="Price:">
                      <div class="ui-slider-range ui-widget-header ui-corner-all"></div>
                      <span class="ui-slider-handle ui-state-default ui-corner-all first-handle" tabindex="0"></span>
                      <span class="ui-slider-handle ui-state-default ui-corner-all" tabindex="0"></span>
                    </div>
                    <div class="range-price">Prix: 0CFA - 1000000CFA</div>
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
                <h4 class="widget-title">Filtrer</h4>
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

              <!-- Shop Widget -->
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
                        <a v-if="isFavoris(offre.id)" href="#" class="wishlist-btn" style="background-color: #70c745;" @click="addFavoris(offre.id)"><i class="icon_heart_alt"></i></a>
                        <a v-else href="#" class="wishlist-btn" @click="addFavoris(offre.id)"><i class="icon_heart_alt"></i></a>
                        <a href="#" class="add-to-cart-btn">Demander</a>
                        <a href="#" class="compare-btn"><i class="arrow_left-right_alt"></i></a>
                      </div>
                    </div>
                    <!-- Product Info -->
                    <div class="product-info mt-15 text-center">
                      <a href="#" @click="offreDetail(offre.id)">
                        <p>{{ offre.libelle }}</p>
                      </a>
                      <h6>{{ offre.prix_plateforme }} FCFA</h6>
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
  name: 'store-offres',
  components: {
    Load,
  },
  data () {
    return {
      offres: [],
      offreFavoris: {},
      userFavoris: [],
      loaded: true,
      authenticated : isLogged(),
    }
  },
  created() {
    this.offresList();
    if (this.authenticated){
      this.getUserOffresFavoris(this.$store.getters.userId);
    }
  },
  methods: {
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
