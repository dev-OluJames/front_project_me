<template>
  <div>
    <b-modal @change="setEditRole" :show.sync="trigger" @ok="addRole" :ok-title=" set_role.name ? 'Modifier' : 'Ajouter'" cancel-title="Annuler" @hide="closeRoleModal" :id="id">
      <h5 slot="header" class="modal-title">Ajout de Role</h5>
      <h5>Role</h5>
      <b-form-input v-model="role.name" size="sm" placeholder="Role"></b-form-input>
      <h5>Permissions</h5>
      <b-form-group>
        <b-input-group>
          <el-select
            size="small"
            style="width: 227%;"
            v-model="table_list"
            multiple="multiple"
            @change="selectTables"
            @remove-tag="removePermissions"
            placeholder="selectionez une permission...">
            <el-option v-for="(option, index) in tables"
                       :key="index"
                       :label="option.name"
                       :value="option.id">
            </el-option>
          </el-select>
        </b-input-group>
      </b-form-group>
      <b-list-group role="tablist" class="" v-for="(select_table, index) in selectedTables" :key="index">
        <b-card no-body class="mb-1 card">
          <b-list-group-item header-tag="header" class="card-header" href="#" role="tab" v-b-toggle = "accordion + index">
            <h5 class="mb-0">{{ select_table.name }}</h5>
          </b-list-group-item>
          <b-collapse :id="accordion + index" visible accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-card-text>cochez les permissions de {{select_table.name}} pour ce role</b-card-text>
              <div v-for="(check, id_check) in select_table.checks" :key="id_check">
                <b-form-checkbox-group
                  v-if="set_role.name"
                  v-model="check_ids"
                  id="checkboxes-4"
                >
                  <b-form-checkbox :value="check.id" >
                    {{ check.value }}
                  </b-form-checkbox>
                </b-form-checkbox-group>
                <b-form-checkbox-group
                  v-else
                  v-model=" role.permissions"
                  id="checkboxes-4"
                >
                  <b-form-checkbox :value="check.id" >
                    {{ check.value }}
                  </b-form-checkbox>
                </b-form-checkbox-group>
              </div>
            </b-card-body>
          </b-collapse>
        </b-card>
      </b-list-group>

      <template slot="footer">
        <base-button type="primary" @click="addRole">Save changes</base-button>
        <base-button type="link" class="ml-auto" @click="closeRoleModal">Close</base-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import Resource from "../../api/resource";
import {Message} from "element-ui";
const roleResource = new Resource('roles');
const permissionsResource = new Resource('permissions');
export default {
  name: "addRole",
  props: {
    trigger: {
      type: Boolean,
      default: false
    },
    'set_role': {
      type: Object,
      default: {},
    },
    'id':{
      type: String
    },
  },
  data(){
    return {
      modal: false,
      role: this.set_role,
      permissions: [],
      tables: [],
      selectedTables: [],
      table_list: [],
      accordion: 'accordion-',
      check_list: [],
      check_ids: [],
    }
  },
  created() {
    this.getPermissions();
  },
  methods:{
    setEditRole(){
      this.role = this.set_role;
      // console.log('SET ROLE ', this.role);
      if (this.role.permissions){
        this.getPermissions();
        const all_tables = this.tables;
        this.getTables(this.role.permissions);
        const tables = this.tables;
        this.table_list = [];
        let grant_table = [];

        tables.forEach((table) => {
          const ret_table = all_tables.filter((e_tab) => {
            return e_tab.name === table.name
          });
          grant_table.push(ret_table[0]);
        });
        // console.log('GRANTED TABLE', grant_table);
        this.tables = grant_table;
        grant_table.forEach((table) => {
          this.table_list.push(table.id);
        });
        this.selectTables(this.table_list);
        this.check_ids = [];
        this.role.permissions.forEach((permission)=>{
          this.check_ids.push(permission.id);
        })
        // this.role.permissions = check_ids;
      } else {
        this.role = {};
        this.selectedTables = [];
        this.table_list = [];
        this.table = [];
      }

    },
    closeRoleModal(){
      this.$emit('opened');
      this.role = {};
    },
    getPermissions(){
      permissionsResource.list()
      .then((response) => {
        this.permissions = response.data;
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.getTables(this.permissions);
      });
    },
    getTables(list){
      this.tables = [];
      this.check_list = [];
      let nbr = 0
      let table_id = 0;
      const list_name = [];
      let list_permit = [];
      const check_permissions = [];
      list.forEach((permission) => {
        const table = this.capitalizeFirstLetter(permission.name.split(' ')[1]);
        const permit = this.capitalizeFirstLetter(permission.name.split(' ')[0]);
        if (!list_name.includes(table)){
          list_name.push(table);
          if (list_permit.length !== 0){
            check_permissions.push({'id':table_id, 'values':list_permit})
            list_permit = [];
          }
          list_permit.push({'id': permission.id, 'value':permit});
          table_id = permission.id;
          this.tables.push({'id': permission.id,'name': table});
        } else {
          list_permit.push({'id': permission.id, 'value':permit});
        }
        nbr++;
        if (nbr === list.length-1){
          check_permissions.push({'id': table_id, 'values':list_permit});
        }
      });
      check_permissions.forEach((check) => {
        this.tables.forEach((table) => {
          if(table.id === check.id){
            table['checks'] = check.values;
          }
        });
      });
      // console.log('TABLES', this.tables,this.check_list);
      this.check_list = check_permissions;
    },
    selectTables(values){
      // console.log('VALUES', values);
      let val;
      this.selectedTables = [];
      this.selectedPermissions = [];
      values.forEach((id) => {
        // console.log('ID: ', id);
        val = this.tables.filter((table) => {
          return table.id === id;
        });
        this.selectedTables.push(val[0]);
      });
    },
    removePermissions(){
      if (this.role.permissions && this.role.permissions.length !== 0){
        let returned_permissions = [];
        this.selectedTables.forEach((table) => {
          table.checks.forEach((check) => {
            if (this.role.permissions.includes(check.id)){
              returned_permissions.push(check.id);
            }
          });
        })
        this.role.permissions = returned_permissions;
      }
    },
    addRole(){
      // console.log('ROLE ENVOYE', this.role);
      const newRole = {
        name: this.role.name,
      };
      if (this.set_role.name){
        roleResource.update(this.set_role.id,{ name: this.role.name, permissions: this.check_ids })
        .then((response) => {
          Message({
            message: 'Role modifié avec succès',
            type: 'success',
            duration: 5 * 1000,
          });
          this.$emit('added');
          this.$nextTick(() => {
            this.$bvModal.hide(this.id);
          })
        });
      } else {
        roleResource
          .store(newRole)
          .then(async(response) => {
            this.$message({
              message: 'Role '+ this.role.name+' AJouté avec succès',
              type: 'success',
              duration: 5 * 1000,
            });
            await roleResource.update(response.data.id, { name: this.role.name, permissions: this.role.permissions });
            this.$emit('added');
          })
          .catch(error => {
            console.log(error);
          })
          .finally(()=>{
            this.$nextTick(() => {
              this.$bvModal.hide(this.id);
            })
          })
      }
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }
}
</script>

<style lang="scss">
.modal-backdrop
{
  opacity:0.5 !important;
}
</style>
