<template>
  <nuxt-link :to="{ path: redirectUrl() }" class="templateCard">
    <span v-if="cardData.primaryBand" class="templateCard__band templateCard__band--primary">
      {{ cardData.primaryBand }}
    </span>
    <span v-if="cardData.secondaryBand" class="templateCard__band templateCard__band--secondary">
      {{ cardData.secondaryBand }}
    </span>
    <span v-if="cardData.rightBand" class="templateCard__band templateCard__band--right" :style="{ backgroundColor: cardData.rightBand.color}">
      {{ cardData.rightBand.content }}
    </span>
    <abstract-image v-if="cardData.image" :image="cardData.image" class="templateCard__image" />

    <section class="templateCardContent">
      <h3 v-if="cardData.title" class="templateCardContent__title">
        {{ cardData.title }}
      </h3>
      <p class="templateCardContent__summary">
        <slot name="card-content" />
        <template v-if="cardData.summary">
          {{ cardData.summary }}
        </template>
      </p>
      <section v-if="cardData.tags" class="templateCardContent__tagsList">
        <ul v-if="cardData.tags.length > 2">
          <li v-for="(n, i) in 2" :key="cardData.tags[i]">
            #{{ cardData.tags[i] }}
          </li>
          <li>
            ...
          </li>
        </ul>
        <ul v-else-if="cardData.tags.length !== 0 ">
          <li v-for="tag in cardData.tags" :key="tag">
            #{{ tag }}
          </li>
        </ul>
      </section>
      <p class="templateCardContent__id">
        ID : {{ cardData.objectId }}
      </p>
    </section>
    <Arrow class="templateCard__arrow" />
  </nuxt-link>
</template>
<script>

import AbstractImage from '~/components/general/Abstract/AbstractImage'
export default {
  components: { AbstractImage },
  props: {
    cardData: {
      type: Object,
      default () {
        return {
          objectType: '',
          objectId: 0,
          primaryBand: '',
          secondaryBand: '',
          rightBand: {
            content: '',
            color: ''
          },
          image: null,
          title: '',
          summary: '',
          tags: []
        }
      }
    }
  },
  methods: {
    redirectUrl () {
      const concatUrl = '/content/' + this.cardData.objectType + 's/' + this.cardData.objectId
      return concatUrl
    }
  }
}
</script>
<style scoped lang="scss">
.templateCard {
  display: flex;
  position: relative;
  background-color: white;
  box-shadow: $box-shadow;
  -webkit-box-shadow: $box-shadow;
  -moz-box-shadow: $box-shadow;
  border-radius: $border-radius-lg;

  &__band {
    position: absolute;
    display: inline-block;
    text-align: center;
    height: auto;
    min-width: 150px;
    padding: 5px 20px;
    font-family: "Montserrat Bold", sans-serif;
    color: white;
    z-index: 1;
    border-radius: 0 $border-radius $border-radius 0;
    top: 20px;
    left: 0;

    &--primary {
      top: 20px;
      background-color: $primary;
    }

    &--secondary {
      top: 70px;
      background-color: $secondary;
    }

    &--right {
      left: unset;
      right: 0;
      background-color: #2dce89;
      border-radius: $border-radius 0 0 $border-radius;
    }
  }

  &__image {
    width: 30%;
    margin: 0;
    border-radius: $border-radius-lg 0 0 $border-radius-lg;
  }

  &Content {
    display: flex;
    flex-direction: column;
    padding: 20px 10%;
    width: 70%;

    &__title {
      padding: 10px 0;
      color: black;
      font-size: 30px;
      line-height: 40px;
    }
    &__summary {
      box-sizing: border-box;
      height: 100px;
      text-align: left;
      overflow: hidden;
      position: relative;
      &::after{
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        text-align: center;
        padding: 30px 0;
        background-image: linear-gradient(to bottom, transparent, #ffffff);
      }
    }

    &__tagsList {
      margin: auto 0 0;

      ul {
        list-style: none;
        display: flex;
        padding: 0;
        margin: 0;

        li {
          color: black;
          background-color: #EFEFEF;
          border: 4px solid #D2D2D2;
          border-radius: $border-radius;
          padding: 5px 10px;
          margin: 10px;
          font-size: 11px;
          line-height: 22px;
          font-weight: normal;

          &:first-of-type {
            margin-left: 0;
          }
        }
      }
    }

    &__id {
      color: white;
      position: absolute;
      left: 20px;
      bottom: 0;
      padding: 4px 20px;
      border-radius: 4px;
      font-size: 20px;
      line-height: 30px;
      font-family: "Montserrat Bold", sans-serif;
      margin-left: auto;
      margin-right: 0;
      background: rgba(0, 0, 0, 0.8);
      @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
        background: unset;
        -webkit-backdrop-filter: saturate(180%) blur(10px);
        backdrop-filter: saturate(180%) blur(10px);
      }
    }
  }
  &__arrow {
    position: absolute;
    right: 20px;
    bottom: 20px;
  }
  &:hover {
    .templateCard {
      &__arrow {
        -webkit-box-shadow: 0 0 0 -1px $secondary;
        -moz-box-shadow: 0 0 0 -1px $secondary;
        box-shadow: 0 0 0 -1px $secondary;
      }
    }
  }
}
</style>
