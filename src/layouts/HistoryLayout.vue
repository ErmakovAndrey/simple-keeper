<template>
  <q-layout view="lHh Lpr lFf">

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer reveal elevated>
        <FooterToolbar />
    </q-footer>

  </q-layout>
</template>

<script>
import FooterToolbar from '../components/FooterToolbar.vue';

export default {
  name: "HistoryLayout",
  components: { FooterToolbar },
  data() {
    return {
    };
  }
};
</script>

<style lang="scss">
.q-toolbar {
  padding:1em;
}
</style>
