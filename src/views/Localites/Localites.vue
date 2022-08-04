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

                  <!-- ======= PAYS ======= -->
                  <div v-show="steps.current===0" class="pays-step">
                    <div class="select-region">
                      <vs-alert shadow class="mb-15">
                        <template #title>
                          Pays
                        </template>
                        Ajouter ou creez un Pays  (en utilisant le boutton +)
                      </vs-alert>
                      <el-select v-model="new_ville.pays_id" :disabled="createNewPays" class="filter-item" placeholder="Pays" style="width: 80%;margin-right: 10px" prop="pays_id" @change="gotoNext()">
                        <el-option
                          v-for="(pay, idex) in pays"
                          :key="idex"
                          :label="pay.libelle | uppercaseFirst"
                          :value="pay.id"
                          :disabled="!pay.is_active"
                        />
                      </el-select>
                      <base-button type="primary" class="lev-button is-circle" @click="createNewPays=!createNewPays">
                        <span v-if="createNewPays" class="btn-inner--icon"><i class="ni ni-fat-delete"></i></span>
                        <span v-else class="btn-inner--icon"><i class="ni ni-fat-add"></i></span>
                      </base-button>
                    </div>
                    <div v-show="createNewPays" class="region-step-form step-form">
                      <el-form ref="paysForm" :rules="paysRules" :model="new_pays" label-position="left">
                        <el-form-item label="Pays" prop="libelle">
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
                  <!-- ======= VILLES ======= -->
                  <div v-show="steps.current===1" class="zone-step">
                    <div class="select-zone">
                      <el-tag><strong>Pays : </strong>{{ nomsPays[new_ville.pays_id] }}</el-tag>
                      <vs-alert shadow class="mb-15">
                        <template #title>
                          Ville
                        </template>
                        Selectionnez ou créez une Ville (en utilisant le boutton +)
                      </vs-alert>
                      <el-select v-model="new_village.ville_id" :disabled="createNewVille" class="filter-item" placeholder="Ville" style="width: 80%; margin-right: 10px" prop="ville_id" @change="gotoNext()">
                        <el-option
                          v-for="(ville, idex) in paysVilles"
                          :key="idex"
                          :label="ville.libelle | uppercaseFirst"
                          :value="ville.id"
                          :disabled="!ville.is_active"
                        />
                      </el-select>
                      <base-button type="primary" class="lev-button is-circle" @click="createNewVille=!createNewVille">
                        <span v-if="createNewVille" class="btn-inner--icon"><i class="ni ni-fat-delete"></i></span>
                        <span v-else class="btn-inner--icon"><i class="ni ni-fat-add"></i></span>
                      </base-button>
                    </div>
                    <div v-show="createNewVille" class="zone-step-form step-form">
                      <el-form ref="villeForm" :rules="villeRules" :model="new_ville" label-position="left">
                        <el-form-item label="Ville" prop="libelle">
                          <el-input v-model="new_ville.libelle" />
                        </el-form-item>
                        <el-form-item label="Description" prop="description">
                          <el-input v-model="new_ville.description" type="textarea" />
                        </el-form-item>
                        <div style="text-align:right;padding-top:12px">
                          <base-button plain type="danger" @click="createNewZone=!createNewZone">
                            Annuler
                          </base-button>
                          <base-button type="primary" :loading="villeCreating" @click="createVille()">
                            {{ villeCreating ? "En cours" : "Ajouter" }}
                          </base-button>
                        </div>
                      </el-form>
                    </div>
                  </div>
                  <!-- ======= VILLAGES ======= -->
                  <div v-show="steps.current===2" class="village-step">
                    <el-tag><strong>Pays : </strong>{{ nomsPays[new_ville.pays_id] }}</el-tag>
                    <el-tag><strong>Ville : </strong>{{ nomsVilles[new_village.ville_id] }}</el-tag>
                    <div class="village-step-form step-form">
                      <el-form ref="villageForm" :rules="villageRules" :model="new_village" label-position="left">
                        <el-form-item label="Village" prop="libelle">
                          <el-input v-model="new_village.libelle" />
                        </el-form-item>
                        <el-form-item label="Description" prop="description">
                          <el-input v-model="new_village.description" type="textarea" />
                        </el-form-item>
                        <div style="text-align:right;padding-top:12px">
                          <el-button plain type="danger" @click="cancelPaysForm">
                            Annuler
                          </el-button>
                          <el-button type="primary" :loading="villageCreating" @click="createVillage()">
                            {{ villageCreating ? 'En cours' : 'Ajouter' }}
                          </el-button>
                        </div>
                      </el-form>
                    </div>
                  </div>

                  <div class="controls">
                    <hr>
                    <el-button-group>
                      <base-button type="secondary" @click="goBack()">
                        <span class="btn-inner--icon"><i class="ni ni-bold-left"></i></span>
                      </base-button>
                      <base-button type="primary" @click="steps.current === 2 ? cancelPaysForm() : gotoNext()">
                        <span v-if="steps.current === 2" class="btn-inner--icon"><i class="ni ni-fat-remove"></i></span>
                        <span v-else class="btn-inner--icon"><i class="ni ni-bold-right"></i></span>
                      </base-button>
                    </el-button-group>
<!--                    <el-alert-->
<!--                      v-show="steps.hasError"-->
<!--                      :title="steps.errorTitle"-->
<!--                      type="error"-->
<!--                      :description="steps.errorMessage"-->
<!--                      show-icon-->
<!--                    />-->
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
  const villeResource = new Resource('villes');
  const villageResource = new Resource('villages');
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
        villeCreating: false,
        villageCreating: false,
        nomsPays: {},
        nomsVilles: {},
        villes: [],
        villages: [],
        pays: [],
        new_ville: {},
        new_village: {},
        new_pays: {},
        paysVilles: [],
        VilleVillages: [],
        paysRules: {
          libelle: [{ required: true, message: 'Renseignez le nom du pays', trigger: 'blur' }],
          // description: [{ required: true, message: this.$t('region.DescriptionRequired'), trigger: 'blur' }],
        },
        villeRules: {
          libelle: [{ required: true, message: 'Renseignez le nom de la ville', trigger: 'blur' }],
          // description: [{ required: true, message: this.$t('region.DescriptionRequired'), trigger: 'blur' }],
        },
        villageRules: {
          libelle: [{ required: true, message: 'Renseignez le nom du village', trigger: 'blur' }],
          // description: [{ required: true, message: this.$t('region.DescriptionRequired'), trigger: 'blur' }],
        },
      }
    },
    created() {
      this.getPaysList();
      this.getVilleList();
    },
    methods: {
      async getPaysList(){
        const { data } = await paysResource.list();
        this.pays = data;
        console.log('LES Pays ', this.pays);
        const _reg = [];
        data.forEach(pay => {
          _reg[pay.id] = pay.libelle;
        });
        this.nomsPays = _reg;
      },
      async getVilleList() {
        const { data } = await villeResource.list();
        this.villes = data;
        const _reg = [];
        data.forEach(ville => {
          _reg[ville.id] = ville.libelle;
        });
        this.nomsVilles = _reg;
      },
      onCopy() {
        this.$notify({
          type: 'info',
          message: 'Copied to clipboard'
        })
      },
      handleClose(done) {
        this.$confirm('êtes vous sur de vouloir quitter?', {
          confirmButtonText: 'Oui',
          cancelButtonText: 'Non',
        })
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      cancelPaysForm() {
        this.steps.current === 0;
        this.$refs.create_pays_form.closeDrawer();
      },
      goBack(){
        if (this.steps.current > 0){
          this.steps.current -= 1;
        }
      },
      gotoNext(){
        if (this.steps.current === 0){
          if (this.new_ville.pays_id){
            this.steps.hasError = false;
            console.log('PAYS ID', this.new_ville.pays_id);
            this.new_village.ville_id = null;
            this.getPaysVilles(this.new_ville.pays_id);
            this.steps.current = 1;
          } else {
            Message({
              message: 'Veuillez choisir le pays avant de continuer',
              type: 'error',
              duration: 5 * 1000,
            });
            // this.steps.errorMessage = 'Veuillez selectionner ou Ajouter un pays';
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
          if (ville.pays.id === pays_id && !this.paysVilles.includes(ville)){
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
            this.paysCreating = true;
            paysResource
              .store(this.new_pays)
              .then(async(response) => {
                this.$message({
                  message: 'Pays' + ' ' + this.new_pays.libelle + ' ' + 'Creée avec success',
                  type: 'success',
                  duration: 5 * 1000,
                });
                await this.getPaysList();
                this.resetNewPays();
                this.new_ville.pays_id = response.data.id;
                this.gotoNext();
              })
              .finally(() => {
                this.paysCreating = false;
                this.createNewPays = false;
              });
          } else {
            console.log('Erreur !!');
            return false;
          }
        });
      },
      createVille() {
        this.$refs['villeForm'].validate((valid) => {
          if (valid) {
            this.villeCreating = true;
            villeResource
              .store(this.new_ville)
              .then(async (response) => {
                Message({
                  message: 'Ville' + ' ' + this.new_ville.libelle + ' ' + 'Crée avec succès',
                  type: 'success',
                  duration: 5 * 1000,
                });
                await this.getVilleList();
                this.getPaysVilles(this.new_ville.pays_id);
                this.resetNewVille();
                this.new_village.ville_id = response.data.id;
                this.gotoNext();
              })
              .finally(() => {
                this.villeCreating = false;
                this.createNewVille = false;
              });
          } else {
            console.log('Erreur !!');
            return false;
          }
        });
      },
      createVillage() {
        this.$refs['villageForm'].validate((valid) => {
          if (valid) {
            this.villageCreating = true;
            villageResource
              .store(this.new_village)
              .then((response) => {
                Message({
                  message: 'Village' + ' ' + this.new_village.libelle + ' ' + 'Crée avec succès',
                  type: 'success',
                  duration: 5 * 1000,
                });
                this.getVillagesList();
                this.resetNewVillage();
              })
              .finally(() => {
                this.villageCreating = false;
              });
          } else {
            console.log('Erreur !!');
            return false;
          }
        });
      },
      resetNewVillage(){
          this.new_village.nom = '';
          this.new_village.description = '';
      },
      resetNewVille(){
          this.new_ville.nom = '';
          this.new_ville.description = '';
      },
      resetNewPays(){
          this.new_pays.nom = '';
          this.new_pays.description = '';
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
.user-create-form {
  margin-top: 15px;
  padding: 35px;
  text-align: center;
}
.dialog-footer {
  text-align: left;
  padding-top: 0;
  margin-left: 150px;
}
.lev-button.is-circle {
  border-radius: 50%;
  padding: 12px;
}
.mb-15 {
  margin-bottom: 15px;
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
