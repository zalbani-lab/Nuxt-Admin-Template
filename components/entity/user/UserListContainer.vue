<template>
  <section class="userListContainer">
    <user-search v-if="displayOptions.search" @search="newSearch($event)" />
    <user-list-table :users="users" @reload="initialize" @add-filters="addTableFilters($event)" />
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
      users: [],
      searchFilter: {},
      tableFilter: {},
      filters: this.hardFilters
    }
  },
  watch: {
    page () {
      this.pageFilter = { page: this.page }
      this.getUsers()
    }
  },
  created () {
    this.initialize()
  },
  methods: {
    initialize () {
      this.getUsers()
    },
    getUsers () {
      this.filters = Object.assign({}, this.hardFilters, this.searchFilter, this.tableFilter, this.pageFilter)
      this.$api.user.getFiltered(this.filters)
        .then(response => (this.variableAttribution(response)))
    },
    newSearch (newFilters, resetTableFilter = false) {
      if (resetTableFilter) {
        this.tableFilter = {}
      }
      this.searchFilter = newFilters
      this.page = 1
      this.getUsers()
    },
    addTableFilters (newFilters, resetPagination = true) {
      this.tableFilter = newFilters
      if (resetPagination) {
        this.page = 1
      }
      this.getUsers()
    },
    async variableAttribution (response) {
      this.users = response.data['hydra:member']
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
