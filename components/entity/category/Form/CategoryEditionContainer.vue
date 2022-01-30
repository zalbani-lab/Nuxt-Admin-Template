<template>
  <section>
    <p v-if="computedCategory !== null">
      {{ computedCategory.name }}
    </p>
    <add-category-input :already-linked-category="category" @replace-category="replaceCategory($event)" />
  </section>
</template>
<script>
export default {
  props: {
    category: {
      type: Object,
      default () {
        return { }
      }
    }
  },
  data () {
    return {
      computedCategory: null
    }
  },
  watch: {
    category () {
      this.initialize()
    }
  },
  created () {
    this.initialize()
  },
  methods: {
    initialize () {
      this.computedCategory = this.category
    },
    replaceCategory (category) {
      this.computedCategory = category
      this.emitUpdateCategory()
    },
    emitUpdateCategory () {
      this.$emit('update:category', this.computedCategory)
    }
  }
}
</script>
