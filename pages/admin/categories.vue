<template>
  <div class="col-md-10 offset-md-1">
    <category-admin-table />
  </div>
</template>
<script>
export default {
  layout: 'admin',
  middleware: 'connected',
  fetch () {
    this.$store.commit('updatePageTitle', this.title)
  },
  data () {
    return {
      title: 'Admin : categorys',
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
