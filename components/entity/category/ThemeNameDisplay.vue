<template>
  <v-chip v-if="displayOptions === 'chip'" :color="getThemeColor(themeName)" dark>
    {{ themeName.toLowerCase() }}
  </v-chip>
  <span v-else-if="displayOptions === 'span'" :style="{ backgroundColor: getThemeColor(themeName)}">
    {{ themeName }}
  </span>
</template>
<script>
export default {
  props: {
    themeName: {
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
    // Visual function Add custom color to theme
    getThemeColor (name) {
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
