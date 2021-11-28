<template>
  <v-card
    color="red"
    dark
  >
    <v-card-title>
      <v-icon
        large
        left
        class="icon-error"
      />
      <span class="title">{{ title }}</span>
    </v-card-title>
    <v-card-text class="headline font-weight-bold">
      <slot name="content" />
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default () {
        return 'Attention !'
      }
    }
  }
}
</script>
