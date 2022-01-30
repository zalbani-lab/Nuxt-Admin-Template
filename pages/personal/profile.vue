<template>
  <section class="col-md-8 offset-md-2 row custom-form">
    <div class="content col-md-8 offset-md-2">
      <img src="/img/placeholder-profile.png" class="profile">
      <form method="post" @submit.prevent="updateAccount">
        <div class="input-group">
          <label>Prénom</label>
          <input v-model="editedUser.firstName" type="text" required>
        </div>
        <div class="input-group">
          <label>Nom</label>
          <input v-model="editedUser.lastName" type="text" required>
        </div>
        <div class="input-group">
          <label>Numero de telephone</label>
          <input v-model="editedUser.phone" type="text" required>
        </div>
        <div class="input-group">
          <label>Adresse email</label>
          <input v-model="editedUser.email" type="email" required>
        </div>
        <h2> Changer de mots de passe </h2>
        <div class="input-group">
          <label>Mots de passe</label>
          <input v-model="editedUser.password" type="password">
        </div>
        <div class="input-group">
          <label>Validation mots de passe</label>
          <input v-model="editedUser.validatePassword" type="password">
        </div>
        <button class="large button primary" type="submit">
          Mettre a jour !
        </button>
      </form>
      <hr>
      <h2> Zone de danger !</h2>
      <form method="post" @submit.prevent="deleteAccount">
        <button class="large button secondary" type="submit">
          Supprimer mon compte !
        </button>
      </form>
    </div>
  </section>
</template>
<script>
export default {
  layout: 'admin',
  middleware: 'connected',
  transition: 'opacity',
  fetch () {
    this.$store.commit('updatePageTitle', this.title)
  },
  data () {
    return {
      title: 'Mon profile',
      meta_desc: 'Je suis le magnifique content',
      user: {},
      editedUser: {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
        validatePassword: ''
      }
    }
  },
  created () {
    Object.assign(this.user, this.$auth.user)
    this.editedUser.firstName = this.user.firstName
    this.editedUser.lastName = this.user.lastName
    this.editedUser.phone = this.user.phone
    this.editedUser.email = this.user.email
  },
  methods: {
    async updateAccount () {
      if (this.editedUser.password !== '' && this.editedUser.validatePassword !== '') {
        if (this.editedUser.password !== this.editedUser.validatePassword) {
          this.$store.commit('sendNotification', {
            status: 'error',
            message: 'Les mots de passe que vous avez renseigner ne sont pas identique  !'
          })
        } else {
          delete this.editedUser.validatePassword
        }
      } else {
        delete this.editedUser.password
        delete this.editedUser.validatePassword
      }
      await this.$axios
        .patch('/users/' + this.$auth.user.id, this.editedUser)
        .then(
          this.$store.commit('sendNotification', {
            status: 'success',
            message: 'Votre compte a ete modifier avec succès !'
          }))

      this.$auth.fetchUser()
      this.$router.push('/personal/profile')
    },
    async deleteAccount () {
      await this.$axios
        .delete('/users/' + this.user.id)
        .then(
          this.$store.commit('sendNotification', {
            status: 'success',
            message: 'Votre compte a ete supprimer avec succès !'
          }))

      await this.$auth.logout()
      this.$router.push('/')
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
h1{
  z-index: 1;
}
@media only screen and (max-width: map-get($grid-breakpoints, 'md')){
  .row{
    margin: 0;
  }
}
.profile{
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 1px solid black;
  object-fit: cover;
  margin: 40px;
  align-self: center;
}
.content{
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
form{
  display: flex;
  flex-flow: wrap;
  justify-content: flex-end;
  .input-group{
    label{
      display: unset;
    }
    margin: 0 20px;
    width: calc(50% - 40px);
    @media only screen and (max-width: map-get($grid-breakpoints, 'md')){
      margin: 0 10px;
      width: calc(100% - 20px);
    }
  }
  h2{
    width: calc(100% - 40px);
    margin: 30px 20px;
  }
  button{
    margin: 20px 0;
  }
}
</style>
