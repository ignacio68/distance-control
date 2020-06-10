<template>
  <Label
    :class="type"
    :color="color"
    :fontSize="size"
    :text="name | fonticon"
    :width="size"
    textAlignment="center"
    @tap="$emit('tap')"
  />
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'FontIcon',
  props: {
    type: {
      type: String,
      default: 'fa'
    },
    color: {
      type: String,
      default: 'white'
    },
    size: {
      type: [String, Number],
      default: 16,
      validation: s => !isNaN(s)
    },
    name: {
      type: String,
      required: true
    },
  }
})
</script>
