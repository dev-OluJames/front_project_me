<template>
    <b-card no-body>
        <b-card-header class="border-0">
          <b-row>
            <b-col class="col-9">
              <h3 class="mb-0">Demandes</h3>
            </b-col>
            <b-col class="col-3 text-right">
              <base-button type="primary" size="sm" data-toggle="tooltip" data-original-title="Edit product" @click="ajoutDemande($event.target)" >
                <span class="btn-inner--icon"><i class="ni ni-bag-17"></i></span>
                <span class="btn-inner--text">Ajouter</span>
              </base-button>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="3">
              <b-form-input size="sm" placeholder="recherche ..." style="margin-top: 10px"></b-form-input>
            </b-col>
            <b-col cols="5">
              <el-select
                v-model="type_demande_id"
                multiple
                filterable
                size="small"
                allow-create
                default-first-option
                style="margin-top: 10px; width: 80%"
                placeholder="Type">
                <el-option
                  v-for="item in type_demandes"
                  :key="item.id"
                  :label="item.libelle"
                  :value="item.id">
                </el-option>
              </el-select>
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
                            <img alt="Image placeholder" src="img/theme/team-1.jpg">
                        </a>
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

          <el-table-column label="Action"
                           prop="completion"
                           min-width="250px">
            <template v-slot="{row}">
                <span class="table-action">
                  <router-link :to="'/store/demandes/detail/'+row.id" data-bs-toggle="tooltip" data-bs-original-title="Preview product">
                    <i class="fas fa-eye text-secondary" aria-hidden="true"></i>
                  </router-link>
                  <a href="javascript:;" @click="modifierDemande($event.target, row)" class="mx-3" data-bs-toggle="tooltip" data-bs-original-title="Edit product">
                    <i class="fas fa-edit text-secondary" aria-hidden="true"></i>
                  </a>
                  <a href="javascript:;" data-bs-toggle="tooltip" data-bs-original-title="Delete product">
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
        :item="demande"
        @added="getDemandes"
      />

    </b-card>
</template>
<script>
  import { Table, TableColumn} from 'element-ui';
  import VueElementLoading from "vue-element-loading";
  import Resource from "../../../api/resource";

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
        demande: {},
        type_demandes: [],
        type_demande_id: null,
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
      ajoutDemande(btn){
        // this.$bvModal.show('ajouter-offre');
        this.action = 'ajout';
        this.demande = {};
        this.$root.$emit('bv::show::modal', "modal-4", btn)
      },
      async getTypeDemandes(){
        const {data} = await typeDemandeResource.list();
        this.type_demandes = data;
      },
      getDemandes(){
        this.show = true;
        demandeResource.list()
        .then((response) => {
          this.demandes = response.data;
        })
        .finally(() => {
          this.show = false;
        })
      },
      modifierDemande(btn, demande){
        // this.$bvModal.show('ajouter-offre');
        console.log('ROW ', demande);
        this.demande = demande;
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
