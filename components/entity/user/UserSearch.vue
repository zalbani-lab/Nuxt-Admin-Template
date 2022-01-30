<template>
  <SearchFrame search-title="Rechercher des utilisateurs" @search="search">
    <template v-slot:shown-inputs>
      <v-col cols="6">
        <v-text-field v-model="searchParams.userId" label="Identifiant utilisateur" type="number">
          <v-icon slot="append" color="primary">
            mdi-identifier
          </v-icon>
        </v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field v-model="searchParams.email" label="Email de l'utilisateur" type="text" @keyup="search">
          <v-icon slot="append" color="primary">
            mdi-at
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
        userId: '',
        email: ''
      }
    }
  },
  methods: {
    search () {
      const params = {}
      if (this.searchParams.userId !== '') { params.id = this.searchParams.userId }
      if (this.searchParams.email !== '') { params.email = this.searchParams.email }
      this.$emit('search', params)
    }
  }
}
</script>
