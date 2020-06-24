<template>
  <StackLayout 
    orientation="vertical"
  >
    <!-- <CustomSlider
      class="radiusSlider"
      sliderName="$t('lang.components.newArea.distance')"
      :minValue="0"
      :maxValue="100"
      :value="radius"
      @on-index-changed="onRadiusChanged"
    /> -->
    <CustomSlider
      class="opacitySlider"
      :sliderName="$t('lang.components.newArea.opacity')"
      :minValue="0"
      :maxValue="100"
      :value="opacity"
      @on-index-changed="onOpacityChanged"
    />
  </Stacklayout>
</template>

<script lang="ts">
import Vue from 'vue'

import CustomSlider from '@/components/UI/CustomSlider.vue'

export default Vue.extend({
  name: 'NewArea',
  components: {
    CustomSlider
  },
  data(){
    return {
      radius: 0,
      opacity: 0
    }
  },
  methods: {
    onRadiusChanged(value) {
      this.$emit('in-radius-change', value)
    },
    onOpacityChanged(value) {
      this.$emit('in-opacity-change', value)
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
-c