<template>
  <section class="small">
    <div v-if="displayImage !== null">
      <p>
        {{ displayImage.title }}
      </p>
      <v-img
        :src="displayImage.contentUrl"
      />
    </div>
    <media-library-selctor @update:image="displayImage = $event; $emit('update:image', $event)" />
  </section>
</template>
<script>
import oneImageSchema from '~/assets/dataShema/oneImage.json'

export default {
  props: {
    image: {
      type: [Object, String],
      default () {
        return oneImageSchema
      }
    }
  },
  data () {
    return {
      displayImage: null
    }
  },
  watch: {
    image () {
      this.initialize()
    }
  },
  created () {
    this.initialize()
  },
  methods: {
    initialize () {
      this.displayImage = this.image
    }
  }
}
</script>
<style lang="scss" scoped>
.small{
  max-width: 200px;
  border: 1px solid black;
}
</style>
