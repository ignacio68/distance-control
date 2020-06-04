<template>
  <GridLayout
    rows="56, 56, *"
    columns="*"
  >
    <TextForm
      row="0"
      class="myTextForm"
      :labelWidth="80"
      :textFieldWidth="200"
      :returnKeyType="next"
      textFormLabel="nombre:"
      :value="values.id"
      @onTextChange="setId(values.id)"
    />
    <TextForm
      row="1"
      class="myTextForm"
      :labelWidth="80"
      :textFieldWidth="200"
      textFormLabel="grupo:"
      :value="values.group"
      @onTextChange="setGroup(values.group)"
    />
    <Button 
      row="2"
      text="Añadir" 
      @tap="onTap" 
    />
  </GridLayout>
</template>

<script lang="ts">
import TextForm from '@/components/UI/TextForm.vue'
export default {
  name: 'NewMarker',
  components: {
    TextForm
  },
  data() {
    return {
      values: {
        id: "pepe",
        group: ""
      }
    }
  },
  methods: {
    setId(id) {
      console.log('setId()')
      this.values.id = id
    },
    setGroup(group) {
      console.log('setgroup()')
      this.values.group = group
    },
    onTap() {
      console.log('onTap()')
      this.$emit('onMarkerDone', this.values)
      // this.$emit('onMarkerDone')
    }
  }
}
</script>

<style scoped lang="scss">
 .myTextForm {
  border: 3 solid green;
}
</style>
