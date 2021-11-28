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
            Modifier le theme
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Ajout d'un theme a votre animation</span>
          </v-card-title>
          <v-card-text>
            <v-select v-model="choosedTheme" :items="customThemes" item-text="name" />
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
              @click="chooseTheme"
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
    alreadyLinkedTheme: {
      type: Object,
      default () {
        return null
      }
    }
  },
  data () {
    return {
      dialog: false,
      allThemes: null,
      customThemes: [],
      choosedTheme: null
    }
  },
  watch: {
    alreadyLinkedTheme () {
      this.updateThemeList()
    }
  },
  created () {
    this.updateThemeList()
  },
  methods: {
    async updateThemeList () {
      if (this.allThemes === null) {
        await this.setUpThemeList()
      } else {
        this.spliceAlreadyLinkedTheme(this.allThemes)
      }
    },
    setUpThemeList () {
      this.$api.theme.getAll()
        .then((response) => {
          this.allThemes = response.data['hydra:member']
          this.spliceAlreadyLinkedTheme(this.allThemes)
        })
    },
    spliceAlreadyLinkedTheme (allThemes) {
      let tempThemes
      if (this.alreadyLinkedTheme === undefined || this.alreadyLinkedTheme === {}) {
        tempThemes = allThemes
      } else {
        tempThemes = allThemes
        tempThemes.splice(tempThemes.findIndex(x => x['@id'] === this.alreadyLinkedTheme['@id']), 1)
      }
      this.customThemes = tempThemes
    },
    chooseTheme () {
      const objectChoosedTheme = this.allThemes.find(theme => theme.name === this.choosedTheme)
      this.$emit('replace-theme', objectChoosedTheme)
      this.resetForm()
    },
    resetForm () {
      this.choosedTheme = null
      this.dialog = false
      this.setUpThemeList()
    }
  }
}
</script>
