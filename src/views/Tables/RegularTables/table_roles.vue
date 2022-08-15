<template>
  <b-card no-body>
    <b-card-header class="border-0">
      <b-row>
        <b-col class="col-6">
          <h3 class="mb-0">Roles</h3>
        </b-col>
        <b-col class="col-6 text-right">
          <base-button class="btn btn-sm btn-primary btn-round btn-icon" data-toggle="tooltip" data-original-title="Edit product" @click="triggerModal" >
            <span class="btn-inner--icon"><i class="fas fa-key"></i></span>
            <span class="btn-inner--text">Ajouter</span>
          </base-button>
        </b-col>
      </b-row>
    </b-card-header>
    <vue-element-loading :active="show" spinner="bar-fade-scale" color="#2dce94" />
    <el-table class="table-responsive table"
              header-row-class-name="thead-light"
              :data="list">

      <el-table-column label="Roles"
                       prop="roles"
                       min-width="150px">
        <template v-slot="{row}">
          <span class="status">{{row.name}}</span>
        </template>
      </el-table-column>

      <el-table-column label="permissions"
                       prop="permissions"
                       min-width="150px">
        <template v-slot="{row}">
          <span class="status">{{row.permissions}}</span>
        </template>
      </el-table-column>

      <el-table-column label="Nombre Utilisateur"
                       min-width="150px"
                       prop="userscount">
        <template v-slot="{row}">
          <span class="status">{{row.userscount}}</span>
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
    <add-role-modal :trigger="activate" @opened="deactivate"/>

  </b-card>
</template>
<script>
import { Table, TableColumn} from 'element-ui';
import Resource from "../../../api/resource";
import VueElementLoading from "vue-element-loading";
import addRoleModal from "../../../components/Modals/addRoleModal";

const roleResource = new Resource('roles');
export default {
  name: 'roles-list',
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    VueElementLoading,
    addRoleModal
  },
  data() {
    return {
      activate: false,
      list: [],
      currentPage: 1,
      show: false,
    };
  },
  created() {
    this.getRoles();
  },
  methods: {
    deactivate(){
      this.activate = false;
    },
    triggerModal(){
      this.activate = true;
    },
    getRoles(){
      this.show = true;
      roleResource.list()
      .then((response) => {
        this.list = response.data;
      })
      .catch((error)=> {
        console.log(error);
      })
      .finally(() => {
        this.show = false;
        console.log('DONE');
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.text-secondary {
  color: #8392ab!important;
}
.btn-default {
  color: #fff;
  background-color: #5e72e4;
  border-color: #5e72e4;
  -webkit-box-shadow: 0 4px 6px rgb(50 50 93 / 11%), 0 1px 3px rgb(0 0 0 / 8%);
  box-shadow: 0 4px 6px rgb(50 50 93 / 11%), 0 1px 3px rgb(0 0 0 / 8%);
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
