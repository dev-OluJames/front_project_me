<template>
  <div>
    <div class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center profile-header"
        style="min-height: 600px; background-image: url(img/theme/profile-cover.jpg); background-size: cover; background-position: center top;">
      <b-container fluid>
        <!-- Mask -->
        <span class="mask bg-gradient-success opacity-8"></span>
        <!-- Header container -->
        <b-container fluid class="d-flex align-items-center">
          <b-row >
            <b-col lg="7" md="10">
              <h1 class="display-2 text-white">{{user.nom}} {{ user.prenom }}</h1>
              <p class="text-white mt-0 mb-5">Voici votre page de profile, vous pouvez consulter et modifier vos informations</p>
            </b-col>
          </b-row>
        </b-container>
      </b-container>
    </div>

    <b-container fluid class="mt--6">
      <b-row>
        <b-col xl="4" class="order-xl-2 mb-5">
          <user-card :id="user_id"></user-card>
        </b-col>
        <b-col xl="8" class="order-xl-1">
          <edit-profile-form :id="user_id"></edit-profile-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
  import EditProfileForm from './UserProfile/EditProfileForm.vue';
  import UserCard from './UserProfile/UserCard.vue';
  import Resource from "../../api/resource";
  const userResource = new Resource('users');
  export default {
    components: {
      EditProfileForm,
      UserCard
    },
    data() {
      return {
        user_id: null,
        user: {},
      }
    },
    created() {
      this.getUserId();
    },
    methods: {
      getUserId(){
        this.user_id = this.$route.params.id;
        this.getUser();
      },
      async getUser(){
        const { data } = await userResource.get(this.user_id);
        this.user = data;
      }
    }
  };
</script>
<style lang="scss">
.btn-group-sm>.btn, .btn-sm {
  font-size: .75rem;
}

.btn {
  position: relative;
  text-transform: none;
  -webkit-transition: all .15s ease;
  transition: all .15s ease;
  letter-spacing: .025em;
  font-size: .875rem;
  will-change: transform;
}
.float-right {
  float: right!important;
}
.btn-group-sm>.btn, .btn-sm {
  padding: 0.25rem 0.5rem;
  line-height: 1.5;
  border-radius: 0.375rem;
}
.btn-default, .btn-default:hover {
  color: #fff;
  background-color: #172b4d;
  border-color: #172b4d;
}
</style>
