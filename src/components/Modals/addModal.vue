<template>
  <div>
    <b-modal @change="setData" @ok="handleOk" @hidden="resetDonnee" :ok-title="action ==='ajout' ? 'Ajouter' : 'Modifier'" cancel-title="Annuler" size="xl" :id="id" :title="title">
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
          <img v-if="donnees.image" :src="donnees.image[0].lien" alt="">
        </b-col>
        <b-col>
          <b-row>
            <b-col>
              <h6>Libelle</h6>
              <input type="text" class="form-control" id="libelle" placeholder="Libelle" v-model="donnees.libelle" style="margin-bottom: 10px">
            </b-col>
          </b-row>
          <b-row>
            <b-col :cols="6">
              <h6>Produit</h6>
              <el-select v-if="action === 'ajout'" v-model="produit_id" @click="getproduits" @change="getProduitVarietes" filterable
                         placeholder="Produit" style="width: 100%">
                <el-option value>
                  <base-button type="primary" icon style="width: 100%;border-radius: 0px" @click="createProduit=!createProduit">
                    Ajouter
                  </base-button>
                </el-option>
                <el-option v-for="(option, index) in produits"
                           :key="index"
                           :label="option.nom"
                           :value="option.id">
                </el-option>
              </el-select>
              <el-select v-else v-model="produit_id" @click="getproduits" @change="getProduitVarietes" filterable
                         placeholder="Produit" style="width: 100%">
                <el-option value>
                  <base-button type="primary" icon style="width: 100%;border-radius: 0px" @click="createProduit=!createProduit">
                    Ajouter
                  </base-button>
                </el-option>
                <el-option v-for="(option, index) in produits"
                           :key="index"
                           :label="option.nom"
                           :value="option.id">
                </el-option>
              </el-select>
            </b-col>
            <b-col :cols="6">
              <h6>Variete</h6>
              <base-input>
                <el-select v-if="action === 'ajout'" v-model="donnees.variete_produit_id" @click="getVarieteList" filterable
                           placeholder="Variete" style="width: 100%">
                  <el-option value>
                    <base-button type="primary" icon style="width: 100%;border-radius: 0px" @click="createVariety=!createVariety">
                      Ajouter
                    </base-button>
                  </el-option>
                  <el-option v-for="(option, index) in variete_list"
                             :key="index"
                             :label="option.nom"
                             :value="option.id">
                  </el-option>
                </el-select>
                <el-select v-else v-model="donnees.variete_produit_id" @click="getVarieteList" filterable
                           placeholder="Variete" style="width: 100%">
                  <el-option value>
                    <base-button type="primary" icon style="width: 100%;border-radius: 0px" @click="createVariety=!createVariety">
                      Ajouter
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
          </b-row>
          <b-row>
            <b-col v-if="type === 'offres'">
              <h6>Type d'offre</h6>
              <base-input>
                <el-select v-if="action === 'ajout'" v-model="donnees.type_offre_id" @click="getTypeOffres" filterable
                           placeholder="Type Offre" style="width: 100%">
                  <!-- el-option v-if="type === 'offres'" value>
                    <base-button type="primary" style="width: 100%;border-radius: 0px" @click="createToffre=!createToffre">
                      Ajouter
                    </base-button>
                  </el-option-->
                  <el-option v-for="(option, index) in type_offres"
                             :key="index"
                             :label="option.libelle"
                             :value="option.id">
                  </el-option>
                </el-select>
                <el-select v-else v-model="donnees.type_offre_id" @click="getTypeOffres" filterable
                           placeholder="Type Offre" style="width: 100%">
                  <!-- el-option v-if="type === 'offres'" value>
                    <base-button type="primary" style="width: 100%;border-radius: 0px" @click="createToffre=!createToffre">
                      Ajouter
                    </base-button>
                  </el-option-->
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
                <el-select v-if="action === 'ajout'" v-model="donnees.type_demande_id" @click="getTypeDemandes" filterable
                           placeholder="Type demande" style="width: 100%">
                  <!--el-option value>
                    <base-button type="primary" style="width: 100%;border-radius: 0px" @click="createTdemande=!createTdemande">
                      Ajouter
                    </base-button>
                  </el-option-->
                  <el-option v-for="(option, index) in type_demandes"
                             :key="index"
                             :label="option.libelle"
                             :value="option.id">
                  </el-option>
                </el-select>
                <el-select v-else v-model="donnees.type_demande_id" @click="getTypeDemandes" filterable
                           placeholder="Type demande" style="width: 100%">
                  <!--el-option value>
                    <base-button type="primary" style="width: 100%;border-radius: 0px" @click="createTdemande=!createTdemande">
                      Ajouter
                    </base-button>
                  </el-option-->
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
              <el-select v-model="donnees.mesure" @click="getMesures" filterable
                         placeholder="Mesure" style="width: 100%">
                <!--el-option value>
                  <base-button type="primary" style="width: 100%;border-radius: 0px" @click="createTdemande=!createTdemande">
                    Ajouter
                  </base-button>
                </el-option-->
                <el-option v-for="(option, index) in mesures"
                           :key="index"
                           :label="option.abreviation"
                           :value="option.abreviation">
                </el-option>
              </el-select>
<!--              <input type="texte" class="form-control" id="mesure" placeholder="Mesure " rows="2" v-model="donnees.mesure">-->
            </b-col>
          </b-row>
          <b-row v-if="type === 'offres'">
            <b-col style="margin-bottom: 12px">
              <h6>Prix Agriculteur</h6>
              <input type="number" class="form-control" id="prix_agri" placeholder="Prix Agriculteur" rows="2" v-model="donnees.prix_agriculteur">
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="type === 'offres'"  style="margin-bottom: 12px">
              <h6>Date disponibilit??</h6>
              <input type="date" class="form-control" id="date_dispo" placeholder="Date de disponibilit??" rows="2" v-model="donnees.date_disponibilite">
            </b-col>
            <b-col v-else style="margin-bottom: 12px">
              <h6>Date livraison</h6>
              <input type="date" class="form-control" id="date_livraison" placeholder="Date de livraison" rows="2" v-model="donnees.date_livraison">
            </b-col>
            <b-col style="margin-bottom: 12px">
              <h6>Village</h6>
              <base-input>
                <el-select v-if="action === 'ajout'" v-model="donnees.village_id" filterable
                           placeholder="Village" style="width: 100%">
                  <el-option v-for="(option, index) in villages"
                             :key="index"
                             :label="option.libelle"
                             :value="option.id">
                  </el-option>
                </el-select>
                <el-select v-else v-model="donnees.village_id" filterable
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
<!--              <textarea type="number" class="form-control" id="desc" placeholder="Description" v-model="donnees.description"></textarea>-->
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-modal>
    <modal :show.sync="createProduit">
      <vue-element-loading :active="showProduit" spinner="bar-fade-scale" color="#2dce94" />
      <h6 slot="header" class="modal-title">Ajout de Produit</h6>

      <el-form ref="produitForm" :rules="produitRules" :model="new_produit" label-position="left">
        <el-form-item label="Produit" prop="nom">
          <el-input v-model="new_produit.nom" />
        </el-form-item>
        <el-form-item label="Description" prop="description">
          <el-input v-model="new_produit.description" type="textarea" />
        </el-form-item>
      </el-form>
      <template slot="footer">
        <div style="text-align:right;padding-top:12px">
          <base-button plain type="danger" @click="createProduit=!createProduit">
            Annuler
          </base-button>
          <base-button type="primary" :loading="produitCreating" @click="createNewProduit()">
            {{ produitCreating ? "En cours" : "Ajouter" }}
          </base-button>
        </div>
<!--        <base-button type="primary">Ajouter</base-button>-->
<!--        <base-button type="link" class="ml-auto" @click="createProduit = false">Annuler</base-button>-->
      </template>

    </modal>
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
            :label="produit.nom"
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
import {isLogged} from "../../utils/auth";
import Vue from "vue";
const offreResource = new Resource('offres');
const demandeResource = new Resource('demandes');
const produitResource = new Resource('produits');
const varieteResource = new Resource('varieteProduits');
const typeOffreResource = new Resource('typeOffres');
const typeDemandeResource = new Resource('typeDemandes');
const villageResource = new Resource('villages');
const imageResource = new Resource('images');

export default {
  name: 'AddModal',
  components: {
    vueDropzone,
    VueElementLoading
  },
  props: {'id':{type: String}, 'title': {type: String}, 'type':{type: String}, 'item': {type: Number}, 'action': {type: String, default: 'ajout'}},
  data() {
    return {
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        maxFilesize: 512,
        maxFiles: 3,
        clickable: true,
        addRemoveLinks: true,
        headers: { 'Content-Type': 'multipart/form-data' }
      },
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["image", "code-block"]
      ],
      donnees: {},
      mesures: [],
      produits: [],
      show: false,
      showVariety: false,
      showProduit: false,
      showToffre: false,
      showTdemande: false,
      createVariety: false,
      createProduit: false,
      createToffre: false,
      createTdemande: false,
      varietyCreating: false,
      produitCreating: false,
      toffreCreating: false,
      tdemandeCreating: false,
      variete_list: [],
      type_offres: [],
      type_demandes: [],
      villages: [],
      new_variety: {},
      new_produit: {},
      new_toffre: {},
      new_tdemande: {},
      produit_id: null,
      produitRules: {
        nom: [{ required: true, message: 'Renseignez le nom du Produit', trigger: 'blur' }],
        // description: [{ required: true, message: this.$t('region.DescriptionRequired'), trigger: 'blur' }],
      },
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
      authenticated: isLogged(),
    }
  },
  computed: {
    ...mapState('auth', ['user']),
  },
  beforeMount() {
    if (this.authenticated){
      this.getproduits();
      this.getvillages();
      this.getVarieteList();
      this.getTypeOffres();
      this.getTypeDemandes();
      this.getMesures();
    }
  },
  methods: {
    ...mapActions('comptes', ['addMemberCompte', 'updateMemberCompte']),
    resetDonnee(){
      this.donnees = {};
    },
    async setData(){
      if (this.action !== 'ajout'){
        if (this.type === 'demandes'){
          const {data} = await demandeResource.get(this.item);
          this.donnees = data;
          const date = this.donnees.date_livraison;
          const jr  = date.split('-')[0];
          const moi = date.split('-')[1];
          const annee = date.split('-')[2];
          this.donnees.date_livraison = [annee, moi, jr].join('-');
          this.donnees.type_demande_id = this.donnees.type_demande.id;
        } else if (this.type === 'offres'){
          const {data} = await offreResource.get(this.item);
          this.donnees = data;
          const date = this.donnees.date_disponibilite;
          const jr  = date.split('-')[0];
          const moi = date.split('-')[1];
          const annee = date.split('-')[2];
          this.donnees.date_disponibilite = [annee, moi, jr].join('-');
          this.donnees.type_offre_id = this.donnees.type_offre.id;
        }
        this.produit_id = this.donnees.variete_produit.produit_id;
        this.donnees.variete_produit_id = this.donnees.variete_produit.id;
        this.donnees.village_id = this.donnees.village.id;
      } else {
        this.donnees = {};
        this.produit_id = null;
      }
      console.log('DONNEEE ', this.type, this.donnees);
    },
    uploadImage(){
      console.log('FILE', this.$refs.myVueDropzone.dropzone.files[0]);
      const fd = new FormData();
      fd.append('fichier', this.$refs.myVueDropzone.dropzone.files[0], this.$refs.myVueDropzone.dropzone.files[0].upload.filename)
      fd.append('type', 'offre');
      // fd.append('id',1);
      // const resource = {
      //   'fichier': this.$refs.myVueDropzone.dropzone.files[0],
      //   'type': 'offre',
      //   'id': 1
      // }
      imageResource.store(fd)
        .then((response) =>{
          console.log(response);
        })
    },
    async getMesures(){
      const { data } = await new Resource('mesures').list();
      this.mesures = data;
      console.log('THIS MESURES', this.mesures);
    },
    handleOk(bvModalEvent) {
      if (this.action === 'ajout') {
        this.donnees.user_id = this.$store.getters.userId;
        this.donnees.quantite = parseInt(this.donnees.quantite);
        console.log('Ajouter ', this.donnees);
        bvModalEvent.preventDefault();
        this.show = true;
        if (this.type === 'offres'){
          offreResource.store(this.donnees)
            .then((response) => {
              if(this.$refs.myVueDropzone.dropzone.files.length > 0){
                this.saveImage(response.data.id, 'offre');
              }
              Message({
                message: response.message,
                type: 'success',
                duration: 5 * 1000,
              });
            })
            .catch((error) => {
              console.log('OUI IL YA ERREUR', error);
              Message({
                message: error,
                type: 'error',
                duration: 5 * 1000,
              });
            })
            .finally(() => {
              this.show = false;
              this.$emit('added');
              this.$nextTick(() => {
                this.$bvModal.hide(this.id);
              })
              console.log('DONE');
            });
        } else if (this.type === 'demandes'){
          demandeResource.store(this.donnees)
            .then((response) => {
              if(this.$refs.myVueDropzone.dropzone.files.length > 0){
                this.saveImage(response.data.id, 'demande');
              }
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
              this.$emit('added');
              this.$nextTick(() => {
                this.$bvModal.hide(this.id);
              })
              console.log('DONE');
            });
        } else {
          console.log('NON SUPPORTED');
        }
        console.log('MEDIAS ', this.$refs.myVueDropzone.dropzone.files);
      } else {
        bvModalEvent.preventDefault();
        this.show = true;
        if (this.type === 'offres'){
          this.donnees.user_id = this.$store.getters.userId;
          const querry = {};
          querry.libelle = this.donnees.libelle;
          querry.description = this.donnees.description;
          querry.quantite = this.donnees.quantite;
          querry.mesure = this.donnees.mesure;
          querry.prix_agriculteur = this.donnees.prix_agriculteur;
          querry.prix_plateforme = this.donnees.prix_plateforme;
          querry.date_disponibilite = this.donnees.date_disponibilite;
          querry.user_id = this.donnees.user_id;
          querry.village_id = this.donnees.village_id;
          querry.variete_produit_id = this.donnees.variete_produit_id;
          querry.type_offre_id = this.donnees.type_offre_id;
          console.log('Editer ', querry);
          offreResource.update(this.donnees.id, querry)
            .then((response) => {
              if(this.$refs.myVueDropzone.dropzone.files.length > 0){
                this.saveImage(response.data.id, 'offre');
              }
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
              this.$emit('added');
              this.$nextTick(() => {
                this.$bvModal.hide(this.id);
              })
              console.log('DONE');
              this.donnees = {};
            });
        } else if (this.type === 'demandes'){
          this.donnees.user_id = this.$store.getters.userId;
          const querry = {};
          querry.libelle = this.donnees.libelle;
          querry.description = this.donnees.description;
          querry.quantite = this.donnees.quantite;
          querry.mesure = this.donnees.mesure;
          querry.date_livraison = this.donnees.date_livraison;
          querry.user_id = this.donnees.user_id;
          querry.village_id = this.donnees.village_id;
          querry.variete_produit_id = this.donnees.variete_produit_id;
          querry.type_demande_id = this.donnees.type_demande_id;
          demandeResource.update(this.donnees.id, querry)
            .then((response) => {
              if(this.$refs.myVueDropzone.dropzone.files.length > 0){
                this.saveImage(response.data.id, 'demande');
              }
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
              this.$emit('added');
              this.$nextTick(() => {
                this.$bvModal.hide(this.id);
              })
              console.log('DONE');
              this.donnees = {};
            });
        } else {
          console.log('NON SUPPORTED');
        }
        console.log('MEDIAS ', this.$refs.myVueDropzone.dropzone.files);
      }
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
      this.$confirm('??tes vous sur de vouloir quitter?', {
        confirmButtonText: 'Oui',
        cancelButtonText: 'Non',
      })
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    saveImage(id, type){
      const fd = new FormData();
      fd.append('fichier', this.$refs.myVueDropzone.dropzone.files[0], this.$refs.myVueDropzone.dropzone.files[0].upload.filename)
      fd.append('type', type);
      fd.append('id',id);
      console.log("FORM DATA OTAINED ", fd, this.donnees.image);
      if (this.donnees.image){
        imageResource.destroy(this.donnees.image[0].id)
          .then((response) =>{
            console.log(response);
          });
      }
      imageResource.store(fd)
        .then((response) =>{
          console.log(response);
          Message({
            message: 'Image success',
            type: 'success',
            duration: 5 * 1000
          });
        });
    },
    filterInt (value) {
      if (/^(-|\+)?(\d+|Infinity)$/.test(value))
        return Number(value);
      return NaN;
    },
    async getVarieteList(){
      const query = {
        produit_id: this.produit_id,
      };

      const {data} = await varieteResource.list(query);
      // const {data} = await produitResource.get(this.produit_id+'/varietes');
      this.variete_list = data;
    },
    async getProduitVarietes(){
      const {data} = await produitResource.get(this.produit_id + '/varietes');
      this.variete_list = data;
    },
    async getTypeDemandes(){
      const {data} = await typeDemandeResource.list();
      this.type_demandes = data.filter((t_demande) => {
        return t_demande.libelle !== 'demande_reponse';
      });
    },
    async getTypeOffres(){
      const {data} = await typeOffreResource.list();
      this.type_offres = data.filter((t_offre) => {
        return t_offre.libelle !== 'offre_reponse';
      });
    },
    createNewVariety(){
      this.showVariety = true;
      console.log('VARIETE TO SEND', this.new_variety);
      varieteResource.store(this.new_variety)
      .then((response) => {
        console.log('RESPONSE DATA', response.data);
        this.getVarieteList();
        Message({
          message: 'Variete Rajout?? avec Succ??s',
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
    createNewProduit(){
      this.showProduit = true;
      console.log('VARIETE TO SEND', this.new_produit);
      produitResource.store(this.new_produit)
      .then((response) => {
        console.log('RESPONSE DATA', response.data);
        this.getVarieteList();
        Message({
          message: 'Produit Rajout?? avec Succ??s',
          type: 'success',
          duration: 5 * 1000,
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.showProduit = false;
        this.createProduit = false;
        this.getproduits();
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
          message: 'Type offre Rajout?? avec Succ??s',
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
          message: 'Type demande Rajout?? avec Succ??s',
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
    dataURItoBlob(dataurl) {
      var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while(n--){
        u8arr[n] = bstr.charCodeAt(n);
      }
      console.log('BLOB', new Blob([u8arr], {type:mime}));
      return new Blob([u8arr], {type:mime});

    }
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
