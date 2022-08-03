<template>
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
                <h3 slot="header" class="mb-0">Packs</h3>
              </b-col>
              <b-col class="col-6 text-right">
                <base-button icon v-b-modal.modal-1 variant="primary" size="sm" type="primary">
                  <span class="btn-inner--icon"><i class="ni ni-bag-17"></i></span>
                  <span class="btn-inner--text">Modifier</span>
                </base-button>
              </b-col>
            </b-row>
            <b-row class="h-100 d-flex align-items-center justify-content-center">
              <div>
                <b-col>
                  <b-card
                    :title="pack.libelle"
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
                        <span>{{ pack.description }}</span>
                      </b-card-text>
                    </b-card-body>
                    <!--                    <b-card-text>-->
                    <!--                      {{ pack.description }}-->
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
  </div>
</template>
<script>
  import BaseHeader from '@/components/BaseHeader';
  import Resource from "../../api/resource";

  const packResource = new Resource('packs');
  export default {
    name: 'icons',
    components: {
      BaseHeader
    },
    data() {
      return {
        pack: {},
      }
    },
    created() {
      this.getPack();
    },
    methods: {
      onCopy() {
        this.$notify({
          type: 'info',
          message: 'Copied to clipboard'
        })
      },
      async getPack(){
        const { data } = await packResource.get(this.$route.params.id);
        this.pack = data;
        console.log('¨Pack obtained', this.pack);
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
