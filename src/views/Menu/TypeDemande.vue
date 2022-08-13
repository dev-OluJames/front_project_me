<template>
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
          <table_TypeDemande/>
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
import table_TypeDemande from "../Tables/RegularTables/table_TypeDemande";

const typeDemandeResource = new Resource('typeDemandes');

Vue.use(VueClipboard)
export default {
  name: 'TypeDemande',
  components: {
    BaseHeader,
    VueElementLoading,
    table_TypeDemande
  },
  data() {
    return {
      typeDemande: {},
      show: false,
      typeDemande_list: [],
    }
  },
  created() {
    this.getTypeDemande();
  },
  methods: {
    onCopy() {
      this.$notify({
        type: 'info',
        message: 'Copied to clipboard'
      })
    },
    async getTypeDemande(){
      const { data } = await typeDemandeResource.list();
      this.typeDemande_list = data;
      console.log('typeDemande LIST', this.typeDemande_list);
    },
    addtypeDemande(bvModalEvent){
      bvModalEvent.preventDefault();
      const valid = this.$refs['typeDemande_form'].checkValidity();
      console.log('VALID VALUE ', valid);
      if (valid){
        this.show = true;
        console.log(this.typeDemande);
        typeDemandeResource.store(this.typeDemande)
          .then((response) => {
            Message({
              message: 'typeDemande ajouté avec succes',
              type: 'success',
              duration: 5 * 1000,
            })
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.show = false;
            this.getTypeDemande();
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
