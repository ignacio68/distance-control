<template>
  <Page actionBarHidden="true">
    <StackLayout orientation="vertical">
      <Label
        class="menu_title"
        text="Nuevo Marcador"
        height="36"
        effectiveBorderBottomWidth="1"
        borderBottomColor="black"
      />
      <GridLayout
        class="newMarkerMenu"
        rows="36, auto, 32, 32, 64, 32"
        columns="*"
      >
        <TextForm
          row="0"
          class="name"
          :labelWidth="60"
          :textFieldWidth="200"
          :maxLenght="24"
          returnKeyType="next"
          textFormLabel="nombre:"
          :value="marker.id"
          @onTextChange="setId(marker.id)"
        />
        <Label 
          v-if="hasError"
          row="1"
          class="error"
          text="Faltan el nombre y/o las coordenadas"
        />
        <ColorSelector row="2" />
        <TextForm
          row="3"
          class="group"
          :labelWidth="80"
          :textFieldWidth="200"
          textFormLabel="grupo:"
          :value="marker.group"
          @onTextChange="setGroup(marker.group)"
        />
        <NewArea row="4" />
        <StackLayout
          row="5"
          class="buttons"
          orientation="horizontal"
          horizontalAlignment="right"
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
    </StackLayout>
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
    NewArea,
  },
  props: {
    hasError: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      marker: {
        id: '',
        coordinates: {
          lat: '',
          lng: '',
        },
        group: '',
        color: '',
      },
      area: {
        id: '',
        center: {
          lat: '',
          lng: '',
        },
        radius: 1,
        color: '',
        opacity: .5,
        group: '',
      }
    }
  },
  methods: {
    setId(id) {
      console.log('setId()')
      this.marker.id = id
    },
    setGroup(group) {
      console.log('setgroup()')
      this.marker.group = group
    },
    onCancel() {
      console.log('onCancel()')
      this.$emit('onMarkerCancel')
    },
    onAdd() {
      console.log('onAdd()')
      this.$emit('onMarkerDone', this.marker)
    },
  },
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
.error {
  color: red;
  font-size: 16;
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
