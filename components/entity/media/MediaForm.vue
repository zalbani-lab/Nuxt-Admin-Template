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
              <v-file-input
                v-if="operation === 'creation'"
                v-model="media.image"
                label="Image"
                filled
                prepend-icon="mdi-camera"
                :rules="[$helpers.formRules.required]"
              />
              <v-file-input
                v-else
                v-model="media.image"
                label="Image"
                filled
                prepend-icon="mdi-camera"
              />
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="12"
            >
              <v-text-field
                v-model="media.title"
                label="Titre de l'image"
                type="string"
              />
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="12"
            >
              <v-text-field
                v-model="media.legend"
                label="Legende de l'image"
                type="string"
              />
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="12"
            >
              <v-text-field
                v-model="media.target"
                label="Target de l'image"
                type="string"
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
    media: {
      type: Object,
      default () {
        return {
          image: {},
          title: '',
          legend: '',
          target: ''
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
          return 'Nouveau media'
        case 'modification':
          return 'Editer le media'
        default:
          return 'Error with the operation variable inside MediaForm component'
      }
    }
  },
  methods: {
    // Save dispatcher function
    async save () {
      switch (this.operation) {
        case 'creation':
          await this.$api.media.post(this.media)
          break
        case 'modification':
          if (this.media.image === undefined) {
            await this.$api.media.patch(this.media)
          } else {
            await this.$api.media.put(this.media)
          }
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
