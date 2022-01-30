<template>
  <v-data-table
    :headers="headers"
    :items="emails"
    :options.sync="options"
    :server-items-length="emails.length"
    hide-default-footer
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-divider
          class="mx-4"
          inset
          vertical
        />
        <v-spacer />
        <v-dialog
          v-model="dialogForm"
          max-width="800px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Envoyer un email
            </v-btn>
          </template>
          <email-form @close:pop-up="closeForm" />
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="this.$emit('reload')"
      >
        Réessayer
      </v-btn>
    </template>
  </v-data-table>
</template>
<script>
export default {
  props: {
    emails: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      dialogForm: false,
      options: undefined,
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'auteur', value: 'author', sortable: false },
        { text: 'Destinataire', value: 'recipient', sortable: false },
        { text: 'Addresse de reponse', value: 'replyAddress', sortable: false },
        { text: 'Objet', value: 'subject', sortable: false },
        { text: 'Modele', value: 'template', sortable: false },
        { text: 'Contenu', value: 'content', sortable: false },
        { text: 'Contexte', value: 'context', sortable: false }
      ]
    }
  },
  watch: {
    options: {
      async handler (newOptions) {
        const newFilters = await this.$helpers.filters.constructor(newOptions)
        this.$emit('add-filters', newFilters)
      },
      deep: true
    }
  },
  methods: {
    // Visual functions they hide all forms pop-ups
    closeForm () {
      this.dialogForm = false
    }
  }
}
</script>
