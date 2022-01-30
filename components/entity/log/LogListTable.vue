<template>
  <v-data-table
    :headers="headers"
    :items="logs"
    :server-items-length="logs.length"
    :options.sync="options"
    hide-default-footer
    show-expand
    class="elevation-1"
  >
    <template v-slot:item.method="{ item }">
      <log-method-display :method="item.method" />
    </template>
    <template v-slot:expanded-item="{headers, item}">
      <td :colspan="(headers.length)">
        <div class="divide-by-2">
          <p>La requête :</p>
          <code>
            {{ item.request }}
          </code>
        </div>
        <div class="divide-by-2">
          <p>La réponse :</p>
          <code>
            {{ item.response }}
          </code>
        </div>
      </td>
    </template>
    <template v-slot:item.targetId="{ item }">
      <NuxtLink v-if="item.method !== 'DELETE'" :to="getIdRedirection(item)">
        {{ item.targetId }}
      </NuxtLink>
      <p v-else>
        <b>{{ item.targetId }}</b>
      </p>
    </template>
    <template v-slot:item.level="{ item }">
      <log-criticality-display :level="item.level" />
    </template>
    <template v-slot:item.createdAt="{ item }">
      <p>
        {{ $moment(item.createdAt).format("DD/MM/YYYY HH:mm:ss") }}
      </p>
    </template>
    <template v-slot:no-data>
      Aucune données
    </template>
  </v-data-table>
</template>
<style>
.divide-by-2{
  display: inline-block;
  box-sizing: border-box;
  vertical-align: top;
  width: calc(50% - 20px);
  padding: 10px;
  margin: 0;
}
</style>
<script>
export default {
  props: {
    logs: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      options: undefined,
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Auteur', value: 'author' },
        { text: 'Methode', value: 'method' },
        { text: 'Element cible', value: 'targetElement' },
        { text: 'Id de l\'element', value: 'targetId', sortable: false },
        { text: 'Criticité', value: 'level' },
        { text: 'Requête / Response', value: 'data-table-expand', sortable: false },
        { text: 'Date', value: 'createdAt' }
      ]
    }
  },
  watch: {
    options: {
      async handler (newOptions) {
        const newFilters = await this.$helpers.filters.constructor(newOptions)
        this.$emit('add-filters', newFilters)
      },
      deep: true
    }
  },
  methods: {
    getIdRedirection (item) {
      return '/content/' + item.targetElement + '/' + item.targetId
    }
  }
}
</script>
