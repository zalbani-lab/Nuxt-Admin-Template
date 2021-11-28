<template>
  <v-form v-model="isFormValid">
    <v-card>
      <v-card-title class="headline">
        <p class="admin-big">
          <b>Quel role souhaiter vous attribuer a l'utilisateur : {{ user.email }} ?</b>
        </p>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="12">
              <v-select
                v-if="user.roles"
                v-model="user.roles[0]"
                :items="roles"
                label="role"
                type="string"
                :rules="[$helpers.formRules.required]"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="secondary darken-1" text @click="close">
          Annuler
        </v-btn>
        <v-btn color="primary darken-1" text @click="save">
          Oui, modifier
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>
<script>
export default {
  props: {
    user: {
      type: Object,
      default () {
        return {
          email: '',
          password: '',
          roles: []
        }
      }
    }
  },
  data () {
    return {
      isFormValid: false,
      roles: []
    }
  },
  created () {
    this.initialize()
  },
  methods: {
    initialize () {
      this.$api.role.getAll()
        .then((response) => { response.data['hydra:member'].forEach(role => this.roles.push(role.name)) })
    },
    // Save dispatcher function
    save () {
      this.$api.user.updateRole(this.user)
      this.$emit('reload')
    },
    close () {
      this.$emit('close:pop-up')
    }
  }
}
</script>
