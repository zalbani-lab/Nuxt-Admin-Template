<template>
  <v-breadcrumbs v-if="$store.state.showBreadcrumbs && numberOfLink > 2" class="breadCrumbs" :items="breadcrumbsLinks">
    <template v-slot:item="{ item }">
      <nuxt-link v-if="item.disabled === false" class="breadCrumbs__item" :to="item.href">
        {{ getText(item.text) }}
      </nuxt-link>
      <v-breadcrumbs-item v-else :href="item.href" :disabled="item.disabled">
        {{ getText(item.text) }}
      </v-breadcrumbs-item>
    </template>
  </v-breadcrumbs>
</template>
<script>
export default {
  computed: {
    breadcrumbsLinks () {
      const fullPath = this.$route.fullPath
      const params = fullPath.substring(1).split('/')
      const crumbs = []
      const breadcrumbHomeObject = {
        text: 'dashboard',
        disabled: false,
        href: '/dashboard'
      }
      crumbs.push(breadcrumbHomeObject)
      let path = ''
      params.forEach((param, index) => {
        const breadcrumbObject = {}
        path = `${path}/${param}`
        breadcrumbObject.text = param
        breadcrumbObject.href = path
        if (index === params.length - 1) {
          breadcrumbObject.disabled = true
        } else {
          breadcrumbObject.disabled = false
        }
        const match = this.$router.match(path)
        if (match.name !== null) {
          crumbs.push(breadcrumbObject)
        }
      })
      return crumbs
    },
    numberOfLink () {
      const fullPath = this.$route.fullPath
      const params = fullPath.substring(1).split('/')
      return params.length
    }
  },
  methods: {
    getText (linkText) {
      switch (linkText) {
        case 'dashboard':
          return 'Accueil'
        case 'hosts':
          return 'intervenants'
        case 'partners':
          return 'partenaires'
        default:
          return linkText
      }
    }
  }
}
</script>
<style lang="scss">
.breadCrumbs{
  padding: 10px 0 !important;
}
.breadCrumbs__item{
  text-transform: capitalize;
  &--disabled{
    color: $gray-500;
  }
}
</style>
