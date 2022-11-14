<template>
    <b-card no-body>
        <b-card-header class="border-0">
          <b-row>
            <b-col class="col-9">
              <h3 class="mb-0">Offres</h3>
            </b-col>
            <b-col class="col-3 text-right">
              <!-- b-form-input size="sm" placeholder="recherche ..."></b-form-input-->
              <base-button icon size="sm" type="primary" @click="ajoutOffre($event.target)" ref="btnShow">
                <span class="btn-inner--icon"><i class="ni ni-basket"></i></span>
                <span class="btn-inner--text" style="font-size: 12px">Ajouter</span>
              </base-button>
            </b-col>
          </b-row>

          <b-row>
            <b-col cols="6">
              <b-row>
                <b-col cols="5">
                  <b-form-input size="sm" placeholder="recherche ..." style="margin-top: 10px"></b-form-input>
                </b-col>
                <b-col cols="5">
                  <el-select
                    v-model="type_offre_id"
                    filterable
                    size="small"
                    @change="getOffresList"
                    allow-create
                    default-first-option
                    style="margin-top: 10px; width: 100%"
                    placeholder="Type">
                    <el-option
                      v-for="item in type_offres"
                      :key="item.id"
                      :label="item.libelle"
                      :value="item.libelle">
                    </el-option>
                  </el-select>
                </b-col>
                <b-col cols="2">
                  <div>
                    <base-button style="margin-top: 10px;" @click="resetTypeOffre" size="sm" icon type="primary">
                      <span class="btn-inner--icon"><i class="ni ni-fat-remove"></i></span>
                    </base-button>
                  </div>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-card-header>
      <vue-element-loading :active="show" spinner="bar-fade-scale" color="#2dce94" />
      <el-table class="table-responsive table"
                  header-row-class-name="thead-light"
                  :data="offres">
            <el-table-column label="Produits"
                             min-width="150px"
                             prop="name">
                <template v-slot="{row}">
                    <b-media no-body class="align-items-center">
                        <a href="#" class="avatar rounded-circle mr-3">
                          <img v-if="row.image" :src="row.image[0].lien" alt="image holder">
                          <img v-else alt="Image placeholder" src="img/theme/team-1.jpg">
                        </a>
                    </b-media>
                </template>
            </el-table-column>

            <el-table-column label="Libelle"
                             prop="budget"
                             min-width="200px">
              <template v-slot="{row}">
                  <span class="status">{{row.libelle}}</span>
              </template>
            </el-table-column>

            <el-table-column label="Qtte" min-width="90px">
              <template v-slot="{row}">
                <span class="status">{{row.quantite}}</span>
              </template>
            </el-table-column>

            <el-table-column label="Prix Agriculteur"
                             prop="completion"
                             min-width="180px">
              <template v-slot="{row}">
                <span class="status">{{row.prix_agriculteur}}</span>
              </template>
            </el-table-column>

            <el-table-column label="Prix plateforme"
                             prop="completion"
                             min-width="230px">
              <template v-slot="{row}">
                <span v-if="row.prix_plateforme !== null && row.prix_plateforme !== 0" class="status">{{row.prix_plateforme}}</span>
                <span v-else class="status">
                  <span  v-if="!row.edit">
                  <el-tag type="danger" @click="row.edit = true">Ajouter</el-tag>
                  </span>
                <span v-else>
                  <b-row>
                    <b-col>
                      <el-input-number
                        :controls="false"
                        style="width: 135%"
                        :value="row.prix_plateforme"
                        v-model="prix_plateforme"
                        size="small"
                      />
                    </b-col>
                    <b-col>
                      <span>
                        <button class="btn btn-success btn-sm"
                                @click="editRow(row)">
                          <i class="el-icon-check"></i>
                        </button>
                      </span>
                      <span>
                        <button class="btn btn-neutral btn-sm"
                                @click="row.edit=false">
                          <i class="el-icon-close"></i>
                        </button>
                      </span>
                    </b-col>
                  </b-row>
                </span>
                </span>
              </template>
            </el-table-column>

          <el-table-column label="Status"
                           min-width="110px"
                           prop="status">
              <template v-slot="{row}">
                <el-switch
                  style="display: block"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="true"
                  :inactive-value="false"
                  :value="!row.brouillon"
                  @change="setActive(row,row.brouillon, 'Offre')"
                />
              </template>
          </el-table-column>
          <el-table-column label="Action"
                           prop="completion"
                           min-width="150px">
            <template v-slot="{row}">
                <span class="text-sm">
                  <router-link :to="'/store/offres/detail/'+row.id" data-bs-toggle="tooltip" data-bs-original-title="Preview product">
                    <i class="fas fa-eye text-secondary" aria-hidden="true"></i>
                  </router-link>
                  <a href="javascript:;" v-if="checkPermission(['modifier offre'])" @click="modifierOffre($event.target, row.id)" class="mx-3" data-bs-toggle="tooltip" data-bs-original-title="Edit product">
                    <i class="fas fa-edit text-secondary" aria-hidden="true"></i>
                  </a>
                  <a href="javascript:;" v-if="checkPermission(['supprimer offre'])" data-bs-toggle="tooltip" data-bs-original-title="Delete product">
                    <i class="fas fa-trash text-secondary" aria-hidden="true"></i>
                  </a>
                </span>
            </template>
          </el-table-column>

        </el-table>

        <b-card-footer class="py-4 d-flex justify-content-end">
            <base-pagination v-model="currentPage" :per-page="10" :total="50"></base-pagination>
        </b-card-footer>
      <AddModal
        id="modal-3"
        title="Ajouter une Offre"
        type="offres"
        :item="offre_id"
        :action="action"
        @added="getOffresList"
      />
    </b-card>
</template>
<script>
  import projects from './../projects';
  import {Message, Table, TableColumn} from 'element-ui';
  import VueElementLoading from "vue-element-loading";
  import Resource from "../../../api/resource";
  import checkPermission from "../../../utils/permission";

  const typeOffreResource = new Resource('typeOffres');
  const offreResource = new Resource('offres');
  export default {
    name: 'table-offres',
    components: {
      [Table.name]: Table,
      [TableColumn.name]: TableColumn,
      VueElementLoading,
      AddModal: () => import('../../../components/Modals/addModal'),
    },
    data() {
      return {
        projects,
        currentPage: 1,
        show: false,
        offres: [],
        offre: {},
        offre_id: {},
        type_offres: [],
        type_offre_id: '',
        add_prix_plateforme: false,
        prix_plateforme: null,
        action: 'ajout'
      };
    },
    created() {
      this.getOffresList();
      this.getTypeOffres();
    },
    methods: {
      checkPermission,
      editRow(offre){
        if(this.prix_plateforme){

          offre.prix_plateforme =  this.prix_plateforme;
          console.log('ROW RETURNED', offre);
          const querry = {};
          querry.libelle = offre.libelle;
          querry.description = offre.description;
          querry.quantite = offre.quantite;
          querry.mesure = offre.mesure;
          querry.prix_agriculteur = offre.prix_agriculteur;
          querry.prix_plateforme = offre.prix_plateforme;
          querry.date_disponibilite = offre.date_disponibilite;
          querry.user_id = offre.user_id;
          querry.village_id = offre.village.id;
          querry.variete_produit_id = offre.variete_produit.id;
          querry.user_id = this.$store.getters.userId;
          querry.type_offre_id = offre.type_offre.id;
          offreResource.update(offre.id, querry)
          .then((response) =>{
            console.log(response);
            Message({
              message: response.message,
              type: 'success',
              duration: 5 * 1000
            });
            this.add_prix_plateforme = false;
          })
          .catch((error)=>{
            console.log(error);
            this.prix_plateforme = null;
            offre.prix_plateforme = null;
          });
        }
        else

          Message({
            message: 'veuillez renseigner le prix',
            type: 'warning',
            duration: 5 * 1000
          });
      },
      resetTypeOffre(){
        this.type_offre_id = '';
        this.getOffresList();
      },
      async setActive(offre, active, type){
        let response;
        if (offre.prix_plateforme !== null && offre.prix_plateforme !== 0){
          response = await offreResource.get('toogle_brouillon/' + offre.id);
          if (response.success){
            if (!active) {
              Message({
                message: type + " desactivé ",
                type: "success",
                duration: 5 * 1000
              });
            } else {
              Message({
                message: type + " ouvert ",
                type: "success",
                duration: 5 * 1000
              });
            }
            await this.getOffresList();
          }
          else {

            Message({
              message: "Erreur lors de l'operation' ",
              type: "error",
              duration: 5 * 1000
            });
          }
          offre.edit = true;
        } else {
          Message({
            message: 'Veuillez renseigner le prix de la plateforme',
            type: "warning",
            duration: 5 * 1000,
          })
          this.add_prix_plateforme = true;
        }
      },
      ajoutOffre(btn){
        // this.$bvModal.show('ajouter-offre');
        this.action = 'ajout';
        this.offre_id= null;
        this.$root.$emit('bv::show::modal', "modal-3", btn)
      },
      async getTypeOffres(){
        const {data} = await typeOffreResource.list();
        this.type_offres = data.filter((t_o)=> {
          return t_o.libelle !== 'offre_reponse';
        });
      },
      modifierOffre(btn, id){
        // this.$bvModal.show('ajouter-offre');
        console.log('ROW ', id);
        this.offre_id = id;
        this.action = 'edit';
        this.$root.$emit('bv::show::modal', "modal-3", btn)
      },
      getOffresList(){
        this.show = true;
        const querry = {
          type_offre: this.type_offre_id,
          brouillon: true,
        }
        offreResource.list(querry)
        .then((respone) => {
          const items = respone.data;
          console.log('OFRES', respone.data);
          this.offres = items.map(v => {
            this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
            return v
          });
        })
        .finally(() => {
          this.show = false;
        });
      }
    }
  }
</script>

<style lang="scss">
.text-secondary {
  color: #8392ab!important;
}
.table-action {
  font-size: .875rem;
  color: #adb5bd;
  margin: 0 -0.55rem;
}

a, a:hover {
  text-decoration: none;
}
a {
  color: #5e72e4;
  background-color: transparent;
}
.fa, .fas {
  font-weight: 900;
  font-size: 14px;
}
</style>
