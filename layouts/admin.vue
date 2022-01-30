<template>
  <v-app>
    <notification />
    <side-menu />
    <top-bar />
    <heading />
    <v-container
      fluid
      tag="main"
      class="admin-layout"
    >
      <Nuxt />
    </v-container>
    <email-help-bubble />
  </v-app>
</template>
<script>
export default {
  middleware: ['connected']
}
</script>
<style>
/* Problème css order. Impossible to override vutify, this is the only way : (https://stackoverflow.com/questions/56665934/nuxt-vuetify-how-to-control-the-order-in-which-css-files-are-loaded) */
@import "assets/vutify-override.css";
</style>
