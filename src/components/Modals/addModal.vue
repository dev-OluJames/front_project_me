<template>
  <div>
    <b-modal @ok="handleOk" ok-title="Ajouter" cancel-title="Annuler" size="xl" :id="id" :title="title">
      <vue-element-loading :active="show" spinner="bar-fade-scale" color="#2dce94" />
      <b-row>
        <b-col align-self="stretch">
          <vue-dropzone
            @vdropzone-file-added="setOption()"
            v-model="donnees.media"
            ref="myVueDropzone"
            id="dropzone"
            :options="dropzoneOptions"
          />
        </b-col>
        <b-col>
          <b-row>
            <b-col :cols="6">
              <h6>Produit</h6>
              <input type="text" class="form-control" id="prdt" placeholder="Produit" v-model="donnees.libelle">
            </b-col>
            <b-col :cols="6">
              <h6>Variete</h6>
              <base-input>
                <el-select v-model="donnees.variete_produit_id" @click="getVarieteList" filterable
                           placeholder="Variete" style="width: 100%">
                  <el-option v-if="type === 'offres'">
                    <base-button type="primary" style="width: 100%;border-radius: 0px" @click="createVariety=!createVariety">
                      <span class="btn-inner--icon"><i class="ni ni-fat-add"></i></span>
                    </base-button>
                  </el-option>
                  <el-option v-for="(option, index) in variete_list"
                             :key="index"
                             :label="option.nom"
                             :value="option.id">
                  </el-option>
                </el-select>
              </base-input>
            </b-col>
            <!-- b-col v-if="type === 'offres'">
              <base-button type="primary" class="lev-button is-circle" @click="createVariety=!createVariety">
                <span class="btn-inner--icon"><i class="ni ni-fat-add"></i></span>
              </base-button>
            </b-col-->
          </b-row>
          <b-row>
            <b-col v-if="type === 'offres'">
              <h6>Type d'offre</h6>
              <base-input>
                <el-select v-model="donnees.type_offre_id" @click="getTypeOffres" filterable
                           placeholder="Type Offre" style="width: 100%">
                  <el-option v-if="type === 'offres'">
                    <base-button type="primary" style="width: 100%;border-radius: 0px" @click="createToffre=!createToffre">
                      <span class="btn-inner--icon"><i class="ni ni-fat-add"></i></span>
                    </base-button>
                  </el-option>
                  <el-option v-for="(option, index) in type_offres"
                             :key="index"
                             :label="option.libelle"
                             :value="option.id">
                  </el-option>
                </el-select>
              </base-input>
            </b-col>
            <b-col v-else>
              <h6>Type demande</h6>
              <base-input>
                <el-select v-model="donnees.type_demande_id" @click="getTypedemandes" filterable
                           placeholder="Type demande" style="width: 100%">
                  <el-option>
                    <base-button type="primary" style="width: 100%;border-radius: 0px" @click="createTdemande=!createTdemande">
                      <span class="btn-inner--icon"><i class="ni ni-fat-add"></i></span>
                    </base-button>
                  </el-option>
                  <el-option v-for="(option, index) in type_demandes"
                             :key="index"
                             :label="option.libelle"
                             :value="option.id">
                  </el-option>
                </el-select>
              </base-input>
            </b-col>
            <b-col style="margin-bottom: 12px">
              <h6>Quantite</h6>
              <input type="number" class="form-control" id="qte" placeholder="Quantite" rows="2" v-model="donnees.quantite">
            </b-col>
            <b-col style="margin-bottom: 12px">
              <h6>Mesure</h6>
              <input type="texte" class="form-control" id="mesure" placeholder="Mesure " rows="2" v-model="donnees.mesure">
            </b-col>
          </b-row>
          <b-row v-if="type === 'offres'">
            <b-col style="margin-bottom: 12px">
              <h6>Prix Agriculteur</h6>
              <input type="number" class="form-control" id="prix_agri" placeholder="Prix Agriculteur" rows="2" v-model="donnees.prix_agriculteur">
            </b-col>
            <b-col style="margin-bottom: 12px">
              <h6>Prix Plateforme</h6>
              <input type="number" class="form-control" id="prix_plat" placeholder="Prix Plateforme" rows="2" v-model="donnees.prix_plateforme">
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="type === 'offres'"  style="margin-bottom: 12px">
              <h6>Date disponibilité</h6>
              <input type="date" class="form-control" id="date_dispo" placeholder="Date de disponibilité" rows="2" v-model="donnees.date_disponibilite">
            </b-col>
            <b-col v-else style="margin-bottom: 12px">
              <h6>Date livraison</h6>
              <input type="date" class="form-control" id="date_livraison" placeholder="Date de disponibilité" rows="2" v-model="donnees.date_livraison">
            </b-col>
            <b-col style="margin-bottom: 12px">
              <h6>Village</h6>
              <base-input>
                <el-select v-model="donnees.village_id" filterable
                           placeholder="Village" style="width: 100%">
                  <el-option v-for="(option, index) in villages"
                             :key="index"
                             :label="option.libelle"
                             :value="option.id">
                  </el-option>
                </el-select>
              </base-input>
              <!--            <input type="text" class="form-control" id="village" placeholder="Village" rows="2" v-model="donnees.village_id">-->
            </b-col>
          </b-row>
          <b-row>
            <b-col style="margin-bottom: 12px">
              <h6>Description</h6>
              <vue-editor :editor-toolbar="customToolbar" v-model="donnees.description" class="ql-toolbar" rowspan="3" />
              <!--        <textarea type="number" class="form-control" id="desc" placeholder="Description" v-model="donnees.description"></textarea>-->
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-modal>
    <modal :show.sync="createVariety">
      <vue-element-loading :active="showVariety" spinner="bar-fade-scale" color="#2dce94" />
      <h6 slot="header" class="modal-title">Ajout de variete</h6>

      <el-form ref="varieteForm" :rules="varietyRules" :model="new_variety" label-position="left">
        <el-form-item label="Variete" prop="nom">
          <el-input v-model="new_variety.nom" />
        </el-form-item>
        <el-select v-model="new_variety.produit_id" @click="getproduits" class="filter-item" placeholder="Produit" style="width: 80%; margin-right: 10px" prop="ville_id">
          <el-option
            v-for="(produit, idex) in produits"
            :key="idex"
            :label="produit.nom | uppercaseFirst"
            :value="produit.id"
            :disabled="!produit.is_active"
          />
        </el-select>
        <el-form-item label="Description" prop="description">
          <el-input v-model="new_variety.description" type="textarea" />
        </el-form-item>
      </el-form>
      <template slot="footer">
        <div style="text-align:right;padding-top:12px">
          <base-button plain type="danger" @click="createVariety=!createVariety">
            Annuler
          </base-button>
          <base-button type="primary" :loading="varietyCreating" @click="createNewVariety()">
            {{ varietyCreating ? "En cours" : "Ajouter" }}
          </base-button>
        </div>
<!--        <base-button type="primary">Ajouter</base-button>-->
<!--        <base-button type="link" class="ml-auto" @click="createVariety = false">Annuler</base-button>-->
      </template>

    </modal>
    <modal :show.sync="createToffre">
      <vue-element-loading :active="showToffre" spinner="bar-fade-scale" color="#2dce94" />
      <h6 slot="header" class="modal-title">Ajout de type d'Offre</h6>

      <el-form ref="toffreForm" :rules="toffreRules" :model="new_toffre" label-position="left">
        <el-form-item label="Type Offre" prop="libelle">
          <el-input v-model="new_toffre.libelle" />
        </el-form-item>
        <el-form-item label="Description" prop="description">
          <el-input v-model="new_toffre.description" type="textarea" />
        </el-form-item>
      </el-form>
      <template slot="footer">
        <div style="text-align:right;padding-top:12px">
          <base-button plain type="danger" @click="createToffre=!createToffre">
            Annuler
          </base-button>
          <base-button type="primary" :loading="toffreCreating" @click="createTypeOffre()">
            {{ toffreCreating ? "En cours" : "Ajouter" }}
          </base-button>
        </div>
<!--        <base-button type="primary">Ajouter</base-button>-->
<!--        <base-button type="link" class="ml-auto" @click="createVariety = false">Annuler</base-button>-->
      </template>

    </modal>
    <modal :show.sync="createTdemande">
      <vue-element-loading :active="showTdemande" spinner="bar-fade-scale" color="#2dce94" />
      <h6 slot="header" class="modal-title">Ajout de type de demande</h6>

      <el-form ref="tdemandeForm" :rules="tdemandeRules" :model="new_tdemande" label-position="left">
        <el-form-item label="Type demande" prop="libelle">
          <el-input v-model="new_tdemande.libelle" />
        </el-form-item>
        <el-form-item label="Description" prop="description">
          <el-input v-model="new_tdemande.description" type="textarea" />
        </el-form-item>
      </el-form>
      <template slot="footer">
        <div style="text-align:right;padding-top:12px">
          <base-button plain type="danger" @click="createTdemande=!createTdemande">
            Annuler
          </base-button>
          <base-button type="primary" :loading="tdemandeCreating" @click="createTypeDemande()">
            {{ tdemandeCreating ? "En cours" : "Ajouter" }}
          </base-button>
        </div>
<!--        <base-button type="primary">Ajouter</base-button>-->
<!--        <base-button type="link" class="ml-auto" @click="createVariety = false">Annuler</base-button>-->
      </template>

    </modal>
  </div>
</template>

<script>
import { mapState,mapActions } from 'vuex';
import vueDropzone from 'vue2-dropzone-vue3';
import Resource from "../../api/resource";
import {Message} from "element-ui";
import VueElementLoading from "vue-element-loading";
const offreResource = new Resource('offres');
const demandeResource = new Resource('demandes');
const produitResource = new Resource('produits');
const varieteResource = new Resource('varieteProduits');
const typeOffreResource = new Resource('typeOffres');
const typeDemandeResource = new Resource('typeDemandes');
const villageResource = new Resource('villages');

export default {
  name: 'AddModal',
  components: {
    vueDropzone,
    VueElementLoading
  },
  props: ['id', 'title', 'type'],
  data() {
    return {
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        maxFilesize: 256,
        maxFiles: 3,
        clickable: true,
        addRemoveLinks: true,
        headers: { "My-Awesome-Header": "header value" }
      },
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["image", "code-block"]
      ],
      donnees: {},
      produits: [],
      show: false,
      showVariety: false,
      showToffre: false,
      showTdemande: false,
      createVariety: false,
      createToffre: false,
      createTdemande: false,
      varietyCreating: false,
      toffreCreating: false,
      tdemandeCreating: false,
      variete_list: [],
      type_offres: [],
      type_demandes: [],
      villages: [],
      new_variety: {},
      new_toffre: {},
      new_tdemande: {},
      varietyRules: {
        nom: [{ required: true, message: 'Renseignez le nom de la Variete', trigger: 'blur' }],
        // description: [{ required: true, message: this.$t('region.DescriptionRequired'), trigger: 'blur' }],
      },
      toffreRules: {
        libelle: [{ required: true, message: 'Renseignez le nom du type d offre', trigger: 'blur' }],
        // description: [{ required: true, message: this.$t('region.DescriptionRequired'), trigger: 'blur' }],
      },
      tdemandeRules: {
        libelle: [{ required: true, message: 'Renseignez le nom du type de demande', trigger: 'blur' }],
        // description: [{ required: true, message: this.$t('region.DescriptionRequired'), trigger: 'blur' }],
      },
    }
  },
  computed: {
    ...mapState('auth', ['user']),
  },
  beforeMount() {
    this.getproduits();
    this.getvillages();
    this.getVarieteList();
    this.getTypeOffres();
    this.getTypeDemandes();
  },
  methods: {
    ...mapActions('comptes', ['addMemberCompte', 'updateMemberCompte']),

    handleOk(bvModalEvent) {
      this.donnees.user_id = this.$store.getters.userId;
      console.log('Ajouter ', this.donnees);
      bvModalEvent.preventDefault();
      this.show = true;
      if (this.type === 'offres'){
        offreResource.store(this.donnees)
          .then((response) => {
            Message({
              message: response.message,
              type: 'success',
              duration: 5 * 1000,
            });
          })
          .catch((error) => {
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000,
            });
          })
          .finally(() => {
            this.show = false;
            this.$nextTick(() => {
              this.$bvModal.hide(this.id);
            })
            console.log('DONE');
          });
      } else if (this.type === 'demandes'){
        demandeResource.store(this.donnees)
          .then((response) => {
            Message({
              message: response.message,
              type: 'success',
              duration: 5 * 1000,
            });
          })
          .catch((error) => {
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000,
            });
          })
          .finally(() => {
            this.show = false;
            this.$nextTick(() => {
              this.$bvModal.hide(this.id);
            })
            console.log('DONE');
          });
      } else {
        console.log('NON SUPPORTED');
      }
      console.log('MEDIAS ', this.$refs.myVueDropzone.dropzone.files);
    },
    async getproduits(){
      const { data } = await produitResource.list();
      this.produits = data;
    },
    async getvillages(){
      const { data } = await villageResource.list();
      this.villages = data;
      console.log('VILLAGES LIST', data);
    },
    setOption(){
      console.log('NOMBRE DE FILKE', this.$refs.myVueDropzone.dropzone.files.length);
      if(this.$refs.myVueDropzone.dropzone.files.length  === 3){
        this.dropzoneOptions.clickable = false;
        console.log('CLICKABLE',this.dropzoneOptions);
      }
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
    filterInt (value) {
      if (/^(-|\+)?(\d+|Infinity)$/.test(value))
        return Number(value);
      return NaN;
    },
    async getVarieteList(){
      const {data} = await varieteResource.list();
      this.variete_list = data;
    },
    async getTypeDemandes(){
      const {data} = await typeDemandeResource.list();
      this.type_demandes = data;
    },
    async getTypeOffres(){
      const {data} = await typeOffreResource.list();
      this.type_offres = data;
    },
    createNewVariety(){
      this.showVariety = true;
      console.log('VARIETE TO SEND', this.new_variety);
      varieteResource.store(this.new_variety)
      .then((response) => {
        console.log('RESPONSE DATA', response.data);
        this.getVarieteList();
        Message({
          message: 'Variete Rajouté avec Succès',
          type: 'success',
          duration: 5 * 1000,
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.showVariety = false;
        this.createVariety = false;
      });
    },
    createTypeOffre(){
      this.showToffre = true;
      console.log('VARIETE TO SEND', this.new_toffre);
      typeOffreResource.store(this.new_toffre)
      .then((response) => {
        console.log('RESPONSE DATA', response.data);
        this.getTypeOffres();
        Message({
          message: 'Type offre Rajouté avec Succès',
          type: 'success',
          duration: 5 * 1000,
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.showToffre = false;
        this.createToffre = false;
      });
    },
    createTypeDemande(){
      this.showTdemande = true;
      console.log('VARIETE TO SEND', this.new_tdemande);
      typeDemandeResource.store(this.new_tdemande)
      .then((response) => {
        console.log('RESPONSE DATA', response.data);
        this.getTypeDemandes();
        Message({
          message: 'Type demande Rajouté avec Succès',
          type: 'success',
          duration: 5 * 1000,
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.showTdemande = false;
        this.createTdemande = false;
      });
    },
  }
}
</script>
<style lang="css">
@import "~vue2-editor/dist/vue2-editor.css";

/* Import the Quill styles you want */
@import '~quill/dist/quill.core.css';
@import '~quill/dist/quill.bubble.css';
@import '~quill/dist/quill.snow.css';
.ql-toolbar {
  border-radius: 0.25rem 0.25rem 0 0;
  background-color: #fff
}
.lev-button.is-circle {
  border-radius: 50%;
  margin-top: 18px;
  padding: 12px;
}
</style>
