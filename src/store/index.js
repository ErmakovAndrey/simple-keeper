import Vue from 'vue'
import Vuex from 'vuex'
import UUID from 'vue-uuid'
import createPersistedState from 'vuex-persistedstate'
import {getIdx, getTransitionIdx} from '../store/utils'

Vue.use(Vuex)
Vue.use(UUID)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default new Vuex.Store({
  // Plugins
  plugins: [createPersistedState()],
  // State
  state: {
    dates: [],
    payList: {},
    version: ''
  },
  // Mutations
  mutations: {
    setDate(state, payload) {
      state.dates.push({
        month: payload.nowDate.getMonth(),
        year: payload.nowDate.getFullYear()
      })
      if (payload.prevPayTypes)
        Vue.set(
          state.payList,
          `${payload.nowDate.getFullYear()}-${payload.nowDate.getMonth()}`,
          payload.prevPayTypes
        )
    },
    addNewPay(state, payload) {
      state.payList[payload.date][payload.idx].value += +payload.value
      state.payList[payload.date][payload.idx].transactions.push(
        {
          amount: +payload.value,
          date: new Date(),
          id: Vue.prototype.$uuid.v4()
        }
      )
    },
    changeLimit(state, payload) {
      state.payList[payload.date][payload.idx].maxValue = +payload.value
      state.payList[payload.date][payload.idx].limitDisabled = !!payload.limitDisabled
    },
    removePayType(state, payload) {
      state.payList[payload.date].splice(payload.idx, 1)
    },
    addPayType(state, payload) {
      if (!state.payList[payload.currentDate]) {
        Vue.set(state.payList, payload.currentDate, [])
      }
      state.payList[payload.currentDate].push({
        name: payload.name,
        maxValue: payload.amountMax,
        limitDisabled: payload.limitDisabled,
        value: 0,
        id: Vue.prototype.$uuid.v4(),
        transactions: [],
      })
    },
    deleteTransaction(state, payload) {
      state.payList[payload.date][payload.payTypeIdx].transactions.splice(payload.transactionIdx, 1)
    },
    updateVersion(state) {
      Object.keys(state.payList).forEach((aMonth) => {
        state.payList[aMonth].forEach((aPayType) => {
          aPayType.transactions.forEach((aTransactions) => {
            aTransactions.id = Vue.prototype.$uuid.v4()
          })
        })
      })
      state.version = 0.7
    }
  },
  // Actions
  actions: {
    setDate({ commit, state }) {
      const nowDate = new Date()
      let prevPayTypes = null
      if (
        state.payList &&
        state.payList[`${nowDate.getFullYear()}-${nowDate.getMonth() - 1}`] &&
        state.payList[`${nowDate.getFullYear()}-${nowDate.getMonth() - 1}`].length > 0
      ) {
        prevPayTypes = state.payList[
          `${nowDate.getFullYear()}-${nowDate.getMonth() - 1}`
        ].map(item => Object.assign({}, item))
        prevPayTypes.forEach(item => {
          item.value = 0
          item.id = Vue.prototype.$uuid.v4()
          item.transactions = []
        })
      }
      commit('setDate', { nowDate, prevPayTypes })
    },
    addNewPay({ commit, state }, payload) {
      const idx = getIdx(state, payload)
      commit('addNewPay', { ...payload, idx })
    },
    changeLimit({ commit, state }, payload) {
      const idx = getIdx(state, payload)
      commit('changeLimit', { ...payload, idx })
    },
    removePayType({ commit, state }, payload) {
      const idx = getIdx(state, payload)
      commit('removePayType', { ...payload, idx })
    },
    addPayType({ commit, state }, payload) {
      const nowDate = new Date()
      const currentDate = `${nowDate.getFullYear()}-${nowDate.getMonth()}`
      commit('addPayType', { ...payload, currentDate })
    },
    deleteTransaction({ commit, state }, payload) {
      const payTypeIdx = getIdx(state, payload)
      const transactionIdx = getTransitionIdx(state, payload)
      commit('deleteTransaction', { ...payload, payTypeIdx, transactionIdx })
    },
    updateVersion({commit}) {
      commit('updateVersion')
    }
  },
  // Getters
  getters: {
    getCurrentDate: state => {
      const nowDate = new Date()
      const findedDate = state.dates.find(
        aDate =>
          aDate.year == nowDate.getFullYear() &&
          aDate.month == nowDate.getMonth()
      )
      if (findedDate) return findedDate
      else return { year: 0, month: 0 }
    },
    getCurrentPayTypes: state => key => state.payList[key],
    geDates: state => state.dates,
    getPayTypeItem: state => keys => {
      if (keys.date && keys.id) {
        const currentType = state.payList[keys.date].find(
          item => item.id === keys.id
        )
        return currentType
      }
    },
  },

  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEBUGGING
})
