<template>
  <section class="animationListContainer">
    <!--    <animation-search v-if="displayOptions.search" @search="newSearch($event)" />-->
    <card-to-list-switch @trigger-switch="displayCard = !displayCard" />
    <animation-list-card v-if="displayCard" :animations="animations" />
    <animation-list-table v-else :animations="animations" @reload="initialize" @add-filters="addTableFilters($event)" />
    <!--    <v-pagination-->
    <!--      v-if="nbPages !== 0"-->
    <!--      v-model="page"-->
    <!--      :length="nbPages"-->
    <!--    />-->
  </section>
</template>
<script>
export default {
  props: {
    hardFilters: {
      type: Object,
      default () {
        return {}
      }
    },
    displayOptions: {
      type: Object,
      default () {
        return {
          search: true
        }
      }
    }
  },
  data () {
    return {
      nbPages: 0,
      page: 1,
      displayCard: true,
      animations: [],
      searchFilter: {},
      tableFilter: {},
      pageFilter: {},
      filters: this.hardFilters
    }
  },
  watch: {
    page () {
      this.pageFilter = { page: this.page }
      this.getAnimations()
    }
  },
  created () {
    this.initialize()
  },
  methods: {
    initialize () {
      this.getAnimations()
    },
    getAnimations () {
      this.filters = Object.assign({}, this.hardFilters, this.searchFilter, this.tableFilter, this.pageFilter)
      this.$api.animation.getFiltered(this.filters)
        .then(response => (this.variableAttribution(response)))
    },
    newSearch (newFilters, resetTableFilter = false) {
      if (resetTableFilter) {
        this.tableFilter = {}
      }
      this.searchFilter = newFilters
      this.page = 1
      this.getAnimations()
    },
    addTableFilters (newFilters, resetPagination = true) {
      this.tableFilter = newFilters
      if (resetPagination) {
        this.page = 1
      }
      this.getAnimations()
    },
    async variableAttribution (response) {
      this.animations = response.data['hydra:member']
      if (response.data['hydra:view']['hydra:last']) {
        this.nbPages = await this.$helpers.filters.getPageNumber(response.data['hydra:view']['hydra:last'])
      } else {
        this.nbPages = 0
      }
      this.$helpers.window.scrollToTop()
    }
  }
}
</script>
