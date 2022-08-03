<template>
  <b-modal @ok="handleOk" ok-title="Ajouter" cancel-title="Annuler" size="xl" :id="id" :title="title">
    <vue-element-loading :active="show" spinner="bar-fade-scale" color="#2dce94" />
    <b-row>
      <b-col align-self="stretch">
        <vue-dropzone
          @vdropzone-file-added="setOption()"
          v-model="offres.media"
          ref="myVueDropzone"
          id="dropzone"
          :options="dropzoneOptions"
        />
      </b-col>
      <b-col>
        <b-row>
          <b-col align-self="baseline">
            <h6>Produit</h6>
            <input type="text" class="form-control" id="prdt" placeholder="Produit" v-model="offres.libelle">
          </b-col>
          <b-col>
            <h6>Variete</h6>
            <base-input>
              <el-select v-model="offres.variete_produit_id" filterable
                         placeholder="Variete">
                <el-option v-for="(option, index) in varietes"
                           :key="index"
                           :label="option.label"
                           :value="option.id">
                </el-option>
              </el-select>
            </base-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col align-self="baseline">
            <h6>Quantite</h6>
            <input type="number" class="form-control" id="qte" placeholder="Quantite" rows="2" v-model="offres.quantite">
          </b-col>
          <b-col align-self="baseline">
            <h6>Mesure</h6>
            <input type="texte" class="form-control" id="mesure" placeholder="Mesure " rows="2" v-model="offres.mesure">
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <h6>Prix Agriculteur</h6>
            <input type="number" class="form-control" id="prix_agri" placeholder="Prix Agriculteur" rows="2" v-model="offres.prix_agriculteur">
          </b-col>
          <b-col>
            <h6>Prix Plateforme</h6>
            <input type="number" class="form-control" id="prix_plat" placeholder="Prix Plateforme" rows="2" v-model="offres.prix_plateforme">
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <h6>Date disponibilité</h6>
            <input type="date" class="form-control" id="date_dispo" placeholder="Date de disponibilité" rows="2" v-model="offres.date_disponibilite">
          </b-col>
          <b-col>
            <h6>Village</h6>
            <base-input>
              <el-select v-model="offres.village_id" filterable
                         placeholder="Village">
                <el-option v-for="(option, index) in villages"
                           :key="index"
                           :label="option.label"
                           :value="option.id">
                </el-option>
              </el-select>
            </base-input>
<!--            <input type="text" class="form-control" id="village" placeholder="Village" rows="2" v-model="offres.village_id">-->
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <h6>Description</h6>
            <vue-editor :editor-toolbar="customToolbar" v-model="offres.description" class="ql-toolbar" rowspan="3" />
            <!--        <textarea type="number" class="form-control" id="desc" placeholder="Description" v-model="offres.description"></textarea>-->
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-modal>
</template>

<script>
import { mapState,mapActions } from 'vuex';
import vueDropzone from 'vue2-dropzone-vue3';
import Resource from "../../api/resource";
import {Message} from "element-ui";
import VueElementLoading from "vue-element-loading";
const offreResource = new Resource('offres');

export default {
  name: 'AddModal',
  components: {
    vueDropzone,
    VueElementLoading
  },
  props: ['id', 'title'],
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
      offres: {},
      show: false,
      varietes: [
        { id: 0, label: 'Ananas' },
        { id: 1, label: 'Soja' },
        { id: 2, label: 'mais' },
        { id: 3, label: 'mangue' },
      ],
      villages: [
        { id: 0, label: 'djarkpanga' },
        { id: 1, label: 'sotouboua' },
        { id: 2, label: 'kpalime' },
        { id: 3, label: 'kohe' },
      ]
    }
  },
  computed: {
    ...mapState('auth', ['user']),
  },
  methods: {
    ...mapActions('comptes', ['addMemberCompte', 'updateMemberCompte']),

    handleOk(bvModalEvent) {
      this.offres.user_id = this.$store.getters.userId;
      this.offres.is_visible = true;
      this.offres.is_active = true;
      console.log('Ajouter ', this.offres);
      bvModalEvent.preventDefault();
      this.show = true;
      offreResource.store(this.offres)
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
      })
      console.log('MEDIAS ', this.$refs.myVueDropzone.dropzone.files);
    },
    setOption(){
      console.log('NOMBRE DE FILKE', this.$refs.myVueDropzone.dropzone.files.length);
      if(this.$refs.myVueDropzone.dropzone.files.length  === 3){
        this.dropzoneOptions.clickable = false;
        console.log('CLICKABLE',this.dropzoneOptions);
      }
    },
    filterInt (value) {
      if (/^(-|\+)?(\d+|Infinity)$/.test(value))
        return Number(value);
      return NaN;
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
</style>
