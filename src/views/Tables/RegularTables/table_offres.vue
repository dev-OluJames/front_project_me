<template>
    <b-card no-body>
        <b-card-header class="border-0">
          <b-row>
            <b-col class="col-9">
              <h3 class="mb-0">Offres</h3>
            </b-col>
            <b-col class="col-3 text-right">
              <b-form-input size="sm" placeholder="recherche ..."></b-form-input>
            </b-col>
          </b-row>
        </b-card-header>
      <vue-element-loading :active="show" spinner="bar-fade-scale" color="#2dce94" />
      <el-table class="table-responsive table"
                  header-row-class-name="thead-light"
                  :data="projects">
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
                             min-width="150px"
                             prop="description">
                <template v-slot="{row}">
                      <span class="status">{{row.description}}</span>
                </template>
            </el-table-column>

            <el-table-column label="Quantite" min-width="150px">
              <template v-slot="{row}">
                <span class="status">{{row.quantite}}</span>
              </template>
            </el-table-column>

            <el-table-column label="Prix"
                             prop="completion"
                             min-width="150px">
              <template v-slot="{row}">
                <span class="status">{{row.prix}}</span>
              </template>
            </el-table-column>

            <el-table-column label="Mesure"
                             prop="completion"
                             min-width="150px">
              <template v-slot="{row}">
                <span class="status">{{row.mesure}}</span>
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
    </b-card>
</template>
<script>
  import projects from './../projects';
  import { Table, TableColumn} from 'element-ui';
  import VueElementLoading from "vue-element-loading";

  export default {
    name: 'table-offres',
    components: {
      [Table.name]: Table,
      [TableColumn.name]: TableColumn,
      VueElementLoading
    },
    data() {
      return {
        projects,
        currentPage: 1,
        show: false,

      };
    }
  }
</script>
<style>
.text-secondary {
  color: #8392ab!important;
}
</style>
