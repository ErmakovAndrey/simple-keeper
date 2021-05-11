<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <div class="column">

          <q-toolbar-title>
            Simple money keeper
          </q-toolbar-title>

          <div>Помогает контролировать расходы</div>

        </div>
      </q-toolbar>
    </q-header>

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
  name: "MainLayout",
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
