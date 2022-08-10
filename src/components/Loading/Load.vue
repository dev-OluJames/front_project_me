<template>
  <div v-if="loaded" class="preloader d-flex align-items-center justify-content-center">
    <div class="preloader-circle"></div>
    <div class="preloader-img">
      <img src="store/img/core-img/green.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "Load",
  props: {
    loaded: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    console.log('REACHED', this.loaded);
  }
}
</script>

<style scoped>

</style>
