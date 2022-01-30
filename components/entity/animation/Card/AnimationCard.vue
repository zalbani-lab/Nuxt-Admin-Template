<template>
  <section :class="['animationCard', {'vanish':hasBennDelete}]">
    <animation-card-info class="animationCard__info" :animation="animation" />
    <animation-card-action class="animationCard__actionBar" :authors="animation.users" :animation-id="animation.id" @delete="hasBennDelete = true" />
  </section>
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
      hasBennDelete: false
    }
  }
}
</script>
<style scoped lang="scss">
.animationCard{
  width: 100%;
  margin: 30px 0;
  position: relative;
  &:first-of-type{
    margin-top: 0;
  }
  &__info{
    width: 100%;
    height: 300px;
  }
  &__actionBar{
    opacity: 0;
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
    position: absolute;
    top: 0;
    width: 100px;
    right: -120px;
    height: inherit;
    overflow: hidden;
  }
  &:hover{
    .animationCard {
      &__actionBar {
        transition-duration: 0.2s;
        transition-timing-function: ease-in-out;
        opacity: 1;
      }
    }
  }
}
</style>
