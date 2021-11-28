<template>
  <SearchFrame search-title="Rechercher un animation" :has-hidden-input="true" @search="search">
    <template v-slot:shown-inputs>
      <v-col cols="6">
        <v-text-field v-model="searchParams.animationId" label="Identifiant" type="number">
          <v-icon
            slot="append"
            color="primary"
          >
            mdi-identifier
          </v-icon>
        </v-text-field>
      </v-col>
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
    </template>
    <template v-slot:hidden-inputs>
      <v-col cols="6">
        <v-select
          v-model="searchParams.program"
          :items="programs"
          label="Programmes"
          item-text="title"
          return-object
          clearable
        >
          <v-icon
            slot="append"
            color="primary"
            class="icon-inbox"
          />
        </v-select>
      </v-col>
      <v-col cols="6">
        <v-select
          v-model="searchParams.animationStatus"
          :items="animationStatus"
          label="Status de l'animation"
          item-text="name"
          return-object
          clearable
        >
          <v-icon
            slot="append"
            color="primary"
            class="icon-activity"
          />
        </v-select>
      </v-col>
      <v-col cols="6">
        <v-select
          v-model="searchParams.theme"
          :items="themes"
          label="Theme de l'animation"
          item-text="name"
          return-object
          clearable
        >
          <v-icon
            slot="append"
            color="primary"
            class="icon-bookmark"
          />
        </v-select>
      </v-col>
      <v-col cols="6">
        <v-select
          v-model="searchParams.tag"
          :items="tags"
          label="Tag de l'animation"
          item-text="name"
          return-object
          clearable
        >
          <v-icon
            slot="append"
            color="primary"
            class="icon-tag"
          />
        </v-select>
      </v-col>
      <v-col cols="6">
        <v-select
          v-model="searchParams.topType"
          :items="typesTop"
          label="Type general de l'animation"
          item-text="name"
          return-object
          clearable
        >
          <v-icon
            slot="append"
            color="primary"
            class="icon-tag"
          />
        </v-select>
      </v-col>
      <v-col cols="6">
        <v-select
          v-model="searchParams.type"
          :items="types"
          label="Type specifique de l'animation"
          item-text="name"
          return-object
          clearable
        >
          <v-icon
            slot="append"
            color="primary"
            class="icon-tag"
          />
        </v-select>
      </v-col>
    </template>
  </SearchFrame>
</template>
<script>
export default {
  data () {
    return {
      programs: [],
      animationStatus: [],
      themes: [],
      tags: [],
      types: [],
      typesTop: [],
      searchParams: {
        animationId: '',
        title: '',
        userId: '',
        animationStatus: {},
        program: {},
        theme: {},
        tag: {},
        type: {},
        topType: {}
      }
    }
  },
  created () {
    this.initialize()
  },
  methods: {
    initialize () {
      this.$api.program.getAll()
        .then(response => (this.programs = response.data['hydra:member']))
      this.$api.animationStatus.getAll()
        .then(response => (this.animationStatus = response.data['hydra:member']))
      this.$api.theme.getAll()
        .then(response => (this.themes = response.data['hydra:member']))
      this.$api.tag.getAll()
        .then(response => (this.tags = response.data['hydra:member']))
      this.$api.type.getAll()
        .then((response) => {
          this.types = response.data['hydra:member']
          this.types.forEach(type => type.deep === 0 ? this.typesTop.push(type) : null)
        })
    },
    search () {
      const params = {}
      if (this.searchParams.title !== '') { params.title = this.searchParams.title }
      if (this.searchParams.animationId !== '') { params.id = this.searchParams.animationId }
      if (this.searchParams.userId !== '') { params.users = '/api/users/'.concat(this.searchParams.userId) }
      if (this.searchParams.program?.id !== undefined) { params.programs = '/api/programs/'.concat(this.searchParams.program.id) }
      if (this.searchParams.animationStatus?.name !== undefined) { params['status.name'] = this.searchParams.animationStatus.name }
      if (this.searchParams.theme?.name !== undefined) { params['theme.name'] = this.searchParams.theme.name }
      if (this.searchParams.tag?.name !== undefined) { params['tags.name'] = this.searchParams.tag.name }
      if (this.searchParams.type?.name !== undefined) { params['type.name'] = this.searchParams.type.name }
      if (this.searchParams.topType?.name !== undefined) { params['topType.name'] = this.searchParams.topType.name }
      this.$emit('search', params)
    }
  }
}
</script>
