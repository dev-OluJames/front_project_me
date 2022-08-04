<template>
    <b-card no-body>
        <b-card-header class="border-0">
          <b-row>
            <b-col class="col-9">
              <h3 class="mb-0">Commandes</h3>
            </b-col>
            <b-col class="col-3 text-right">
              <base-button type="primary" size="sm" data-toggle="tooltip" data-original-title="Edit product" @click="ajoutOffre($event.target)" >
                <span class="btn-inner--icon"><i class="ni ni-bag-17"></i></span>
                <span class="btn-inner--text">Ajouter</span>
              </base-button>
            </b-col>
          </b-row>
          <b-form-input size="sm" placeholder="recherche ..." style="width: 20%; margin-top: 10px"></b-form-input>
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
                            <img alt="Image placeholder" :src="row.img">
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

            <el-table-column label="Description"
                             min-width="300px"
                             prop="description">
                <template v-slot="{row}">
                      <span class="status" v-html="row.description"></span>
                </template>
            </el-table-column>

            <el-table-column label="Quantite" min-width="150px">
              <template v-slot="{row}">
                <span class="status">{{row.quantite}} {{row.mesure}}</span>
              </template>
            </el-table-column>

            <el-table-column label="Prix"
                             prop="completion"
                             min-width="150px">
              <template v-slot="{row}">
                <span class="status">{{row.prix}}</span>
              </template>
            </el-table-column>

          <el-table-column label="Action"
                           prop="completion"
                           min-width="150px">
            <template v-slot="{row}">
                <span class="text-sm">
                  <a href="javascript:;" data-bs-toggle="tooltip" data-bs-original-title="Preview product">
                    <i class="fas fa-eye text-secondary" aria-hidden="true"></i>
                  </a>
                  <a href="javascript:;" class="mx-3" data-bs-toggle="tooltip" data-bs-original-title="Edit product">
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
      />

    </b-card>
</template>
<script>
  import { Table, TableColumn} from 'element-ui';
  import VueElementLoading from "vue-element-loading";
  import Resource from "../../../api/resource";

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
        currentPage: 1,
        show: false,
      };
    },
    created() {
      this.getDemandes();
    },
    methods: {
      ajoutOffre(btn){
        // this.$bvModal.show('ajouter-offre');
        this.$root.$emit('bv::show::modal', "modal-4", btn)
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
      }
    }
  }
</script>
<style>
.text-secondary {
  color: #8392ab!important;
}</style>
