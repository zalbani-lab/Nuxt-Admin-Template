<template>
  <tiptap-vuetify :value="value" :extensions="extensions" @input="$emit('input', arguments[0])" />
</template>
<script>
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History
} from 'tiptap-vuetify'

export default {
  components: { TiptapVuetify },
  props: {
    value: {
      type: String,
      default: `
<h1>Yay Headlines!</h1>
<p>All these <strong>cool tags</strong> are working now.</p>`
    }
  },
  data () {
    return {
      extensions: [
        History,
        Blockquote,
        Link,
        Underline,
        Strike,
        Italic,
        ListItem,
        BulletList,
        OrderedList,
        [
          Heading,
          {
            options: {
              levels: [1, 2, 3]
            }
          }
        ],
        Bold,
        Code,
        HorizontalRule,
        Paragraph,
        HardBreak
      ]
    }
  }
}
</script>
<style lang="scss">
.tiptap-vuetify-editor{
  width: 100%;
  margin: 40px 0;
  &__content{
    min-height: 300px;
    box-shadow: $box-shadow;
    -moz-box-shadow: $box-shadow;
    -webkit-box-shadow: $box-shadow;
  }
}
</style>
