<template>
  <div class="col-md-10 offset-md-1">
    <animation-admin-list-table />
  </div>
</template>
<script>
export default {
  layout: 'admin',
  middleware: 'redactor',
  fetch () {
    this.$store.commit('updatePageTitle', this.title)
  },
  data () {
    return {
      title: 'Admin : animation',
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
