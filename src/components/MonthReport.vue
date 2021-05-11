<template>
  <Modal :title="modalTitle" @close="close">
    <div slot="body">
      <q-list separator>
      <q-item v-for="aData in monthData" :key="aData.id">
        <table>
        <tr>
        <td>Наименование</td>
        <td>{{ aData.name }}</td>
        </tr>
        <tr>
        <td>Лимит</td>
        <td>{{ aData.maxValue }} руб.</td>
        </tr>
        <tr>
        <td>Потрачено</td>
        <td>{{ aData.value }} руб.</td>
        </tr>
        </table>
      </q-item>
    </q-list>
    </div>
  </Modal>
</template>

<script>
import Modal from '../components/Modal'

export default {
  components: { Modal },
  props: {
    choosentDate: {
      type: Object
    }
  },
  data() {
    return {}
  },
  methods: {
    close() {
      this.$emit('close')
    }
  },
  computed: {
      modalTitle() {
          return `Отчет по месяцу ${this.choosentDate.year}-${this.choosentDate.month+1}`
      },
      monthData() {
          return this.$store.getters.getCurrentPayTypes(`${this.choosentDate.year}-${this.choosentDate.month}`)
      }
  }
}
</script>

<style lang="scss"></style>
