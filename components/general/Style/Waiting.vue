<template>
  <div class="progressBarContainer">
    <v-progress-circular
      class="animationProgressBar"
      :size="80"
      color="primary"
      indeterminate
    />
  </div>
</template>
<style scoped lang="scss">
.progressBarContainer{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 50vh;
  width: 100%;
}
</style>
