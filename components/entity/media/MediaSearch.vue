<template>
  <SearchFrame search-title="Rechercher un media" :has-hidden-input="true" @search="search">
    <template v-slot:shown-inputs>
      <v-col cols="6">
        <v-text-field v-model="searchParams.mediaId" label="Identifiant" type="number">
          <v-icon
            slot="append"
            color="primary"
          >
            mdi-identifier
          </v-icon>
        </v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field v-model="searchParams.target" label="Utilisation" type="text">
          <v-icon
            slot="append"
            color="primary"
          >
            mdi-target
          </v-icon>
        </v-text-field>
      </v-col>
    </template>
    <template v-slot:hidden-inputs>
      <v-col cols="6">
        <v-text-field v-model="searchParams.title" label="Titre" type="text">
          <v-icon
            slot="append"
            color="primary"
          >
            mdi-format-title
          </v-icon>
        </v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field v-model="searchParams.legend" label="Legende" type="text">
          <v-icon
            slot="append"
            color="primary"
          >
            mdi-format-title
          </v-icon>
        </v-text-field>
      </v-col>
    </template>
  </SearchFrame>
</template>
<script>
export default {
  data () {
    return {
      searchParams: {
        mediaId: '',
        target: '',
        title: '',
        legend: ''
      }
    }
  },
  methods: {
    search () {
      const params = {}
      if (this.searchParams.mediaId !== '') { params.id = this.searchParams.mediaId }
      if (this.searchParams.target !== '') { params.target = this.searchParams.target }
      if (this.searchParams.title !== '') { params.title = this.searchParams.title }
      if (this.searchParams.legend !== '') { params.title = this.searchParams.legend }
      this.$emit('search', params)
    }
  }
}
</script>
