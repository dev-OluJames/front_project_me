<template>
  <div>
    <Load :loaded="loading"/>
    <!-- ##### Breadcrumb Area Start ##### -->
    <div class="breadcrumb-area">
      <!-- Top Breadcrumb Area -->
      <div class="top-breadcrumb-area bg-img bg-overlay d-flex align-items-center justify-content-center" style="background-image: url(store/img/bg-img/24.jpg);">
        <h2>DETAILS DU PRODUIT</h2>
      </div>

      <div class="container">
        <div class="row">
          <div class="col-12">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item"><router-link to="/"><i class="fa fa-home"></i>Home</router-link></li>
                <li class="breadcrumb-item"><router-link to="/">Shop</router-link></li>
                <li class="breadcrumb-item active" aria-current="page">Details</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </div>
    <!-- ##### Breadcrumb Area End ##### -->

    <!-- ##### Single Product Details Area Start ##### -->
    <section class="single_product_details_area mb-50">
      <div class="produts-details--content mb-50">
        <div class="container">
          <div class="row justify-content-between">

            <div class="col-12 col-md-6 col-lg-5">
              <div class="single_product_thumb">
                <div id="product_details_slider" class="carousel slide" data-ride="carousel">
                  <div class="carousel-inner">
                    <div class="carousel-item active">
                      <a class="product-img" href="img/bg-img/49.jpg" title="Product Image">
                        <img class="d-block w-100" src="store/img/bg-img/49.jpg" alt="1">
                      </a>
                    </div>
                    <div class="carousel-item">
                      <a class="product-img" href="img/bg-img/49.jpg" title="Product Image">
                        <img class="d-block w-100" src="store/img/bg-img/49.jpg" alt="1">
                      </a>
                    </div>
                    <div class="carousel-item">
                      <a class="product-img" href="img/bg-img/49.jpg" title="Product Image">
                        <img class="d-block w-100" src="store/img/bg-img/49.jpg" alt="1">
                      </a>
                    </div>
                  </div>
                  <ol class="carousel-indicators">
                    <li class="active" data-target="#product_details_slider" data-slide-to="0" style="background-image: url(store/img/bg-img/49.jpg);">
                    </li>
                    <li data-target="#product_details_slider" data-slide-to="1" style="background-image: url(store/img/bg-img/49.jpg);">
                    </li>
                    <li data-target="#product_details_slider" data-slide-to="2" style="background-image: url(store/img/bg-img/49.jpg);">
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            <div class="col-12 col-md-6">
              <div class="single_product_desc">
                <h4 class="title">{{ demande.libelle }}</h4>
<!--                <h4 class="price">{{ demande.prix_plateforme }} CFA</h4>-->
                <div class="short_overview">
<!--                  <p v-html="demande.description"></p>-->
                </div>

                <div class="cart--area d-flex flex-wrap align-items-center">
                  <!-- Add to Cart Form -->
                  <div class="cart clearfix d-flex align-items-center">
                    <!-- div class="quantity">
                      <span class="qty-minus"><i class="fa fa-minus" aria-hidden="true"></i></span>
                      <input type="number" class="qty-text" step="1" min="0" :max="demande.quantite" v-model="new_demande.quantite" value="0">
                      <span class="qty-plus"><i class="fa fa-plus" aria-hidden="true"></i></span>
                    </div-->
                    <base-button  v-b-toggle="'collapse-2'" id="collapse" class="btn alazea-btn ml-15" @click="handleDemande">Repondre</base-button>
                  </div>
                  <!-- Wishlist & Compare -->
                  <div class="wishlist-compare d-flex flex-wrap align-items-center">
                    <a href="#" class="wishlist-btn ml-15"><i class="icon_heart_alt" ></i></a>
<!--                    <a href="#" class="compare-btn ml-15"><i class="arrow_left-right_alt"></i></a>-->
                  </div>
                </div>

                <b-collapse :id="collapse_id">
                  <b-card>
                    <div class="contact-form-area">
                      <vue-element-loading :active="show" spinner="bar-fade-scale" color="#2dce94" />
                      <form action="#">
                        <div class="row">
                          <div class="col-12 col-md-6">
                            <div class="form-group">
                              <label for="libelle">Libelle</label>
                              <input type="text" class="form-control" id="libelle" placeholder="Libelle" v-model="new_demande.libelle">
                            </div>
                          </div>
                          <div class="col-12 col-md-6">
                            <div class="form-group">
                              <label for="exampleFormControlSelect1">Type Demande</label>
                              <select v-model="new_demande.type_demande_id" class="form-control dropdown" style="padding: 0px 0px;" id="exampleFormControlSelect1">
                                <option v-for="demande in type_demandes" :key="demande.id" :value="demande.id">
                                  {{demande.libelle}}
                                </option>
                              </select>
                            </div>
                          </div>
                          <div class="col-12 col-md-6">
                            <div class="form-group">
                              <input type="number" class="form-control" id="quantite" placeholder="Quantite" v-model="new_demande.quantite">
                            </div>
                          </div>
                          <div class="col-12 col-md-6">
                            <div class="form-group">
                              <input type="text" class="form-control" id="mesure" placeholder="Mesure" v-model="new_demande.mesure">
                            </div>
                          </div>
                          <div class="col-12">
                            <div class="form-group">
                              <label for="date_livraison">Date Livraison</label>
                              <input type="date" class="form-control" id="date_livraison" placeholder="Date livraison" v-model="new_demande.date_livraison">
                            </div>
                          </div>
                          <div class="col-12">
                            <!-- div class="form-group">
                              <textarea class="form-control" id="demande_description" cols="30" rows="10" placeholder="description" v-model="new_demande.description"></textarea>
                            </div -->
                            <vue-dropzone
                              @vdropzone-file-added="setOption()"
                              v-model="media.media"
                              ref="myVueDropzone"
                              id="dropzone"
                              :options="dropzoneOptions"
                            />
                          </div>
                          <div class="col-12">
                            <base-button class="btn alazea-btn mt-15"  @click="envoyerDemande">Soumettre</base-button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </b-card>
                </b-collapse>

                <div class="products--meta">
                  <p><span>VARIETE:</span> <span>{{ demande.variete_produit ? demande.variete_produit.nom : '' }}</span></p>
                  <p><span>VILLAGE:</span> <span>{{ demande.village ? demande.village.libelle : ''}}</span></p>
                  <p><span>QTTE:</span> <span>{{ demande.quantite }} {{ demande.mesure }}</span></p>
                  <p><span>DATE DISPONIBLE:</span> <span>{{ demande.date_disponibilite }}</span></p>
                  <!-- p><span>SKU:</span> <span>CT201807</span></p>
                  <p><span>Category:</span> <span>En cour..</span></p>
                  <p><span>Tags:</span> <span>En cour..</span></p-->
                  <p>
                    <span>Partager:</span>
                    <span>
                        <a href="#"><i class="fa fa-facebook"></i></a>
                        <a href="#"><i class="fa fa-twitter"></i></a>
                        <a href="#"><i class="fa fa-pinterest"></i></a>
                        <a href="#"><i class="fa fa-google-plus"></i></a>
                    </span>
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="product_details_tab clearfix">
              <!-- Tabs -->
              <ul class="nav nav-tabs" role="tablist" id="product-details-tab">
                <li class="nav-item">
                  <a href="#description" class="nav-link active" data-toggle="tab" role="tab">Description</a>
                </li>
                <li class="nav-item">
                  <a href="#addi-info" class="nav-link" data-toggle="tab" role="tab">Autres Information</a>
                </li>
                <li class="nav-item">
                  <a href="#reviews" class="nav-link" data-toggle="tab" role="tab">Evaluations <span class="text-muted">(1)</span></a>
                </li>
              </ul>
              <!-- Tab Content -->
              <div class="tab-content">
                <div role="tabpanel" class="tab-pane fade show active" id="description">
                  <div class="description_area">
                    <p v-html="demande.description"></p>
                  </div>
                </div>
                <div role="tabpanel" class="tab-pane fade" id="addi-info">
                  <div class="additional_info_area">
                    <p>What should I do if I receive a damaged parcel?
                      <br> <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit impedit similique qui, itaque delectus labore.</span></p>
                    <p>I have received my order but the wrong item was delivered to me.
                      <br> <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis quam voluptatum beatae harum tempore, ab?</span></p>
                    <p>Product Receipt and Acceptance Confirmation Process
                      <br> <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum ducimus, temporibus soluta impedit minus rerum?</span></p>
                    <p>How do I cancel my order?
                      <br> <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum eius eum, minima!</span></p>
                  </div>
                </div>
                <div role="tabpanel" class="tab-pane fade" id="reviews">
                  <div class="reviews_area">
                    <ul>
                      <li>
                        <div class="single_user_review mb-15">
                          <div class="review-rating">
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <span>for Quality</span>
                          </div>
                          <div class="review-details">
                            <p>by <a href="#">Colorlib</a> on <span>12 Sep 2018</span></p>
                          </div>
                        </div>
                        <div class="single_user_review mb-15">
                          <div class="review-rating">
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <span>for Design</span>
                          </div>
                          <div class="review-details">
                            <p>by <a href="#">Colorlib</a> on <span>12 Sep 2018</span></p>
                          </div>
                        </div>
                        <div class="single_user_review">
                          <div class="review-rating">
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <span>for Value</span>
                          </div>
                          <div class="review-details">
                            <p>by <a href="#">Colorlib</a> on <span>12 Sep 2018</span></p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div class="submit_a_review_area mt-50">
                    <h4>Soumettre une Evaluation</h4>
                    <form action="#" method="post">
                      <div class="row">
                        <div class="col-12">
                          <div class="form-group d-flex align-items-center">
                            <span class="mr-15">Your Ratings:</span>
                            <div class="stars">
                              <input type="radio" name="star" class="star-1" id="star-1">
                              <label class="star-1" for="star-1">1</label>
                              <input type="radio" name="star" class="star-2" id="star-2">
                              <label class="star-2" for="star-2">2</label>
                              <input type="radio" name="star" class="star-3" id="star-3">
                              <label class="star-3" for="star-3">3</label>
                              <input type="radio" name="star" class="star-4" id="star-4">
                              <label class="star-4" for="star-4">4</label>
                              <input type="radio" name="star" class="star-5" id="star-5">
                              <label class="star-5" for="star-5">5</label>
                              <span></span>
                            </div>
                          </div>
                        </div>
                        <div class="col-12 col-md-6">
                          <div class="form-group">
                            <label for="name">Nickname</label>
                            <input type="email" class="form-control" id="name" placeholder="Nazrul">
                          </div>
                        </div>
                        <div class="col-12 col-md-6">
                          <div class="form-group">
                            <label for="options">Reason for your rating</label>
                            <select class="form-control" id="options">
                              <option>Quality</option>
                              <option>Value</option>
                              <option>Design</option>
                              <option>Price</option>
                              <option>Others</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-12">
                          <div class="form-group">
                            <label for="comments">Comments</label>
                            <textarea class="form-control" id="comments" rows="5" data-max-length="150"></textarea>
                          </div>
                        </div>
                        <div class="col-12">
                          <button type="submit" class="btn alazea-btn">Submit Your Review</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- ##### Single Product Details Area End ##### -->

    <!-- ##### Related Product Area Start ##### -->
    <div class="related-products-area">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <!-- Section Heading -->
            <div class="section-heading text-center">
              <h2>Produits Similaires</h2>
            </div>
          </div>
        </div>

        <div class="row">

          <!-- Single Product Area -->
          <div class="col-12 col-sm-6 col-lg-3">
            <div class="single-product-area mb-100">
              <!-- Product Image -->
              <div class="product-img">
                <a href="shop-details.html"><img src="store/img/bg-img/40.png" alt=""></a>
                <!-- Product Tag -->
                <div class="product-tag">
                  <a href="#">Hot</a>
                </div>
                <div class="product-meta d-flex">
                  <a href="#" class="wishlist-btn"><i class="icon_heart_alt"></i></a>
                  <a href="cart.html" class="add-to-cart-btn">Add to cart</a>
                  <a href="#" class="compare-btn"><i class="arrow_left-right_alt"></i></a>
                </div>
              </div>
              <!-- Product Info -->
              <div class="product-info mt-15 text-center">
                <a href="shop-details.html">
                  <p>Cactus Flower</p>
                </a>
                <h6>$10.99</h6>
              </div>
            </div>
          </div>

          <!-- Single Product Area -->
          <div class="col-12 col-sm-6 col-lg-3">
            <div class="single-product-area mb-100">
              <!-- Product Image -->
              <div class="product-img">
                <a href="shop-details.html"><img src="store/img/bg-img/41.png" alt=""></a>
                <div class="product-meta d-flex">
                  <a href="#" class="wishlist-btn"><i class="icon_heart_alt"></i></a>
                  <a href="cart.html" class="add-to-cart-btn">Add to cart</a>
                  <a href="#" class="compare-btn"><i class="arrow_left-right_alt"></i></a>
                </div>
              </div>
              <!-- Product Info -->
              <div class="product-info mt-15 text-center">
                <a href="shop-details.html">
                  <p>Cactus Flower</p>
                </a>
                <h6>$10.99</h6>
              </div>
            </div>
          </div>

          <!-- Single Product Area -->
          <div class="col-12 col-sm-6 col-lg-3">
            <div class="single-product-area mb-100">
              <!-- Product Image -->
              <div class="product-img">
                <a href="shop-details.html"><img src="store/img/bg-img/42.png" alt=""></a>
                <div class="product-meta d-flex">
                  <a href="#" class="wishlist-btn"><i class="icon_heart_alt"></i></a>
                  <a href="cart.html" class="add-to-cart-btn">Add to cart</a>
                  <a href="#" class="compare-btn"><i class="arrow_left-right_alt"></i></a>
                </div>
              </div>
              <!-- Product Info -->
              <div class="product-info mt-15 text-center">
                <a href="shop-details.html">
                  <p>Cactus Flower</p>
                </a>
                <h6>$10.99</h6>
              </div>
            </div>
          </div>

          <!-- Single Product Area -->
          <div class="col-12 col-sm-6 col-lg-3">
            <div class="single-product-area mb-100">
              <!-- Product Image -->
              <div class="product-img">
                <a href="shop-details.html"><img src="store/img/bg-img/43.png" alt=""></a>
                <!-- Product Tag -->
                <div class="product-tag sale-tag">
                  <a href="#">Hot</a>
                </div>
                <div class="product-meta d-flex">
                  <a href="#" class="wishlist-btn"><i class="icon_heart_alt"></i></a>
                  <a href="cart.html" class="add-to-cart-btn">Add to cart</a>
                  <a href="#" class="compare-btn"><i class="arrow_left-right_alt"></i></a>
                </div>
              </div>
              <!-- Product Info -->
              <div class="product-info mt-15 text-center">
                <a href="shop-details.html">
                  <p>Cactus Flower</p>
                </a>
                <h6>$10.99</h6>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Resource from "../../api/resource";
import Load from "../../components/Loading/Load";
import {Message} from "element-ui";
import {isLogged} from "../../utils/auth";
import request from "../../utils/request";
import VueElementLoading from "vue-element-loading";

import vueDropzone from 'vue2-dropzone-vue3';
const demandeResource = new Resource('demandes');
const tdemandeResource = new Resource('typeDemandes');
export default {
  name: 'demandesDetail',
  props: {
    msg: String
  },
  components: {
    vueDropzone,
    Load,
    VueElementLoading,
  },
  data () {
    return {
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        maxFilesize: 256,
        maxFiles: 3,
        clickable: true,
        addRemoveLinks: true,
        headers: { "My-Awesome-Header": "header value" }
      },
      media: {},
      loading: true,
      demande: {},
      show: false,
      new_demande: {},
      type_demandes: [],
      collapse_id: null,
      authenticated : isLogged(),
    };
  },
  created() {
    this.getdemandesDetail();
    if (this.authenticated){
      this.getTypeDemandes();
    }
  },
  methods: {
    getdemandesDetail(){
      demandeResource.get(this.$route.params.id)
      .then((response) => {
        this.demande = response.data;
        console.log('THIS OFFER', this.demande);
        this.loading = false;
      });
    },
    async getTypeDemandes() {
      const { data } = await tdemandeResource.list();
      this.type_demandes = data;
    },
    setOption(){
      console.log('NOMBRE DE FILKE', this.$refs.myVueDropzone.dropzone.files.length);
      if(this.$refs.myVueDropzone.dropzone.files.length  === 3){
        this.dropzoneOptions.clickable = false;
        console.log('CLICKABLE',this.dropzoneOptions);
      }
    },
    handleDemande(){
      console.log('AUTHENTICATED ', this.authenticated);
      if (!this.authenticated){
        Message({
          message: 'Veuillez vous connecter avant d\' effectuer cette action ',
          type: 'info',
          duration: 5 * 1000,
        });
        this.$router.push(`/login?redirect=${this.$route.fullPath}`);
      } else {
        this.collapse_id = 'collapse-2';
      }
    },
    envoyerDemande(){
      this.new_demande.description = this.demande.id;
      this.new_demande.village_id = this.demande.village.id;
      this.new_demande.user_id = this.$store.getters.userId;
      this.new_demande.variete_produit_id = this.demande.variete_produit.id;

      const isUserLogged = isLogged();
      console.log('DEMANDE A ENVOYER', this.new_demande);
      if (isUserLogged){
        console.log('USER CONNECTED', this.$store.getters.userId);
        this.show = true;
        demandeResource.store(this.new_demande)
          .then((response) => {
            console.log(response);
            Message({
              message: response.message,
              type: response.success ? "success" : "error",
              duration: 5 * 1000,
            })
          })
          .finally(() => {
            this.show = false;
            let button = document.getElementById('collapse');
            button.click();
            this.collapse_id = '';
          });
      } else {
        Message({
          message: 'Veuillez vous connecter avant d\' effectuer cette action ',
          type: 'info',
          duration: 5 * 1000,
        });
        this.$router.push(`/login?redirect=${this.$route.fullPath}`);
      }
    }
  }
}
</script>
<style lang="scss" scoped>
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
</style>

