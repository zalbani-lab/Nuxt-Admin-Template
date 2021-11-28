<template>
  <v-chip v-if="userRole" :color="getColor()" dark>
    {{ userRole.split("_").pop().toLowerCase() }}
  </v-chip>
</template>
<script>
export default {
  props: {
    userRole: {
      type: String,
      default () {
        return ''
      }
    }
  },
  methods: {
    getColor () {
      switch (this.userRole) {
        case 'ROLE_ADMIN':
          return 'red'
        case 'ROLE_MANAGER':
          return 'orange'
        default:
          return 'green'
      }
    }
  }
}
</script>
