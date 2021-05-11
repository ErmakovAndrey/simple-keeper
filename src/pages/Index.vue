<template>
  <q-page padding>
    <!-- Current month name -->
    <div class="text-h5 text-center">{{ months[currentDate.month] }}</div>

    <!-- PayList -->
    <PayList 
      v-if="currentPayTypes"
      :currentPayTypes="currentPayTypes" 
      @addNewPay="newPay.payId = $event; newPay.payModal =! newPay.payModal" 
      @addNewLimit="newLimit.limitId = $event; newLimit.limitModal =! newLimit.limitModal"
      @removePayType="removePayType($event)"
     />
    <p class="text-center text-h6 q-pt-lg" v-if="!currentPayTypes">Добавьте первый тип платежей (например "Продукты")</p>

    <!-- Modal -->
    <AddPay v-if="newPay.payModal" @close="newPay.payModal=!newPay.payModal" @newPay="addNewPay($event)"/>
    <AddLimit v-if="newLimit.limitModal" @close="newLimit.limitModal=!newLimit.limitModal" @changeLimit="changeLimit($event)" :currentLimit="currentLimit"/>
    
  </q-page>
</template>

<script>
import PayList from '../components/PayList'
import AddPay from '../components/AddPay'
import AddLimit from '../components/AddLimit'

export default {
  name: 'PageIndex',
  components: { PayList, AddPay, AddLimit },
  created() {
    const nowDate = `${new Date().getFullYear()}-${new Date().getMonth()}`
    const lastDate = `${this.$store.getters.getCurrentDate.year}-${this.$store.getters.getCurrentDate.month}`
    if (!lastDate || lastDate < nowDate) {
      console.log('Новый месяц')
      this.$store.dispatch('setDate')
    }
    this.currentDate = this.$store.getters.getCurrentDate
  },
  data() {
    return {
      currentDate: null,
      months: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь'
      ],
      newPay: {
        payModal: false,
        payValue: 0,
        payId: '',
      },
      newLimit: {
        limitId: '',
        limitValue: 0,
        limitModal: false,
      }
    }
  },
  computed: {
    currentPayTypes() {
      const currentPayTypes = this.$store.getters.getCurrentPayTypes(
        `${this.currentDate.year}-${this.currentDate.month}`
      )
      return currentPayTypes
    },
    currentLimit() {
      return this.$store.getters.getCurrentLimit({date:  `${this.currentDate.year}-${this.currentDate.month}`, id: this.newLimit.limitId})
    }
  },
  methods: {
    addNewPay(value) {
      this.newPay.payValue = value
      this.$store.dispatch('addNewPay', {id: this.newPay.payId, date: `${this.currentDate.year}-${this.currentDate.month}`, value: this.newPay.payValue})
    },
    changeLimit(value) {
      console.log(value)
      this.newLimit.limitValue = value
      this.$store.dispatch('changeLimit', {id: this.newLimit.limitId, date: `${this.currentDate.year}-${this.currentDate.month}`, value: this.newLimit.limitValue})
    },
    removePayType(id) {
      this.$store.dispatch('removePayType', {id, date: `${this.currentDate.year}-${this.currentDate.month}`})
    }
  }
}
</script>
