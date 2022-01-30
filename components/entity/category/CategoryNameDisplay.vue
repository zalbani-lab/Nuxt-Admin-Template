<template>
  <v-chip v-if="displayOptions === 'chip'" :color="getCategoryColor(categoryName)" dark>
    {{ categoryName.toLowerCase() }}
  </v-chip>
  <span v-else-if="displayOptions === 'span'" :style="{ backgroundColor: getCategoryColor(categoryName)}">
    {{ categoryName }}
  </span>
</template>
<script>
export default {
  props: {
    categoryName: {
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
    // Visual function Add custom color to category
    getCategoryColor (name) {
      switch (name.toLowerCase()) {
        case 'nature':
          return '#9CC947'
        case 'monde':
          return '#f5365c'
        default:
          return 'black'
      }
    }
  }
}
</script>
