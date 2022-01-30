<template>
  <section class="col-md-8 offset-md-2">
    <animation-list-container :display-options="animationsDisplayOption" :hard-filters="userFilter" />
    <hr>
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
      title: 'Mes animations',
      meta_desc: 'Je suis le magnifique content',
      userFilter: { users: '/api/users/'.concat(this.$auth.user.id) },
      animationsDisplayOption: { search: false }
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
