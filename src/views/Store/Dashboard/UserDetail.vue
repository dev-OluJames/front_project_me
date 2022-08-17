<template>
<div class="user">
  <!-- ##### Breadcrumb Area Start ##### -->
  <div class="breadcrumb-area">
    <!-- Top Breadcrumb Area -->
    <div class="top-breadcrumb-area bg-img bg-overlay d-flex align-items-center justify-content-center" style="background-image: url(store/img/bg-img/24.jpg);">
      <h2>Compte</h2>
    </div>
    <div class="card-profile-image">
      <img src="store/img/bg-img/14.jpg" class="rounded-circle">
    </div>
<!--    <button type="submit" class="alazea-btn mt-15">-->
<!--      Modifier <input type="file" hidden>-->
<!--    </button>-->

    <div class="container">
      <div class="row">
        <div class="col-12">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="#"><i class="fa fa-home"></i> Home</a></li>
              <li class="breadcrumb-item active" aria-current="page">compte</li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  </div>
  <!-- ##### Breadcrumb Area End ##### -->
  <!-- ##### Portfolio Area Start ##### -->
  <section class="alazea-portfolio-area portfolio-page section-padding-0-100">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <!-- Section Heading -->
          <div class="section-heading text-center">
            <h2>{{ this.$store.getters.name }}</h2>
<!--            <p>We devote all of our experience and efforts for creation</p>-->
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="alazea-portfolio-filter">
            <div class="portfolio-filter">
              <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item">
                  <a class="nav-link active" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="true">Profiles</a>
                </li>
                <!-- li class="nav-item">
                  <a class="nav-link" id="commande-tab" data-toggle="tab" href="#commande" role="tab" aria-controls="commande" aria-selected="false">Commandes</a>
                </li -->
                <li class="nav-item">
                  <a class="nav-link" id="demande-tab" data-toggle="tab" href="#demande" role="tab" aria-controls="demande" aria-selected="false">Demandes</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" id="offre-tab" data-toggle="tab" href="#offre" role="tab" aria-controls="offre" aria-selected="false">Offres</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" id="favori-tab" data-toggle="tab" href="#favoris" role="tab" aria-controls="favoris" aria-selected="false">Favoris</a>
                </li>
              </ul>
              <div class="tab-content" id="myTabContent">
                <!-- ========== PROFILE =========== -->
                <div class="tab-pane fade show active" id="profile" role="tabpanel" aria-labelledby="home-tab">
                  <div class="section-heading">
                  </div>
                  <!-- Contact Form Area -->
                  <div class="contact-form-area mb-100">
                    <form action="#" method="post">
                      <div class="row">
                        <div class="col-12 col-md-4">
                          <div class="form-group">
                            <input type="text" class="form-control" id="user-name" placeholder="Nom" :value="$store.getters.user.nom">
                          </div>
                        </div>
                        <div class="col-12 col-md-4">
                          <div class="form-group">
                            <input type="text" class="form-control" id="user-first-name" placeholder="Prenom" :value="$store.getters.user.prenom">
                          </div>
                        </div>
                        <div class="col-12 col-md-4">
                          <div class="form-group">
                            <input type="email" class="form-control" id="user-email" placeholder="Email" :value="$store.getters.user.email">
                          </div>
                        </div>
                        <div class="col-12 col-md-6">
                          <div class="form-group">
                            <input type="text" class="form-control" id="user-nom-entreprise" placeholder="Nom de l entreprise" :value="$store.getters.user.nom_entreprise">
                          </div>
                        </div>
                        <div class="col-12 col-md-6">
                          <div class="form-group">
                            <input type="text" class="form-control" id="user-contact" placeholder="contact" :value="$store.getters.user.telephone">
                          </div>
                        </div>
                        <div class="col-12 col-md-6">
                          <div class="form-group">
                            <input type="text" class="form-control" id="user-username" placeholder="Nom Utilisateur" :value="$store.getters.user.nom_utilisateur">
                          </div>
                        </div>
                        <div class="col-12 col-md-6">
                          <div class="form-group">
                            <input type="text" class="form-control" id="user-address" placeholder="Addresse">
                          </div>
                        </div>
                        <div class="col-12">
                          <button type="submit" class="alazea-btn mt-15">Modifier</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <!-- ========== FIN PROFILE =========== -->

                <!-- ========== COMMANDES =========== -->
                <!-- div class="tab-pane fade" id="commande" role="tabpanel" aria-labelledby="profile-tab">
                  <div class="container">
                    <div class="row">
                      <div class="col-12">
                        <div class="cart-table clearfix">
                          <table class="table table-responsive">
                            <thead>
                            <tr>
                              <th>Produits</th>
                              <th>Quantité</th>
                              <th>Prix</th>
                              <th>TOTAL</th>
                              <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                              <td class="cart_product_img">
                                <a href="#"><img src="store/img/bg-img/34.jpg" alt="Product"></a>
                                <h5>Recuerdos Plant</h5>
                              </td>
                              <td class="qty">
                                <div class="quantity">
                                  <span class="qty-minus" ><i class="fa fa-minus" aria-hidden="true"></i></span>
                                  <input type="number" class="qty-text" step="1" min="1" max="99" name="quantity" value="1">
                                  <span class="qty-plus"><i class="fa fa-plus" aria-hidden="true"></i></span>
                                </div>
                              </td>
                              <td class="price"><span>$9.99</span></td>
                              <td class="total_price"><span>$9.99</span></td>
                              <td class="action"><a href="#"><i class="icon_close"></i></a></td>
                            </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div-->
                <!-- ========== FIN COMMANDES =========== -->

                <!-- ========== DEMANDE =========== -->
                <div class="tab-pane fade" id="demande" role="tabpanel" aria-labelledby="contact-tab">
                  <div class="container">
                    <div class="section-heading">
                      <h2 class="text-left" style="margin-top: 12px">
                        List des Demandes
                      </h2>
                    </div>
                    <div v-if="userDemandes.length === 0" class="">
                      <p>
                        Vous n'avez effectué aucune Demande
                      </p>
                    </div>
                    <div v-else class="row">
                      <div class="col-12">
                        <div class="cart-table clearfix">
                          <table class="table table-responsive" style="padding: 0px 0px">
                            <thead>
                            <tr>
                              <th>Produits</th>
                              <th>Quantité</th>
                              <th></th>
                            </tr>
                            </thead>
                            <tbody v-for="demande in userDemandes" :key="demande.id" style="border-bottom: none">
                            <tr  style="border-top: none; border-bottom: none">
                              <td class="cart_product_img">
                                <a href="#"><img src="store/img/bg-img/34.jpg" alt="Product"></a>
                                <h5>{{ demande.libelle }}</h5>
                              </td>
                              <td class="qty">
                                <div class="quantity">
                                  <span class="qty-minus" ><i class="fa fa-minus" aria-hidden="true"></i></span>
                                  <input type="number" class="qty-text" step="1" min="1" :max="demande.quantite" name="quantity" :value="demande.quantite">
                                  <span class="qty-plus"><i class="fa fa-plus" aria-hidden="true"></i></span>
                                </div>
                              </td>
                              <td class="price"><span>{{ demande.mesure }}</span></td>
                              <!--                            <td class="total_price"><span>CFA {{ prixTotal(demande.quantite, demande.prix_plateforme) }}</span></td>-->
                              <td class="action">
                                <button v-b-toggle="'collapse-'+demande.id" class="alazea-btn btn-sm">Reponses</button>
                              </td>
                            </tr>
                            <tr style="border-top: none; border-bottom: none">
                              <td colspan="4" style="border-top: none; margin-top: 0px; margin-bottom: 0px">
                                <b-collapse :id="'collapse-'+demande.id">
                                  <b-card>
                                    <table class="table table-responsive">
                                      <thead>
                                      <tr>
                                        <th>Date</th>
                                        <th>Utilisateur</th>
                                        <th>Reponse</th>
                                        <th>Actions</th>
                                        <th></th>
                                      </tr>
                                      </thead>
                                      <tbody v-for="response in demande.reponses" :key="response.id" style="border-bottom: none">
                                      <tr  style="border-top: none; border-bottom: none">
                                        <td class="price">
                                          <span>{{ response.created_at }}</span>
                                        </td>
                                        <td class="price"><span>{{ response.user.nom_utilisateur }}</span></td>
                                        <td class="price"><span>{{ response.libelle }}</span></td>
                                        <td class="action">
                                          <button class="alazea-btn btn-sm">voir</button>
                                        </td>
                                      </tr>
                                      </tbody>
                                    </table>
                                  </b-card>
                                </b-collapse>
                              </td>
                            </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- ========== FIN DEMANDES =========== -->

                <!-- ========== OFFRES =========== -->
                <div class="tab-pane fade" id="offre" role="tabpanel" aria-labelledby="contact-tab">
                  <div class="container">
                    <div class="section-heading">
                      <h2 class="text-left" style="margin-top: 12px">
                        List des Offres
                      </h2>
                    </div>
                    <div v-if="userOffres.length === 0" class="">
                      <p>
                        Vous n'avez publié aucune Offre
                      </p>
                      <button class="alazea-btn mt-15 btn-sm">Ajouter</button>
                    </div>
                    <div v-else class="row">
                      <div class="col-12">
                        <div class="cart-table clearfix">
                          <table class="table table-responsive" style="padding: 0px 0px">
                            <thead>
                            <tr>
                              <th>Produits</th>
                              <th>Quantité</th>
                              <th>Prix</th>
                              <th>TOTAL</th>
                              <th></th>
                            </tr>
                            </thead>
                            <tbody v-for="offre in userOffres" :key="offre.id" style="border-bottom: none">
                            <tr  style="border-top: none; border-bottom: none">
                              <td class="cart_product_img">
                                <a href="#"><img src="store/img/bg-img/34.jpg" alt="Product"></a>
                                <h5>{{ offre.libelle }}</h5>
                              </td>
                              <td class="qty">
                                <div class="quantity">
                                  <span class="qty-minus" ><i class="fa fa-minus" aria-hidden="true"></i></span>
                                  <input type="number" class="qty-text" step="1" min="1" :max="offre.quantite" name="quantity" :value="offre.quantite">
                                  <span class="qty-plus"><i class="fa fa-plus" aria-hidden="true"></i></span>
                                </div>
                              </td>
                              <td class="price"><span>{{ offre.mesure }}</span></td>
                              <td class="price"><span>{{ offre.prix_plateforme }} CFA</span></td>
                              <!--                            <td class="total_price"><span>CFA {{ prixTotal(offre.quantite, offre.prix_plateforme) }}</span></td>-->
                              <td class="action">
                                <button v-b-toggle="'collapse-'+offre.id" class="alazea-btn btn-sm">Reponses</button>
                              </td>
                            </tr>
                            <tr style="border-top: none; border-bottom: none">
                              <td colspan="4" style="border-top: none; margin-top: 0px; margin-bottom: 0px">
                                <b-collapse :id="'collapse-'+offre.id">
                                  <b-card>
                                    <table class="table table-responsive">
                                      <thead>
                                      <tr>
                                        <th>Date</th>
                                        <th>Utilisateur</th>
                                        <th>Reponse</th>
                                        <th>Actions</th>
                                        <th></th>
                                      </tr>
                                      </thead>
                                      <tbody v-for="response in offre.reponses" :key="response.id" style="border-bottom: none">
                                      <tr  style="border-top: none; border-bottom: none">
                                        <td class="price">
                                          <span>{{ response.created_at }}</span>
                                        </td>
                                        <td class="price"><span>{{ response.user.nom_utilisateur }}</span></td>
                                        <td class="price"><span>{{ response.libelle }}</span></td>
                                        <td class="action">
                                          <button class="alazea-btn btn-sm">voir</button>
                                        </td>
                                      </tr>
                                      </tbody>
                                    </table>
                                  </b-card>
                                </b-collapse>
                              </td>
                            </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- ========== FIN OFFRES =========== -->

                <!-- ========== FAVORIS =========== -->
                <div class="tab-pane fade" id="favoris" role="tabpanel" aria-labelledby="contact-tab">
                  <div class="container">
                    <div class="section-heading">
                      <h2 class="text-left" style="margin-top: 12px">
                        List des Favoris
                      </h2>
                    </div>
                    <div v-if="userFavoris.length === 0" class="">
                      <p>
                        Vous n'avez aucune favoris enregistré
                      </p>
                    </div>
                    <div v-else class="row">
                    <div class="col-12">
                      <div class="cart-table clearfix">
                        <table class="table table-responsive">
                          <thead>
                          <tr>
                            <th>Produits</th>
                            <th>Quantité</th>
                            <th>Mesure</th>
                            <th>Prix</th>
                            <th></th>
                          </tr>
                          </thead>
                          <tbody v-for="favoris in userFavoris" :key="favoris.id">
                          <tr>
                            <td class="cart_product_img">
                              <a href="#"><img src="store/img/bg-img/34.jpg" alt="Product"></a>
                              <h5>{{ favoris.libelle }}</h5>
                            </td>
                            <td class="qty">
                              <div class="quantity">
                                <span class="qty-minus" ><i class="fa fa-minus" aria-hidden="true"></i></span>
                                <input type="number" class="qty-text" step="1" min="1" :max="favoris.quantite" name="quantity" :value="favoris.quantite">
                                <span class="qty-plus"><i class="fa fa-plus" aria-hidden="true"></i></span>
                              </div>
                            </td>
                            <td class="price"><span>{{ favoris.mesure }}</span></td>
                            <td class="price"><span>{{ favoris.prix_plateforme }} CFA</span></td>
<!--                            <td class="total_price"><span>CFA {{ prixTotal(favoris.quantite, favoris.prix_plateforme) }}</span></td>-->
                            <td class="action">
                              <button type="submit" class="alazea-btn mt-15">Demander</button>
                            </td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
                <!-- ========== FIN FAVORIS =========== -->

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- ##### Portfolio Area End ##### -->
</div>
</template>

<script>
import request from "../../../utils/request";
import Resource from "../../../api/resource";
const demandeResource = new Resource('demandes');
const offreResource = new Resource('offres');

export default {
  name: "UserDetail",
  data(){
    return {
      userFavoris: [],
      userDemandes: [],
      userOffres: [],
      query: {
        user_id: this.$store.getters.userId,
      }
    }
  },
  created() {
    this.getUserOffresFavoris(this.$store.getters.userId);
    this.getUserDemandes();
    this.getUserOffres();
  },
  methods: {
    async getUserOffresFavoris(id){
      const { data } = await request({
        url: 'users/'+id+'/offre_favoris',
        method: 'get'
      });
      // this.userFavoris = [];
      // const favoris_ids = [];
      // data.forEach((favoris)=> {
      //   favoris_ids.push(favoris.id);
      // })
      this.userFavoris = data;
      console.log('USERS FAVORIS ', this.userFavoris);
    },
    async getUserOffres(){
      const { data } = await offreResource.list(this.query);
      this.userOffres = data;
      console.log('USER OFFRES', this.userOffres);
    },
    async getUserDemandes(){
      const { data } = await demandeResource.list(this.query);
      this.userDemandes = data;
      console.log('USER Demandes', this.userDemandes);
    },
    prixTotal(qtte, prix){
      return qtte * prix;
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
  min-width: 80px;
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
.collapsed{
  border-color: rgba(112, 199, 69, 0.4);
}
.card-profile-image img {
  position: absolute;
  left: 50%;
  max-width: 169px;
  transition: all .15s ease;
  transform: translate(-50%, -50%) scale(1);
  border: 8px solid #fff;
  border-radius: 0.375rem;
  z-index: 100;
}
[hidden] {
  display: none !important;
}
.cart-table thead th {
  border: none;
  border-bottom: none;
  font-size: 18px;
  color: #303030;
  font-weight: 500;
  text-transform: uppercase;
  text-align: left;
}
</style>
