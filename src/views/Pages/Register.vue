<template>
  <div>
    <!-- Header -->
    <div class="page-header py-7 py-lg-8 pt-lg-9" style="
    background-image: url(https://images.theconversation.com/files/462211/original/file-20220510-12-3lndx0.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop );">
      <span class="mask bg-gradient-dark opacity-6"></span>
      <b-container class="container">
        <div class="header-body text-center mb-7">
          <b-row class="justify-content-center">
            <b-col xl="5" lg="6" md="8" class="px-5">
              <h1 class="text-white">Créer un compte  {{ type_user }}</h1>
              <p class="text-lead text-white">Veuillez renseigner vos informations utiles à la création d'un compte</p>
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
      <!-- Table -->
      <b-row class="justify-content-center">
        <b-col lg="6" md="8" >
          <b-card no-body class="bg-secondary border-0">
            <b-card-body class="px-lg-5 py-lg-5">
              <div class="text-center text-muted mb-4">
                <small>Renseignez toutes les informations</small>
              </div>
              <validation-observer v-slot="{handleSubmit}" ref="formValidator">
                <b-form role="form" @submit.prevent="handleSubmit(onSubmit)">
                  <base-input alternative
                              class="mb-3"
                              prepend-icon="ni ni-hat-3"
                              placeholder="Nom"
                              name="Nom"
                              :rules="{required: true}"
                              v-model="model.nom">
                  </base-input>

                  <base-input alternative
                              class="mb-3"
                              prepend-icon="ni ni-circle-08"
                              placeholder="Prenom"
                              name="Prenom"
                              :rules="{required: true}"
                              v-model="model.prenom">
                  </base-input>

                  <base-input alternative
                              class="mb-3"
                              prepend-icon="ni ni-email-83"
                              placeholder="Email"
                              name="Email"
                              :rules="{required: true, email: true}"
                              v-model="model.email">
                  </base-input>

                  <base-input alternative
                              class="mb-3"
                              prepend-icon="ni ni-lock-circle-open"
                              placeholder="password"
                              type="password"
                              name="Password"
                              :rules="{required: true, min: 6}"
                              v-model="model.password">
                  </base-input>

                  <base-input alternative
                              class="mb-3"
                              prepend-icon="ni ni-lock-circle-open"
                              placeholder="Confirmer"
                              type="password"
                              name="Confirmer"
                              :rules="{required: true, min: 6}"
                              v-model="password_confirm">
                  </base-input>

                  <div v-if="type_user === 'agriculteur' || type_user === 'aggregateur'" style="width: 100%">
                    <label class="form-control-label">
                      Village
                    </label> <br/>
                    <el-select class="mb-3" v-model="model.village_id" filterable placeholder="Select">
                      <el-option
                        v-for="(item, index) in villages"
                        :key="index"
                        :label="item.libelle"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </div>

                  <b-row v-if="type_user === 'agriculteur'">
                    <b-col sm="4">
                      <base-radio name="individuelle" class="mb-3" v-model="model.cooperative">
                        Individuelle
                      </base-radio>
                    </b-col>
                    <b-col sm="4">
                      <base-radio name="cooperative" class="mb-3" v-model="model.cooperative">
                        Cooperative
                      </base-radio>
                    </b-col>
                  </b-row>

                  <base-input alternative
                              v-if="type_user === 'aggregateur'"
                              class="mb-3"
                              prepend-icon="ni ni-building"
                              placeholder="Magasin"
                              name="magasin"
                              :rules="{required: true}"
                              v-model="model.magasin">
                  </base-input>

                  <base-input alternative
                              class="mb-3"
                              prepend-icon="ni ni-building"
                              placeholder="Entreprise"
                              name="Entreprise"
                              :rules="{required: true}"
                              v-model="model.nom_entreprise">
                  </base-input>

                  <base-input alternative
                              class="mb-3"
                              prepend-icon="ni ni-mobile-button"
                              placeholder="Telephone"
                              name="Telephone"
                              :rules="{required: true}"
                              v-model="model.telephone">
                  </base-input>

                  <base-input alternative
                              class="mb-3"
                              prepend-icon="ni ni-single-02"
                              placeholder="Nom Utilisateur"
                              name="Nom Utilisateur"
                              :rules="{required: true}"
                              v-model="model.nom_utilisateur">
                  </base-input>

                  <div v-if="authenticated && $store.getters.roles[0] === 'admin'">
                    <label class="form-control-label">
                      Role
                    </label> <br/>
                    <el-select class="mb-3" v-model="model.role" filterable placeholder="Select">
                      <el-option
                        v-for="(item, index) in roles"
                        :key="index"
                        :label="item.name"
                        :value="item.name">
                      </el-option>
                    </el-select>
                  </div>

                  <b-row>
                    <b-col sm="4">
                      <base-radio name="f" class="mb-3" v-model="model.sexe">
                        Feminin
                      </base-radio>
                    </b-col>
                    <b-col sm="4">
                      <base-radio name="m" class="mb-3" v-model="model.sexe">
                        Masculin
                      </base-radio>
                    </b-col>
                  </b-row>

                  <div class="text-muted font-italic"><small>password strength: <span
                    class="text-success font-weight-700">strong</span></small></div>
                  <b-row class=" my-4">
                    <b-col cols="12">
                      <base-input :rules="{ required: { allowFalse: false } }" name=Privacy Policy>
                        <b-form-checkbox v-model="agree">
                          <span class="text-muted">I agree with the <a href="#!">Privacy Policy</a></span>
                        </b-form-checkbox>
                      </base-input>
                    </b-col>
                  </b-row>
                  <div class="text-center">
                    <b-button type="submit" variant="primary" class="mt-4">Create account</b-button>
                  </div>
                </b-form>
              </validation-observer>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import Resource from "../../api/resource";
import {Message} from "element-ui";
import {isLogged} from "../../utils/auth";
const userRessource = new Resource('users');
const villageResource = new Resource('villages');
const typeUserResource = new Resource('typeUsers');
  export default {
    name: 'register',
    data() {
      return {
        type_user: 'utilisateur',
        model: {
          nom: '',
          prenom: '',
          sexe: 'm',
          email: '',
          password: '',
          telephone: '',
          village_id: '',
          cooperative: 'individuelle',
          magasin: '',
          nom_entreprise: '',
          nom_utilisateur: '',
          type_user_id: 1,
          role: 'utilisateur'
        },
        villages: [],
        roles: [],
        password_confirm: '',
        authenticated: isLogged(),
        agree: true,
      }
    },
    created() {
      console.log('ROLE UTILISATEUR', this.$store.getters.roles);
      if (this.authenticated){
        this.getRoles();
      }
      this.getVillages();
      this.getTypeUser();
    },
    methods: {
      getTypeUser(){
        this.type_user = localStorage.getItem('type_user');
        if (!this.type_user){
          localStorage.setItem('type_user', this.$route.params.type);
          this.type_user = localStorage.getItem('type_user');
        }
        console.log('TYPE SENT', this.type_user);
      },
      async getRoles(){
        const roleResource = new Resource('roles');
        const { data } = await roleResource.list();
        this.roles = data;
      },
      async getVillages(){
        const { data } = await villageResource.list();
        this.villages = data;
      },
      async onSubmit() {
        if (this.$store.getters.roles[0] === 'admin'){
          this.model.role = 'admin';
        }
        this.model.cooperative = this.model.cooperative !== 'individuelle';
        const { data } = await typeUserResource.list({'keyword': this.type_user});
        this.model.type_user_id = data[0].id
        console.log('MODEL RENDERED', this.model);
        userRessource.store(this.model)
        .then((response) => {
          console.log('RESPONSE', response);
          Message({
            message: response.message,
            type: 'success',
            duration: 5 * 1000,
          });

        })
        .catch((error)=> {
          console.log(error);
        })
        .finally(()=>{
          if (this.$store.getters.roles[0] !== 'utilisateur'){
            this.$router.push({path: '/administration/users'});
          }
          this.$router.push({path: '/login'});
        })
      }
    }

  };
</script>
<style lang="scss" scoped>
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
</style>
