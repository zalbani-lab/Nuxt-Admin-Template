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
        {{ tab.name }}
        <span :class="[tab.icon, 'tabsContainer__tabsHeaderIcon']" />
      </v-tab>
      <v-tab-item class="tabsContainer__content">
        <program-form :program="program" @reload="initialize" />
      </v-tab-item>
      <v-tab-item class="tabsContainer__content">
        <div class="col-md-9 offset-md-1">
          <h2>
            animation relie au programme :
          </h2>
          <animation-list-container :hard-filters="animationSearchParams" :display-options="animationsDisplayOption" />
        </div>
      </v-tab-item>
      <v-tab-item class="tabsContainer__content">
        <section v-if="$store.getters.isAdmin">
          <h2>Logs</h2>
          <log-list-table v-if="logs!== null " :logs="logs" />
        </section>
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
  },
  data () {
    return {
      title: 'Programme : ' + this.$route.params.id,
      meta_desc: 'Je suis le magnifique content',
      animationSearchParams: { programs: '/api/programs/'.concat(this.$route.params.id) },
      animationsDisplayOption: { search: false },
      currentTab: null,
      logs: null,
      tabs: [
        {
          id: 0,
          name: 'Programme',
          icon: 'icon-inbox'
        },
        {
          id: 1,
          name: 'animation',
          icon: 'icon-book'
        },
        {
          id: 2,
          name: 'Details',
          icon: 'icon-activity'
        }
      ],
      program: {}
    }
  },
  mounted () {
    this.initialize()
  },
  methods: {
    initialize () {
      this.loadLogs()
      this.loadProgram()
    },
    loadProgram () {
      this.$api.program.getOne(this.$route.params.id)
        .then(response => (this.program = response.data))
    },
    loadLogs () {
      if (this.$store.getters.isAdmin) {
        const params = {
          targetElement: 'programs',
          targetId: this.$route.params.id
        }
        this.$api.log.getFiltered(params)
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
