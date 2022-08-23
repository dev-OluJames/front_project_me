<template>
    <b-card no-body>
        <b-card-header class="border-0">
          <b-row>
            <b-col class="col-9">
              <h3 class="mb-0">Offres</h3>
            </b-col>
            <b-col class="col-3 text-right">
              <!-- b-form-input size="sm" placeholder="recherche ..."></b-form-input-->
              <base-button icon size="sm" type="primary" @click="ajoutOffre($event.target)" ref="btnShow">
                <span class="btn-inner--icon"><i class="ni ni-basket"></i></span>
                <span class="btn-inner--text" style="font-size: 12px">Ajouter</span>
              </base-button>
            </b-col>
          </b-row>

          <b-row>
            <b-col cols="3">
              <b-form-input size="sm" placeholder="recherche ..." style="margin-top: 10px"></b-form-input>
            </b-col>
            <b-col cols="5">
              <el-select
                v-model="type_offre_id"
                multiple
                filterable
                size="small"
                allow-create
                default-first-option
                style="margin-top: 10px; width: 80%"
                placeholder="Type">
                <el-option
                  v-for="item in type_offres"
                  :key="item.id"
                  :label="item.libelle"
                  :value="item.id">
                </el-option>
              </el-select>
            </b-col>
          </b-row>
        </b-card-header>
      <vue-element-loading :active="show" spinner="bar-fade-scale" color="#2dce94" />
      <el-table class="table-responsive table"
                  header-row-class-name="thead-light"
                  :data="offres">
            <el-table-column label="Produits"
                             min-width="150px"
                             prop="name">
                <template v-slot="{row}">
                    <b-media no-body class="align-items-center">
                        <a href="#" class="avatar rounded-circle mr-3">
                            <img alt="Image placeholder" src="img/theme/team-1.jpg">
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

<!--            <el-table-column label="Description"-->
<!--                             min-width="350px"-->
<!--                             prop="description">-->
<!--                <template v-slot="{row}">-->
<!--                      <span class="status" v-html="row.description"></span>-->
<!--                </template>-->
<!--            </el-table-column>-->

            <el-table-column label="Quantite" min-width="150px">
              <template v-slot="{row}">
                <span class="status">{{row.quantite}}</span>
              </template>
            </el-table-column>

            <el-table-column label="Prix Agriculteur"
                             prop="completion"
                             min-width="150px">
              <template v-slot="{row}">
                <span class="status">{{row.prix_agriculteur}}</span>
              </template>
            </el-table-column>

            <el-table-column label="Prix plateforme"
                             prop="completion"
                             min-width="150px">
              <template v-slot="{row}">
                <span class="status">{{row.prix_plateforme}}</span>
              </template>
            </el-table-column>

          <el-table-column label="Action"
                           prop="completion"
                           min-width="150px">
            <template v-slot="{row}">
                <span class="text-sm">
                  <router-link :to="'/store/offres/detail/'+row.id" data-bs-toggle="tooltip" data-bs-original-title="Preview product">
                    <i class="fas fa-eye text-secondary" aria-hidden="true"></i>
                  </router-link>
                  <a href="javascript:;" @click="modifierOffre($event.target, row)" class="mx-3" data-bs-toggle="tooltip" data-bs-original-title="Edit product">
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
      <AddModal
        id="modal-3"
        title="Ajouter une Offre"
        type="offres"
        :item="offre"
        :action="action"
        @added="getOffresList"
      />
    </b-card>
</template>
<script>
  import projects from './../projects';
  import {Message, Table, TableColumn} from 'element-ui';
  import VueElementLoading from "vue-element-loading";
  import Resource from "../../../api/resource";

  const typeOffreResource = new Resource('typeOffres');
  const offreResource = new Resource('offres');
  export default {
    name: 'table-offres',
    components: {
      [Table.name]: Table,
      [TableColumn.name]: TableColumn,
      VueElementLoading,
      AddModal: () => import('../../../components/Modals/addModal'),
    },
    data() {
      return {
        projects,
        currentPage: 1,
        show: false,
        offres: [],
        offre: {},
        type_offres: [],
        type_offre_id: null,
        action: 'ajout'
      };
    },
    created() {
      this.getOffresList();
      this.getTypeOffres();
    },
    methods: {
      ajoutOffre(btn){
        // this.$bvModal.show('ajouter-offre');
        this.$root.$emit('bv::show::modal', "modal-3", btn)
      },
      async getTypeOffres(){
        const {data} = await typeOffreResource.list();
        this.type_offres = data;
      },
      modifierOffre(btn, offre){
        // this.$bvModal.show('ajouter-offre');
        console.log('ROW ', offre);
        this.offre = offre;
        this.action = 'edit';
        this.$root.$emit('bv::show::modal', "modal-3", btn)
      },
      getOffresList(){
        this.show = true;
        offreResource.list()
        .then((respone) => {
          this.offres = respone.data;
        })
        .finally(() => {
          this.show = false;
        });
      }
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
