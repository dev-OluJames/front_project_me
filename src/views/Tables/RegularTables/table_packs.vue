<template>
    <b-card no-body>
        <b-card-header class="border-0">
          <b-row>
            <b-col class="col-6">
              <h3 class="mb-0">Packs</h3>
            </b-col>
            <b-col class="col-6 text-right">
              <base-button v-if="checkPermission(['creer pack'])"  icon @click="handleAdd" variant="primary" size="sm" type="primary">
                <span class="btn-inner--icon"><i class="ni ni-box-2"></i></span>
                <span class="btn-inner--text">ajouter</span>
              </base-button>
            </b-col>
          </b-row>
        </b-card-header>
      <vue-element-loading :active="show" spinner="bar-fade-scale" color="#2dce94" />
        <el-table class="table-responsive table"
                  header-row-class-name="thead-light"
                  :data="pack_list">
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

            <el-table-column label="Action"
                             prop="completion"
                             min-width="100px">
              <template v-slot="{row}">
                <span class="text-sm">
                  <a  href="#" class="mx-1"  data-bs-toggle="tooltip" data-bs-original-title="Preview product" @click="toPackDetail(row.id)">
                    <i class="fas fa-eye text-secondary" aria-hidden="true"></i>
                  </a>
                  <a v-if="checkPermission(['modifier pack'])" href="#" class="mx-1" data-bs-toggle="tooltip" data-bs-original-title="Edit product" @click="handleEdit(row.id)">
                    <i class="fas fa-user-edit text-secondary" aria-hidden="true"></i>
                  </a>
                  <a href="javascript:;" v-if="checkPermission(['supprimer pack'])" class="mx-1"  data-bs-toggle="tooltip" data-bs-original-title="Delete product">
                    <i class="fas fa-trash text-secondary" aria-hidden="true"></i>
                  </a>
                </span>
              </template>
            </el-table-column>
        </el-table>

      <b-card-footer class="py-4 d-flex justify-content-end">
        <b-pagination v-if="total_packs > querry.limit" v-model="querry.page" :per-page="querry.limit" :total-rows="total_packs" @input="getPacks"></b-pagination>
      </b-card-footer>
      <!--  ================== ADD PACK MODAL =================== -->
      <modal :show.sync="modal" title="Ajouter un Pack">
        <vue-element-loading :active="modal_show" spinner="bar-fade-scale" color="#2dce94" />
        <form ref="pack_form">
          <b-form-group label="Libelle">
            <b-input-group prepend="@">
              <b-form-input v-model="pack.libelle" placeholder="Libelle" required></b-form-input>
            </b-input-group>
          </b-form-group>

          <b-form-group label="Description">
            <b-input-group>
              <b-form-textarea v-model="pack.description" required></b-form-textarea>
            </b-input-group>
          </b-form-group>
        </form>
        <template slot="footer">
          <base-button v-if="add" type="primary" @click="addPack">Ajouter</base-button>
          <base-button v-else type="primary" @click="editPack(pack.id)">Modifier</base-button>
          <base-button type="link" class="ml-auto" @click="modal = false">Close</base-button>
        </template>
      </modal>
    </b-card>
</template>
<script>
  import Resource from "../../../api/resource";
  import {Message, Table, TableColumn} from 'element-ui';
  const packResource = new Resource('packs');
  import VueElementLoading from "vue-element-loading";
  import checkPermission from "../../../utils/permission";

  export default {
    name: 'pack-list',
    components: {
      [Table.name]: Table,
      [TableColumn.name]: TableColumn,
      VueElementLoading
    },
    data() {
      return {
        list: [],
        currentPage: 1,
        total_packs: null,
        pack: {},
        show: false,
        pack_list: [],
        add: true,
        modal: false,
        modal_show: false,
        querry: {
          limit: 5,
          page: 1,
        }
      };
    },
    created() {
      this.getPacks();
    },
    methods: {
      checkPermission,
      getPacks(){
        this.show = true
        packResource.list(this.querry)
        .then((response) => {
          this.total_packs = response.meta.total;
          this.pack_list = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(()=>{
          this.show = false;
        });
        console.log('PACK LIST', this.pack_list);
      },
      addPack(bvModalEvent){
        bvModalEvent.preventDefault();
        const valid = this.$refs['pack_form'].checkValidity();
        console.log('VALID VALUE ', valid);
        if (valid){
          this.modal_show = true;
          console.log(this.pack);
          packResource.store(this.pack)
            .then((response) => {
              Message({
                message: 'Pack ajouté avec succes',
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
              this.getPacks();
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
        const { data } = await packResource.get(id);
        this.pack = data;
        this.modal = true;
        this.add = false;
      },
      toPackDetail(id){
        this.$router.push({ path: '/packs/' + id });
      },
      editPack(id){
        console.log('ID PACK', id);
        this.modal_show = true;
        packResource.update(id, this.pack)
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
          this.getPacks();
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
