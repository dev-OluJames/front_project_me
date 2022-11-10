<template>
  <div class="promotions">
    <Load :loaded="loaded"/>
    <!-- ##### Breadcrumb Area Start ##### -->
    <div class="breadcrumb-area">
      <!-- Top Breadcrumb Area -->
      <div class="top-breadcrumb-area bg-img bg-overlay d-flex align-items-center justify-content-center" style="background-image: url(store/img/bg-img/24.jpg);">
        <h2>PROMOTIONS</h2>
      </div>

      <div class="container">
        <div class="row">
          <div class="col-8">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item"><router-link to="/"><i class="fa fa-home"></i> Home</router-link></li>
                <li class="breadcrumb-item active" aria-current="page">Promotions</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </div>
    <!-- ##### Breadcrumb Area End ##### -->
    <!-- ##### Product Area Start ##### -->
    <section class="new-arrivals-products-area section-padding-100" style="background-color: #f2f4f5;margin-bottom: 30px;">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <!-- Section Heading -->
            <div class="section-heading text-center">
              <h2>PROMOTIONS</h2>
              <p>Voire la liste des offres dans chaque Promotions</p>
            </div>
          </div>
        </div>

        <div class="row justify-content-center">

          <!-- Single Product Area -->
          <div class="col-12 col-sm-3 col-lg-2" v-for="promotion in promotions" :key="promotion.id">
            <div class="single-product-area mb-50 wow fadeInUp" data-wow-delay="100ms">
              <!-- Product Image -->
              <div class="product-img">
                <a href="shop-details.html"><img src="store/img/bg-img/promo2.jpg" alt=""></a>
                <!-- Product Tag -->

                <div class="product-meta d-flex">
                  <router-link :to="{ name: 'offre-promotion', params: { promotion_libelle: promotion.libelle }}" class="add-to-cart-btn"> Voir</router-link>
                </div>
              </div>
              <!-- Product Info -->
              <div class="product-info mt-15 text-center">
                <a href="javascript:undefined;">
                  <h6>{{ promotion.libelle }}</h6>
                  <h6>{{ promotion.description }}</h6>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- ##### Product Area End ##### -->
  </div>
</template>

<script>
import {isLogged} from "../../utils/auth";
import Load from "../../components/Loading/Load";
import Resource from "../../api/resource";
import {Message} from "element-ui";
const promotionResource = new Resource('promotions');
export default {
  name: "Packs",
  components: {
    Load,
  },
  data () {
    return {
      promotions: [],
      query: {
        limit: 4,
      },
      loaded: true,
      authenticated : isLogged(),
      userPacks: [],
    }
  },
  created() {
    if (this.authenticated){
      this.promotionList();
      this.getUserPacks();
    }
  },
  methods: {
    promotionList(){
      this.loaded = true;
      promotionResource.list()
      .then((response) => {
        this.promotions = response.data;
        console.log('DATA PROMOTIONS', response.data);
        this.loaded = false;
      });
    },
  }
}
</script>


<style lang="scss" scoped>
.btn:not(:disabled):not(.disabled) {
  cursor: pointer;
}
.section-padding-100 {
  padding-top: 10px;
  padding-bottom: 23px;
}
.alazea-btn {
  -webkit-transition-duration: 400ms;
  transition-duration: 400ms;
  position: relative;
  z-index: 1;
  display: inline-block;
  min-width: 150px;
  height: 46px;
  color: #ffffff;
  background-color: #70c745;
  border: 2px solid #70c745;
  border-radius: 2px;
  padding: 0 20px;
  font-size: 16px;
  line-height: 42px;
  text-transform: uppercase;
  font-weight: 600;
}
.btn {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
.single-product-area .product-img .product-meta .add-to-cart-btn {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 calc(100% - 100px);
  flex: 0 0 100%;
  max-width: 100%;
  width: 100%;
  border-left: 1px solid rgba(235, 235, 235, 0.5);
  border-right: 1px solid rgba(235, 235, 235, 0.5);
}
</style>
