<template>
  <section class="content">
    <h1>
      Se connecter
    </h1>
    <div class="login-container">
      <form method="post" @submit.prevent="login">
        <label class="label">Email</label>
        <input
          v-model="mail"
          type="email"
          name="mail"
          placeholder="exemple@google.fr"
          required
        >
        <label class="label">Password</label>
        <input
          v-model="password"
          type="password"
          name="password"
          placeholder="Mot de passe"
          required
        >
        <button class="large button" type="submit">
          Se connecter
        </button>
      </form>
      <hr>
      <p>
        Vous avez perdu votre mots de passe ?
      </p>
      <nuxt-link to="/resetPassword">
        Mots de passe oublier
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
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        await this.$auth.loginWith('local', {
          data: {
            username: this.mail,
            password: this.password
          }
        })
        this.$store.commit('sendNotification', {
          status: 'success',
          message: 'Vous etes désormais connecter !'
        })
        this.$router.push('/dashboard')
      } catch (error) {
        this.$store.commit('sendNotification', {
          status: 'error',
          error
        })
        this.$router.push('/')
      }
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
  margin: 20px 0;
  text-align: right;
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
