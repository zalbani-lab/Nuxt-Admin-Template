<template>
  <v-chip :color="getMethodColor(method)" dark>
    {{ method }}
  </v-chip>
</template>
<script>
export default {
  props: {
    method: {
      type: String,
      default () {
        return ''
      }
    }
  },
  methods: {
    getMethodColor (method) {
      switch (method) {
        case 'POST':
          return 'orange'
        case 'GET':
          return 'green'
        case 'PUT':
          return 'blue'
        case 'PATCH':
          return 'grey'
        case 'DELETE':
          return 'red'
        default:
          return 'black'
      }
    }
  }
}
</script>
