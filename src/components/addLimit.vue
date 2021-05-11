<template>
  <Modal title="Изменить лимит" @close="close">
    <div slot="body">
      <form @submit.prevent="onSubmit">
        <div class="form-item">
          <q-input outlined label="Введите лимит" v-model="limit" />
        </div>
        <div class="form-item">
          <q-btn label="Изменить" type="submit" color="primary" />
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
    currentLimit: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      limit: this.currentLimit
    }
  },
  methods: {
    onSubmit() {
      this.$emit('changeLimit', this.limit)
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
