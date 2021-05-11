<template>
  <q-page padding>
    <!-- History title -->
    <div class="text-h5 text-center">{{ Title }}</div>

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

    <div class="total-spent text-weight-bold text-center">Общий лимит: {{ totalLimit }} руб.</div>
    <div class="total-spent text-weight-bold text-center">Всего потрачено: {{ totalSpent }} руб.</div>
    <div class="total-spent text-weight-bold text-center" :class="{'text-green': totalRemains >= 0, 'text-red': totalRemains < 0}">Остаток: {{ totalRemains }} руб.</div>
  </q-page>
</template>

<script>
export default {
  name: 'PageHistoryReport',
  components: {},
  created() {
    this.currentDate.year = +this.$route.params.date.split('-')[0]
    this.currentDate.month = +this.$route.params.date.split('-')[1]
  },
  data() {
    return {
      currentDate: {
        year: null,
        month: null
      }
    }
  },
  computed: {
    Title() {
      return `Отчет по месяцу ${this.currentDate.year}-${this.currentDate
        .month + 1}`
    },
    monthData() {
      return this.$store.getters.getCurrentPayTypes(
        `${this.currentDate.year}-${this.currentDate.month}`
      )
    },
    totalSpent() {
      let total = 0
      this.monthData.forEach(item => {
        total += +item.value
      })
      return total
    },
    totalLimit() {
      let limit = 0
      this.monthData.forEach(item => {
        limit += +item.maxValue
      })
      return limit
    },
    totalRemains() {
      console.log(this.totalLimit - this.totalSpent)
      return this.totalLimit - this.totalSpent
    }
  }, 
}
</script>

<style lang="scss">
.total-spent {
 
}
</style>
