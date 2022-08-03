<template>
  <div>
       <!-- BootstrapVue Done -->
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
      <b-row>
        <b-col xl="4" md="6">
          <stats-card title="Total Pays"
                      type="gradient-red"
                      sub-title="350,897"
                      icon="ni ni-active-40"
                      class="mb-4">

            <template slot="footer">
              <span class="text-success mr-2">3.48%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </b-col>
        <b-col xl="4" md="6">
          <stats-card title="Total Villes"
                      type="gradient-orange"
                      sub-title="2,356"
                      icon="ni ni-chart-pie-35"
                      class="mb-4">

            <template slot="footer">
              <span class="text-success mr-2">12.18%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </b-col>
        <b-col xl="4" md="6">
          <stats-card title="Total Villages"
                      type="gradient-green"
                      sub-title="924"
                      icon="ni ni-money-coins"
                      class="mb-4">

            <template slot="footer">
              <span class="text-danger mr-2">5.72%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>

        </b-col>
      </b-row>
    </base-header>

    <b-container fluid class="mt--7">
      <b-row class="justify-content-center">
        <b-col lg="12">
          <card header-classes="bg-transparent">
            <h3 slot="header" class="mb-0">Localites</h3>
            <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
              open
            </el-button>

            <el-drawer
              ref="create_pays_form"
              title="Ajout de localité"
              :visible.sync="drawer"
              :before-close="handleClose">
              <div class="drawer-body">
                <div class="localaites-steps">
                  <el-steps align-center :space="300" :active="steps.current" finish-status="success">
                    <el-step title="Pays" />
                    <el-step title="Villes" />
                    <el-step title="Villages" />
                  </el-steps>
                </div>

                <div class="user-create-form content-inputs">

                  <!-- ======= REGION ======= -->
                  <div v-show="steps.current===0" class="pays-step">
                    <div class="select-region">
                      <vs-alert shadow class="mb-15">
                        <template #title>
                          Pays
                        </template>
                        'Ajouter ou creez un Pays'
                      </vs-alert>
                      <el-select v-model="new_ville.pays_id" :disabled="createNewPays" class="filter-item" placeholder="Pays" style="width: 80%;" prop="pays_id" @change="gotoNext()">
                        <el-option
                          v-for="(pay, idex) in pays"
                          :key="idex"
                          :label="pay.libelle | uppercaseFirst"
                          :value="pay.id"
                          :disabled="!pay.is_active"
                        />
                      </el-select>
                      <base-button type="primary" class="el-button is-circle" @click="createNewPays=!createNewPays">
                        <span v-if="createNewPays" class="btn-inner--icon"><i class="ni ni-fat-delete"></i></span>
                        <span v-else class="btn-inner--icon"><i class="ni ni-fat-add"></i></span>
                      </base-button>
                    </div>
                    <div v-show="createNewPays" class="region-step-form step-form">
                      <el-form ref="paysForm" :rules="paysRules" :model="new_pays" label-position="left">
                        <el-form-item label="Pays" prop="pays">
                          <el-input v-model="new_pays.libelle" />
                        </el-form-item>
                        <el-form-item label="description" prop="description">
                          <el-input v-model="new_pays.description" type="textarea" />
                        </el-form-item>
                        <div style="text-align:right;padding-top:12px">
                          <base-button plain type="danger" @click="createNewPays=!createNewPays">
                            Annuler
                          </base-button>
                          <base-button type="primary" :loading="paysCreating" @click="createPays()">
                            {{ paysCreating ? 'en cours' : 'Ajouter' }}
                          </base-button>
                        </div>
                      </el-form>
                    </div>
                  </div>
                </div>
              </div>
            </el-drawer>
          </card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
  import Vue from 'vue'
  import VueClipboard from 'vue-clipboard2'
  import BaseHeader from '@/components/BaseHeader';
  import {Message} from "element-ui";
  import Resource from "../../api/resource";

  Vue.use(VueClipboard);
  const paysResource = new Resource('pays');
  export default {
    name: 'icons',
    components: {
      BaseHeader
    },
    data() {
      return {
        drawer: false,
        createNewPays: false,
        createNewVille: false,
        steps: {
          current: 0,
          hasError: false,
          errorTitle: 'Une erreure est survenue ',
          errorMessage: '',
        },
        paysCreating: false,
        villes: [],
        villages: [],
        pays: [],
        new_ville: {},
        new_village: {},
        new_pays: {},
        paysVilles: [],
        VilleVillages: [],
      }
    },
    methods: {
      async getPaysList(){
        const { data } = await paysResource.list();
        this.pays = data;
      },
      onCopy() {
        this.$notify({
          type: 'info',
          message: 'Copied to clipboard'
        })
      },
      handleClose(done) {
        this.$confirm('Are you sure you want to close this?')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      gotoNext(){
        if (this.steps.current === 0){
          if (this.new_ville.region_id){
            this.steps.hasError = false;
            this.getPaysVilles(this.new_ville.region_id);
            this.steps.current = 1;
          } else {
            Message({
              message: 'Veuillez choisir le pays avant de continuer',
              type: 'error',
              duration: 5 * 1000,
            });
            this.steps.errorMessage = 'Veuillez selectionner ou Ajouter un pays';
            this.steps.hasError = true;
          }
        } else if (this.steps.current === 1){
          if (this.new_village.ville_id){
            this.steps.hasError = false;
            this.getVilleVillages(this.new_village.ville_id);
            this.steps.current = 2;
          } else {
            Message({
              message: 'Veuillez choisir une ville',
              type: 'error',
              duration: 5 * 1000,
            });
            this.steps.errorMessage = 'Veuillez selectionner ou Ajouter une ville';
            this.steps.hasError = true;
          }
        }
      },
      getPaysVilles(pays_id){
        this.paysVilles = [];
        this.villes.forEach(ville => {
          if (ville.pays_id === pays_id && !this.paysVilles.includes(ville)){
            this.paysVilles.push(ville);
          }
        });
      },
      getVilleVillages(ville_id){
        this.VilleVillages = [];
        this.villages.forEach(village => {
          if (village.ville_id === ville_id && !this.VilleVillages.includes(village)){
            this.VilleVillages.push(ville);
          }
        });
      },
      createPays(){
        this.$refs['paysForm'].validate((valid) => {
          if (valid) {
            this.regionCreating = true;
            paysResource
              .store(this.new_pays)
              .then(async(response) => {
                this.$message({
                  message: 'Pays' + ' ' + this.new_pays.libelle + ' ' + 'Creée avec success',
                  type: 'success',
                  duration: 5 * 1000,
                });
                await this.getPaysList();
                this.new_pays = {};
                this.new_ville.pays_id = response.data.id;
                this.gotoNext();
              })
              .finally(() => {
                this.regionCreating = false;
                this.createNewRegion = false;
              });
          } else {
            console.log('Erreur !!');
            return false;
          }
        });
      },
    }
  };
</script>
<style lang="scss">
.step-form {
  padding: 17px;
  background-color: #fff;
  margin: 15px;
}
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
.dialog-footer {
  text-align: left;
  padding-top: 0;
  margin-left: 150px;
}
.el-button.is-circle {
  border-radius: 50%;
  padding: 12px;
}
.app-container {
  flex: 1;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
  .block {
    float: left;
    min-width: 250px;
  }
  .clear-left {
    clear: left;
  }
}
</style>
