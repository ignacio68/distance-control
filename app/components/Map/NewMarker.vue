<template>
  <GridLayout
    class="newMarker" 
    rows="auto, *"
    backgroundColor="white"
    borderTopLeftRadius="16"
    borderTopRightRadius="16"
  >
    <Label
      row="0" 
      text="Nuevo Marcador" 
      textWrap="true"
    />
    <GridLayout
      row="1"
      class="newMarkerMenu"
      rows="32, 32, 32, 64"
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
      <StackLayout 
        orientation="horizontal"
        row="2"
      >
        <Button 
          text="Cancelar" 
          @tap="onCancel" 
        />
        <Button 
          text="Añadir" 
          @tap="onAdd" 
        />
      </StackLayout>
      <NewArea 
        row="3"
      />
    </GridLayout>
  </GridLayout>
</template>

<script lang="ts">
import TextForm from '@/components/UI/TextForm.vue'
import NewArea from '@/components/Map/NewArea.vue'
export default {
  name: 'NewMarker',
  components: {
    TextForm,
    NewArea
  },
  data() {
    return {
      values: {
        id: "",
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
    onCancel() {
      console.log('onCancel()')
      this.$emit('onMarkerCancel')
      // this.$emit('onMarkerDone')
    },
    onAdd() {
      console.log('onAdd()')
      this.$emit('onMarkerDone', this.values)
      // this.$emit('onMarkerDone')
    }
  }
}
</script>

<style scoped lang="scss">
  .newMarker {
    height: 360;
    vertical-aligment: bottom;
  }
  .myTextForm {
  border: 3 solid green;
}
</style>
