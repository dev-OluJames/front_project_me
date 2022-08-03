<template v-if="1 === 0">
  <div>
    <base-header class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center profile-header"
                 style="min-height: 400px; background-image: url(https://images.hindustantimes.com/rf/image_size_630x354/HT/p2/2018/05/18/Pictures/_cdbf52fa-5a63-11e8-b431-73159b4b09e2.jpg); background-size: cover; background-position: center top;">
      <!-- Card stats -->
      <b-container fluid>
        <!-- Mask -->
        <span class="mask bg-gradient-success opacity-6"></span>
      </b-container>

    <b-container fluid class="mt--7">
      <b-row class="justify-content-center">
        <b-col lg="12">
          <card header-classes="bg-transparent">
            <b-row>
              <b-col class="col-6">
                <h3 slot="header" class="mb-0">Promotions</h3>
              </b-col>
              <b-col class="col-6 text-right">
                <base-button icon v-b-modal.modal-1 variant="primary" size="sm" type="primary">
                  <span class="btn-inner--icon"><i class="ni ni-bag-17"></i></span>
                  <span class="btn-inner--text">ajouter</span>
                </base-button>
              </b-col>
            </b-row>
            <b-row>
              <div v-for="(promotion, index) in promotion_list" :key="index">
              <b-col>
                  <b-card
                    :title="promotion.libelle"
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
                        <span>{{ promotion.description }}</span>
                      </b-card-text>
                    </b-card-body>
<!--                    <b-card-text>-->
<!--                      {{ promotion.description }}-->
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
    <b-modal id="modal-1" title="New message to undefined" @ok="addpromotion">
      <vue-element-loading :active="show" spinner="bar-fade-scale" color="#2dce94" />
      <form ref="promotion_form">
        <b-form-group label="Libelle">
          <b-input-group prepend="@">
            <b-form-input v-model="promotion.libelle" placeholder="Libelle" required></b-form-input>
          </b-input-group>
        </b-form-group>

        <b-form-group label="Description">
          <b-input-group>
            <b-form-textarea v-model="promotion.description" required></b-form-textarea>
          </b-input-group>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>
<template v-else>
  <div>
    <base-header class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center profile-header"
                 style="min-height: 400px; background-image: url(https://cdn.searchenginejournal.com/wp-content/uploads/2021/03/how-to-maximize-promotion-extensions-1600x840-605dff0748aee-1280x720.png); background-size: cover; background-position: center top;">
      <!-- Card stats -->
      <b-container fluid>
        <!-- Mask -->
        <span class="mask bg-gradient-success opacity-6"></span>
      </b-container>
    </base-header>
    <b-container fluid class="mt--7">
      <b-row>
        <b-col>
          <table_promotions/>
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
  import table_promotions from "../Tables/RegularTables/table_promotions";

  const promotionResource = new Resource('promotions');

  Vue.use(VueClipboard)
  export default {
    name: 'icons',
    components: {
      BaseHeader,
      VueElementLoading,
      table_promotions
    },
    data() {
      return {
        promotion: {},
        show: false,
        promotion_list: [],
      }
    },
    created() {
      this.getpromotions();
    },
    methods: {
      onCopy() {
        this.$notify({
          type: 'info',
          message: 'Copied to clipboard'
        })
      },
      async getpromotions(){
        const { data } = await promotionResource.list();
        this.promotion_list = data;
        console.log('promotion LIST', this.promotion_list);
      },
      addpromotion(bvModalEvent){
        bvModalEvent.preventDefault();
        const valid = this.$refs['promotion_form'].checkValidity();
        console.log('VALID VALUE ', valid);
          if (valid){
            this.show = true;
            console.log(this.promotion);
            promotionResource.store(this.promotion)
              .then((response) => {
                Message({
                  message: 'promotion ajouté avec succes',
                  type: 'success',
                  duration: 5 * 1000,
                })
              })
              .catch((error) => {
                console.log(error);
              })
              .finally(() => {
                this.show = false;
                this.getpromotions();
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
