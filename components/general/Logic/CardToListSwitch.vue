<template>
  <section class="customSwitch">
    <span class="icon-list" />
    <v-switch
      v-model="switchModel"
      @change="$emit('trigger-switch')"
    />
    <span class="icon-credit-card" />
  </section>
</template>
<script>
export default {
  data () {
    return {
      switchModel: true
    }
  }
}
</script>
<style scoped lang="scss">
.customSwitch{
  display: flex;
  box-sizing: border-box;
  vertical-align: top;
  align-items: center;
  margin-left: auto;
  width: 110px;
  span{
    color: black;
    font-size: 20px;
    padding: 5px;
  }
}
</style>
