<template>
  <section class="templateCard">
    <template-card-info class="templateCard__info" :card-data="cardData">
      <template v-slot:card-content>
        <slot name="card-content" />
      </template>
    </template-card-info>
    <template-card-action v-if="cardAction !== null" :id="cardData.id" class="templateCard__actionBar" :authors="cardData.users" />
  </section>
</template>
<script>

export default {
  props: {
    cardData: {
      type: Object,
      default () {
        return {
          objectType: '',
          objectId: 0,
          primaryBand: '',
          secondaryBand: '',
          rightBand: '',
          image: null,
          title: '',
          tags: []
        }
      }
    },
    cardAction: {
      type: Object,
      default () {
        return null
      }
    }
  }
}
</script>
<style scoped lang="scss">
.templateCard{
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
    .templateCard {
      &__actionBar {
        transition-duration: 0.2s;
        transition-timing-function: ease-in-out;
        opacity: 1;
      }
    }
  }
}
</style>
