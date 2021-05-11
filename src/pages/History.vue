<template>
  <q-page padding>
    <!-- History title -->
    <div class="text-h5 text-center">История</div>

    <q-list separator>
      <q-item v-for="aDate in allDates" :key="`${aDate.month}-${aDate.year}`">
        <q-item-section
          ><RouterLink :to="`/history/${aDate.year}-${aDate.month}`" class="link"
            >{{ aDate.year }}-{{ aDate.month + 1 }}</RouterLink
          ></q-item-section
        >
      </q-item>
    </q-list>

    <!-- Modal report -->
    <MonthReport
      v-if="showModal"
      :choosentDate="choosentDate"
      @close="showModal = !showModal"
    />
  </q-page>
</template>

<script>
import MonthReport from '../components/MonthReport'

export default {
  name: 'PageHistory',
  components: { MonthReport },
  created() {},
  data() {
    return {
      choosentDate: null,
      showModal: false
    }
  },
  computed: {
    allDates() {
      return this.$store.getters.geDates
    }
  },
  methods: {}
}
</script>
