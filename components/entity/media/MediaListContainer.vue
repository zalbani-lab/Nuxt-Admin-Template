<template>
  <section class="mediaListContainer">
    <media-search v-if="displayOptions.search" @search="newSearch($event)" />
    <media-list-table :medias="medias" @reload="initialize" @add-filters="addTableFilters($event)" />
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
      medias: [],
      searchFilter: {},
      tableFilter: {},
      filters: this.hardFilters
    }
  },
  watch: {
    page () {
      this.pageFilter = { page: this.page }
      this.getMedias()
    }
  },
  created () {
    this.initialize()
  },
  methods: {
    initialize () {
      this.getMedias()
    },
    getMedias () {
      this.filters = Object.assign({}, this.hardFilters, this.searchFilter, this.tableFilter, this.pageFilter)
      this.$api.media.getFiltered(this.filters)
        .then(response => (this.variableAttribution(response)))
    },
    newSearch (newFilters, resetTableFilter = false) {
      if (resetTableFilter) {
        this.tableFilter = {}
      }
      this.searchFilter = newFilters
      this.page = 1
      this.getMedias()
    },
    addTableFilters (newFilters, resetPagination = true) {
      this.tableFilter = newFilters
      if (resetPagination) {
        this.page = 1
      }
      this.getMedias()
    },
    async variableAttribution (response) {
      this.medias = response.data['hydra:member']
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
