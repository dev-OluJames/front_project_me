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
<!--    <button type="submit" class="btn alazea-btn mt-15">-->
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
                <li class="nav-item">
                  <a class="nav-link" id="commande-tab" data-toggle="tab" href="#commande" role="tab" aria-controls="commande" aria-selected="false">Commandes</a>
                </li>
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
                          <button type="submit" class="btn alazea-btn mt-15">Modifier</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <!-- ========== FIN PROFILE =========== -->
                <div class="tab-pane fade" id="commande" role="tabpanel" aria-labelledby="profile-tab">...</div>
                <div class="tab-pane fade" id="demande" role="tabpanel" aria-labelledby="contact-tab">...</div>
                <div class="tab-pane fade" id="offre" role="tabpanel" aria-labelledby="contact-tab">...</div>
                <div class="tab-pane fade" id="favoris" role="tabpanel" aria-labelledby="contact-tab">...</div>
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
export default {
  name: "UserDetail"
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
</style>
