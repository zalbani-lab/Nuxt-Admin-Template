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
              <v-autocomplete
                v-model="email.recipient"
                :items="bddEmails"
                :loading="isLoading"
                :search-input.sync="search"
                label="Destinataires"
                chips
                deletable-chips
                multiple
                :rules="[$helpers.formRules.required]"
              />
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="12"
            >
              <v-text-field
                v-model="email.replyAddress"
                label="Addresse de reponse"
                :placeholder="this.$store.getters.loggedUser.email"
                :rules="[$helpers.formRules.email]"
              />
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="12"
            >
              <v-text-field
                v-model="email.subject"
                label="Objet"
                type="string"
                :rules="[$helpers.formRules.required]"
              />
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="12"
            >
              <v-textarea
                v-model="email.content"
                label="Contenu du mail"
                filled
                auto-grow
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
          @click="send"
        >
          Sauvegarder
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>
<script>
export default {
  data () {
    return {
      isFormValid: false,
      isLoading: false,
      search: null,
      bddEmails: [],
      email: {
        recipient: [],
        replyAddress: '',
        subject: '',
        content: ''
      },
      formTitle: 'Envoyer un nouvel email'
    }
  },
  watch: {
    search (value) {
      this.isLoading = true
      this.searchEmail(value)
    }
  },
  methods: {
    searchEmail (value) {
      const params = { email: value }
      this.$api.user.getFiltered(params)
        .then(response => this.variableAttribution(response))
    },
    // Save dispatcher function
    async send () {
      await this.formatRecipient()
      await this.$api.email.post(this.email)
      this.close()
    },
    close () {
      this.$emit('close:pop-up')
    },
    formatRecipient () {
      let concatRecipient = ''
      this.email.recipient.forEach((recipient) => { concatRecipient = concatRecipient + recipient + ';' })
      // Suppression du point virgule en fin de chaine
      concatRecipient = concatRecipient.substring(0, concatRecipient.length - 1)
      this.email.recipient = concatRecipient
    },
    variableAttribution (response) {
      const tempArrayUserEmail = []
      response.data['hydra:member'].forEach(user => tempArrayUserEmail.push(user.email))
      if (this.email.recipient.length !== 0) {
        this.email.recipient.forEach(emailAlreadySelected => tempArrayUserEmail.push(emailAlreadySelected))
      }
      this.bddEmails = tempArrayUserEmail
      this.isLoading = false
    }
  }
}
</script>
