<template>
  <section>
    <waiting v-if="awaitPropsToLoad" />
    <v-form v-else v-model="isFormValid" class="animationForm" method="post" @submit.prevent="submitForm">
      <section class="animationForm__main">
        <v-text-field v-model="animation.title" label="Titre" type="text" :rules="[rules.required]" />
        <v-text-field v-model="animation.shortDescription" label="Description courte" type="text" :rules="[rules.required]" />
        <Editor v-model="animation.longDescription" class="editor" />
        <v-btn class="large button primary" type="submit" :disabled="!isFormValid">
          mettre a jour !
        </v-btn>
      </section>
      <aside class="animationForm__side">
        <image-edition-container :image="animation.image" class="tempMargin" @update:image="animation.image = $event" />
        <program-edition-container :programs="animation.programs" class="tempMargin" @update:programs="animation.programs = $event" />
        <status-container :animation="animation" @reload="$emit('reload')" @update:publication-date="animation.publicationDate = $event" />
        <theme-edition-container :theme="animation.theme" @update:theme="animation.theme = $event" />
        <tag-edition-container :tags="animation.tags" class="tempMargin" @update:tags="animation.tags = $event" />
        <!--        <type-selector :already-selected-type="animation.type" class="tempMargin" @update:type="animation.type = $event" />-->
      </aside>
    </v-form>
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
      awaitPropsToLoad: true,
      isFormValid: false,
      rules: { required: value => !!value || 'Required.' }
    }
  },
  watch: {
    animation () {
      this.awaitPropsToLoad = false
    }
  },
  methods: {
    submitForm () {
      this.$api.animation.put(this.animation)
        .then(() => this.triggerEventReload())
    },
    triggerEventReload () {
      this.$emit('reload')
    },
    unPublish () {
      this.$api.animation.unPublish(this.animation.id)
        .then(() => this.triggerEventReload())
    },
    publish () {
      this.$api.animation.publish(this.animation.id)
        .then(() => this.triggerEventReload())
    },
    canHavePublicationDate () {
      return this.animation.status.name !== 'PUBLIER' && this.animation.status.name !== 'DEPUBLIER'
    }
  }
}
</script>
<style lang="scss" scoped>
.animationForm {
  width: 100%;
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  &__main {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    padding: 20px;
    width: 80%;
    .v-input{
      width: 100%;
    }
    button {
      align-self: flex-end;
    }
    .editor{
      width: 100%;
      margin-bottom: 40px;
    }
  }
  &__side {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    width: 20%;
    .tempMargin{
      margin: 20px 0;
    }
  }
}
</style>
