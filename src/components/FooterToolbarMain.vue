<template>
  <div class="footer-toolbar">
    <q-toolbar class="row justify-around">
      <q-btn flat round dense icon="inventory_2" @click="$router.push('/history')"></q-btn>
      <q-btn
        flat
        round
        dense
        icon="add_circle_outline"
        class="main-icon"
        @click="payTypeModal = !payTypeModal"
      ></q-btn>
      <q-btn flat round dense icon="info" @click="$router.push('/about')"></q-btn>
    </q-toolbar>
    <!-- Modal -->
    <div class="footer-toolbar__modal">
      <AddPayType v-if="payTypeModal" @close="payTypeModal = !payTypeModal" @addPayType="addPayType($event)"/>
    </div>
  </div>
</template>

<script>
import AddPayType from '../components/AddPayType'

export default {
  components: { AddPayType },
  data() {
    return {
      payTypeModal: false
    }
  },
  methods: {
      addPayType(payload) {
          this.$store.dispatch('addPayType', payload)
      }
  }
}
</script>

<style lang="scss" scope>
.q-toolbar {
  padding: 0.5em !important;
  .main-icon {
    font-size: 1.5em;
  }
}
.footer-toolbar__modal {
  color: #333 !important;
}
</style>
