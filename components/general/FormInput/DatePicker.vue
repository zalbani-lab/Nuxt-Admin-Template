<template>
  <v-menu
    ref="datePickerMenu"
    v-model="datePickerMenu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        :value="computedDate === null ? '' : $moment(computedDate).format(dateFormat)"
        :hint="dateFormat"
        :label="label"
        persistent-hint
        readonly
        prepend-icon="mdi-calendar"
        v-bind="attrs"
        v-on="on"
      />
    </template>
    <v-date-picker
      v-model="computedDate"
      :min="computedMinDate"
      no-title
      @input="submitNewDate()"
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
    date: {
      type: String,
      default () {
        return ''
      }
    },
    minDate: {
      type: String,
      default () {
        return ''
      }
    },
    dateFormat: {
      type: String,
      default () {
        return 'DD/MM/YYYY'
      }
    }
  },
  data () {
    return {
      computedDate: '',
      computedMinDate: '',
      datePickerMenu: false
    }
  },
  watch: {
    minDate () {
      this.initMinDate()
    },
    date () {
      this.initDate()
    }
  },
  created () {
    this.initDate()
    this.initMinDate()
  },
  methods: {
    initDate () {
      this.computedDate = this.date
    },
    initMinDate () {
      switch (this.minDate) {
        case 'today':
          this.computedMinDate = new Date().toISOString()
          break
        case 'tomorrow':
          this.computedMinDate = new Date(this.$moment(new Date()).add(1, 'days')).toISOString()
          break
        default:
          this.computedMinDate = this.minDate
          break
      }
    },
    submitNewDate () {
      this.datePickerMenu = false
      this.$emit('update:date', this.computedDate)
    }
  }
}
</script>
