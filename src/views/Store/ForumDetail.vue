<template>
<div class="forum">
  <Load :loaded="loaded"/>
  <!-- ##### Breadcrumb Area Start ##### -->
  <div class="breadcrumb-area">
    <!-- Top Breadcrumb Area -->
    <div class="top-breadcrumb-area bg-img bg-overlay d-flex align-items-center justify-content-center" style="background-image: url(store/img/bg-img/24.jpg);">
      <h2>SUJET</h2>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-12">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="#"><i class="fa fa-home"></i> Home</a></li>
              <li class="breadcrumb-item"><router-link to="/store/forum" href="#">Forum</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">{{ sujet.titre }}</li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  </div>
  <!-- ##### Breadcrumb Area End ##### -->

  <!-- ##### Blog Content Area Start ##### -->
  <section class="blog-content-area section-padding-0-100">
    <div class="container">
      <div class="row justify-content-center">
        <!-- Blog Posts Area -->
        <div class="col-12 col-md-8">
          <div class="blog-posts-area">

            <!-- Post Details Area -->
            <div class="single-post-details-area">
              <div class="post-content">
                <h4 class="post-title">{{sujet.titre}}</h4>
                <div class="post-meta mb-30">
                  <a href="#"><i class="fa fa-clock-o" aria-hidden="true"></i> {{ sujet.created_at }}</a>
                  <a href="#"><i class="fa fa-user" aria-hidden="true"></i> {{ sujet.user ? sujet.user.nom : '' }} {{ sujet.user ? sujet.user.prenom : '' }} </a>
                </div>
                <p>Integer luctus diam ac scerisque consectetur. Vimus ottawas euismod nec lacus sit amet. Aenean interdus midu vitae, uttah mattis augue fermentum. Donec auctor massa orci, quis condimentum odio eleifended. Orci varius natoque penatibuset magnis discount parturient montes, nascetur ridiculus mus. Ut felis lectus, sagittis in turpis sit amet, ornare interdu ligula. Proin sed dolor eu nulla fermentum fermentum. Suspendisse eget mollis diam. Nulla non mauris et eros accumsan imperdit sed ut turpis. Ut aliquam et sapien at convallis. Integer eu porttitor lacus. Curabitur id aliquam mauris.</p>
                </div>
            </div>

            <!-- Post Tags & Share -->
            <div class="post-tags-share d-flex justify-content-between align-items-center">
              <!-- Tags -->
              <ol class="popular-tags d-flex align-items-center flex-wrap">
                <li><span>Tag:</span></li>
                <li><a href="#">PLANTS</a></li>
                <li><a href="#">CACTUS</a></li>
              </ol>
              <!-- Share -->
              <div class="post-share">
                <a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a>
                <a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a>
                <a href="#"><i class="fa fa-google-plus" aria-hidden="true"></i></a>
                <a href="#"><i class="fa fa-instagram" aria-hidden="true"></i></a>
              </div>
            </div>

            <!-- Comment Area Start -->
            <div class="comment_area clearfix">
              <h4 class="headline">2 Comments</h4>

              <ol>
                <li class="single_comment_area">
                  <div class="comment-wrapper d-flex">
                    <!-- Comment Meta -->
                    <div class="comment-author">
                      <img src="store/img/bg-img/39.jpg" alt="">
                    </div>
                    <!-- Comment Content -->
                    <div class="comment-content">
                      <div class="d-flex align-items-center justify-content-between">
                        <h5>Maria Sharapova</h5>
                        <span class="comment-date">02:20 PM,  20 Jun 2018</span>
                      </div>
                      <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetu adipisci velit, sed quia non numquam eius modi</p>
                      <a class="active" href="#">Reply</a>
                    </div>
                  </div>
                </li>
              </ol>
            </div>

            <!-- Leave A Comment -->
            <div class="leave-comment-area clearfix">
              <div class="comment-form">
                <h4 class="headline">Leave A Comment</h4>

                <div class="contact-form-area">
                  <!-- Comment Form -->
                  <form action="#" method="post">
                    <div class="row">
                      <div class="col-12 col-md-6">
                        <div class="form-group">
                          <input type="text" class="form-control" id="contact-name" placeholder="Name">
                        </div>
                      </div>
                      <div class="col-12 col-md-6">
                        <div class="form-group">
                          <input type="email" class="form-control" id="contact-email" placeholder="Email">
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="form-group">
                          <textarea class="form-control" name="message" id="message" cols="30" rows="10" placeholder="Comment"></textarea>
                        </div>
                      </div>
                      <div class="col-12">
                        <button type="submit" class="btn alazea-btn">Post Comment</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- Blog Sidebar Area -->
        <div class="col-12 col-sm-9 col-md-4">
          <div class="post-sidebar-area">

            <!-- ##### Single Widget Area ##### -->
            <div class="single-widget-area">
              <!-- Author Widget -->
              <div class="author-widget">
                <div class="author-thumb-name d-flex align-items-center">
                  <div class="author-thumb">
                    <img src="img/bg-img/29.jpg" alt="">
                  </div>
                  <div class="author-name">
                    <h5>Alan Jackson</h5>
                    <p>Editor</p>
                  </div>
                </div>
                <p>I’m the editor for houseplants &amp; garden design articles on social, and I like to put each of those articles in the topic.</p>
                <div class="social-info">
                  <a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a>
                  <a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a>
                  <a href="#"><i class="fa fa-google-plus" aria-hidden="true"></i></a>
                  <a href="#"><i class="fa fa-instagram" aria-hidden="true"></i></a>
                </div>
              </div>
            </div>

            <!-- ##### Single Widget Area ##### -->
            <div class="single-widget-area">
              <!-- Title -->
              <div class="widget-title">
                <h4>Recent post</h4>
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
  <!-- ##### Blog Content Area End ##### -->

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
      sujet: {},
      loaded: false,
      description: '',
    }
  },
  created() {
    this.sujetDetail();
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
        this.sujetDetail();
      })
    },
    sujetDetail(){
      this.loaded = true;
      sujetResource.get(this.$route.params.id)
      .then((response) => {
        this.sujet = response.data;
        this.loaded = false;
      });
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
