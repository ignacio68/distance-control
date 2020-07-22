<template>
  <Page actionBarHidden="true">
    <StackLayout orientation="vertical">
      <Label
        class="menu_title"
        :text="$t('lang.components.newArea.title')"
        height="32"
        borderColor="#00251e"
      />
      <GridLayout
        class="new-area-menu"
        rows="auto, auto, 48, 64"
        columns="*"
      >
        <CustomSlider
          class="radius-slider"
          row="0"
          :sliderName="$t('lang.components.newArea.distance')"
          :minValue="0"
          :maxValue="100"
          :value="radius"
          @on-index-changed="onRadiusChanged"
        />
        <CustomSlider
          class="opacity-slider"
          row="1"
          :sliderName="$t('lang.components.newArea.opacity')"
          :minValue="0"
          :maxValue="100"
          :value="opacity"
          @on-index-changed="onOpacityChanged"
        />
        <ColorSelector
          row="2"
          :labelWidth="64"
          @on-selected-color="setColor"
        />
        <StackLayout
          row="3"
          class="new-marker-menu_buttons"
          width="100%"
          orientation="horizontal"
          horizontalAlignment="right"
        >
          <MDButton
            class="new-area-menu_button_cancel"
            width="144"
            :text="$t('lang.components.newArea.cancelButton')"
            borderColor="#007a70"
            borderWidth="1"
            @tap="onCancel"
          />
          <MDButton
            class="new-area-menu_button_add m-r-0"
            width="144"
            :text="$t('lang.components.newArea.addButton')"
            @tap="onAdd"
          />
        </StackLayout>
      </Gridlayout>
    </StackLayout>
  </Page>
</template>

<script lang="ts">
import Vue from 'vue'

import CustomSlider from '@/components/UI/CustomSlider.vue'
import ColorSelector from '@/components/UI/ColorSelector.vue'

export default Vue.extend({
  name: 'NewArea',
  components: {
    CustomSlider,
    ColorSelector
  },
  data(){
    return {
      radius: 0,
      opacity: 0,
      area: {
        id: '',
        center: {
          lat: '',
          lng: '',
        },
        radius: 1,
        color: '#31aec4',
        opacity: .5,
        group: '',
      }
    }
  },
  methods: {
    onRadiusChanged(value) {
      this.$emit('in-radius-change', value)
    },
    onOpacityChanged(value) {
      this.$emit('in-opacity-change', value)
    },
     setColor(color) {
      console.log(`color: ${color.name}`)
      this.area.color = color.color
    },
     onCancel() {
      console.log('onCancel()')
      this.$emit('on-new-area-cancel')
    },
    async onAdd() {
      console.log('onAdd()')
      await this.isValid().then(() => {
        if (this.hasError === null) this.$emit('on-new-area-done', this.area)
        else return
      })
    },
  }
})
</script>

<style lang="scss" scoped>
@import '../../app-variables';

.menu_title {
 font-weight: 700;
 font-size: 16;
 color: $primary-variant;
 opacity: .8;
 border-bottom: 1, solid, rgba($primary, .1);
}
.new-area-menu_button_cancel {
  color: $primary;
  background-color: white;
  text-align: center;
}
</style>
