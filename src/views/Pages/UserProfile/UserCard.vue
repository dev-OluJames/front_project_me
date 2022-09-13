<template>
  <b-card no-body class="card-profile" alt="Image placeholder" img-top>
    <b-row class="justify-content-center">
      <b-col lg="3" class="order-lg-2">
        <div class="card-profile-image">
          <a href="#">
            <b-img v-if="user.image" :src="user.image.lien" rounded="circle" />
            <b-img v-else src="img/theme/team-4.jpg" rounded="circle" />
          </a>
        </div>
      </b-col>
    </b-row>

    <b-card-header class="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
      <div class="d-flex justify-content-between">
      </div>
    </b-card-header>

    <b-card-body class="pt-0">
      <b-row>
        <b-col >
          <div class="card-profile-stats d-flex justify-content-center mt-md-5">
            <div>
            </div>
            <button class="btn mt-5 btn-sm btn-default float-right" @click="uploadAvatar">Modifier</button>
            <b-form-file id="avatar" @input="chargerImage(file)" v-model="file" class="mt-3" style="display: block; visibility: hidden; width: 0; height: 0;" plain></b-form-file>
            <div>
            </div>
          </div>
        </b-col>
      </b-row>
      <div class="text-center">
        <h5 class="h3">
          {{ user.nom }} {{user.prenom}}<span class="font-weight-light">, {{ user.roles ? user.roles[0] : '' }}</span>
        </h5>
        <div class="h5 font-weight-300">
          <i class="ni location_pin mr-2"></i>{{ user.email }}
        </div>
        <div class="h5 mt-4">
          <i class="ni business_briefcase-24 mr-2"></i>{{ user.nom_utilisateur }}
        </div>
        <div>
          <i class="ni education_hat mr-2"></i>{{ user.nom_entreprise }}
        </div>

      </div>
    </b-card-body>
  </b-card>
</template>
<script>
import Resource from "../../../api/resource";
import user from "../../../store/modules/user";
import {Message} from "element-ui";
const userResouce = new Resource('users');
export default {
  props: {
    id:{
      type: String,
    }
  },
  data() {
    return {
      user: {},
      file:null,
    }
  },
  created() {
    this.getUser();
  },
  methods: {
    chargerImage(file){
      const fd = new FormData();
      fd.append('fichier', file);
      fd.append('type', 'user');
      fd.append('id', this.id);
      const imageResource = new Resource('images');
      imageResource.store(fd)
      .then((response) => {
        this.getUser();
        Message({
          message: 'Profile Modifié avec succès',
          type: 'success',
          duration: 5 * 1000,
        });
      });
    },
  uploadAvatar(){
        $('#avatar').click();
    },
    async getUser(){
      const {data} = await userResouce.get(this.id);
      this.user = data;
      console.log('THIS USER', this.user);
    }
  }
};
</script>
<style></style>
