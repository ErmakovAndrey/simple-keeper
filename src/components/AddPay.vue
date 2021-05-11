<template>
  <Modal title="Новый платеж" @close="close">
    <div slot="body">
      <form @submit.prevent="onSubmit">
        <div class="error-message text-red" v-if="errorMessage">
          {{ errorMessage }}!
        </div>
        <div class="form-item">
          <q-input outlined label="Введите сумму" v-model="amount" />
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
      amount: '',
      errorMessage: ''
    }
  },
  methods: {
    onSubmit() {
      if (Number.isInteger(+this.amount)) {
        this.$emit('newPay', this.amount)
        this.close()
      } else {
        this.errorMessage = 'Значение должно быть числом'
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
