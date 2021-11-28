<template>
  <div class="col-md-8 offset-md-2">
    <!--    <animation-search />-->
    <roll-up-messages />
    <calendar-vuetify />
  </div>
</template>

<script>
export default {
  layout: 'admin',
  fetch () {
    this.$store.commit('updatePageTitle', this.title)
  },
  data () {
    return {
      title: 'Dashboard',
      meta_desc: 'Je suis le magnifique content'
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: this.meta_desc }
      ]
    }
  },
  transition: 'opacity'
}
</script>
