<template>
  <div>
    <date-picker :date="computedDateStart" :date-format="dateFormat" label="date de debut" @update:date="computedDateStart = $event, concatDateStart(), adjustDateEnd($event)" />
    <time-picker v-if="withTime" :time="computedTimeStart" label="heure de debut" @update:time="computedTimeStart = $event, concatDateStart()" />
    <date-picker :date="computedDateEnd" :min-date="computedDateStart" label="date de fin" @update:date="$emit('update:date-end', $event)" />
    <time-picker v-if="withTime" :time="computedTimeEnd" label="heure de fin" @update:time="computedTimeEnd = $event, concatDateEnd()" />
  </div>
</template>
<script>
import DatePicker from '~/components/general/FormInput/DatePicker'
import TimePicker from '~/components/general/FormInput/TimePicker'
export default {
  components: { TimePicker, DatePicker },
  props: {
    withTime: {
      type: Boolean,
      default: false
    },
    dateStart: {
      type: String,
      default () {
        return ''
      }
    },
    dateEnd: {
      type: String,
      default () {
        return ''
      }
    }
  },
  data () {
    return {
      computedDateStart: '',
      computedTimeStart: '',
      computedDateEnd: '',
      computedTimeEnd: '',
      dateFormat: 'DD/MM/YYYY',
      timeFormat: 'HH:mm'
    }
  },
  watch: {
    dateStart (newDateStart) {
      this.computedDateStart = newDateStart
      this.computedTimeStart = this.$moment(newDateStart).format(this.timeFormat)
    },
    dateEnd () {
      this.computedDateEnd = this.dateEnd
      this.computedTimeEnd = this.$moment(this.dateEnd).format(this.timeFormat)
    }
  },
  methods: {
    adjustDateEnd (newDateStart) {
      this.computedDateStart = newDateStart
      if (this.computedDateStart > this.computedDateEnd) {
        this.computedDateEnd = this.computedDateStart
      }
    },
    concatDateStart () {
      const date = this.$moment(this.computedDateStart).format(this.dateFormat)
      const time = this.computedTimeStart

      const concatDate = this.$moment(date + ' ' + time, 'DD/MM/YYYY HH:mm')

      const formatDate = this.$moment(concatDate).format()
      this.sendNewDateStart(formatDate)
    },
    concatDateEnd () {
      const date = this.$moment(this.computedDateEnd).format(this.dateFormat)
      const time = this.computedTimeEnd

      const concatDate = this.$moment(date + ' ' + time, 'DD/MM/YYYY HH:mm')

      const formatDate = this.$moment(concatDate).format()
      this.sendNewDateEnd(formatDate)
    },
    sendNewDateEnd (newDate) {
      this.$emit('update:date-end', newDate)
    },
    sendNewDateStart (newDate) {
      this.$emit('update:date-start', newDate)
    }
  }
}
</script>
