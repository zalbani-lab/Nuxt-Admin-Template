<template>
  <v-menu
    ref="menu"
    v-model="timePickerMenu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="computedTime"
        :label="label"
        prepend-icon="mdi-clock-time-four-outline"
        readonly
        v-bind="attrs"
        v-on="on"
      />
    </template>
    <v-time-picker
      v-if="timePickerMenu"
      v-model="computedTime"
      full-width
      format="24hr"
      scrollable
      @click:minute="submitNewTime()"
    />
  </v-menu>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      default () {
        return ''
      }
    },
    time: {
      type: String,
      default () {
        return ''
      }
    },
    minTime: {
      type: String,
      default () {
        return ''
      }
    },
    timeFormat: {
      type: String,
      default () {
        return 'HH:MM'
      }
    }
  },
  data () {
    return {
      computedTime: '',
      computedMinTime: '',
      timePickerMenu: false
    }
  },
  watch: {
    time () {
      this.initTime()
    }
  },
  created () {
    this.initTime()
  },
  methods: {
    initTime () {
      this.computedTime = this.time
    },
    submitNewTime () {
      this.timePickerMenu = false
      this.$emit('update:time', this.computedTime)
    }
  }
}
</script>
