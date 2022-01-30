<template>
  <div>
    <div class="topBar" />
  </div>
</template>
<style lang="scss" scoped>
.topBar{
  position: absolute;
  top: 0;
  height: 115px;
  z-index: 0;
  width: calc(100% - 60px);
  margin-left: 60px;
  padding: 0 60px 60px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: center;
  background-color: $primary;
  color: white;
}
</style>
