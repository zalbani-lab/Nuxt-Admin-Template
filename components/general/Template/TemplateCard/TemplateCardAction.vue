<template>
  <ul class="actionBar">
    <li v-if="isSubscribe()" class="actionBar__item" @click="triggerSubscription">
      <span class="icon-bell-off" />Retirer
    </li>
    <li v-else class="actionBar__item" @click="triggerSubscription">
      <span class="icon-bell" />Ajouter
    </li>
    <li class="actionBar__item">
      <nuxt-link :to="'/content/animations/'+ id">
        <span class="icon-eye" />Prévisualiser
      </nuxt-link>
    </li>
    <li class="actionBar__item">
      <nuxt-link :to="'/content/animations/'+ id">
        <span class="icon-edit" />Editer
      </nuxt-link>
    </li>
    <li class="actionBar__item">
      <span class="icon-copy" />Dupliquer
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    id: {
      type: Number,
      default: 0
    },
    authors: {
      type: Array,
      default () {
        return [
          {
            id: 13,
            createdAt: '2021-02-23T12:42:58+01:00',
            updatedAt: null
          },
          {
            id: 13,
            createdAt: '2021-02-23T12:42:58+01:00',
            updatedAt: null
          }
        ]
      }
    }
  },
  data () {
    return {
      title: 'Page index',
      meta_desc: 'Je suis le magnifique content',
      hasTriggerSubscription: false,
      hisSubscribe: null
    }
  },
  mounted () {
    this.userUri = '/api/users/' + this.$auth.user.id
  },
  methods: {
    isSubscribe () {
      if (this.hasTriggerSubscription !== false) {
        return this.hisSubscribe
      } else if (this.authors.find(user => user.id === this.$auth.user.id)) {
        return true
      } else {
        return false
      }
    },
    async triggerSubscription () {
      await this.$axios
        .patch('/public/animations/' + this.id + '/triggerSubscribtion',
          {},
          {
            params: {
              userId: this.$auth.user.id
            }
          }
        )
        .then((response) => {
          this.hasTriggerSubscription = true
          if (response.data.users.includes(this.userUri)) {
            this.hisSubscribe = true
            this.$store.commit('sendNotification', {
              status: 'success',
              message: 'Vous venez d\'ajouter le animation: ' + this.id + ' a vos animations  !'
            })
          } else {
            this.hisSubscribe = false
            this.$store.commit('sendNotification', {
              status: 'success',
              message: 'Vous venez de retirer le animation: ' + this.id + ' de vos animations  !'
            })
          }
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.icon-bell{
  color: $green;
}
.icon-bell-off{
  color: $pink;
}
.icon-eye{
  color: $blue;
}
.icon-edit{
  color: $orange;
}
.icon-copy{
  color: $teal;
}
.actionBar{
  box-shadow: $box-shadow;
  -webkit-box-shadow: $box-shadow;
  -moz-box-shadow: $box-shadow;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  background-color: white;
  display: flex;
  flex-flow: column;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: space-between;
  border-radius: $border-radius-lg;
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: center;
  li{
    width: inherit;
  }
  &__item {
    cursor: pointer;
    padding: 0 5px;
    color: black;
    font-size: 12px;
    line-height: 17px;
    font-weight: bold;
    height: calc(300px / 4);
    display: flex;
    flex-direction: column;
    justify-content: center;
    a {
      font-weight: inherit;
      font-size: inherit;
      line-height: inherit;
      color: inherit;
      height: inherit;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    span {
      display: block;
      font-size: 18px;
      padding-bottom: 8px;
    }
    &:hover {
      background-color: $primary;
      color: white;
      span {
        color: white;
      }
    }
  }
}
</style>
