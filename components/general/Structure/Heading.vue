<template>
  <section v-if="$store.state.title !== undefined" class="heading">
    <h1>
      {{ $store.state.title }}
    </h1>
    <BreadCrumbs />
  </section>
</template>
<style lang="scss" scoped>
.heading{
  z-index: 1;
  margin-top: 80px;
  margin-left: 20%;
}
</style>
