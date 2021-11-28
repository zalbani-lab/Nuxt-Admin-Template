<template>
  <v-data-table
    :headers="headers"
    :items="users"
    :options.sync="options"
    :server-items-length="users.length"
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
              Creer un nouvel utilisateur
            </v-btn>
          </template>
          <user-form :user="editedItem" :operation="operation" @close:pop-up="closeForm()" @reload="closeForm(), emitReload()" />
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
        <v-dialog v-model="dialogGrant" max-width="800px">
          <user-grant-form :user="editedItem" @close:pop-up="closeGrant()" @reload="closeGrant(), emitReload()" />
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.roles="{ item }">
      <display-role-name :user-role="item.roles[0]" />
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon v-if="$store.getters.isAdmin" medium color="primary" @click="grantItem(item)">
        mdi-arrow-up-bold
      </v-icon>
      <v-icon medium color="blue darken-1" class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon v-if="$store.getters.isAdmin" medium color="secondary" @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="emitReload()"
      >
        Réessayer
      </v-btn>
    </template>
  </v-data-table>
</template>
<script>
export default {
  props: {
    users: {
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
      dialogGrant: false,
      editedIndex: -1,
      editedItem: {},
      options: undefined,
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Email', value: 'email' },
        { text: 'Role', value: 'roles', sortable: false },
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
      this.$api.user.delete(this.editedItem.id)
      this.closeDelete()
    },
    // Visual functions they hide all forms pop-ups
    closeGrant () {
      this.dialogGrant = false
      this.$nextTick(() => {
        this.resetEditedItem()
        this.emitReload()
      })
    },
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
        this.emitReload()
      })
    },
    // Assignment functions + Show appropriate pop-up
    grantItem (item) {
      this.assignEditedItemToRealItem(item)
      this.dialogGrant = true
    },
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
      this.editedIndex = this.users.indexOf(item)
      this.editedItem = Object.assign({}, item)
    },
    // Helpers
    resetEditedItem () {
      this.editedIndex = -1
      this.editedItem = Object.assign({})
    },
    emitReload () {
      this.$emit('reload')
    }
  }
}
</script>
