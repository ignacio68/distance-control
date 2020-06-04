<template>
  <GridLayout 
    rows="*"
  >
    <CustomSlider
      sliderName="radius"
      :minValue="0"
      :maxValue="100"
      :value="radius"
      @onIndexChanged="onIdexChanged()"
    />
  </GridLayout>
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
      radius: 0
    }
  },
  methods: {
    onIndexChanged(value) {
      this.$emit('inRadiusChange', value)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
