<template>
  <v-data-table
    :headers="headers"
    :items="medias"
    :options.sync="options"
    :server-items-length="medias.length"
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
              Cree un nouveau media
            </v-btn>
          </template>
          <media-form :media="editedItem" :operation="operation" @close:pop-up="closeForm" @reload="closeForm(), $emit('reload')" />
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
    <template v-slot:item.contentUrl="{ item }">
      <abstract-image :image="item" />
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon medium color="blue darken-1" class="mr-2" @click="editItem(item)">
        mdi-image-edit
      </v-icon>
      <v-icon v-if="$store.getters.isAdmin" medium color="secondary" @click="deleteItem(item)">
        mdi-delete
      </v-icon>
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
    medias: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      dialogForm: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {},
      options: undefined,
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Titre', value: 'title' },
        { text: 'Description', value: 'legend' },
        { text: 'Utilisation', value: 'target', sortable: false },
        { text: 'Image', value: 'contentUrl', sortable: false },
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
      async handler (newOptions) {
        const newFilters = await this.$helpers.filters.constructor(newOptions)
        this.$emit('add-filters', newFilters)
      },
      deep: true
    }
  },
  methods: {
    // Confirmation to delete the item
    deleteItemConfirm () {
      this.$api.media.delete(this.editedItem.id)
      this.closeDelete()
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
        this.$emit('reload')
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
    // Assignment functions : They assign the curent clicked object into this.editedItem
    assignEditedItemToRealItem (item) {
      this.editedIndex = this.medias.indexOf(item)
      this.editedItem = Object.assign({}, item)
    },
    // Helpers
    resetEditedItem () {
      this.editedIndex = -1
      this.editedItem = Object.assign({})
    }
  }
}
</script>
