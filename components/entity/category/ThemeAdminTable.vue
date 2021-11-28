<template>
  <v-data-table
    :headers="headers"
    :items="themes"
    :options.sync="options"
    :server-items-length="themeNumber"
    :loading="loading"
    :footer-props="{
      itemsPerPageOptions: [],
      showCurrentPage: true,
      showFirstLastPage: true
    }"
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
              Créer un theme
            </v-btn>
          </template>
          <theme-form :theme="editedItem" :operation="operation" @close:pop-up="closeForm()" @reload="initialize()" />
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="800px">
          <v-card>
            <v-card-title class="headline">
              <p class="admin-big">
                <b>Cet action est irreversible.</b><br>
                Etes-vous sur de vouloir supprimer ?
              </p>
            </v-card-title>
            <v-card-actions>
              <v-spacer />
              <v-btn color="primary darken-1" text @click="closeDelete">
                Annuler
              </v-btn>
              <v-btn color="secondary darken-1" text @click="deleteItemConfirm">
                Oui, supprimer
              </v-btn>
              <v-spacer />
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.name="{ item }">
      <theme-name-display :theme-name="item.name" />
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        medium
        color="blue darken-1"
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        medium
        color="secondary"
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Réessayer
      </v-btn>
    </template>
  </v-data-table>
</template>
<script>
export default {
  data () {
    return {
      loading: true,
      dialogForm: false,
      dialogDelete: false,
      themeNumber: 0,
      editedIndex: -1,
      themes: [],
      editedItem: {},
      options: {
        itemsPerPage: 30,
        page: 1
      },
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Nom', value: 'name' },
        { text: 'Actions', value: 'actions', sortable: false }
      ]
    }
  },
  computed: {
    operation () {
      return this.editedIndex === -1 ? 'creation' : 'modification'
    }
  },
  watch: {
    options: {
      handler () {
        this.loading = true
        this.sort()
      },
      deep: true
    }
  },
  methods: {
    // Core functions load all ressource for filling the table
    initialize () {
      this.closeForm()
      this.closeDelete()
      this.loading = true
      this.sort()
    },
    async sort () {
      const tempFilterParams = await this.$helpers.filters.constructor(this.options)
      this.$api.theme.getFiltered(tempFilterParams)
        .then(response => this.variableAttribution(response))
    },
    // Confirmation to delete the item
    deleteItemConfirm () {
      this.closeDelete()
      this.$api.theme.delete(this.editedItem.id)
        .then(() => this.themes.splice(this.editedIndex, 1))
    },
    // Visual functions they hide all forms pop-ups
    closeForm () {
      this.dialogForm = false
      this.$nextTick(() => {
        this.resetEditedItem()
      })
    },
    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.resetEditedItem()
      })
    },
    // Assignment functions + Show appropriate pop-up
    editItem (item) {
      this.assignEditedItemToRealItem(item)
      this.dialogForm = true
    },
    deleteItem (item) {
      this.assignEditedItemToRealItem(item)
      this.dialogDelete = true
    },
    // Helpers
    // Assignment functions : They assign the curent clicked object into this.editedItem
    assignEditedItemToRealItem (item) {
      this.editedIndex = this.themes.indexOf(item)
      this.editedItem = Object.assign({}, item)
    },
    resetEditedItem () {
      this.editedIndex = -1
      this.editedItem = Object.assign({})
    },
    variableAttribution (response) {
      this.themes = response.data['hydra:member']
      this.themeNumber = response.data['hydra:totalItems']
      this.loading = false
      this.$helpers.window.scrollToTop()
    }
  }
}
</script>
