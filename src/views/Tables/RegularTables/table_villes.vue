<template>
    <b-card no-body>
        <b-card-header class="border-0">
          <b-row>
            <b-col class="col-6">
              <h3 class="mb-0">Villes</h3>
            </b-col>
            <b-col class="col-6 text-right">
              <base-button v-if="checkPermission(['creer ville'])" icon @click="handleAdd" variant="primary" size="sm" type="primary">
                <span class="btn-inner--icon"><i class="ni ni-shop"></i></span>
                <span class="btn-inner--text">ajouter</span>
              </base-button>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="6">
              <b-row>
                <b-col cols="5">
                  <b-form-input size="sm" v-model="querry.keyword" @input="getvilles" placeholder="recherche ..." style="margin-top: 10px"></b-form-input>
                </b-col>
                <b-col cols="5">
                  <el-select
                    v-model="querry.pays_id"
                    filterable
                    size="small"
                    @change="getvilles"
                    allow-create
                    default-first-option
                    style="margin-top: 10px; width: 100%"
                    placeholder="Type">
                    <el-option
                      v-for="item in pays"
                      :key="item.id"
                      :label="item.libelle"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </b-col>
                <b-col cols="2">
                  <div>
                    <base-button style="margin-top: 10px;" @click="resetPays" size="sm" icon type="primary">
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
                  :data="villes_list">
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
                  <a href="#" class="mx-1"  data-bs-toggle="tooltip" data-bs-original-title="Preview product" @click="toVilleDetail(row.id)">
                    <i class="fas fa-eye text-secondary" aria-hidden="true"></i>
                  </a>
                  <a  v-if="checkPermission(['modifier ville'])" href="#" class="mx-1" data-bs-toggle="tooltip" data-bs-original-title="Edit product" @click="handleEdit(row.id)">
                    <i class="fas fa-user-edit text-secondary" aria-hidden="true"></i>
                  </a>
                  <a  v-if="checkPermission(['supprimer ville'])" href="javascript:;" class="mx-1"  data-bs-toggle="tooltip" data-bs-original-title="Delete product">
                    <i class="fas fa-trash text-secondary" aria-hidden="true"></i>
                  </a>
                </span>
              </template>
            </el-table-column>
        </el-table>

      <b-card-footer class="py-4 d-flex justify-content-end">
        <b-pagination v-if="total_villes > querry.limit" v-model="querry.page" :per-page="querry.limit" :total-rows="total_villes" @input="getvilles"></b-pagination>
      </b-card-footer>
      <!--  ================== ADD villes MODAL =================== -->
      <modal :show.sync="modal" title="Ajouter un villes">
        <vue-element-loading :active="modal_show" spinner="bar-fade-scale" color="#2dce94" />
        <form ref="ville_form">
          <b-form-group label="libelle">
            <b-input-group prepend="@">
              <b-form-input v-model="villes.libelle" placeholder="libelle" required></b-form-input>
            </b-input-group>
          </b-form-group>

          <b-form-group label="Description">
            <b-input-group>
              <b-form-textarea v-model="villes.description" required></b-form-textarea>
            </b-input-group>
          </b-form-group>
        </form>
        <template slot="footer">
          <base-button v-if="add" type="primary" @click="addville">Ajouter</base-button>
          <base-button v-else type="primary" @click="editVille(villes.id)">Modifier</base-button>
          <base-button type="link" class="ml-auto" @click="modal = false">Close</base-button>
        </template>
      </modal>
    </b-card>
</template>
<script>
  import Resource from "../../../api/resource";
  import {Message, Table, TableColumn} from 'element-ui';
  import VueElementLoading from "vue-element-loading";
  import checkPermission from "../../../utils/permission";
  const villesResource = new Resource('villes');
  const paysResource = new Resource('pays');
  export default {
    name: 'villes-list',
    components: {
      [Table.name]: Table,
      [TableColumn.name]: TableColumn,
      VueElementLoading
    },
    data() {
      return {
        list: [],
        currentPage: 1,
        total_villes: null,
        querry: {
          limit: 5,
          page: 1,
          pays_id: null,
          keyword: '',
        },
        pays: [],
        villes: {},
        show: false,
        villes_list: [],
        add: true,
        modal: false,
        modal_show: false,
      };
    },
    created() {
      this.getvilles();
      this.getPays();
    },
    methods: {
      checkPermission,
      async getPays(){
        const {data} = await paysResource.list();
        this.pays = data;
        console.log('DATA PAYS', this.pays);
      },
      getvilles(){
        this.show = true
        villesResource.list(this.querry)
        .then((response) => {
          this.total_villes = response.meta.total;
          this.villes_list = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(()=>{
          this.show = false;
        });
        console.log('villes LIST', this.villes_list);
      },
      resetPays(){
        this.querry.pays_id = null;
        this.getvilles();
      },
      addville(bvModalEvent){
        bvModalEvent.preventDefault();
        const valid = this.$refs['ville_form'].checkValidity();
        console.log('VALID VALUE ', valid);
        if (valid){
          this.modal_show = true;
          console.log(this.villes);
          villesResource.store(this.villes)
            .then((response) => {
              Message({
                message: 'villes ajout?? avec succes',
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
              this.getvilles();
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
        const { data } = await villesResource.get(id);
        this.villes = data;
        this.modal = true;
        this.add = false;
      },
      toVilleDetail(id){
        this.$router.push({ path: '/villes/' + id });
      },
      editVille(id){
        console.log('ID villes', id);
        this.modal_show = true;
        villesResource.update(id, this.villes)
        .then((response) => {
          Message({
            message: response.message || 'Modification effectu?? avec succ??s',
            type: 'success',
            duration: 5 * 1000,
          });
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.getvilles();
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
