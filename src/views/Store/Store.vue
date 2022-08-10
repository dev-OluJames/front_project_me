<template>

  <div class="hello">
    <!-- Preloader -->
    <header class="header-area">

      <!-- ***** Top Header Area ***** -->
      <div class="top-header-area">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="top-header-content d-flex align-items-center justify-content-between">
                <!-- Top Header Content -->
                <div class="top-header-meta">
                  <a href="#" data-toggle="tooltip" data-placement="bottom" title="giacagri@gmail.com">
                    <i style="font-size: 12px;" class="fa fa-envelope-o" aria-hidden="true"></i> <span style="font-size: 12px;">Email: giacagri@gmail.com</span></a>
                  <a href="#" data-toggle="tooltip" data-placement="bottom" title="+(228)91-19-44-77/96-32-32-23">
                    <i style="font-size: 12px;" class="fa fa-phone" aria-hidden="true"></i> <span style="font-size: 12px;">Contact: +(228)91-19-44-77/96-32-32-23</span></a>
                </div>
                <div v-if="authenticated" class="top-header-meta d-flex">
                  <div class="language-dropdown">
                    <div class="dropdown">
                      <router-link to="/store/dashboard"><i class="fa fa-user" aria-hidden="true"></i><span>compte</span></router-link>
                    </div>
                  </div>
                    <div class="login">
                      <a href="#" @click="logout"><span>Logout</span></a>
                    </div>
                    <!-- Cart -->
                    <div class="cart">
                      <a href="#"><i class="fa fa-shopping-cart" aria-hidden="true"></i> <span>Cart <span class="cart-quantity">(0)</span></span></a>
                    </div>
                </div>
                <div v-else class="top-header-meta d-flex">
                  <div class="login">
                    <router-link to="/login"><i class="fa fa-user" aria-hidden="true"></i> <span>Login</span></router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ***** Navbar Area ***** -->
      <div class="alazea-main-menu">
        <div class="classy-nav-container breakpoint-off">
          <div class="container">
            <!-- Menu -->
            <nav class="classy-navbar justify-content-between" id="alazeaNav">

              <!-- Nav Brand -->
              <a href="#" class="nav-brand">
                <img width="98" height="22" src="store/img/core-img/green.png" alt="">
              </a>

              <!-- Navbar Toggler -->
              <div class="classy-navbar-toggler">
                <span class="navbarToggler"><span></span><span></span><span></span></span>
              </div>

              <!-- Menu -->
              <div class="classy-menu">

                <!-- Close Button -->
                <div class="classycloseIcon">
                  <div class="cross-wrap"><span class="top"></span><span class="bottom"></span></div>
                </div>

                <!-- Navbar Start -->
                <div class="classynav">
                  <ul>
                    <li>
                      <router-link to="/" style="font-size: 22px;">
                        Accueil
                      </router-link>
                    </li>
                    <li>
                      <router-link to="/store/presentation" style="font-size: 22px;">
                        Présentation
                      </router-link>
                    </li>
                    <li><a style="font-size: 22px;" href="#">Nos Partenaires</a></li>
                    <li><a style="font-size: 22px;" href="#">Equipes</a></li>
                    <li><a style="font-size: 22px;" href="#">Contact</a></li>
                  </ul>

                  <!-- Search Icon -->
                  <div id="searchIcon">
                    <i class="fa fa-search" aria-hidden="true"></i>
                  </div>

                </div>
                <!-- Navbar End -->
              </div>
            </nav>

            <!-- Search Form -->
            <div class="search-form">
              <form action="#" method="get">
                <input type="search" name="search" id="search" placeholder="Type keywords &amp; press enter...">
                <button type="submit" class="d-none"></button>
              </form>
              <!-- Close Icon -->
              <div class="closeIcon"><i class="fa fa-times" aria-hidden="true"></i></div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <router-view></router-view>
    <!-- ##### Footer Area Start ##### -->
    <footer class="footer-area bg-img" style="background-image: url(store/img/bg-img/3.jpg);">
      <!-- Main Footer Area -->
      <div class="main-footer-area">
        <div class="container">
          <div class="row">

            <!-- Single Footer Widget -->
            <div class="col-12 col-sm-6 col-lg-4">
              <div class="single-footer-widget">
                <div class="footer-logo mb-30">
                  <a href="index"><img width="98" height="22" src="store/img/core-img/green.png" alt=""></a>
                </div>
                <p>GIAC, quand le bonheur vient à vous!!!</p>
                <div class="social-info">
                  <a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a>
                  <a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a>
                  <a href="#"><i class="fa fa-google-plus" aria-hidden="true"></i></a>
                  <a href="#"><i class="fa fa-instagram" aria-hidden="true"></i></a>
                  <a href="#"><i class="fa fa-linkedin" aria-hidden="true"></i></a>
                </div>
              </div>
            </div>

            <!-- Single Footer Widget -->
            <div class="col-12 col-sm-6 col-lg-4">
              <div class="single-footer-widget">
<!--                <div class="widget-title">-->
<!--                  <h5>LIEN RAPIDE</h5>-->
<!--                </div>-->
<!--                <nav class="widget-nav">-->
<!--                  <ul>-->
<!--                    <li><a href="#">Purchase</a></li>-->
<!--                    <li><a href="#">FAQs</a></li>-->
<!--                    <li><a href="#">Payment</a></li>-->
<!--                    <li><a href="#">News</a></li>-->
<!--                    <li><a href="#">Return</a></li>-->
<!--                    <li><a href="#">Advertise</a></li>-->
<!--                    <li><a href="#">Shipping</a></li>-->
<!--                    <li><a href="#">Career</a></li>-->
<!--                    <li><a href="#">Orders</a></li>-->
<!--                    <li><a href="#">Policities</a></li>-->
<!--                  </ul>-->
<!--                </nav>-->
              </div>
            </div>

            <!-- Single Footer Widget -->
            <div class="col-12 col-sm-6 col-lg-4">
              <div class="single-footer-widget">
                <div class="widget-title">
                  <h5>CONTACT</h5>
                </div>

                <div class="contact-information">
                  <p><span>Adresse:</span> Lomé quartier Amadahome </p>
                  <p><span>Contact:</span> +(228) 91-19-44-77/ 96-32-32-23</p>
                  <p><span>Email:</span> giacagri@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Bottom Area -->
      <div class="footer-bottom-area">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="border-line"></div>
            </div>
            <!-- Copywrite Text -->
            <div class="col-12 col-md-6">
              <div class="copywrite-text">
                <p>Développer par <a target="_blank" href="https://newbrainfactory.com/">New Brain Factory</a></p>
              </div>
            </div>
            <!-- Footer Nav -->
            <div class="col-12 col-md-6">
              <div class="footer-nav">
                <nav>
                  <ul>
                    <li><a href="#">Accueil</a></li>
                    <li><a href="#">Présentation</a></li>
                    <li><a href="#">Nos Partenaires</a></li>
                    <li><a href="#">Equipes</a></li>
                    <li><a href="#">Contact</a></li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import {removeToken} from "../../utils/auth";
import {isLogged} from "../../utils/auth";

export default {
  name: "Store",
  created() {
    let jqueryScript = document.createElement('script')
    jqueryScript.setAttribute('src', 'store/js/jquery/jquery-2.2.4.min.js')
    document.head.appendChild(jqueryScript)

    let popperScript = document.createElement('script')
    popperScript.setAttribute('src', 'store/js/bootstrap/popper.min.js')
    document.head.appendChild(popperScript)

    let bootstrapScript = document.createElement('script')
    bootstrapScript.setAttribute('src', 'store/js/bootstrap/bootstrap.min.js')
    document.head.appendChild(bootstrapScript)

    let pluginsScript = document.createElement('script')
    pluginsScript.setAttribute('src', 'store/js/plugins/plugins.js')
    document.head.appendChild(pluginsScript)

    let activeScript = document.createElement('script')
    activeScript.setAttribute('src', 'store/js/active.js')
    document.head.appendChild(activeScript)
  },
  data () {
    return {
      authenticated : isLogged(),
    }
  },
  methods: {
    async logout() {
      Cookies.remove('token_key');
      // await this.$store.dispatch('user/logout');
      removeToken();
      this.authenticated = false;
    },
  }
}
</script>

<style scoped>
</style>
