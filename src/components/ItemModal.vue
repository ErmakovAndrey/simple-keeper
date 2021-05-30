<template>
  <Modal :title="currentPayTypeItem.name" @close="close">
    <div slot="body">
      <form @submit.prevent="onSubmit">
        <div class="form-item" v-if="!limitDisabled">
          <q-input outlined label="Изменить лимит" v-model="limit" />
        </div>
        <div class="form-item q-gutter-sm">
          <q-checkbox left-label v-model="limitDisabled" label="Не использовать лимит"></q-checkbox>
        </div>
        <div class="form-item">
          <q-btn label="Сохранить" type="submit" color="primary" />
        </div>
        <div class="form-item">
          <q-btn label="Все траты в категории" color="white" text-color="black" @click="showTransactions"/>
        </div>
      </form>
    </div>
  </Modal>
</template>

<script>
import Modal from '../components/Modal'

export default {
  components: { Modal },
  props: {
    currentPayTypeItem: {
      type: Object,
    },
    // currentLimitDisabled: {
    //   type: boolean,
    //   default: false
    // }
  },
  data() {
    return {
      limit: this.currentPayTypeItem.maxValue,
      limitDisabled: this.currentPayTypeItem.limitDisabled ? this.currentPayTypeItem.limitDisabled : false
    }
  },
  methods: {
    onSubmit() {
      this.$emit('changeLimit', {limit: this.limit, limitDisabled: this.limitDisabled})
      this.close()
    },
    showTransactions() {
      this.$emit('showTransactions')
      this.close()
    },
    close() {
      this.limit = ''
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
.form-item {
  padding: 1em;
}
</style>
