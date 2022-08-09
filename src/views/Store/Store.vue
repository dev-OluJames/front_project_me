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
                    <i style="font-size: 18px;" class="fa fa-envelope-o" aria-hidden="true"></i> <span style="font-size: 18px;">Email: giacagri@gmail.com</span></a>
                  <a href="#" data-toggle="tooltip" data-placement="bottom" title="+(228)91-19-44-77/96-32-32-23">
                    <i style="font-size: 18px;" class="fa fa-phone" aria-hidden="true"></i> <span style="font-size: 18px;">Contact: +(228)91-19-44-77/96-32-32-23</span></a>
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
              <a href="index.html" class="nav-brand">
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
                    <li><a style="font-size: 22px;" href="index.html">Accueil</a></li>
                    <li><a style="font-size: 22px;" href="presentation.html">Présentation</a></li>
                    <li><a style="font-size: 22px;" href="partenaire.html">Nos Partenaires</a></li>
                    <li><a style="font-size: 22px;" href="equipes.html">Equipes</a></li>
                    <li><a style="font-size: 22px;" href="contact.html">Contact</a></li>
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
                  <a href="index.html"><img width="98" height="22" src="store/img/core-img/green.png" alt=""></a>
                </div>
                <p>GIAC, quand le bonheur vient à vous !!!</p>
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
                <div class="widget-title">
                  <h5>LIEN RAPIDE</h5>
                </div>
                <nav class="widget-nav">
                  <ul>
                    <li><a href="#">Purchase</a></li>
                    <li><a href="#">FAQs</a></li>
                    <li><a href="#">Payment</a></li>
                    <li><a href="#">News</a></li>
                    <li><a href="#">Return</a></li>
                    <li><a href="#">Advertise</a></li>
                    <li><a href="#">Shipping</a></li>
                    <li><a href="#">Career</a></li>
                    <li><a href="#">Orders</a></li>
                    <li><a href="#">Policities</a></li>
                  </ul>
                </nav>
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
                    <li><a href="index.html">Accueil</a></li>
                    <li><a href="presentation.html">Présentation</a></li>
                    <li><a href="partenaire.html">Nos Partenaires</a></li>
                    <li><a href="equipes.html">Equipes</a></li>
                    <li><a href="contact.html">Contact</a></li>
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
export default {
  name: "Store"
}
</script>

<style scoped>
</style>
