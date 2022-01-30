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
                v-model="user.email"
                label="Email"
                type="email"
                :rules="[$helpers.formRules.required, $helpers.formRules.email]"
              />
            </v-col>
            <v-col cols="12" sm="6" md="12">
              <v-text-field
                v-model="user.password"
                label="Password"
                type="password"
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
    user: {
      type: Object,
      default () {
        return {
          email: '',
          password: ''
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
          return 'Nouvel utilisateur'
        case 'modification':
          return 'Editer l\'user'
        default:
          return 'Error with the operation variable inside UserForm component'
      }
    }
  },
  methods: {
    // Save dispatcher function
    async save () {
      switch (this.operation) {
        case 'creation':
          await this.$api.user.post(this.user)
          break
        case 'modification':
          await this.$api.user.put(this.user)
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
