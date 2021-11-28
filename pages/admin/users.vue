<template>
  <div class="col-md-10 offset-md-1">
    <user-list-container />
  </div>
</template>
<script>
export default {
  layout: 'admin',
  middleware: 'admin',
  fetch () {
    this.$store.commit('updatePageTitle', this.title)
  },
  data () {
    return {
      title: 'Admin : utilisateurs',
      meta_desc: ''
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
