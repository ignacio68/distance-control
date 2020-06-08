<template>
  <GridLayout
    class="newMarker" 
    rows="32, *"
  >
    <Label
      class="menu_title"
      row="0" 
      text="Nuevo Marcador" 
      effectiveBorderBottomWidth="1"
      borderBottomColor="black"
    />
    <GridLayout
      row="1"
      class="newMarkerMenu"
      rows="36, 32, 32, 32, 64"
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
      <ColorSelector row="2" />
      <StackLayout
        class="buttons" 
        orientation="horizontal"
        horizontalAlignment="right"
        row="3"
      >
        <Label
          class="buttons_cancel" 
          text="Cancelar"
          verticalAlignment="center"
          @tap="onCancel" 
        />
        <Button
          class="buttons_add"
          text="Añadir" 
          @tap="onAdd" 
        />
      </StackLayout>
      <NewArea 
        row="4"
      />
    </GridLayout>
  </GridLayout>
</template>

<script lang="ts">
import TextForm from '@/components/UI/TextForm.vue'
import ColorSelector from '@/components/UI/ColorSelector.vue'
import NewArea from '@/components/Map/NewArea.vue'
export default {
  name: 'NewMarker',
  components: {
    TextForm,
    ColorSelector,
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
    padding-left: 16;
    padding-right: 16;
  }
  .menu_title {
    color: black;
    font-size: 16;
    font-weight: 700;
  }
  .buttons_cancel {
    font-size: 16;
    color: #004842;
  }
  .buttons_add {
    font-size: 16;
    background-color: #004842;
  }
</style>
