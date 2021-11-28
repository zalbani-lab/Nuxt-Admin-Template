<template>
  <TemplateCard :card-data="animationCardInfo" class="animationCard" />
</template>
<script>
import oneAnimationSchema from '~/assets/dataShema/oneAnimation.json'

export default {
  props: {
    animation: {
      type: Object,
      default () {
        return oneAnimationSchema
      }
    }
  },
  data () {
    return {
      animationCardInfo: {
        objectType: 'animation',
        objectId: this.animation.id,
        primaryBand: this.animation.category?.name,
        image: this.animation.image,
        title: this.animation.title,
        summary: this.animation.shortDescription,
        secondaryBand: null,
        rightBand: null,
        tags: null
      }
    }
  }
}
</script>
