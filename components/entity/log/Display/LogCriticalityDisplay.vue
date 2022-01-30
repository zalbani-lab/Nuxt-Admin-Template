<template>
  <v-chip :color="getCriticalityColor(level)" dark>
    {{ level }}
  </v-chip>
</template>
<script>
export default {
  props: {
    level: {
      type: Number,
      default () {
        return 0
      }
    }
  },
  methods: {
    getCriticalityColor (level) {
      switch (level) {
        case 5:
          return 'black'
        case 4:
          return 'red'
        case 3:
          return 'orange'
        case 2:
          return 'green'
        default:
          return 'white'
      }
    }
  }
}
</script>
