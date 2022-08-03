<template>
  <div class="container-fluid">
    <b-modal @ok="handleOk" :id="id" :title="title">
      <p class="my-4">{{ message }}</p>

      <template #modal-footer="{ ok, cancel }">
        <b-button size="sm" variant="danger" @click="cancel"> Non </b-button>
        <b-button size="sm" variant="success" @click="ok"> Oui </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { Vue } from 'vue-property-decorator';
export default Vue.extend({
  props: ['id', 'title', 'message', 'type'],
  methods: {
    handleOk() {
      this.$emit('handleOk');
    },
  },
});
</script>
