<template>
  <section class="logListContainer">
    <log-search v-if="displayOptions.search" @search="newSearch($event)" />
    <log-list-table :logs="logs" @reload="initialize" @add-filters="addTableFilters($event)" />
    <v-pagination
      v-if="nbPages !== 0"
      v-model="page"
      :length="nbPages"
    />
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
      logs: [],
      searchFilter: {},
      tableFilter: {},
      pageFilter: {},
      filters: this.hardFilters
    }
  },
  watch: {
    page () {
      this.pageFilter = { page: this.page }
      this.getLogs()
    }
  },
  created () {
    this.initialize()
  },
  methods: {
    initialize () {
      this.getLogs()
    },
    getLogs () {
      this.filters = Object.assign({}, this.hardFilters, this.searchFilter, this.tableFilter, this.pageFilter)
      this.$api.log.getFiltered(this.filters)
        .then(response => (this.variableAttribution(response)))
    },
    newSearch (newFilters, resetTableFilter = false) {
      if (resetTableFilter) {
        this.tableFilter = {}
      }
      this.searchFilter = newFilters
      this.page = 1
      this.getLogs()
    },
    addTableFilters (newFilters, resetPagination = true) {
      this.tableFilter = newFilters
      if (resetPagination) {
        this.page = 1
      }
      this.getLogs()
    },
    async variableAttribution (response) {
      this.logs = response.data['hydra:member']
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
