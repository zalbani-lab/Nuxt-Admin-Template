<template>
  <ul class="actionBar">
    <li class="actionBar__item">
      <nuxt-link :to="'/content/animations/'+ animationId">
        <span class="icon-edit" />Editer
      </nuxt-link>
    </li>
    <li class="actionBar__item">
      <span class="icon-copy" />Dupliquer
    </li>
    <li class="actionBar__item">
      <nuxt-link :to="'/content/animations/'+ animationId">
        <span class="icon-eye" />Prévisualiser
      </nuxt-link>
    </li>
    <li class="actionBar__item actionBar__item--danger" @click="openDeleteDialog">
      <span class="icon-trash" />Supprimer
    </li>
    <v-dialog v-model="dialogDelete" max-width="800px">
      <v-card>
        <v-card-title class="headline">
          <p class="admin-big">
            <b v-if="$store.getters.isAdmin">Cet action est irreversible.</b><br>
            Etes-vous sur de vouloir supprimer le animation : {{ animationId }} ?
          </p>
        </v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary darken-1" text @click="closeDeleteDialog">
            Non, Annuler
          </v-btn>
          <v-btn color="secondary darken-1" text @click="deleteAnimation">
            Oui, supprimer
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </ul>
</template>
<script>
export default {
  props: {
    animationId: {
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
      hisSubscribe: null,
      dialogDelete: false
    }
  },
  mounted () {
    this.userUri = '/api/users/' + this.$auth.user.id
  },
  methods: {
    deleteAnimation () {
      this.$api.animation.delete(this.animationId)
        .then(() => this.closeDeleteDialog())
        .then(() => this.$emit('delete'))
    },
    closeDeleteDialog () {
      this.dialogDelete = false
    },
    openDeleteDialog () {
      this.dialogDelete = true
    }
  }
}
</script>
<style lang="scss" scoped>
.icon-edit{
  color: $blue;
}
.icon-eye{
  color: $orange;
}
.icon-copy{
  color: $teal;
}
.icon-trash{
  color: $red;
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
    &--danger{
      &:hover {
        background-color: $red;
      }
    }
  }
}
</style>
