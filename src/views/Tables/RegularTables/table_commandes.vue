<template>
    <b-card no-body>
        <b-card-header class="border-0">
          <b-row>
            <b-col class="col-9">
              <h3 class="mb-0">Demandes</h3>
            </b-col>
            <b-col class="col-3 text-right">
              <base-button v-if="checkPermission(['creer demande'])"  type="primary" size="sm" data-toggle="tooltip" data-original-title="Edit product" @click="ajoutDemande($event.target)" >
                <span class="btn-inner--icon"><i class="ni ni-bag-17"></i></span>
                <span class="btn-inner--text">Ajouter</span>
              </base-button>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="6">
              <b-row>
                <b-col cols="5">
                  <b-form-input size="sm" placeholder="recherche ..." style="margin-top: 10px"></b-form-input>
                </b-col>
                <b-col cols="5" >
                  <el-select
                    v-model="type_demande_id"
                    filterable
                    size="small"
                    @change="getDemandes"
                    allow-create
                    default-first-option
                    style="margin-top: 10px; width: 100%"
                    placeholder="Type">
                    <el-option
                      v-for="item in type_demandes"
                      :key="item.id"
                      :label="item.libelle"
                      :value="item.libelle">
                    </el-option>
                  </el-select>
                </b-col>
                <b-col >
                  <base-button style="margin-top: 10px;" @click="resetTypeDemande" size="sm" icon type="primary">
                    <span class="btn-inner--icon"><i class="ni ni-fat-remove"></i></span>
                  </base-button>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-card-header>
      <vue-element-loading :active="show" spinner="bar-fade-scale" color="#2dce94" />
        <el-table class="table-responsive table"
                  header-row-class-name="thead-light"
                  :data="demandes">
            <el-table-column label="Produits"
                             min-width="150px"
                             prop="name">
                <template v-slot="{row}">
                    <b-media no-body class="align-items-center">
                        <a href="#" class="avatar rounded-circle mr-3">
                          <img v-if="row.image" :src="row.image[0].lien" alt="image holder">
                          <img v-else alt="Image placeholder" src="img/theme/team-1.jpg">                        </a>
                    </b-media>
                </template>
            </el-table-column>

            <el-table-column label="Libelle"
                             prop="budget"
                             min-width="150px">
              <template v-slot="{row}">
                  <span class="status">{{row.libelle}}</span>
              </template>
            </el-table-column>

<!--            <el-table-column label="Description"-->
<!--                             min-width="400px"-->
<!--                             prop="description">-->
<!--                <template v-slot="{row}">-->
<!--                      <span class="status" v-html="row.description"></span>-->
<!--                </template>-->
<!--            </el-table-column>-->

            <el-table-column label="Quantite" min-width="150px">
              <template v-slot="{row}">
                <span class="status">{{row.quantite}} {{row.mesure}}</span>
              </template>
            </el-table-column>

            <el-table-column label="Date Livraison"
                             prop="completion"
                             min-width="150px">
              <template v-slot="{row}">
                <span class="status">{{row.date_livraison}}</span>
              </template>
            </el-table-column>

          <el-table-column label="Status"
                           min-width="100px"
                           prop="status">
            <template v-slot="{row}">
              <el-switch
                style="display: block"
                active-color="#13ce66"
                :width=40
                inactive-color="#ff4949"
                :active-value="true"
                :inactive-value="false"
                :value="row.is_active"
                @change="setActive(row.id,row.is_active, 'Offre')"
              />
            </template>
          </el-table-column>

          <el-table-column label="Action"
                           prop="completion"
                           min-width="250px">
            <template v-slot="{row}">
                <span class="table-action">
                  <router-link :to="'/store/demandes/detail/'+row.id" data-bs-toggle="tooltip" data-bs-original-title="Preview product">
                    <i class="fas fa-eye text-secondary" aria-hidden="true"></i>
                  </router-link>
                  <a href="javascript:;" v-if="checkPermission(['modifier demande'])" @click="modifierDemande($event.target, row.id)" class="mx-3" data-bs-toggle="tooltip" data-bs-original-title="Edit product">
                    <i class="fas fa-edit text-secondary" aria-hidden="true"></i>
                  </a>
                  <a href="javascript:;" v-if="checkPermission(['supprimer demande'])" data-bs-toggle="tooltip" data-bs-original-title="Delete product">
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
        id="modal-4"
        title="Faire une Demande"
        type="demandes"
        :action="action"
        :item="demande_id"
        @added="getDemandes"
      />

    </b-card>
</template>
<script>
import {Message, Table, TableColumn} from 'element-ui';
  import VueElementLoading from "vue-element-loading";
  import Resource from "../../../api/resource";
  import checkPermission from "../../../utils/permission";

  const typeDemandeResource = new Resource('typeDemandes');
  const demandeResource = new Resource('demandes');
  export default {
    name: 'table-commande',
    components: {
      [Table.name]: Table,
      [TableColumn.name]: TableColumn,
      VueElementLoading,
      AddModal: () => import('../../../components/Modals/addModal')
    },
    data() {
      return {
        demandes: [],
        demande_id: null,
        type_demandes: [],
        type_demande_id: '',
        action: 'ajout',
        currentPage: 1,
        show: false,
      };
    },
    created() {
      this.getDemandes();
      this.getTypeDemandes();
    },
    methods: {
      checkPermission,
      async setActive(id, active, type){
        let response;
        response = await demandeResource.get('toogle_active/' + id);
        if (response.success){
          if (active) {
            Message({
              message: type + " cloturé ",
              type: "success",
              duration: 5 * 1000
            });
          } else {
            Message({
              message: type + " activé ",
              type: "success",
              duration: 5 * 1000
            });
          }
          await this.getDemandes();
        }
        else {

          Message({
            message: "Erreur lors de l'operation' ",
            type: "error",
            duration: 5 * 1000
          });
        }
      },
      ajoutDemande(btn){
        // this.$bvModal.show('ajouter-offre');
        this.action = 'ajout';
        this.$root.$emit('bv::show::modal', "modal-4", btn)
      },
      async getTypeDemandes(){
        const {data} = await typeDemandeResource.list();
        this.type_demandes = data.filter((t_d)=> {
          return t_d.libelle !== 'demande_reponse';
        });
      },
      getDemandes(){
        this.show = true;
        const querry = {
          type_demande: this.type_demande_id,
        };
        demandeResource.list(querry)
        .then((response) => {
          this.demandes = response.data;
        })
        .finally(() => {
          this.show = false;
        })
      },
      resetTypeDemande(){
        this.type_demande_id = '';
        this.getDemandes();
      },
      modifierDemande(btn, id){
        // this.$bvModal.show('ajouter-offre');
        console.log('ROW ', id);
        this.demande_id = id;
        this.action = 'edit';
        this.$root.$emit('bv::show::modal', "modal-4", btn)
      },
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
  margin: 0 0.4499999999999993rem;
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
