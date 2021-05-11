<template>
  <q-layout view="lHh Lpr lFf">

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer reveal elevated>
        <FooterToolbarMain />
    </q-footer>

  </q-layout>
</template>

<script>
import FooterToolbarMain from '../components/FooterToolbarMain.vue';
export default {
  name: "MainLayout",
  components: { FooterToolbarMain },
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
