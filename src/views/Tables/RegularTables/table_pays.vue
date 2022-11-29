<template>
    <b-card no-body>
        <b-card-header class="border-0">
          <b-row>
            <b-col class="col-6">
              <h3 class="mb-0">Pays</h3>
            </b-col>
            <b-col class="col-6 text-right">
              <base-button v-if="checkPermission(['creer pays'])" icon @click="handleAdd" variant="primary" size="sm" type="primary">
                <span class="btn-inner--icon"><i class="ni ni-shop"></i></span>
                <span class="btn-inner--text">ajouter</span>
              </base-button>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="6">
              <b-row>
                <b-col cols="5">
                  <b-form-input size="sm" v-model="querry.keyword" @input="getpays" placeholder="recherche ..." style="margin-top: 10px"></b-form-input>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-card-header>
      <vue-element-loading :active="show" spinner="bar-fade-scale" color="#2dce94" />
        <el-table class="table-responsive table"
                  header-row-class-name="thead-light"
                  :data="pays_list">
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
                  <a href="#" class="mx-1"  data-bs-toggle="tooltip" data-bs-original-title="Preview product" @click="topayDetail(row.id)">
                    <i class="fas fa-eye text-secondary" aria-hidden="true"></i>
                  </a>
                  <a v-if="checkPermission(['modifier pays'])" href="#" class="mx-1" data-bs-toggle="tooltip" data-bs-original-title="Edit product" @click="handleEdit(row.id)">
                    <i class="fas fa-user-edit text-secondary" aria-hidden="true"></i>
                  </a>
                  <a v-if="checkPermission(['supprimer pays'])" href="javascript:;" class="mx-1"  data-bs-toggle="tooltip" data-bs-original-title="Delete product">
                    <i class="fas fa-trash text-secondary" aria-hidden="true"></i>
                  </a>
                </span>
              </template>
            </el-table-column>
        </el-table>

      <b-card-footer class="py-4 d-flex justify-content-end">
        <b-pagination v-if="total_pays > querry.limit" v-model="querry.page" :per-page="querry.limit" :total-rows="total_pays" @input="getpays"></b-pagination>
      </b-card-footer>
      <!--  ================== ADD pays MODAL =================== -->
      <modal :show.sync="modal" title="Ajouter un pays">
        <vue-element-loading :active="modal_show" spinner="bar-fade-scale" color="#2dce94" />
        <form ref="pay_form">
          <b-form-group label="libelle">
            <b-input-group prepend="@">
              <b-form-input v-model="pays.libelle" placeholder="libelle" required></b-form-input>
            </b-input-group>
          </b-form-group>

          <b-form-group label="Description">
            <b-input-group>
              <b-form-textarea v-model="pays.description" required></b-form-textarea>
            </b-input-group>
          </b-form-group>
        </form>
        <template slot="footer">
          <base-button v-if="add" type="primary" @click="addpay">Ajouter</base-button>
          <base-button v-else type="primary" @click="editpay(pays.id)">Modifier</base-button>
          <base-button type="link" class="ml-auto" @click="modal = false">Close</base-button>
        </template>
      </modal>
    </b-card>
</template>
<script>
  import Resource from "../../../api/resource";
  import {Message, Table, TableColumn} from 'element-ui';
  const paysResource = new Resource('pays');
  import VueElementLoading from "vue-element-loading";
  import checkPermission from "../../../utils/permission";

  export default {
    name: 'pays-list',
    components: {
      [Table.name]: Table,
      [TableColumn.name]: TableColumn,
      VueElementLoading
    },
    data() {
      return {
        list: [],
        currentPage: 1,
        total_pays: null,
        querry: {
          page: 1,
          limit: 5,
          keyword: '',
        },
        pays: {},
        show: false,
        pays_list: [],
        add: true,
        modal: false,
        modal_show: false,
      };
    },
    created() {
      this.getpays();
    },
    methods: {
      checkPermission,
      getpays(){
        this.show = true
        console.log('PAGE AFTER PAGINATE ', this.querry);
        paysResource.list(this.querry)
        .then((response) => {
          this.total_pays = response.meta.total;
          this.pays_list = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(()=>{
          this.show = false;
        });
        console.log('pays LIST', this.pays_list);
      },
      addpay(bvModalEvent){
        bvModalEvent.preventDefault();
        const valid = this.$refs['pay_form'].checkValidity();
        console.log('VALID VALUE ', valid);
        if (valid){
          this.modal_show = true;
          console.log(this.pays);
          paysResource.store(this.pays)
            .then((response) => {
              Message({
                message: 'pays ajouté avec succes',
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
              this.getpays();
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
        const { data } = await paysResource.get(id);
        this.pays = data;
        this.modal = true;
        this.add = false;
      },
      topayDetail(id){
        this.$router.push({ path: '/pays/' + id });
      },
      editpay(id){
        console.log('ID pays', id);
        this.modal_show = true;
        paysResource.update(id, this.pays)
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
          this.getpays();
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
