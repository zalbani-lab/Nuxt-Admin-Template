<template>
  <SearchFrame search-title="Rechercher des utilisateurs" :has-hidden-input="true" @search="search">
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
    <template v-slot:hidden-inputs>
      <v-col cols="12">
        <v-autocomplete
          v-model="searchParams.role"
          :items="roles"
          label="Role"
          clearable
        >
          <v-icon slot="append" color="primary" class="icon-zap" />
          <template v-slot:selection="data">
            <display-role-name :user-role="data.item" />
          </template>
          <template v-slot:item="data">
            <display-role-name :user-role="data.item" />
          </template>
        </v-autocomplete>
      </v-col>
    </template>
  </SearchFrame>
</template>
<script>
export default {
  data () {
    return {
      roles: [],
      searchParams: {
        userId: '',
        email: '',
        role: ''
      }
    }
  },
  created () {
    this.initialize()
  },
  methods: {
    initialize () {
      this.$api.role.getAll()
        .then((response) => { response.data['hydra:member'].forEach(role => this.roles.push(role.name)) })
    },
    search () {
      const params = {}
      if (this.searchParams.userId !== '') { params.id = this.searchParams.userId }
      if (this.searchParams.email !== '') { params.email = this.searchParams.email }
      if (this.searchParams.role !== '') { params.roles = this.searchParams.role }
      this.$emit('search', params)
    }
  }
}
</script>
