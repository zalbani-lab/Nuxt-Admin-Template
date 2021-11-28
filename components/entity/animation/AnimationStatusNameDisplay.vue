<template>
  <v-chip v-if="displayOptions === 'chip'" class="capitalize" :color="getStatusColor(statusName)" dark>
    {{ statusName }}
  </v-chip>
  <span v-else-if="displayOptions === 'span'" class="capitalize" :style="{ backgroundColor: getStatusColor(statusName)}">
    {{ statusName }}
  </span>
</template>
<script>
export default {
  props: {
    statusName: {
      type: String,
      default () {
        return ''
      }
    },
    displayOptions: {
      type: String,
      default () {
        return 'chip'
      }
    }
  },
  methods: {
    // Visual function Add custom color to statuses
    getStatusColor (name) {
      switch (name) {
        case 'BROUILLON':
          return '#D9D9D9'
        case 'EN ATTENTE DE PUBLICATION':
          return '#F2AA3E'
        case 'PUBLIER':
          return '#9CC947'
        case 'DEPUBLIER':
          return '#f5365c'
        default:
          return 'black'
      }
    }
  }
}
</script>
<style lang="css" scoped>
.capitalize{
  text-transform: capitalize;
}
</style>
