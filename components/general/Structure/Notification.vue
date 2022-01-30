<template>
  <section :class="['notification',$store.state.notificationStatus,{visible:$store.state.notification}, {visibleOut:$store.state.notificationOutAnimation}]">
    <div class="notification__icon">
      <span v-if="$store.state.notificationStatus === 'error'" class="icon-error" />
      <span v-else-if="$store.state.notificationStatus === 'success' " class="icon-success" />
      <span v-else class="icon-info" />
    </div>
    <p class="notification__message">
      {{ $store.state.notificationMessage }}
    </p>
    <div class="notification__close" @click="hideNotifications()">
      <span class="icon-x" />
    </div>
  </section>
</template>
<script>
export default {
  name: 'Notification',
  methods: {
    hideNotifications () {
      this.$store.commit('resetNotification')
      this.$store.commit('startOutAnimation')
      setTimeout(() => {
        this.$store.commit('endOutAnimation')
      }, 600)
    }
  }
}
</script>
<style lang="scss" scoped >
.notification {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  color: white;
  font-weight: 700;
  padding: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  transform: translateY(-100%);
  box-shadow: $box-shadow-sm;
  -moz-box-shadow: $box-shadow-sm;
  -webkit-box-shadow: $box-shadow-sm;
  animation-duration: $transition-duration-long;
  animation-timing-function: ease-in-out;
  &__message {
    text-align: center;
    color: white;
    flex: 1;
    margin: 0;
    padding: 0 2rem;
  }
  &__close {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background $transition-base;
    font-size: 26px;
    &:hover {
      background: rgba(0, 0, 0, 0.12);
    }
  }
  &__icon{
      font-size: 50px;
  }
  &::after {
    content: "";
    position: absolute;
    height: 10%;
    width: 100%;
    bottom: 100%;
    left: 0;
  }
  &.success {
    background: $success;
    &::after{
      background: darken($success, 10%);
    }
  }
  &.error{
    background: $danger;
    &::after{
      background: darken($danger, 10%);
    }
  }
  &.info{
    background: $info;
    &::after {
      background: darken($info, 10%);
    }
  }
  &.visible {
    animation-name: notification-in;
    animation-fill-mode: forwards;
  }
  &.visibleOut {
    animation-name: notification-out;
  }
}

@keyframes notification-in {
  0% {
    transform: translateY(-100%);
  }
  50% {
    transform: translateY(10%);
  }
  100% {
    transform: translateY(0);
  }
}
@keyframes notification-out {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10%);
  }
  100% {
    transform: translateY(-100%);
  }
}
</style>
