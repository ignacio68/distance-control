<template>
  <StackLayout 
    orientation="vertical"
  >
    <!-- <CustomSlider
      class="radiusSlider"
      sliderName="Radio"
      :minValue="0"
      :maxValue="100"
      :value="radius"
      @onIndexChanged="onRadiusChanged"
    /> -->
    <CustomSlider
      class="opacitySlider"
      sliderName="Opacidad"
      :minValue="0"
      :maxValue="100"
      :value="opacity"
      @onIndexChanged="onOpacityChanged"
    />
  </Stacklayout>
</template>

<script lang="ts">
import CustomSlider from '@/components/UI/CustomSlider.vue'
export default {
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
      this.$emit('inRadiusChange', value)
    },
    onOpacityChanged(value) {
      this.$emit('inOpacityChange', value)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
