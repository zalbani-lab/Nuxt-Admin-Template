<template>
  <div :class="['helpBubble', {'helpBubble--full':isActive}]">
    <div class="helpBubble__iconContainer" @click="triggerBubble">
      <v-icon color="white" :class="[{'vanish': isActive}]">
        mdi-lifebuoy
      </v-icon>
      <v-icon color="white" :class="[{'vanish': !isActive}]">
        mdi-close
      </v-icon>
    </div>
    <div class="helpBubble__content">
      <h2>Vous avez besoin d'aide !?</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, delectus dignissimos expedita minima mollitia porro provident soluta tempora velit. Eveniet hic ipsum laudantium molestiae nostrum, possimus provident repudiandae similique voluptatem!</p>
      <help-email-form class="helpBubble__form" @close:pop-up="triggerBubble" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isActive: false
    }
  },
  methods: {
    triggerBubble () {
      this.isActive = !this.isActive
    }
  }
}
</script>

<style lang="scss" scoped>
.helpBubble{
  z-index: 999999999;
  overflow: hidden;
  position: fixed;
  background-color: $primary;
  bottom: 15px;
  right: 15px;
  width: 60px;
  max-height: 60px;
  transition-duration: 0.5s;
  border-radius: 25px 25px 0 25px;
  &--full{
    width: 500px;
    max-height: 80vh;
    border-radius: 10px 10px 0 10px;
    .helpBubble__iconContainer{
      height: 40px;
      display: flex;
      align-items: flex-start;
      justify-content: flex-end;
    }
  }
  &__iconContainer{
    cursor: pointer;
    color: white;
    width: 100%;
    height: 60px;
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    padding: 10px;
    .v-icon{
      font-size: 32px;
    }
  }
  &__content{
    color: white;
    padding: 0 20px 20px;
  }
}
</style>
