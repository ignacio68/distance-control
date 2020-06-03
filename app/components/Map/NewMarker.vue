<template>
  <GridLayout
    rows="1"
    columns="1"
  >
    <StackLayout orientation="horizontal">
      <Label
        text="nombre"
        textWrap="true"
      />
      <TextField
        v-model="markerName"
        :editable="true"
        :maxLength="16"
        keyboardType="url"
        returnKeyType="done"
        :text="markerName"
        @textChange="ontextChange()"
      />
    </StackLayout>
  </GridLayout>
</template>

<script lang="ts">
export default {
  name: 'NewMarker',
  data() {
    return {
      markerName: null
    }
  },
  methods: {
    onTextChange() {
      this.emit('textChange', this.markerName)
    }
  }
}
</script>

<style scoped lang="scss">

</style>