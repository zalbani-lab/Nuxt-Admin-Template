<template>
  <section>
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        persistent
        max-width="800px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
          >
            Modifier le category
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Ajout d'une category a votre animation</span>
          </v-card-title>
          <v-card-text>
            <v-select v-model="choosedCategory" :items="customCategorys" item-text="name" />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="secondary darken-1"
              text
              @click="dialog = false"
            >
              Annuler
            </v-btn>
            <v-btn
              color="primary darken-1"
              text
              @click="chooseCategory"
            >
              Choisir
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </section>
</template>
<script>
export default {
  props: {
    alreadyLinkedCategory: {
      type: Object,
      default () {
        return null
      }
    }
  },
  data () {
    return {
      dialog: false,
      allCategorys: null,
      customCategorys: [],
      choosedCategory: null
    }
  },
  watch: {
    alreadyLinkedCategory () {
      this.updateCategoryList()
    }
  },
  created () {
    this.updateCategoryList()
  },
  methods: {
    async updateCategoryList () {
      if (this.allCategorys === null) {
        await this.setUpCategoryList()
      } else {
        this.spliceAlreadyLinkedCategory(this.allCategorys)
      }
    },
    setUpCategoryList () {
      this.$api.category.getAll()
        .then((response) => {
          this.allCategorys = response.data['hydra:member']
          this.spliceAlreadyLinkedCategory(this.allCategorys)
        })
    },
    spliceAlreadyLinkedCategory (allCategorys) {
      let tempCategorys
      if (this.alreadyLinkedCategory === undefined || this.alreadyLinkedCategory === {}) {
        tempCategorys = allCategorys
      } else {
        tempCategorys = allCategorys
        tempCategorys.splice(tempCategorys.findIndex(x => x['@id'] === this.alreadyLinkedCategory['@id']), 1)
      }
      this.customCategorys = tempCategorys
    },
    chooseCategory () {
      const objectChoosedCategory = this.allCategorys.find(category => category.name === this.choosedCategory)
      this.$emit('replace-category', objectChoosedCategory)
      this.resetForm()
    },
    resetForm () {
      this.choosedCategory = null
      this.dialog = false
      this.setUpCategoryList()
    }
  }
}
</script>
