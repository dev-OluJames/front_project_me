<template>
  <card>
    <b-row align-v="center" slot="header" >
      <b-col cols="8">
        <h3 class="mb-0">Modifier profile </h3>
      </b-col>
    </b-row>

    <b-form>
      <h6 class="heading-small text-muted mb-4">Information Utilisateurs</h6>

      <div class="pl-lg-4">
        <b-row>
          <b-col lg="6">
            <base-input
              type="text"
              label="Nom Utilisateur"
              placeholder="Username"
              v-model="user.nom_utilisateur"
            >
            </base-input>
          </b-col>
          <b-col lg="6">
            <base-input
              type="email"
              label="Email address"
              placeholder="mike@email.com"
              v-model="user.email"
            >
            </base-input>
          </b-col>
        </b-row>
        <b-row >
          <b-col lg="6">
            <base-input
              type="text"
              label="Prenom"
              placeholder="First Name"
              v-model="user.prenom"
            >
            </base-input>
          </b-col>
          <b-col lg="6">
            <base-input
              type="text"
              label="Nom"
              placeholder="Last Name"
              v-model="user.nom"
            >
            </base-input>
          </b-col>
        </b-row>
      </div>
      <hr class="my-4">

      <!-- Address -->
      <h6 class="heading-small text-muted mb-4">Information Entreprise</h6>

      <div class="pl-lg-4">
        <b-row>
          <b-col md="6">
            <base-input
              type="text"
              label="Entreprise"
              placeholder="Role"
              v-model="user.nom_entreprise"
            >
            </base-input>
          </b-col>
          <b-col md="6">
            <base-input
              type="text"
              label="Telephone"
              placeholder="telephone"
              v-model="user.telephone"
            >
            </base-input>
          </b-col>
        </b-row>
      </div>
      <h6 class="heading-small text-muted mb-4">Information Role</h6>
      <div class="pl-lg-4">
        <b-row>
          <b-col lg="6">
            <label class="form-control-label">
              Role
            </label> <br/>
            <el-select v-model="role_id" filterable placeholder="Select">
              <el-option
                v-for="(item, index) in roles"
                :key="index"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </b-col>
          <b-col lg="6">
            <label class="form-control-label">
              Type Utilisateur
            </label> <br/>
            <el-select v-model="type_user_id" filterable placeholder="Select">
              <el-option
                v-for="(item, index) in type_users"
                :key="index"
                :label="item.libelle"
                :value="item.id">
              </el-option>
            </el-select>
          </b-col>
        </b-row>
          <button @click="updateProfile" class="text-right mt-3 btn btn-sm btn-primary">Modifier</button>
      </div>

<!--      <hr class="my-4">-->
<!--      &lt;!&ndash; Description &ndash;&gt;-->
<!--      <h6 class="heading-small text-muted mb-4">About me</h6>-->
<!--      <div class="pl-lg-4">-->
<!--        <b-form-group label="About Me" label-class="form-control-label" class="mb-0" label-for="about-form-textaria">-->
<!--         &lt;!&ndash;  <label class="form-control-label">About Me</label> &ndash;&gt;-->
<!--          <b-form-textarea rows="4" value="A beautiful premium dashboard for BootstrapVue." id="about-form-textaria" placeholder="A few words about you ..."></b-form-textarea>-->
<!--        </b-form-group>-->
<!--      </div>-->

    </b-form>
  </card>
</template>
<script>
import Resource from "../../../api/resource";
import {Message} from "element-ui";

const roleResource = new Resource('roles');
const userResource = new Resource('users');
const typeUserResource = new Resource('typeUsers');

export default {
  props: {
    id: {
      type: String,
    }
  },
  data() {
    return {
      user:{},
      roles: [],
      type_users: [],
      role_id: '',
      type_user_id: null,
    };
  },
  created() {
    this.getUser();
    this.getRoles();
    this.getTypeUsers();
  },
  methods: {
    async getUser(){
      const { data } = await userResource.get(this.id);
      this.user = data;
      this.role_id = this.user.roles[0];
    },
    async getRoles(){
      const {data} = await roleResource.list();
      this.roles = data;
    },
    async getTypeUsers(){
      const {data} = await typeUserResource.list();
      this.type_users = data;
    },
    updateProfile() {
      const user = this.user;
      const resource = {
          nom: user.nom,
          prenom: user.prenom,
          sexe: user.sexe,
          email: user.email,
          telephone: user.telephone,
          nom_entreprise: user.nom_entreprise,
          nom_utilisateur: user.nom_utilisateur,
          type_user_id: this.type_user_id,
          role: this.role_id,
      };
      userResource.update(this.user.id, resource)
      .then((response) => {
        Message({
          message: response.message,
          type: 'success',
          duration: 5 * 1000
        });
        this.getUser();
      })
      .finally(() => {
        this.$router.push({path: '/dashboard'})
      });
    }
  }
};
</script>
<style></style>
