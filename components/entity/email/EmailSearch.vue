<template>
  <SearchFrame search-title="Rechercher des emails" :has-hidden-input="true" @search="search">
    <template v-slot:shown-inputs>
      <v-col cols="6">
        <v-text-field v-model="searchParams.emailId" label="Identifiant du mail" type="number">
          <v-icon slot="append" color="primary">
            mdi-identifier
          </v-icon>
        </v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field v-model="searchParams.recipient" label="Addresse email du destinataire" type="text" @keyup="search">
          <v-icon slot="append" color="primary">
            mdi-at
          </v-icon>
        </v-text-field>
      </v-col>
    </template>
    <template v-slot:hidden-inputs>
      <!--      <v-col cols="6">-->
      <!--        <v-text-field v-model="searchParams.object" label="Objet de l'email" type="text">-->
      <!--          <v-icon slot="append" color="primary">-->
      <!--            mdi-format-title-->
      <!--          </v-icon>-->
      <!--        </v-text-field>-->
      <!--      </v-col>-->
      <v-col cols="6">
        <v-text-field v-model="searchParams.template" label="Template de rendu du mail" type="text">
          <v-icon slot="append" color="primary">
            mdi-code-tags
          </v-icon>
        </v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field v-model="searchParams.content" label="Contenu du mail" type="text">
          <v-icon slot="append" color="primary">
            mdi-text
          </v-icon>
        </v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field v-model="searchParams.author" label="Identifiant de l'auteur" type="number">
          <v-icon slot="append" color="primary">
            mdi-account
          </v-icon>
        </v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field v-model="searchParams.context" label="Contexte du mail" type="text" @keyup="search">
          <v-icon slot="append" color="primary">
            mdi-tag-text
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
        emailId: '',
        // object: '',
        recipient: '',
        template: '',
        content: '',
        context: '',
        author: ''
      }
    }
  },
  methods: {
    search () {
      const params = {}
      if (this.searchParams.emailId !== '') { params.id = this.searchParams.emailId }
      // if (this.searchParams.object !== '') { params.object = this.searchParams.object }
      if (this.searchParams.recipient !== '') { params.recipient = this.searchParams.recipient }
      if (this.searchParams.template !== '') { params.template = this.searchParams.template }
      if (this.searchParams.content !== '') { params.content = this.searchParams.content }
      if (this.searchParams.context !== '') { params.context = this.searchParams.context }
      if (this.searchParams.author !== '') { params.author = this.searchParams.author }
      this.$emit('search', params)
    }
  }
}
</script>
