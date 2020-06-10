<template>
  <Page actionBarHidden="true">
    <StackLayout
      orientation="vertical"
    >
      <Label
        class="menu_title"
        text="Nuevo Marcador"
        height="36"
        effectiveBorderBottomWidth="1"
        borderBottomColor="black"
      />
      <GridLayout
        class="newMarkerMenu"
        rows="36, 32, 32, 64, 32"
        columns="*"
      > 
        <TextForm
          row="0"
          class="name"
          :labelWidth="80"
          :textFieldWidth="200"
          :returnKeyType="next"
          textFormLabel="nombre:"
          :value="values.id"
          @onTextChange="setId(values.id)"
        />
        <ColorSelector row="1" />
        <TextForm
          row="2"
          class="group"
          :labelWidth="80"
          :textFieldWidth="200"
          textFormLabel="grupo:"
          :value="values.group"
          @onTextChange="setGroup(values.group)"
        />
        <NewArea 
          row="3"
        />
        <StackLayout
          class="buttons" 
          orientation="horizontal"
          horizontalAlignment="right"
          row="4"
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
      </GridLayout>
      </GridLayout>
    </stacklayout>
  </Page>
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
