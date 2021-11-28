<template>
  <v-form v-model="isFormValid">
    <v-card>
      <v-card-title>
        <span class="headline">{{ formTitle }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              sm="6"
              md="12"
            >
              <v-text-field
                v-model="theme.name"
                label="Nom du theme"
                type="string"
                :rules="[$helpers.formRules.required]"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="secondary darken-1"
          text
          @click="close"
        >
          Annuler
        </v-btn>
        <v-btn
          color="primary darken-1"
          text
          :disabled="!isFormValid"
          @click="save"
        >
          Sauvegarder
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>
<script>
export default {
  props: {
    operation: {
      type: String,
      default () {
        return 'creation'
      }
    },
    theme: {
      type: Object,
      default () {
        return {
          name: '',
          image: {}
        }
      }
    }
  },
  data () {
    return {
      isFormValid: false
    }
  },
  computed: {
    formTitle () {
      switch (this.operation) {
        case 'creation':
          return 'Nouveau theme'
        case 'modification':
          return 'Editer le theme'
        default:
          return 'Error with the operation variable inside ThemeForm component'
      }
    }
  },
  methods: {
    // Save dispatcher function
    async save () {
      switch (this.operation) {
        case 'creation':
          await this.$api.theme.post(this.theme)
          break
        case 'modification':
          await this.$api.theme.put(this.theme)
          break
        default:
      }
      this.$emit('reload')
    },
    close () {
      this.$emit('close:pop-up')
    }
  }
}
</script>
