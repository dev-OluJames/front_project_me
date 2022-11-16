<template>
    <b-card no-body>
        <b-card-header class="border-0">
          <b-row>
            <b-col class="col-6">
              <h3 class="mb-0">Villages</h3>
            </b-col>
            <b-col class="col-6 text-right">
              <base-button v-if="checkPermission(['creer village'])" icon @click="handleAdd" variant="primary" size="sm" type="primary">
                <span class="btn-inner--icon"><i class="ni ni-shop"></i></span>
                <span class="btn-inner--text">ajouter</span>
              </base-button>
            </b-col>
          </b-row>
        </b-card-header>
      <vue-element-loading :active="show" spinner="bar-fade-scale" color="#2dce94" />
        <el-table class="table-responsive table"
                  header-row-class-name="thead-light"
                  :data="villages_list">
          <vue-element-loading :active="show" spinner="bar-fade-scale" color="#2dce94" />

            <el-table-column label="libelle"
                             prop="libelle"
                             min-width="130px">
              <template v-slot="{row}">
                  <span class="status">{{row.libelle}}</span>
              </template>
            </el-table-column>

            <el-table-column label="Description"
                             prop="description"
                             min-width="250px">
              <template v-slot="{row}">
                  <span class="status">{{row.description}}</span>
              </template>
            </el-table-column>

            <el-table-column label="Action"
                             prop="completion"
                             min-width="100px">
              <template v-slot="{row}">
                <span class="text-sm">
                  <a  href="#" class="mx-1"  data-bs-toggle="tooltip" data-bs-original-title="Preview product" @click="toVillageDetail(row.id)">
                    <i class="fas fa-eye text-secondary" aria-hidden="true"></i>
                  </a>
                  <a v-if="checkPermission(['modifier village'])" href="#" class="mx-1" data-bs-toggle="tooltip" data-bs-original-title="Edit product" @click="handleEdit(row.id)">
                    <i class="fas fa-user-edit text-secondary" aria-hidden="true"></i>
                  </a>
                  <a v-if="checkPermission(['supprimer village'])" href="javascript:;" class="mx-1"  data-bs-toggle="tooltip" data-bs-original-title="Delete product">
                    <i class="fas fa-trash text-secondary" aria-hidden="true"></i>
                  </a>
                </span>
              </template>
            </el-table-column>
        </el-table>

        <b-card-footer class="py-4 d-flex justify-content-end">
            <base-pagination v-model="currentPage" :per-page="10" :total="50"></base-pagination>
        </b-card-footer>
      <!--  ================== ADD villages MODAL =================== -->
      <modal :show.sync="modal" title="Ajouter un villages">
        <vue-element-loading :active="modal_show" spinner="bar-fade-scale" color="#2dce94" />
        <form ref="ville_form">
          <b-form-group label="libelle">
            <b-input-group prepend="@">
              <b-form-input v-model="villages.libelle" placeholder="libelle" required></b-form-input>
            </b-input-group>
          </b-form-group>

          <b-form-group label="Description">
            <b-input-group>
              <b-form-textarea v-model="villages.description" required></b-form-textarea>
            </b-input-group>
          </b-form-group>
        </form>
        <template slot="footer">
          <base-button v-if="add" type="primary" @click="addville">Ajouter</base-button>
          <base-button v-else type="primary" @click="editVillage(villages.id)">Modifier</base-button>
          <base-button type="link" class="ml-auto" @click="modal = false">Close</base-button>
        </template>
      </modal>
    </b-card>
</template>
<script>
  import Resource from "../../../api/resource";
  import {Message, Table, TableColumn} from 'element-ui';
  const villagesResource = new Resource('villages');
  import VueElementLoading from "vue-element-loading";
  import checkPermission from "../../../utils/permission";

  export default {
    name: 'villages-list',
    components: {
      [Table.name]: Table,
      [TableColumn.name]: TableColumn,
      VueElementLoading
    },
    data() {
      return {
        list: [],
        currentPage: 1,
        villages: {},
        show: false,
        villages_list: [],
        add: true,
        modal: false,
        modal_show: false,
      };
    },
    created() {
      this.getVillages();
    },
    methods: {
      checkPermission,
    getVillages(){
      this.show = true
      villagesResource.list()
      .then((response) => {
        this.villages_list = response.data;
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(()=>{
        this.show = false;
      });
      console.log('villages LIST', this.villages_list);
    },
    addville(bvModalEvent){
      bvModalEvent.preventDefault();
      const valid = this.$refs['ville_form'].checkValidity();
      console.log('VALID VALUE ', valid);
      if (valid){
        this.modal_show = true;
        console.log(this.villages);
        villagesResource.store(this.villages)
          .then((response) => {
            Message({
              message: 'villages ajouté avec succes',
              type: 'success',
              duration: 5 * 1000,
            })
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.modal_show = false;
            this.modal = false;
            this.getVillages();
            this.$nextTick(() => {
              this.$bvModal.hide('modal-1')
            })
            console.log('DONE');
          });
      } else {
        Message({
          message: 'Veuillez svp renseigner les champs',
          type: 'error',
          duration: 5 * 1000
        })
        return false;
      }
    },
    handleAdd(){
      this.modal = true;
      this.add = true;
    },
    async handleEdit(id){
      const { data } = await villagesResource.get(id);
      this.villages = data;
      this.modal = true;
      this.add = false;
    },
    toVillageDetail(id){
      this.$router.push({ path: '/villages/' + id });
    },
    editVillage(id){
      console.log('ID villages', id);
      this.modal_show = true;
      villagesResource.update(id, this.villages)
      .then((response) => {
        Message({
          message: response.message || 'Modification effectué avec succès',
          type: 'success',
          duration: 5 * 1000,
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.getVillages();
        this.modal = false;
        this.modal_show = false;
      })
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
