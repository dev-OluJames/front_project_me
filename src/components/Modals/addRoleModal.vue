<template>
  <modal :show.sync="trigger" @close="triggerModal">
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
            <b-card-text>cochez les permissions de {{select_table.name}} pour ce role.</b-card-text>
            <div v-for="(check, id_check) in select_table.checks" :key="id_check">
                <b-form-checkbox-group
                  v-model="role.permissions"
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
      <base-button type="link" class="ml-auto" @click="triggerModal">Close</base-button>
    </template>
  </modal>
</template>

<script>
import Resource from "../../api/resource";
const permissionsResource = new Resource('permissions');
export default {
  name: "addRole",
  props: {
    trigger: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      modal: false,
      role: {},
      permissions: [],
      tables: [],
      selectedTables: [],
      table_list: [],
      accordion: 'accordion-',
      check_list: [],
    }
  },
  created() {
    this.getPermissions();
  },
  methods:{
    triggerModal(){
      this.trigger = false;
      this.$emit('opened');
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
        console.log('DONE', this.permissions);
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
        console.log(table);
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
      console.log('TABLES', this.tables);
      this.check_list = check_permissions;
    },
    selectTables(values){
      console.log('VALUES', values);
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
          returned_permissions = this.role.permissions.filter((permissions) => {
            console.log('TABLE NAME',permissions, table.name);
            return permissions.includes(table.name)
          });
        })
        this.role.permissions = returned_permissions;
        console.log('SELECTED TABLES', this.selectedTables);
        console.log('SELECTED TABLES', this.role.permissions);
      }
    },
    addRole(){
      console.log('ROLE ENVOYE', this.role);
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
