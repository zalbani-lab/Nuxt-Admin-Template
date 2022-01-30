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
                v-model="category.name"
                label="Nom du category"
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
    category: {
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
          return 'Nouveau category'
        case 'modification':
          return 'Editer le category'
        default:
          return 'Error with the operation variable inside CategoryForm component'
      }
    }
  },
  methods: {
    // Save dispatcher function
    async save () {
      switch (this.operation) {
        case 'creation':
          await this.$api.category.post(this.category)
          break
        case 'modification':
          await this.$api.category.put(this.category)
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
