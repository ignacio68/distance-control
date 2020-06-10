<template>
  <GridLayout
    class="customSlider"
    columns="100,*"
    color="black"

  >
    <Label
      col="0"
      class="customSlider_name"
      :text="sliderName"
    />
    <GridLayout
      col="1"
      rows="24, 24"
      columns="100, *, 100"
    >
      <Slider
        col="0"
        row="0"
        colSpan="3"
        class="customSlider_slider"
        :minValue="minValue"
        :maxValue="maxValue"
        :value="value"
        @selectedIndexChanged="$emit('onIndexChanged', value)"
      />
      <Label
        col="0"
        row="1"
        class="customSlider_minValue"
        backgroundColor="blue"
        :text="minValue"
      />
      <!-- <Label
        col="1"
        row="1"
        text="solo estoy para rellenar"
        backgroundColor="red"
      /> -->
      <Label
        col="2"
        row="1"
        class="customSlider_maxValue"
        backgroundColor="lime"
        :text="maxValue"
      />
    </GridLayout>
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
      right: 8;
    }
    font-size: 16;
  }
  .customSlider_minValue {
    padding {
      left: 24;
    }
  }
  .customSlider_maxValue {
    paddinf {
      right: 24;
    }
  }
</style>
