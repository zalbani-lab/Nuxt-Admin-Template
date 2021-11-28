<template>
  <section class="col-md-8 offset-md-2 row">
    <steper :current-step="currentStep" @event="safeMove($event)" />
    <v-form v-model="formValid" class="form" method="post" @submit.prevent="submitForm">
      <h2>step {{ currentStep }} : animation- {{ this.$route.params.id }}</h2>
      <slot name="inputs" />
      <v-btn :class="['large', 'button', 'secondary', {'vanish':currentStep === 1}]" @click="safePreviousStep">
        Étape precedente
      </v-btn>
      <v-btn v-if="!isLastStep" class="large button primary" type="submit" :disabled="!formValid">
        Étape suivante
      </v-btn>
      <v-btn v-else class="large button primary" type="submit" :disabled="!formValid">
        Terminer
      </v-btn>
    </v-form>
    <v-dialog v-model="dialogNoSaving" max-width="800px">
      <v-card>
        <v-card-title class="headline">
          <p class="admin-big">
            <b>Attention !</b><br>
            Etes-vous sur de vouloir changer d'etape ? <br>
            Les donnees rentrer a cet étape ne seront pas sauvegarder
          </p>
        </v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary darken-1" text @click="closeNoSavingDialog">
            Rester sur cette étape
          </v-btn>
          <v-btn color="secondary darken-1" text @click="confirmMove">
            Aller a l'etape : {{ stepToMoveTo }} sans sauvegarder
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>
<script>
import oneAnimationSchema from '~/assets/dataShema/oneAnimation.json'

export default {
  props: {
    currentAnimation: {
      type: Object,
      default () {
        return oneAnimationSchema
      }
    },
    currentStep: {
      type: Number,
      default: 1
    },
    isFormValid: {
      type: Boolean,
      default: false
    },
    isLastStep: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      animation: {},
      formValid: false,
      dialogNoSaving: false,
      stepToMoveTo: 0
    }
  },
  watch: {
    isFormValid () {
      this.formValid = this.isFormValid
    },
    currentAnimation () {
      this.animation = Object.assign({}, this.currentAnimation)
    }
  },
  created () {
    this.animation = Object.assign({}, this.currentAnimation)
  },
  methods: {
    submitForm () {
      if (this.$route.params.id === undefined) {
        this.createAnimation()
      } else {
        this.updateAnimation()
      }
    },
    updateAnimation () {
      this.$api.animation.put(this.currentAnimation)
        .then(() => this.nextStep())
    },
    createAnimation () {
      this.$api.animation.post(this.currentAnimation, true)
        .then((response) => {
          this.animation = response.data
          this.nextStep()
        })
    },
    nextStep () {
      const nextStepNumber = this.currentStep + 1
      this.redirectTo(nextStepNumber)
    },
    safeMove (stepNumber) {
      if (this.haveBeenUpdated()) {
        this.stepToMoveTo = stepNumber
        this.openNoSavingDialog()
      } else {
        this.redirectTo(stepNumber)
      }
    },
    safePreviousStep () {
      this.safeMove(this.currentStep - 1)
    },
    confirmMove () {
      this.redirectTo(this.stepToMoveTo)
    },
    redirectTo (stepNumber) {
      this.closeNoSavingDialog()
      const baseStepUrl = '/form/animation/step'
      const road = baseStepUrl + stepNumber + '/' + this.animation.id
      this.$router.push(road)
    },
    haveBeenUpdated () {
      return !this.$helpers.objectEquality.isAnimationsEquals(this.currentAnimation, this.animation)
    },
    openNoSavingDialog () {
      this.dialogNoSaving = true
    },
    closeNoSavingDialog () {
      this.dialogNoSaving = false
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
