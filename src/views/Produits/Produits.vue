<template v-if="1 === 0">
  <div>
       <!-- BootstrapVue Done -->
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
    </base-header>

    <b-container fluid class="mt--7">
      <b-row class="justify-content-center">
        <b-col lg="12">
          <card header-classes="bg-transparent">
            <b-row>
              <b-col class="col-6">
                <h3 slot="header" class="mb-0">Produits</h3>
              </b-col>
              <b-col class="col-6 text-right">
                <base-button icon v-b-modal.modal-1 variant="primary" size="sm" type="primary">
                  <span class="btn-inner--icon"><i class="ni ni-bag-17"></i></span>
                  <span class="btn-inner--text">ajouter</span>
                </base-button>
              </b-col>
            </b-row>
            <b-row>
              <div v-for="(produit, index) in produit_list" :key="index">
              <b-col>
                  <b-card
                    :title="produit.libelle"
                    img-src="https://demos.creative-tim.com/argon-dashboard-pro-bs4/assets/img/theme/img-1-1000x600.jpg"
                    img-alt="Image"
                    img-top
                    tag="article"
                    style="max-width: 18rem;height: 28rem;"
                    class="card mb-2"
                  >
                    <b-card-body>
                      <b-card-text>
                        <!--                      <span class="mr-2"><i class="fa fa-arrow-up"></i> 3.48%</span>-->
                        <span>{{ produit.description }}</span>
                      </b-card-text>
                    </b-card-body>
<!--                    <b-card-text>-->
<!--                      {{ produit.description }}-->
<!--                    </b-card-text>-->
                      <b-button href="javascript:;" variant="primary">Souscrire</b-button>
                  </b-card>
              </b-col>
              </div>
            </b-row>
          </card>
        </b-col>
      </b-row>
    </b-container>
    <b-modal id="modal-1" title="New message to undefined" @ok="addproduit">
      <vue-element-loading :active="show" spinner="bar-fade-scale" color="#2dce94" />
      <form ref="produit_form">
        <b-form-group label="Libelle">
          <b-input-group prepend="@">
            <b-form-input v-model="produit.libelle" placeholder="Libelle" required></b-form-input>
          </b-input-group>
        </b-form-group>

        <b-form-group label="Description">
          <b-input-group>
            <b-form-textarea v-model="produit.description" required></b-form-textarea>
          </b-input-group>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>
<template v-else>
  <div>
    <base-header class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center profile-header"
                 style="min-height: 400px; background-image: url(https://media.istockphoto.com/photos/corn-cob-with-green-leaves-growth-in-agriculture-field-outdoor-picture-id1133692494?b=1&k=20&m=1133692494&s=170667a&w=0&h=yrySP9xb1gkhRZ9xRoOVsyLNbWre3Yu4OFY3XKBLEjI=); background-size: cover; background-position: center top;">
      <!-- Card stats -->
      <b-container fluid>
        <!-- Mask -->
        <span class="mask bg-gradient-success opacity-6"></span>
      </b-container>
    </base-header>
    <b-container fluid class="mt--7">
      <b-row>
        <b-col>
          <table_produits/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
  import Vue from 'vue'
  import VueClipboard from 'vue-clipboard2'
  import BaseHeader from '@/components/BaseHeader';
  import Resource from "../../api/resource";
  import {Message} from "element-ui";
  import VueElementLoading from "vue-element-loading";
  import table_produits from "../Tables/RegularTables/table_produits";

  const produitResource = new Resource('produits');

  Vue.use(VueClipboard)
  export default {
    name: 'icons',
    components: {
      BaseHeader,
      VueElementLoading,
      table_produits
    },
    data() {
      return {
        produit: {},
        show: false,
        produit_list: [],
      }
    },
    created() {
      this.getproduits();
    },
    methods: {
      onCopy() {
        this.$notify({
          type: 'info',
          message: 'Copied to clipboard'
        })
      },
      async getproduits(){
        const { data } = await produitResource.list();
        this.produit_list = data;
        console.log('produit LIST', this.produit_list);
      },
      addproduit(bvModalEvent){
        bvModalEvent.preventDefault();
        const valid = this.$refs['produit_form'].checkValidity();
        console.log('VALID VALUE ', valid);
          if (valid){
            this.show = true;
            console.log(this.produit);
            produitResource.store(this.produit)
              .then((response) => {
                Message({
                  message: 'produit ajouté avec succes',
                  type: 'success',
                  duration: 5 * 1000,
                })
              })
              .catch((error) => {
                console.log(error);
              })
              .finally(() => {
                this.show = false;
                this.getproduits();
                this.$nextTick(() => {
                  this.$bvModal.hide('modal-1')
                })
                console.log('DONE');
              });
          } else {
            Message({
              message: 'Veuillez svp renseigner les champs',
              type: 'error',
              duration: 5 * 1000
            })
            return false;
          }
      }
    }
  };
</script>
<style lang="scss" scoped>
.card-img, .card-img-top {
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
}
.card {
  position: relative;
  box-shadow: 0 0 2rem 0 rgb(136 152 170 / 15%);
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 0solidrgba(0,0,0,.125);
  border-radius: 1rem;
}
</style>
