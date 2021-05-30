<template>
  <q-page padding>
    <!-- Current month name -->
    <div class="text-h5 text-center">{{ months[currentDate.month] }}</div>

    <!-- PayList -->
    <PayList
      v-if="currentPayTypes"
      :currentPayTypes="currentPayTypes"
      @addNewPay="
        newPay.payId = $event
        newPay.payModal = !newPay.payModal
      "
      @addNewLimit="
        currentItem.itemId = $event
        currentItem.itemModal = !currentItem.itemModal
      "
      @removePayType="removePayType($event)"
    />
    <p class="text-center text-h6 q-pt-lg" v-if="!currentPayTypes">
      Добавьте первый тип платежей (например "Продукты")
    </p>

    <!-- Modal -->
    <AddPay
      v-if="newPay.payModal"
      @close="newPay.payModal = !newPay.payModal"
      @newPay="addNewPay($event)"
    />
    <ItemModal
      v-if="currentItem.itemModal"
      @close="currentItem.itemModal = !currentItem.itemModal"
      @changeLimit="changeLimit($event)"
      @showTransactions="currentItem.showTransactions = !currentItem.showTransactions"
      :currentPayTypeItem="currentPayTypeItem"
    />

    <Transactions
      v-if="currentItem.showTransactions"
      @close="currentItem.showTransactions = !currentItem.showTransactions"
      @deleteTransaction="deleteTransaction($event)"
      :currentTitle="currentPayTypeItem.name"
      :currentTransitions="currentPayTypeItem.transactions"
    />

  </q-page>
</template>

<script>
import { mapState } from 'vuex';
import PayList from '../components/PayList'
import AddPay from '../components/AddPay'
import ItemModal from '../components/ItemModal'
import Transactions from '../components/Transactions'

export default {
  name: 'PageIndex',
  components: { PayList, AddPay, ItemModal, Transactions },
  created() {
    const nowDate = `${new Date().getFullYear()}-${new Date().getMonth()}`
    const lastDate = `${this.$store.getters.getCurrentDate.year}-${this.$store.getters.getCurrentDate.month}`
    if (!lastDate || lastDate < nowDate) {
      console.log('Новый месяц')
      this.$store.dispatch('setDate')
    }
    this.currentDate = this.$store.getters.getCurrentDate
  },
  mounted() {
    if (!this.version || this.version < '0.7') {
      console.log('Обновляем версию!')
      this.updateVersion()
    }
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
        payId: ''
      },
      currentItem: {
        itemId: '',
        itemModal: false,
        showTransactions: false
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
    currentPayTypeItem() {
      return this.$store.getters.getPayTypeItem({
        date: `${this.currentDate.year}-${this.currentDate.month}`,
        id: this.currentItem.itemId
      })
    },
    ...mapState({
      version: state => state.version,
    })
  },
  methods: {
    addNewPay(value) {
      this.newPay.payValue = value
      this.$store.dispatch('addNewPay', {
        id: this.newPay.payId,
        date: `${this.currentDate.year}-${this.currentDate.month}`,
        value: this.newPay.payValue
      })
    },
    changeLimit(payload) {
      this.$store.dispatch('changeLimit', {
        id: this.currentItem.itemId,
        date: `${this.currentDate.year}-${this.currentDate.month}`,
        value: payload.limit,
        limitDisabled: payload.limitDisabled
      })
    },
    removePayType(id) {
      this.$store.dispatch('removePayType', {
        id,
        date: `${this.currentDate.year}-${this.currentDate.month}`
      })
    },
    updateVersion() {
      this.$store.dispatch('updateVersion')
    },
    deleteTransaction(tId) {
      this.$store.dispatch('deleteTransaction', {
        id: this.currentItem.itemId,
        date: `${this.currentDate.year}-${this.currentDate.month}`,
        tId: tId
      })
    }
  }
}
</script>
