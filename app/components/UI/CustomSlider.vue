<template>
  <GridLayout
    rows="*"
    columns="auto, auto, *, auto"
  >
    <Label
      col="0"
      :text="sliderName"
      textWrap="true"
    />
    <Label
      col="1"
      :text="minValue"
      textWrap="true"
    />
    <Slider
      col="2"
      :minValue="minValue"
      :maxValue="maxValue"
      :value="value"
      @valueChange="$emit('ontapDraweMenu', value)"
    />
    <Label
      col="3"
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

<style lang="scss" scoped></style>
