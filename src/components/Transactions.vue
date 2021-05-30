<template>
  <ScrollModal :title="title" @close="close">
    <div slot="body">
      <table>
        <thead>
          <tr>
            <th>
              Сумма
            </th>
            <th>
              Дата
            </th>
            <th>
              Удлить
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="transition in sortedTransactions" :key="transition.id">
            <td> {{ transition.amount }} руб. </td>
            <td> {{ new Date(transition.date).toLocaleDateString() }} {{ new Date(transition.date).toLocaleTimeString() }}</td>
            <td> <q-btn color="primary" @click="deleteTransaction(transition.id)">Удалить</q-btn> </td>
          </tr>
        </tbody>
      </table>
    </div>
  </ScrollModal>
</template>

<script>
import { Dialog } from 'quasar'
import ScrollModal from '../components/ScrollModal'

export default {
  components: { ScrollModal },
  props: {
    currentTitle: {
      type: String,
      default: ''
    },
    currentTransitions: {
      type: Array
    }
  },
  data() {
    return {
    }
  },
  methods: {
    close() {
      this.limit = ''
      this.$emit('close')
    },
    deleteTransaction(id) {
      this.$q.dialog({
        title: 'Удалить платеж',
        message: 'Вы действительно хотите удалить платеж?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$emit('deleteTransaction', id)
      })
    }
  },
  computed: {
    title() {
      return `Все траты в '${this.currentTitle.toLowerCase()}'`
    },
    sortedTransactions() {
      return this.currentTransitions.slice().sort((a, b) => {
          if (new Date(a.date).getTime() < new Date(b.date).getTime()) {
            return 1;
          }
          if (new Date(a.date).getTime() > new Date(b.date).getTime()) {
            return -1;
          }
          return 0;
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.form-item {
  padding: 1em;
}
table {
  width: 100%;
  thead {
    width: 100%;
      th {
        width: 33%;
        text-align:center;
      }
  }
  tbody {
    width: 100%;
      tr {
        td {
          width: 33%;
          text-align:center;
          padding: 0.5em;
        }
      }
  }
}
</style>
