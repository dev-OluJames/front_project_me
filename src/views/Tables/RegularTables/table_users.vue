<template>
    <b-card no-body>
        <b-card-header class="border-0">
          <b-row>
            <b-col class="col-6">
              <h3 class="mb-0">Utilisateurs</h3>
            </b-col>
            <b-col class="col-6 text-right">
              <a href="#/" class="btn btn-sm btn-primary btn-round btn-icon" data-toggle="tooltip" data-original-title="Edit product">
                <span class="btn-inner--icon"><i class="fas fa-user-edit"></i></span>
                <span class="btn-inner--text">Ajouter</span>
              </a>
            </b-col>
          </b-row>
        </b-card-header>
      <vue-element-loading :active="show" spinner="bar-fade-scale" color="#2dce94" />
        <el-table class="table-responsive table"
                  header-row-class-name="thead-light"
                  :data="list">
            <el-table-column label="Produits"
                             min-width="130px"
                             prop="name">
                <template v-slot="{row}">
                    <b-media no-body class="align-items-center">
                        <a href="#" class="avatar rounded-circle mr-3">
                            <img alt="Image placeholder" src="img/theme/team-1.jpg">
                        </a>
                    </b-media>
                </template>
            </el-table-column>

            <el-table-column label="Nom"
                             prop="nom"
                             min-width="130px">
              <template v-slot="{row}">
                  <span class="status">{{row.nom}}</span>
              </template>
            </el-table-column>

            <el-table-column label="Prenom"
                             min-width="130px"
                             prop="prenom">
                <template v-slot="{row}">
                      <span class="status">{{row.prenom}}</span>
                </template>
            </el-table-column>

            <el-table-column label="Email" min-width="180px">
              <template v-slot="{row}">
                <span class="status">{{row.email}}</span>
              </template>
            </el-table-column>

            <el-table-column label="Role"
                             prop="role"
                             min-width="150px">
              <template v-slot="{row}">
                <span class="status">{{row.roles[0]}}</span>
              </template>
            </el-table-column>

            <el-table-column label="Permissions"
                             prop="permissions"
                             min-width="150px">
              <template v-slot="{row}">
                <span class="status">{{row.permissions}}</span>
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
                    <i class="fas fa-user-edit text-secondary" aria-hidden="true"></i>
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
  import Resource from "../../../api/resource";
  import { Table, TableColumn} from 'element-ui';
  const userResource = new Resource('users');
  import VueElementLoading from "vue-element-loading";

  export default {
    name: 'users-list',
    components: {
      [Table.name]: Table,
      [TableColumn.name]: TableColumn,
      VueElementLoading
    },
    data() {
      return {
        list: [],
        currentPage: 1,
        show: false,
      };
    },
    created() {
      this.getUtilisateurs();
    },
    methods: {
      getUtilisateurs(){
        this.show = true;
        userResource.list()
        .then((response) => {
          this.list = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(()=> {
          console.log('DONE');
          this.show = false;
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
.text-secondary {
  color: #8392ab!important;
}
</style>
