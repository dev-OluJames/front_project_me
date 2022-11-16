<template>
    <b-card no-body>
        <b-card-header class="border-0">
          <b-row>
            <b-col class="col-6">
              <h3 class="mb-0">Mesures</h3>
            </b-col>
            <b-col class="col-6 text-right">
              <base-button v-if="checkPermission(['creer mesure'])"  icon @click="handleAdd" variant="primary" size="sm" type="primary">
                <span class="btn-inner--icon"><i class="ni ni-box-2"></i></span>
                <span class="btn-inner--text">ajouter</span>
              </base-button>
            </b-col>
          </b-row>
        </b-card-header>
      <vue-element-loading :active="show" spinner="bar-fade-scale" color="#2dce94" />
        <el-table class="table-responsive table"
                  header-row-class-name="thead-light"
                  :data="mesure_list">
          <vue-element-loading :active="show" spinner="bar-fade-scale" color="#2dce94" />

            <el-table-column label="Nom"
                             prop="nom"
                             min-width="130px">
              <template v-slot="{row}">
                  <span class="font-weight-800 name mb-0 text-sm">{{row.libelle}}</span>
              </template>
            </el-table-column>

            <el-table-column label="Description"
                             prop="description"
                             min-width="250px">
              <template v-slot="{row}">
                  <span class="status">{{row.description}}</span>
              </template>
            </el-table-column>

            <el-table-column label="Abreviatn"
                             prop="description"
                             min-width="250px">
              <template v-slot="{row}">
                  <span class="status">{{row.abreviation}}</span>
              </template>
            </el-table-column>

            <el-table-column label="Action"
                             prop="completion"
                             min-width="100px">
              <template v-slot="{row}">
                <span class="text-sm">
                  <a href="#" class="mx-1"  data-bs-toggle="tooltip" data-bs-original-title="Preview product" >
                    <i class="fas fa-eye text-secondary" aria-hidden="true"></i>
                  </a>
                  <a v-if="checkPermission(['modifier mesure'])" href="#" class="mx-1" data-bs-toggle="tooltip" data-bs-original-title="Edit product" @click="handleEdit(row.id)">
                    <i class="fas fa-user-edit text-secondary" aria-hidden="true"></i>
                  </a>
                  <a href="javascript:;" v-if="checkPermission(['supprimer mesure'])" class="mx-1"  data-bs-toggle="tooltip" data-bs-original-title="Delete product">
                    <i class="fas fa-trash text-secondary" aria-hidden="true"></i>
                  </a>
                </span>
              </template>
            </el-table-column>
        </el-table>

        <b-card-footer class="py-4 d-flex justify-content-end">
            <base-pagination v-model="currentPage" :per-page="10" :total="50"></base-pagination>
        </b-card-footer>
      <!--  ================== ADD MESURE MODAL =================== -->
      <modal :show.sync="modal" title="Ajouter un Mesure">
        <vue-element-loading :active="modal_show" spinner="bar-fade-scale" color="#2dce94" />
        <form ref="mesure_form">
          <b-form-group label="Libelle">
            <b-input-group prepend="@">
              <b-form-input v-model="mesure.libelle" placeholder="Libelle" required></b-form-input>
            </b-input-group>
          </b-form-group>

          <b-form-group label="Abreviation">
            <b-input-group prepend="@">
              <b-form-input v-model="mesure.abreviation" placeholder="Abreviation" required></b-form-input>
            </b-input-group>
          </b-form-group>

          <b-form-group label="Description">
            <b-input-group>
              <b-form-textarea v-model="mesure.description"></b-form-textarea>
            </b-input-group>
          </b-form-group>
        </form>
        <template slot="footer">
          <base-button v-if="add" type="primary" @click="addMesure">Ajouter</base-button>
          <base-button v-else type="primary" @click="editMesure(mesure.id)">Modifier</base-button>
          <base-button type="link" class="ml-auto" @click="modal = false">Close</base-button>
        </template>
      </modal>
    </b-card>
</template>
<script>
  import Resource from "../../../api/resource";
  import {Message, Table, TableColumn} from 'element-ui';
  const mesureResource = new Resource('mesures');
  import VueElementLoading from "vue-element-loading";
  import checkPermission from "../../../utils/permission";

  export default {
    name: 'table_mesure',
    components: {
      [Table.name]: Table,
      [TableColumn.name]: TableColumn,
      VueElementLoading
    },
    data() {
      return {
        list: [],
        currentPage: 1,
        mesure: {},
        show: false,
        mesure_list: [],
        add: true,
        modal: false,
        modal_show: false,
      };
    },
    created() {
      this.getMesures();
    },
    methods: {
      checkPermission,
    getMesures(){
      this.show = true
      mesureResource.list()
      .then((response) => {
        this.mesure_list = response.data;
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(()=>{
        this.show = false;
      });
      console.log('MESURE LIST', this.mesure_list);
    },
    addMesure(bvModalEvent){
      bvModalEvent.preventDefault();
      const valid = this.$refs['mesure_form'].checkValidity();
      console.log('VALID VALUE ', valid);
      if (valid){
        this.modal_show = true;
        console.log(this.mesure);
        mesureResource.store(this.mesure)
          .then((response) => {
            Message({
              message: 'Mesure ajouté avec succes',
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
            this.getMesures();
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
      const { data } = await mesureResource.get(id);
      this.mesure = data;
      this.modal = true;
      this.add = false;
    },
    toMesureDetail(id){
      this.$router.push({ path: '/mesures/' + id });
    },
    editMesure(id){
      console.log('ID MESURE', id);
      this.modal_show = true;
      mesureResource.update(id, this.mesure)
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
        this.getMesures();
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
