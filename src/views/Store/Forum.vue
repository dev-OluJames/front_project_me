<template>
<div class="forum">
  <Load :loaded="loaded"/>
  <!-- ##### Breadcrumb Area Start ##### -->
  <div class="breadcrumb-area">
    <!-- Top Breadcrumb Area -->
    <div class="top-breadcrumb-area bg-img bg-overlay d-flex align-items-center justify-content-center" style="background-image: url(store/img/bg-img/24.jpg);">
      <h2>FORUM DISCUSSION</h2>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-8">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="#"><i class="fa fa-home"></i> Home</a></li>
              <li class="breadcrumb-item active" aria-current="page">Forum</li>
            </ol>
          </nav>
        </div>
        <div class="col-4">
          <div style="margin-top: 20px">
            <a href="#" class="btn alazea-btn" v-b-modal.modal-center >Ajouter</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- ##### Breadcrumb Area End ##### -->

  <!-- ##### Blog Area Start ##### -->
  <section class="alazea-blog-area mb-100">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-8">
          <div class="row">

            <!-- Single Blog Post Area -->
            <div class="col-12 col-lg-6" v-for="sujet in sujets" :key="sujet.id">
              <div class="single-blog-post mb-50">
                <div class="post-content">
                  <router-link :to="'/store/forum/'+sujet.id" class="post-title">
                    <h5>{{ sujet.titre }}</h5>
                  </router-link>
                  <div class="post-meta">
                    <a href="#"><i class="fa fa-clock-o" aria-hidden="true"></i>{{ sujet.created_at}}</a>
                    <a href="#"><i class="fa fa-user" aria-hidden="true"></i> {{ sujet.user.nom }} {{ sujet.user.prenom }} </a>
                  </div>
                  <p class="post-excerpt">{{ sujet.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
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

        <div class="col-12 col-md-4">
          <div class="post-sidebar-area">
            <!-- ##### Single Widget Area ##### -->
            <div class="single-widget-area">
              <form action="#" method="get" class="search-form">
                <input type="search" name="search" id="widgetsearch" placeholder="Search...">
                <button type="submit"><i class="icon_search"></i></button>
              </form>
            </div>

            <!-- ##### Single Widget Area ##### -->
            <div class="single-widget-area">
              <!-- Title -->
              <div class="widget-title">
                <h4>Sujet Recent</h4>
              </div>

              <!-- Single Latest Posts -->
              <div class="single-latest-post d-flex align-items-center">
                <div class="post-content">
                  <a href="#" class="post-title">
                    <h6>New Harris Bugg design for Bridgewater</h6>
                  </a>
                  <a href="#" class="post-date">20 Jun 2018</a>
                </div>
              </div>
            </div>

            <!-- ##### Single Widget Area ##### -->
            <div class="single-widget-area">
              <!-- Title -->
              <div class="widget-title">
                <h4>Tag Cloud</h4>
              </div>
              <!-- Tags -->
              <ol class="popular-tags d-flex flex-wrap">
                <li><a href="#">PLANTS</a></li>
                <li><a href="#">NEW PRODUCTS</a></li>
                <li><a href="#">CACTUS</a></li>
                <li><a href="#">DESIGN</a></li>
                <li><a href="#">NEWS</a></li>
                <li><a href="#">TRENDING</a></li>
                <li><a href="#">VIDEO</a></li>
                <li><a href="#">GARDEN DESIGN</a></li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- ##### Blog Area End ##### -->

  <!-- ##### Modal Section  -->
  <b-modal hide-footer id="modal-center" centered title="Ajouter Un Sujet">
    <!-- ##### Contact Area Start ##### -->
    <section class="contact-area">
      <div class="container">
        <div class="row align-items-center justify-content-between">
          <div class="col-12">
            <!-- Section Heading -->
            <div class="section-heading">
              <h2>AJOUTER UN SUJET</h2>
              <p>Saisissez le titre du sujet et son contenu</p>
            </div>
            <!-- Contact Form Area -->
            <div class="contact-form-area mb-100">
                <div class="row">
                  <div class="col-12">
                    <div class="form-group">
                      <input type="text" class="form-control" id="contact-name" v-model="new_sujet.titre" placeholder="Sujet">
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-group">
                      <textarea class="form-control" v-model="description" id="message" cols="30" rows="10" placeholder="Description"></textarea>
                    </div>
                  </div>
                  <div class="col-12">
                    <button type="submit" class="btn alazea-btn mt-15" @click="saveSubject">Ajouter</button>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- ##### Contact Area End ##### -->
  </b-modal>

</div>
</template>

<script>
import Resource from "../../api/resource";
import {Message} from "element-ui";
import Load from "../../components/Loading/Load";
const sujetResource = new Resource('sujets');
export default {
  name: "Forum",
  components: {
    Load,
  },
  data() {
    return {
      new_sujet: {},
      sujets: [],
      loaded: false,
      description: '',
    }
  },
  created() {
    this.sujetList();
  },
  methods: {
    saveSubject(){
      this.new_sujet.user_id = this.$store.getters.userId;
      sujetResource.store(this.new_sujet)
      .then((response) => {
        Message({
          message: response.message,
          type: "success",
          duration: 5 * 1000
        });
        this.sujetList();
      })
    },
    sujetList(){
      this.loaded = true;
      sujetResource.list()
      .then((response) => {
        this.sujets = response.data;
        this.loaded = false;
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.h5, h5 {
  font-size: 1.25rem;
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
</style>
