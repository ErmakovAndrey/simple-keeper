<template>
  <Modal title="Категория" @close="close">
    <div slot="body">
      <form @submit.prevent="onSubmit">
        <div class="error-message text-red" v-if="errorMessage"> {{ errorMessage }}! </div>
        <div class="form-item">
          <q-input outlined label="Наименование" v-model="name" />
        </div>
        <div class="form-item" v-show="!limitDisabled">
          <q-input outlined label="Месячный лимит" v-model="amountMax" />
        </div>
        <div class="form-item q-gutter-sm">
          <q-checkbox left-label v-model="limitDisabled" label="Не использовать лимит"></q-checkbox>
        </div>
        <div class="form-item">
          <q-btn label="Добавить" type="submit" color="primary" />
        </div>
      </form>
    </div>
  </Modal>
</template>

<script>
import Modal from '../components/Modal'

export default {
  components: { Modal },
  data() {
    return {
      name: '',
      amountMax: null,
      limitDisabled: false,
      errorMessage: ''
    }
  },
  methods: {
    onSubmit() {
      if (this.limitOff || Number.isInteger(+this.amountMax)) {
        this.$emit('addPayType', { name: this.name, amountMax: this.amountMax, limitDisabled: this.limitDisabled })
        this.close()
      } else {
          this.errorMessage = 'Месячный лимит должен быть числом'
      }
    },
    close() {
      this.amount = ''
      this.errorMessage = ''
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
