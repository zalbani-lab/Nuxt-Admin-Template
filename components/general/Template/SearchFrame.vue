<template>
  <v-card class="searchFrame col-md-8 offset-md-2">
    <v-form method="post" @submit.prevent="emitSearch">
      <v-container fluid class="searchFrameContent">
        <v-row class="col-md-10 offset-md-1">
          <v-card-title class="searchFrameContent__title">
            {{ searchTitle }}
          </v-card-title>
          <v-card-text class="searchFrameContent__inputs col-md-10 ">
            <v-row>
              <slot name="shown-inputs" />
            </v-row>
            <v-expand-transition v-if="hasHiddenInput">
              <v-row v-show="show">
                <slot name="hidden-inputs" />
              </v-row>
            </v-expand-transition>
          </v-card-text>
          <v-btn v-if="hasHiddenInput" class="push col-md-2" plain @click="show = !show">
            <v-icon>mdi-tune</v-icon>
            <span> Filtres </span>
          </v-btn>
        </v-row>
        <div class="searchFrameContent__submit">
          <button type="submit">
            <search-button />
          </button>
        </div>
      </v-container>
    </v-form>
  </v-card>
</template>
<script>
export default {
  props: {
    searchTitle: {
      type: String,
      default: 'Rechercher'
    },
    hasHiddenInput: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    emitSearch () {
      this.$emit('search')
    }
  }
}
</script>

<style lang="scss" scoped>
.searchFrame{
  position: relative;
  margin: 10px;
  &Content{
    display: flex;
    align-content: center;
    flex-wrap: wrap;
    &__title{
      width: 100%;
    }
    &__inputs{
      width: 90%;
    }
    &__submit{
      position: absolute;
      right: -28px;
      display: flex;
      justify-content: flex-end;
      align-self: center;
      width: 10%;
    }
  }
}
.push{
  align-self: center;
}
form{
  display: flex;
  flex-flow: wrap;
  justify-content: flex-end;
  .input-group{
    label{
      display: unset;
    }
    margin: 0 20px;
    width: calc(50% - 40px);
    @media only screen and (max-width: map-get($grid-breakpoints, 'md')){
      margin: 0 10px;
      width: calc(100% - 20px);
    }
  }
  h2{
    width: calc(100% - 40px);
    margin: 30px 20px;
  }
}
</style>
