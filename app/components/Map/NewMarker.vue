<template>
  <Page actionBarHidden="true">
    <StackLayout orientation="vertical">
      <Label
        class="menu_title"
        :text="$t('lang.components.newMarker.title')"
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
          :textFormLabel="$t('lang.components.newMarker.name')"
          :value="marker.id"
          @on-text-change="setId(marker.id)"
        />
        <Label 
          v-if="hasError"
          row="1"
          class="error"
          :text="$t('lang.components.newMarker.error')"
        />
        <ColorSelector row="2" />
        <TextForm
          row="3"
          class="group"
          :labelWidth="80"
          :textFieldWidth="200"
          :textFormLabel="$t('lang.components.newMarker.group')"
          :value="marker.group"
          @on-text-change="setGroup(marker.group)"
        />
        <NewArea 
          row="4" 
          @on-radius-change="onRadiusChange"
        />
        <StackLayout
          row="5"
          class="buttons"
          orientation="horizontal"
          horizontalAlignment="right"
        >
          <Label
            class="buttons_cancel"
            :text="$t('lang.components.newMarker.cancelButton')"
            verticalAlignment="center"
            @tap="onCancel"
          />
          <Button
            class="buttons_add"
            :text="$t('lang.components.newMarker.addButton')"
            @tap="onAdd"
          />
        </StackLayout>
      </GridLayout>
    </StackLayout>
  </Page>
</template>

<script lang="ts">
import Vue from 'vue'

import TextForm from '@/components/UI/TextForm.vue'
import ColorSelector from '@/components/UI/ColorSelector.vue'
import NewArea from '@/components/Map/NewArea.vue'

export default Vue.extend({
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
    onRadiusChange(value) {
      console.log('onRadiusChange()')
      this.$emit('on-radius-change', value)
    },
    onCancel() {
      console.log('onCancel()')
      this.$emit('on-marker-cancel')
    },
    onAdd() {
      console.log('onAdd()')
      this.$emit('on-marker-done', this.marker)
    },
  },
})
</script>

<style scoped lang="scss">
.newMarker {
  height: 360;
  vertical-aligment: bottom;
  padding-left: 16;
  padding-right: 16;
}
.menu_title {
 font-weight: 700;
}
.error {
  color: red;

}
.buttons_cancel {

}
.buttons_add {

}
</style>
