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
            <b-col align-self="baseline" :cols="type === 'offres' ? 5 : 6">
              <h6>Produit</h6>
              <input type="text" class="form-control" id="prdt" placeholder="Produit" v-model="donnees.libelle">
            </b-col>
            <b-col :cols="type === 'offres' ? 5 : 6">
              <h6>Variete</h6>
              <base-input>
                <el-select v-model="donnees.variete_produit_id" filterable
                           placeholder="Variete" style="width: 100%">
                  <el-option v-for="(option, index) in variete_list"
                             :key="index"
                             :label="option.nom"
                             :value="option.id">
                  </el-option>
                </el-select>
              </base-input>
            </b-col>
            <b-col v-if="type === 'offres'">
              <base-button type="primary" class="lev-button is-circle" @click="createVariety=!createVariety">
                <span class="btn-inner--icon"><i class="ni ni-fat-add"></i></span>
              </base-button>
            </b-col>
          </b-row>
          <b-row>
            <b-col align-self="baseline">
              <h6>Quantite</h6>
              <input type="number" class="form-control" id="qte" placeholder="Quantite" rows="2" v-model="donnees.quantite">
            </b-col>
            <b-col align-self="baseline">
              <h6>Mesure</h6>
              <input type="texte" class="form-control" id="mesure" placeholder="Mesure " rows="2" v-model="donnees.mesure">
            </b-col>
          </b-row>
          <b-row v-if="type === 'offres'">
            <b-col>
              <h6>Prix Agriculteur</h6>
              <input type="number" class="form-control" id="prix_agri" placeholder="Prix Agriculteur" rows="2" v-model="donnees.prix_agriculteur">
            </b-col>
            <b-col>
              <h6>Prix Plateforme</h6>
              <input type="number" class="form-control" id="prix_plat" placeholder="Prix Plateforme" rows="2" v-model="donnees.prix_plateforme">
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="type === 'offres'">
              <h6>Date disponibilité</h6>
              <input type="date" class="form-control" id="date_dispo" placeholder="Date de disponibilité" rows="2" v-model="donnees.date_disponibilite">
            </b-col>
            <b-col v-else>
              <h6>Date livraison</h6>
              <input type="date" class="form-control" id="date_livraison" placeholder="Date de disponibilité" rows="2" v-model="donnees.date_livraison">
            </b-col>
            <b-col>
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
            <b-col>
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
        <el-form-item label="Variete" prop="libelle">
          <el-input v-model="new_variety.nom" />
        </el-form-item>
        <el-select v-model="new_variety.produit_id" class="filter-item" placeholder="Produit" style="width: 80%; margin-right: 10px" prop="ville_id">
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
      createVariety: false,
      varietyCreating: false,
      variete_list: [],
      villages: [],
      new_variety: {},
      varietyRules: {
        libelle: [{ required: true, message: 'Renseignez le nom de la Variete', trigger: 'blur' }],
        // description: [{ required: true, message: this.$t('region.DescriptionRequired'), trigger: 'blur' }],
      },
    }
  },
  computed: {
    ...mapState('auth', ['user']),
  },
  created() {
    this.getproduits();
    this.getvillages();
    this.getVarieteList();
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
    }
  },
  beforeMount(){
    console.log('Mounting');
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
