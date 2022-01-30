<template>
  <v-form v-model="isFormValid">
    <v-card>
      <v-card-title>
        <span class="headline">{{ formTitle }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="12">
              <v-text-field
                v-model="animation.title"
                label="Title"
                type="text"
                :rules="[rules.required]"
              />
            </v-col>
            <v-col cols="12" sm="6" md="12">
              <v-text-field
                v-model="animation.shortDescription"
                label="Description courte"
                type="text"
                :rules="[rules.required]"
              />
            </v-col>
            <v-col cols="12" sm="6" md="12">
              <v-text-field
                v-model="animation.longDescription"
                label="Description longue"
                type="text"
                :rules="[rules.required]"
              />
            </v-col>
            <v-col>
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="animation.publicationDate"
                    label="Date de publication souhaiter"
                    hint="MM/DD/YYYY"
                    persistent-hint
                    readonly
                    prepend-icon="mdi-calendar"
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="animation.publicationDate"
                  no-title
                  :min="new Date(Date.now()).toISOString()"
                  @input="menu = false"
                />
              </v-menu>
            </v-col>
            <v-col>
              <image-edition-container :image="animation.image" @update:image="animation.image = $event" />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="secondary darken-1" text @click="close">
          Annuler
        </v-btn>
        <v-btn color="primary darken-1" text :disabled="!isFormValid" @click="save">
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
    animation: {
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
      menu: false,
      isFormValid: false,
      rules: {
        required: value => !!value || 'Required.'
      }
    }
  },
  computed: {
    formTitle () {
      switch (this.operation) {
        case 'creation':
          return 'Nouvel animation'
        case 'modification':
          return 'Editer l\'animation'
        default:
          return 'Error with the operation variable inside AnimationForm component'
      }
    }
  },
  methods: {
    // Save dispatcher function
    async save () {
      switch (this.operation) {
        case 'creation':
          await this.$api.animation.post(this.animation)
          break
        case 'modification':
          await this.$api.animation.put(this.animation)
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
