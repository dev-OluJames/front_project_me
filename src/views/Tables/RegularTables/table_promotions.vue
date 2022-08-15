<template>
    <b-card no-body>
        <b-card-header class="border-0">
          <b-row>
            <b-col class="col-6">
              <h3 class="mb-0">Promotions</h3>
            </b-col>
            <b-col class="col-6 text-right">
              <base-button icon @click="handleAdd" variant="primary" size="sm" type="primary">
                <span class="btn-inner--icon"><i class="ni ni-notification-70"></i></span>
                <span class="btn-inner--text">ajouter</span>
              </base-button>
            </b-col>
          </b-row>
        </b-card-header>
      <vue-element-loading :active="show" spinner="bar-fade-scale" color="#2dce94" />
        <el-table class="table-responsive table"
                  header-row-class-name="thead-light"
                  :data="promotion_list">
          <vue-element-loading :active="show" spinner="bar-fade-scale" color="#2dce94" />

            <el-table-column label="Nom"
                             prop="nom"
                             min-width="130px">
              <template v-slot="{row}">
                  <span class="status">{{row.libelle}}</span>
              </template>
            </el-table-column>

            <el-table-column label="Description"
                             prop="description"
                             min-width="200px">
              <template v-slot="{row}">
                  <span class="status">{{row.description}}</span>
              </template>
            </el-table-column>

            <el-table-column label="Debut"
                             prop="debut"
                             min-width="100px">
              <template v-slot="{row}">
                  <span class="status">{{row.date_debut}}</span>
              </template>
            </el-table-column>

            <el-table-column label="Fin"
                             prop="fin"
                             min-width="100px">
              <template v-slot="{row}">
                  <span class="status">{{row.date_fin}}</span>
              </template>
            </el-table-column>

            <el-table-column label="Action"
                             prop="completion"
                             min-width="100px">
              <template v-slot="{row}">
                <span class="text-sm">
                  <a href="#" class="mx-1"  data-bs-toggle="tooltip" data-bs-original-title="Preview product" @click="topromotionDetail(row.id)">
                    <i class="fas fa-eye text-secondary" aria-hidden="true"></i>
                  </a>
                  <a href="#" class="mx-1" data-bs-toggle="tooltip" data-bs-original-title="Edit product" @click="handleEdit(row.id)">
                    <i class="fas fa-user-edit text-secondary" aria-hidden="true"></i>
                  </a>
                  <a href="javascript:;" class="mx-1"  data-bs-toggle="tooltip" data-bs-original-title="Delete product">
                    <i class="fas fa-trash text-secondary" aria-hidden="true"></i>
                  </a>
                </span>
              </template>
            </el-table-column>
        </el-table>

        <b-card-footer class="py-4 d-flex justify-content-end">
            <base-pagination v-model="currentPage" :per-page="10" :total="50"></base-pagination>
        </b-card-footer>
      <!--  ================== ADD promotion MODAL =================== -->
      <modal :show.sync="modal" title="Ajouter un promotion">
        <vue-element-loading :active="modal_show" spinner="bar-fade-scale" color="#2dce94" />
        <form ref="promotion_form">
          <b-form-group label="Libelle">
            <b-input-group prepend="@">
              <b-form-input v-model="promotion.libelle" placeholder="Libelle" required></b-form-input>
            </b-input-group>
          </b-form-group>
            <b-row>
              <b-col>
                <b-form-group label="Date Début">
                  <b-input-group>
                    <b-form-input type="date" v-model="promotion.date_debut" required></b-form-input>
                    {{promotion.date_debut}}
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Date Fin">
                  <b-input-group>
                    <b-form-input type="date" v-model="promotion.date_fin" required></b-form-input>
                    {{promotion.date_fin}}
                  </b-input-group>
                </b-form-group>
              </b-col>
            </b-row>
          <b-form-group label="Description">
            <b-input-group>
              <b-form-textarea v-model="promotion.description" required></b-form-textarea>
            </b-input-group>
          </b-form-group>
        </form>
        <template slot="footer">
          <base-button v-if="add" type="primary" @click="addpromotion">Ajouter</base-button>
          <base-button v-else type="primary" @click="editpromotion(promotion.id)">Modifier</base-button>
          <base-button type="link" class="ml-auto" @click="modal = false">Close</base-button>
        </template>
      </modal>
    </b-card>
</template>
<script>
  import Resource from "../../../api/resource";
  import {Message, Table, TableColumn} from 'element-ui';
  const promotionResource = new Resource('promotions');
  import VueElementLoading from "vue-element-loading";

  export default {
    name: 'promotion-list',
    components: {
      [Table.name]: Table,
      [TableColumn.name]: TableColumn,
      VueElementLoading
    },
    data() {
      return {
        list: [],
        currentPage: 1,
        promotion: {},
        show: false,
        promotion_list: [],
        add: true,
        modal: false,
        modal_show: false,
      };
    },
    created() {
      this.getpromotions();
    },
    methods: {
    getpromotions(){
      this.show = true
      promotionResource.list()
      .then((response) => {
        this.promotion_list = response.data;
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(()=>{
        this.show = false;
      });
      console.log('promotion LIST', this.promotion_list);
    },
    addpromotion(bvModalEvent){
      bvModalEvent.preventDefault();
      const valid = this.$refs['promotion_form'].checkValidity();
      console.log('VALID VALUE ', valid);
      if (valid){
        this.modal_show = true;
        console.log(this.promotion);
        promotionResource.store(this.promotion)
          .then((response) => {
            Message({
              message: 'promotion ajouté avec succes',
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
            this.getpromotions();
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
      const { data } = await promotionResource.get(id);
      this.promotion = data;
      this.modal = true;
      this.add = false;
    },
    topromotionDetail(id){
      this.$router.push({ path: '/promotions/' + id });
    },
    editpromotion(id){
      console.log('ID promotion', id);
      this.modal_show = true;
      promotionResource.update(id, this.promotion)
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
        this.getpromotions();
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
