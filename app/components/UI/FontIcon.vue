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
      default: 'mdi'
    },
    color: {
      type: String,
      default: 'white'
    },
    size: {
      type: [String, Number],
      default: 16,
    },
    name: {
      type: String,
      required: true
    },
  }
})
</script>
