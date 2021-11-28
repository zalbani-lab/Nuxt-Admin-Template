<template>
  <section class="col-md-9 offset-md-1">
    <v-tabs
      v-model="currentTab"
      class="tabsContainer"
      grow
      centered
      icons-and-text
    >
      <v-tab v-for="tab in tabs" :key="tab.id">
        <span :class="[tab.icon, 'tabsContainer__tabsHeaderIcon']" />
        {{ tab.name }}
      </v-tab>
      <v-tab-item class="tabsContainer__content">
        <animation-form :animation="animation" @reload="initialize" />
      </v-tab-item>
      <v-tab-item class="tabsContainer__content">
        <calendar-vuetify :hard-filters="dateSearchParams" />
        <date-list-container :hard-filters="dateSearchParams" :display-options="datesDisplayOption" />
      </v-tab-item>
      <v-tab-item class="tabsContainer__content">
        <v-card flat>
          <section v-if="$store.getters.isAdmin">
            <h1>Logs</h1>
            <log-list-table v-if="logs!== null " :logs="logs" />
          </section>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </section>
</template>
<script>
export default {
  layout: 'admin',
  middleware: 'redactor',
  transition: 'opacity',
  fetch () {
    this.$store.commit('updatePageTitle', this.title)
    this.$store.commit('showBreadcrumbs', true)
  },
  data () {
    return {
      title: 'Animation : ' + this.$route.params.id,
      meta_desc: 'Je suis le magnifique content',
      dateSearchParams: { animation: '/api/animations/'.concat(this.$route.params.id) },
      datesDisplayOption: { search: false },
      currentTab: null,
      logs: null,
      tabs: [
        {
          id: 0,
          name: 'Animation',
          icon: 'icon-book'
        },
        {
          id: 1,
          name: 'Dates',
          icon: 'icon-calendar'
        },
        {
          id: 2,
          name: 'Details',
          icon: 'icon-activity'
        }
      ],
      animation: {}
    }
  },
  created () {
    this.initialize()
  },
  methods: {
    initialize () {
      this.loadLogs()
      this.loadAnimation()
    },
    loadAnimation () {
      this.$api.animation.getOne(this.$route.params.id)
        .then(response => (this.animation = response.data))
    },
    loadLogs () {
      const logFilter = {
        targetElement: 'animations',
        targetId: this.$route.params.id
      }
      if (this.$store.getters.isAdmin) {
        this.$api.log.getFiltered(logFilter)
          .then(response => (this.logs = response.data['hydra:member']))
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.v-tab{
  background-color: rgba($primary, 0.1);
  color: $primary!important;
  transition: background-color 150ms 150ms ease-in-out;
  &--active{
    background-color: white;
  }
}
.tabsContainer{
  box-shadow: $box-shadow;
  -moz-box-shadow: $box-shadow;
  -webkit-box-shadow: $box-shadow;
  border-radius: $border-radius-lg;
  &__tabsHeaderIcon{
    font-size: 18px;
  }
  &__content{
    padding: 40px;
  }
}
</style>
