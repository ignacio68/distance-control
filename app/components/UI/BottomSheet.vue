<template>
  <StackLayout
    ref="bottomSheet"
    class="bottomSheet"
  >
    <Label
      text="Este es el menu emergente"
      textWrap="true"
    />
  </stacklayout>
</template>

<script lang="ts">
import { screen } from '@nativescript/core/platform'
import { CubicBezierAnimationCurve } from  '@nativescript/core/ui/animation'

export default {
  name:"BottomSheet",
  mounted() {
    this.bottomSheetLoaded()
    this.$root.$on('setNewMarker', () => this.showBottomSheet())
    this.$root.$on('closeNewMarker', () => this.hideBottomSheet())
  },

  methods: {
    bottomSheetLoaded() {
      const bottomSheet = this.$refs.bottomSheet.nativeView

      bottomSheet.translateY = screen.mainScreen.heightDIPs
    },
    showBottomSheet() {
      console.log('showBottomSheet()')
      const bottomSheet = this.$refs.bottomSheet.nativeView

      bottomSheet.animate({
        duration: 1000,
        translate: { x: 0, y: 200 },
        curve: new CubicBezierAnimationCurve(.44, .63, 0, 1)
      })
      console.log(`BottomSheet.y: ${this.$refs.bottomSheet.nativeView}`)
    },
    hideBottomSheet() {
      const bottomSheet = this.$refs.bottomSheet.nativeView

      bottomSheet.animate({
        duration: 1000,
        translate: { x: 0, y: screen.mainScreen.heightDIPs },
        curve: new CubicBezierAnimationCurve(.44, .63, 0, 1)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.bottomSheet {
  background-color: red;
}

</style>