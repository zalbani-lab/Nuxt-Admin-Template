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
          color="primary darken-1"
          text
          :disabled="!isFormValid"
          @click="send"
        >
          Envoyer
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
        subject: '',
        content: ''
      },
      sentEmail: {
        recipient: ['pro.pierson.alban@gmail.com'],
        replyAddress: '',
        subject: '',
        content: ''
      },
      formTitle: 'Envoyer un email'
    }
  },
  created () {
    this.sentEmail.replyAddress = this.$auth.user.email
  },
  methods: {
    // Save dispatcher function
    async send () {
      await this.createEmail()
      await this.$api.email.post(this.sentEmail)
      this.close()
    },
    close () {
      this.$emit('close:pop-up')
    },
    async createEmail () {
      this.sentEmail.subject = this.email.subject
      await this.formatRecipient()
      await this.addContextInformation()
    },
    formatRecipient () {
      let concatRecipient = ''
      this.sentEmail.recipient.forEach((recipient) => { concatRecipient = concatRecipient + recipient + ';' })
      // Suppression du point virgule en fin de chaine
      concatRecipient = concatRecipient.substring(0, concatRecipient.length - 1)
      this.sentEmail.recipient = concatRecipient
    },
    addContextInformation () {
      const userEmailContent = this.email.content
      let context = ''

      context += '<h2>Infos utilisateur</h2> <br/> ' +
        'id : ' + this.$auth.user.id +
        '<hr/>' +
        '<h2>Infos pages</h2> <br/> ' +
        'page en cours d\'utilisation : ' + this.$router.currentRoute.fullPath +
        '<hr/>' +
        '<h2>Message de l\'utilisateur</h2> <br/> '

      this.sentEmail.content = context + userEmailContent
    }
  }
}
</script>
