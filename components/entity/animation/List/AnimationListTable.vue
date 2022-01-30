<template>
  <section>
    <v-data-table
      :headers="headers"
      :items="animations"
      :server-items-length="animations.length"
      :options.sync="options"
      hide-default-footer
      class="elevation-1"
    >
      <!--      <template v-slot:item.publicationDate="{ item }">-->
      <!--        <p v-if="item.publicationDate !== null">-->
      <!--          {{ $moment(item.publicationDate).format("DD/MM/YYYY") }}-->
      <!--        </p>-->
      <!--      </template>-->
      <template v-slot:item.actions="{ item }">
        <nuxt-link :to="'/content/animations/'+ item.id">
          <v-icon medium color="blue darken-1" class="mr-2">
            mdi-pencil
          </v-icon>
        </nuxt-link>
        <nuxt-link :to="'/content/animations/'+ item.id">
          <v-icon medium color="orange darken-1" class="mr-2">
            mdi-eye
          </v-icon>
        </nuxt-link>
        <v-icon medium color="secondary" @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="this.$emit('reload')">
          Réessayer
        </v-btn>
      </template>
    </v-data-table>
    <v-dialog v-model="dialogDelete" max-width="800px">
      <v-card>
        <v-card-title class="headline">
          <p class="admin-big">
            <b v-if="$store.getters.isAdmin">Cet action est irreversible.</b><br>
            Etes-vous sur de vouloir supprimer l'animation ?
          </p>
        </v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary darken-1" text @click="closeDeleteDialog">
            Non, Annuler
          </v-btn>
          <v-btn color="secondary darken-1" text @click="deleteAnimation">
            Oui, supprimer
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>
<script>
export default {
  props: {
    animations: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      dialogDelete: false,
      options: undefined,
      editedIndex: -1,
      editedItem: {},
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Titre', value: 'title', sortable: false },
        { text: 'Description courte', value: 'shortDescription', sortable: false },
        { text: 'Date de debut', value: 'dateStart', sortable: false },
        { text: 'Category', value: 'category.name', sortable: false },
        // { text: 'Date de publication', value: 'publicationDate' },
        { text: 'Actions', value: 'actions', sortable: false }
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
    deleteItem (item) {
      this.assignEditedItemToRealItem(item)
      this.openDeleteDialog()
    },
    deleteAnimation () {
      this.$api.animation.delete(this.editedItem.id)
        .then(() => this.closeDeleteDialog())
        .then(() => this.animations.splice(this.editedIndex, 1))
    },
    closeDeleteDialog () {
      this.dialogDelete = false
    },
    openDeleteDialog () {
      this.dialogDelete = true
    },
    // Assignment functions : They assign the curent clicked object into this.editedItem
    assignEditedItemToRealItem (item) {
      this.editedIndex = this.animations.indexOf(item)
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
