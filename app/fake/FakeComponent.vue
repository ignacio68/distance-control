<template>
  <StackLayout>
    <Label
      :text="msg"
      textWrap="true"
      color="black"
    />
  </StackLayout>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name:'FakeComponent',
  props: {
    msg:{
      type: String,
      default: 'FAKE COMPONENT'
    }
  }
})
</script>

<style lang="scss" scoped>

</style>