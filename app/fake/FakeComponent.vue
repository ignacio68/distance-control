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
export default {
  name:'FakeComponent',
  props: {
    msg:{
      type: String,
      default: 'FAKE COMPONENT'
    }
  }

}
</script>

<style lang="scss" scoped>

</style>