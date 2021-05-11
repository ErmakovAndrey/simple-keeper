<template>
  <q-list
    separator
    v-if="currentPayTypes.length"
    @click="editItem.onEdit = false"
  >
    <q-item
      v-for="currentPayType in currentPayTypes"
      :key="currentPayType.id"
      class="q-my-sm"
      clickable
      v-ripple
      :data-id="currentPayType.id"
      v-touch-hold.mouse="handleHold"
      @click="addNewPay(currentPayType.id)"
      :class="{
        edit: editItem.id === currentPayType.id && editItem.onEdit === true
      }"
    >
      <q-item-section>
        <q-item-label class="text-h6 text-primary">
          {{ currentPayType.name }}
        </q-item-label>
        <q-item-label lines="1" class="text-secondary">
          <span class="text-weight-light" style="font-size: 0.75rem"
            >Лимит:</span
          >
          {{ currentPayType.maxValue }}</q-item-label
        >
      </q-item-section>

      <q-item-section
        side
        class="circular-progress-wrapper"
        v-show="
          !(editItem.id === currentPayType.id && editItem.onEdit === true)
        "
      >
        <q-circular-progress
          reverse
          show-value
          :value="
            Math.round((currentPayType.value / currentPayType.maxValue) * 100)
          "
          size="50px"
          :thickness="0.22"
          color="light-blue"
          track-color="grey-3"
          class="q-ma-md"
        >
          <strong>
            {{
              (
                (currentPayType.value / currentPayType.maxValue) *
                100
              ).toFixed()
            }}%
          </strong>
        </q-circular-progress>
      </q-item-section>

      <q-item-section
        side
        class="remove-button-wrapper"
        v-show="editItem.id === currentPayType.id && editItem.onEdit === true"
      >
        <q-btn
          flat
          round
          dense
          icon="highlight_off"
          class="close-button default text-negative"
          @click="removePayType"
        ></q-btn>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
export default {
  props: {
    currentPayTypes: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      editItem: {
        onEdit: false,
        id: null
      },
      counter: 0,
      timer: null
    }
  },
  methods: {
    handleSwipe(e) {
      // TODO добавить перемещение
      console.log('swipe')
      // console.log(e.evt.path[2].dataset.id)
    },
    handleHold(e) {
      const elemId = e.evt.path[2].dataset.id
      console.log('тач, id: ' + elemId)
      this.editItem.onEdit = true
      this.editItem.id = elemId
    },
    removePayType(e) {
      this.$emit('removePayType', this.editItem.id)
    },
    addNewPay(id) {
      if (this.editItem.onEdit === false) {
        this.counter++
        if (this.counter == 1) {
          this.timer = setTimeout(() => {
            this.counter = 0
            this.$emit('addNewPay', id)
          }, 300)
          return
        }
        clearTimeout(this.timer)
        this.counter = 0
        this.$emit('addNewLimit', id)
      }
    }
  }
}
</script>

<style lang="scss" scope>
.q-list {
  min-height: 450px;
  .q-item {
    box-sizing: border-box;
    &.edit {
      border: 2px solid $red-9 !important;
    }
    .close-button {
      font-size: 35px;
    }
  }
}
</style>
