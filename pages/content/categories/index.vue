<template>
  <section class="col-md-8 offset-md-2">
    <category-admin-table />
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
      title: 'Les categories',
      meta_desc: 'Je suis le magnifique content',
      programs: [],
      displayCard: true
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
