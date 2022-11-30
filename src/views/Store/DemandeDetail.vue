<template>
  <div>
    <Load :loaded="loading"/>
    <!-- ##### Breadcrumb Area Start ##### -->
    <div class="breadcrumb-area">
      <!-- Top Breadcrumb Area -->
      <div class="top-breadcrumb-area bg-img bg-overlay d-flex align-items-center justify-content-center" style="background-image: url(store/img/bg-img/24.jpg);">
        <h2>DETAILS DE LA DEMANDE</h2>
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
                      <a class="product-img" :href="demande.image ? demande.image[0].lien : 'store/img/bg-img/40.png'" title="Product Image">
                        <img style="width:210px; height:302px" :src="demande.image ? demande.image[0].lien : 'store/img/bg-img/40.png'" alt="">
                      </a>
                    </div>
                    <div class="carousel-item">
                      <a class="product-img" :href="demande.image ? demande.image[0].lien : 'store/img/bg-img/40.png'" title="Product Image">
                        <img style="width:210px; height:302px" :src="demande.image ? demande.image[0].lien : 'store/img/bg-img/40.png'" alt="">
                      </a>
                    </div>
                    <div class="carousel-item">
                      <a class="product-img" :href="demande.image ? demande.image[0].lien : 'store/img/bg-img/40.png'" title="Product Image">
                        <img style="width:210px; height:302px" :src="demande.image ? demande.image[0].lien : 'store/img/bg-img/40.png'" alt="">
                      </a>
                    </div>
                  </div>
                  <ol class="carousel-indicators">
                    <li v-if="demande.image" class="active" data-target="#product_details_slider" data-slide-to="0" :style="{ backgroundImage: 'url(' + demande.image[0].lien + ')' }">
                    </li>
                    <li v-else class="active" data-target="#product_details_slider" data-slide-to="0" style="background-image: url(store/img/bg-img/49.jpg);">
                    </li>
                    <li v-if="demande.image" data-target="#product_details_slider" data-slide-to="1" :style="{ backgroundImage: 'url(' + demande.image[0].lien + ')' }">
                    </li>
                    <li v-else data-target="#product_details_slider" data-slide-to="1" style="background-image: url(store/img/bg-img/49.jpg);">
                    </li>
                    <li v-if="demande.image" data-target="#product_details_slider" data-slide-to="2" :style="{ backgroundImage: 'url(' + demande.image[0].lien + ')' }">
                    </li>
                    <li v-else data-target="#product_details_slider" data-slide-to="2" style="background-image: url(store/img/bg-img/49.jpg);">
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

                <div v-if="$store.getters.roles[0] !== 'admin'" class="cart--area d-flex flex-wrap align-items-center">
                  <!-- Add to Cart Form -->
                  <div class="cart clearfix d-flex align-items-center">
                    <base-button  v-b-toggle="'collapse-2'" id="collapse" class="btn alazea-btn ml-15" @click="handleOffre">Repondre</base-button>
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
                              <input type="text" class="form-control" id="libelle" placeholder="Libelle" v-model="new_offre.libelle">
                            </div>
                          </div>
                          <div class="col-12 col-md-6">
                            <div class="form-group">
                              <label for="exampleFormControlSelect1">Village</label>
                              <select v-model="new_offre.village_id" class="form-control dropdown" style="padding: 0px 0px;" id="exampleFormControlSelect1">
                                <option v-for="village in villages" :key="village.id" :value="village.id">
                                  {{village.libelle}}
                                </option>
                              </select>
                            </div>
                          </div>
                          <div class="col-12 col-md-6">
                            <div class="form-group">
                              <label for="quantite">Quantite</label>
                              <input type="number" class="form-control" id="quantite" placeholder="Quantite" v-model="new_offre.quantite">
                            </div>
                          </div>
                          <div class="col-12 col-md-6">
                            <div class="form-group">
                              <label for="mesure">Mesure</label>
                              <input type="text" class="form-control" id="mesure" placeholder="Mesure" v-model="new_offre.mesure">
                            </div>
                          </div>
                          <div class="col-12 col-md-6">
                            <div class="form-group">
                              <label for="prix">Prix</label>
                              <input type="number" class="form-control" id="prix" placeholder="Prix" v-model="new_offre.prix_agriculteur">
                            </div>
                          </div>
                          <div class="col-12 col-md-6">
                            <div class="form-group">
                              <label for="date_disponibilite">Date Disponible</label>
                              <input type="date" class="form-control" id="date_disponibilite" placeholder="Date disponible" v-model="new_offre.date_disponibilite">
                            </div>
                          </div>
                          <div class="col-12">
                            <!-- div class="form-group">
                              <textarea class="form-control" id="demande_description" cols="30" rows="10" placeholder="description" v-model="new_offre.description"></textarea>
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
                            <base-button class="btn alazea-btn mt-15"  @click="envoyerOffre">Soumettre</base-button>
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
                  <p><span>PAR:</span> <span>{{ demande.user ? demande.user.nom_utilisateur : '' }}</span></p>
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
const offreResource = new Resource('offres');
const toffreResource = new Resource('typeOffres');
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
      type_offre_id: null,
      show: false,
      new_demande: {},
      new_offre: {},
      type_demandes: [],
      villages: [],
      collapse_id: null,
      authenticated : isLogged(),
    };
  },
  created() {
    this.getdemandesDetail();
    if (this.authenticated){
      this.getTypeOffreId();
      this.getvillages();
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
    async getTypeOffreId() {
      const query = {
        keyword: 'offre_reponse',
      };
      const { data } = await toffreResource.list(query);
      console.log('OFFRE REPONSE ID', data[0]);
      this.type_offre_id = data[0].id;
    },
    setOption(){
      console.log('NOMBRE DE FILKE', this.$refs.myVueDropzone.dropzone.files.length);
      if(this.$refs.myVueDropzone.dropzone.files.length  === 3){
        this.dropzoneOptions.clickable = false;
        console.log('CLICKABLE',this.dropzoneOptions);
      }
    },
    handleOffre(){
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
    envoyerOffre(){
      this.new_offre.description = this.demande.id;
      this.new_offre.prix_plateforme = parseInt(this.new_offre.prix_agriculteur) + 10000;
      this.new_offre.prix_agriculteur = parseInt(this.new_offre.prix_agriculteur);
      this.new_offre.type_offre_id = this.type_offre_id;
      this.new_offre.user_id = this.$store.getters.userId;
      this.new_offre.variete_produit_id = this.demande.variete_produit.id;

      const isUserLogged = isLogged();
      console.log('DEMANDE A ENVOYER', this.new_offre);
      if (isUserLogged){
        console.log('USER CONNECTED', this.$store.getters.userId);
        this.show = true;
        offreResource.store(this.new_offre)
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
    },
    async getvillages() {
      const { data } = await new Resource('villages').list();
      this.villages = data;
    },
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

