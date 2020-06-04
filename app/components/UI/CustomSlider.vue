<template>
  <GridLayout
    class="customSlider"
    rows="*"
    columns="auto, auto, *, auto"
    color="black"
    verticalAlignment="center"
  >
    <Label
      col="0"
      class="customSlider_name"
      :text="sliderName"
      textWrap="true"
    />
    <Label
      col="1"
      class="customSlider_minValue"
      :text="minValue"
      textWrap="true"
    />
    <Slider
      col="2"
      class="customSlider_slider"
      :minValue="minValue"
      :maxValue="maxValue"
      :value="value"
      @@selectedIndexChanged="$emit('onIndexChanged', value)"
    />
    <Label
      col="3"
      class="customSlider_maxValue"
      :text="maxValue"
      textWrap="true"
    />
  </GridLayout>
</template>

<script lang="ts">
export default {
  name: 'CustomSlider',
  props: {
    sliderName: {
      type: String,
      default: '',
    },
    minValue: {
      type: Number,
      default: 0,
      validation: (s) => !isNaN(s),
    },
    maxValue: {
      type: Number,
      default: 1,
      validation: (s) => !isNaN(s),
    },
    value: {
      type: Number,
      default: 0,
      validation: (s) => !isNaN(s),
    },
  },
}
</script>

<style lang="scss" scoped>
  .customSlider_name {
    padding {
      left: 16;
      right: 8;
    }
  }
  .customSlider_minValue {
    padding {
      left: 8;
      right: 8;
    }
  }
  .customSlider_maxValue {
    padding {
      left: 8;
      right: 16;
    }
  }
</style>
