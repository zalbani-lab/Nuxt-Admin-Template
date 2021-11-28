<template>
  <section class="content">
    <h1>
      Mots de passe oublier !?
    </h1>
    <div class="login-container">
      <p>
        Ne vous inquiétez pas nous avons la situation sous controle !
        Nous allons vous envoyés <b>un nouveaux mots de passe par email</b> !
      </p>
      <form method="post" @submit.prevent="resetPassword">
        <label class="label">Email</label>
        <input
          v-model="mail"
          type="email"
          name="mail"
          placeholder="example@google.fr"
          required
        >
        <button class="large button" type="submit">
          Envoyé !
        </button>
      </form>
      <hr>
      <p>
        Retours a la page de connexion
      </p>
      <nuxt-link to="/">
        Connexion
      </nuxt-link>
    </div>
  </section>
</template>
<script>
export default {
  layout: 'form',
  transition: 'opacity',
  data () {
    return {
      mail: '',
      error: null
    }
  },

  methods: {
    resetPassword () {
      this.$axios.get('/public/forgottenPasswords/',
        {
          params: {
            email: this.mail
          }
        })
        .then(() => {
          this.$store.commit('sendNotification', {
            status: 'success',
            message: 'Un nouveau mots de passe a ete envoye avec succes a : ' + this.mail + ' !'
          })
        })
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: this.meta_desc }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.content{
  width: 40%;
  margin: 0 auto;
  @media only screen and (max-width: map-get($grid-breakpoints, 'md')){
    width: 90%;
  }
}
h1{
  width: 100%;
  height: calc(8vh - 24px);
  text-align: center;
  align-self: flex-start;
  font-size: 30px;
  line-height: 40px;
  padding-top: 10px;
  @media only screen and (max-width: map-get($grid-breakpoints, 'md')){
    min-height: calc(8vh - 24px);
    height: auto;
  }
}
form{
  text-align: right;
  margin: 40px 0;
  button{
    margin: 20px 0;
    display: inline-block;
  }
}

.login-container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 62vh;
  @media only screen and (max-width: map-get($grid-breakpoints, 'md')){
    min-height: calc(92vh - 40px);
    height: auto;
    margin: 20px 0;
  }
  a{
    text-decoration: underline;
    align-self: flex-end;
  }
}

</style>
