<template>
  <div>
    <!-- Header -->
    <div class="page-header py-7 py-lg-8 pt-lg-9" style="
    background-image: url(https://blog.machinefinder.com/wp-content/uploads/2013/09/GettyImages-604027116-1600x640.jpg);">
      <span class="mask bg-gradient-dark opacity-6"></span>
      <b-container>
        <div class="header-body text-center mb-7">
          <b-row class="justify-content-center">
            <b-col xl="5" lg="6" md="8" class="px-5">
              <h1 class="text-white">Welcome!</h1>
              <p class="text-lead text-white">
                Utilisez vos identifiants pour vous connecter
              </p>
            </b-col>
          </b-row>
        </div>
      </b-container>
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1"
             xmlns="http://www.w3.org/2000/svg">
          <polygon class="fill-default" points="2560 0 2560 100 0 100"></polygon>
        </svg>
      </div>
    </div>
    <!-- Page content -->
    <b-container class="mt--8 pb-5">
      <b-row class="justify-content-center">
        <b-col lg="5" md="7">
          <b-card no-body class="bg-secondary border-0 mb-0">
            <b-card-body class="px-lg-5 py-lg-5">
              <div class="text-center text-muted mb-4">
                <small>Connectez vous</small>
              </div>
              <validation-observer v-slot="{handleSubmit}" ref="formValidator">
                <b-form role="form"  @submit.prevent="handleSubmit(onSubmit)">
                  <base-input alternative
                              class="mb-3"
                              name="Email"
                              :rules="{required: true, email: true}"
                              prepend-icon="ni ni-email-83"
                              placeholder="Email"
                              v-model="loginForm.email">
                  </base-input>

                  <base-input alternative
                              class="mb-3"
                              name="Password"
                              :rules="{required: true, min: 6}"
                              prepend-icon="ni ni-lock-circle-open"
                              type="password"
                              placeholder="Password"
                              v-model="loginForm.password">
                  </base-input>

                  <b-form-checkbox v-model="remember">Remember me</b-form-checkbox>
                  <div class="text-center">
                    <base-button type="primary" native-type="submit" class="my-4">Sign in</base-button>
                  </div>
                </b-form>
              </validation-observer>
            </b-card-body>
          </b-card>
          <b-row class="mt-3">
            <b-col cols="6">
              <router-link to="/dashboard" class="text-light"><small>Forgot password?</small></router-link>
            </b-col>
            <b-col cols="6" class="text-right">
              <a href="#"><p class="text-white" v-b-modal.modal-center>Créer un Compte</p></a>
              <b-modal id="modal-center" style="color: #fbfbfb;" body-bg-variant="dark" footer-bg-variant="dark" footer-border-variant="primary" header-bg-variant="dark" hide-footer centered title="Quel Profile vous correspond ?">
                <b-row>
                  <b-col class="text-center">
                    <b-img src="img/theme/profile2.png" rounded="circle" alt="Circle image"></b-img>
                    <router-link :to="{ name: 'register', params: { type: 'utilisateur' }}" class="text-light"><small>Utilisateur</small></router-link>
                  </b-col>
<!--                  <b-col class="text-center">
                    <b-img src="img/theme/img.png" rounded="circle" alt="Circle image"></b-img>
                    <router-link :to="{ name: 'register', params: { type: 'aggregateur' }}" class="text-light"><small>Aggregateur</small></router-link>
                  </b-col>-->
                  <b-col class="text-center">
                    <b-img src="img/theme/agriculteur.png" rounded="circle" alt="Circle image"></b-img>
                    <router-link :to="{ name: 'register', params: { type: 'agriculteur' }}" class="text-light"><small>Agriculteur</small></router-link>
                  </b-col>
                </b-row>
              </b-modal>
<!--              <router-link to="/register" class="text-light"><small>Create new account</small></router-link>-->
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import {validEmail} from "../../utils/validate";
import { csrf } from '../../api/auth';
  export default {
    data() {
      const validateEmail = (rule, value, callback) => {
        console.log('VALIDDATE DEMAIL', rule, value, callback);
        if (!validEmail(value)) {
          callback(new Error('Please enter the correct email'));
        } else {
          callback();
        }
      };
      const validatePass = (rule, value, callback) => {
        if (value.length < 4) {
          callback(new Error('Password cannot be less than 4 digits'));
        } else {
          callback();
        }
      };
      return {
        loginForm: {
          email: '',
          password: '',
        },
        loginRules: {
          email: [{ required: true, trigger: 'blur', validator: validateEmail }],
          password: [{ required: true, trigger: 'blur', validator: validatePass }],
        },
        loading: false,
        pwdType: 'password',
        redirect: undefined,
        otherQuery: {},
        remember: false,
      };
    },
    watch: {
      $route: {
        handler: function(route) {
          console.log('QUERY', route);
          const query = route.query;
          if (query) {
            this.redirect = query.redirect;
            this.otherQuery = this.getOtherQuery(query);
          }
        },
        immediate: true,
      },
    },
    created() {
      localStorage.removeItem('type_user');
    },
    methods: {
      onSubmit() {
        this.loading = true;
        csrf().then(() => {
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery }, onAbort => {});
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        });
      },
      getOtherQuery(query) {
        return Object.keys(query).reduce((acc, cur) => {
          if (cur !== 'redirect') {
            acc[cur] = query[cur];
          }
          return acc;
        }, {});
      },
    }
  };
</script>
<style lang="scss">
.page-header {
  padding: 0;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  background-size: cover;
  background-position: 50%;
}
.mt--8, .my--8 {
  margin-top: -12rem !important;
}
.container {
  max-width: 860px;
}
.pt-lg-9, .py-lg-9 {
   padding-top: 5rem !important;
 }
.pb-lg-8, .py-lg-8 {
  padding-bottom: 5rem !important;
}
.close {
  float: right;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1;
  color: rgb(247 245 245 / 60%);
  text-shadow: none;
  opacity: 0.5;
}
.bg-dark {
  background-color: #294158 !important;
}
</style>
