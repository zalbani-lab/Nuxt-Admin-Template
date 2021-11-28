<template>
  <section>
    <animation-card v-for="animation in animations" :key="animation.id" :animation="animation" />
    <p v-if="animations.length === 0">
      Aucun resultat pour cet recherche
    </p>
  </section>
</template>
<script>
export default {
  props: {
    animations: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>
