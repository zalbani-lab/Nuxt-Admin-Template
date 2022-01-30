<template>
  <v-img
    v-if="image !== null"
    :src="image.contentUrl"
    :alt="image.description"
  />
  <v-img
    v-else
    :src="placeHolderImage.contentUrl"
    :alt="placeHolderImage.description"
  />
</template>
<script>
export default {
  props: {
    image: {
      type: Object,
      default () {
        return {
          contentUrl: '/img/placeholder-image.jpeg',
          description: 'placeholder',
          title: 'placeholder title'
        }
      }
    }
  },
  data () {
    return {
      placeHolderImage: {
        contentUrl: '/img/placeholder-image.jpeg',
        description: 'placeholder',
        title: 'placeholder title'
      }
    }
  }
}
</script>
