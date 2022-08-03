<template>
    <b-card no-body>
        <b-card-header class="border-0">
            <h3 class="mb-0">Liste de Vos Demandes</h3>
        </b-card-header>

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

            <el-table-column label="Date Livraison"
                             prop="completion"
                             min-width="150px">
              <template v-slot="{row}">
                <span class="status">{{row.date_livraison}}</span>
              </template>
            </el-table-column>
        </el-table>

        <b-card-footer class="py-4 d-flex justify-content-end">
            <base-pagination v-model="currentPage" :per-page="10" :total="50"></base-pagination>
        </b-card-footer>
    </b-card>
</template>
<script>
  import projects from './../projects'
  import { Table, TableColumn} from 'element-ui'
  export default {
    name: 'light-table',
    components: {
      [Table.name]: Table,
      [TableColumn.name]: TableColumn
    },
    data() {
      return {
        projects,
        currentPage: 1
      };
    }
  }
</script>
