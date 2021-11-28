<template>
  <section>
    <p v-if="computedTheme !== null">
      {{ computedTheme.name }}
    </p>
    <add-theme-input :already-linked-theme="theme" @replace-theme="replaceTheme($event)" />
  </section>
</template>
<script>
export default {
  props: {
    theme: {
      type: Object,
      default () {
        return { }
      }
    }
  },
  data () {
    return {
      computedTheme: null
    }
  },
  watch: {
    theme () {
      this.initialize()
    }
  },
  created () {
    this.initialize()
  },
  methods: {
    initialize () {
      this.computedTheme = this.theme
    },
    replaceTheme (theme) {
      this.computedTheme = theme
      this.emitUpdateTheme()
    },
    emitUpdateTheme () {
      this.$emit('update:theme', this.computedTheme)
    }
  }
}
</script>
