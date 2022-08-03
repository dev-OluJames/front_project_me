<template>
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
