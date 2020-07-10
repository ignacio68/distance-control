<template>
  <StackLayout 
    orientation="horizontal"
    verticalAlignment="middle"
  >
    <Label
      class="color_title"
      :text="$t('lang.components.colorSelector.text')"
      :width="labelWidth"
      textWrap="true"
    />
    <StackLayout orientation="horizontal">
      <Label
        v-for="color in colors"
        :key="color.name"
        ref="colorItem"
        class="color_list-item"
        :backgroundColor="color.color"
        borderColor="#00251e"
        borderWidth="1"
        @Tap="onTap(color)"
      />
    </StackLayout>
  </StackLayout>
</template>

<script lang="ts">
import Vue from 'vue'

import { AnimationCurve } from '@nativescript/core/ui/enums'
import { Color } from '@nativescript/core/color'

export default Vue.extend({
  name: 'ColorSelector',
  props: {
    labelWidth: {
      type: [String, Number],
      default: 80
    }
  },
  data() {
    return {
      colors: 
        [
          { name: 'blue', color: '#31aec4' },
          { name: 'indigo', color: '#a191ff' },
          { name: 'violet', color: '#d17bff' },
          { name: 'orange', color: '#cc9633' },
          { name: 'red', color: '#ff765d'} ,
          { name: 'pink', color: '#ff6ea1' }
        ]
    }
  },
  methods:{
      onTap(color) {
        this.colorItemRipple
        this.$emit('on-selected-color', color)
        console.log(`color: ${color.name}`)
      },
      // FIXME: fix the color animation, doesn't work
      colorItemRipple() {
        const colorItem = this.$refs.colorItem.nativeView
        const currentColor = colorItem.color
        const newColor = new Color(10, 0, 122, 122)
        colorItem
          .animate({
            curve: AnimationCurve.linear,
            duration: 500,
            color: newColor,
          })
          .then(() => {
            colorItem
              .animate({
                curve: colorItem.linear,
                duration: 500,
                color: currentColor
              })
              .then(() => {})
          })
          .catch(() => {})
      }
    }
})
</script>

<style lang="scss" scoped>
@import '../../app-variables';

  .color_title {

  }
  .color_list-item {
    margin-left: 8;
    width: 24;
    height: 24;
  }
</style>>
