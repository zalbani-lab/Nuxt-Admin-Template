<template>
  <SearchFrame search-title="Rechercher des logs" :has-hidden-input="true" @search="search">
    <template v-slot:shown-inputs>
      <v-col cols="6">
        <v-text-field v-model="searchParams.level" label="Criticite" type="number">
          <v-icon slot="append" color="primary">
            mdi-lifebuoy
          </v-icon>
        </v-text-field>
      </v-col>
      <v-col cols="6">
        <v-autocomplete
          v-model="searchParams.method"
          :items="methods"
          label="Method"
          clearable
        >
          <v-icon slot="append" color="primary">
            mdi-cube-send
          </v-icon>
        </v-autocomplete>
      </v-col>
    </template>
    <template v-slot:hidden-inputs>
      <v-col cols="6">
        <v-autocomplete
          v-model="searchParams.targetElement"
          :items="elements"
          label="Element cible"
          clearable
        >
          <v-icon slot="append" color="primary">
            mdi-target
          </v-icon>
        </v-autocomplete>
      </v-col>
      <v-col cols="6">
        <v-text-field v-model="searchParams.targetId" label="Id element cible" type="number">
          <v-icon slot="append" color="primary">
            mdi-identifier
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
      elements: ['animations', 'users', 'category', 'custom', 'media'],
      methods: ['POST', 'PUT', 'PATCH', 'DELETE'],
      searchParams: {
        method: '',
        level: '',
        targetId: '',
        targetElement: ''
      }
    }
  },
  methods: {
    search () {
      const params = {}
      if (this.searchParams.level !== '') { params.level = this.searchParams.level }
      if (this.searchParams.method !== '') { params.method = this.searchParams.method }
      if (this.searchParams.targetElement !== '') { params.targetElement = this.searchParams.targetElement }
      if (this.searchParams.targetId !== '') { params.targetId = this.searchParams.targetId }
      this.$emit('search', params)
    }
  }
}
</script>
