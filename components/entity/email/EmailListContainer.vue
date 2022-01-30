<template>
  <section class="emailListContainer">
    <email-search v-if="displayOptions.search" @search="newSearch($event)" />
    <email-list-table :emails="emails" @reload="initialize" @add-filters="addTableFilters($event)" />
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
      emails: [],
      searchFilter: {},
      tableFilter: {},
      filters: this.hardFilters
    }
  },
  watch: {
    page () {
      this.pageFilter = { page: this.page }
      this.getEmails()
    }
  },
  created () {
    this.initialize()
  },
  methods: {
    initialize () {
      this.getEmails()
    },
    getEmails () {
      this.filters = Object.assign({}, this.hardFilters, this.searchFilter, this.tableFilter, this.pageFilter)
      this.$api.email.getFiltered(this.filters)
        .then(response => (this.variableAttribution(response)))
    },
    newSearch (newFilters, resetTableFilter = false) {
      if (resetTableFilter) {
        this.tableFilter = {}
      }
      this.searchFilter = newFilters
      this.page = 1
      this.getEmails()
    },
    addTableFilters (newFilters, resetPagination = true) {
      this.tableFilter = newFilters
      if (resetPagination) {
        this.page = 1
      }
      this.getEmails()
    },
    async variableAttribution (response) {
      this.emails = response.data['hydra:member']
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
