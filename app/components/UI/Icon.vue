<template>
  <StackLayout
    class="Icon"
    :width="size"
    :height="size"
    horizontalAlignment="middle"
    verticalAlignment="middle"
    backgroundColor="transparent"
  >
    <GridLayout
      class="icon_wrapper"
      rows="auto" 
      columns="auto"
      backgroundColor="transparent"
    >
      <Label
        ref="iconRipple"
        class="icon_ripple"
        col="0"
        row="0"
        height="48"
        width="48"
        borderRadius="50%"
        opacity="0"
      />
      <Image
        class="icon_image"
        width="24"
        height="24"
        :src="name"
        @tap="onTap"
      />  
    </GridLayout>
  </StackLayout>
</template>
<script lang="ts">
import Vue from 'vue'

const AnimationCurve = require('tns-core-modules/ui/enums').AnimationCurve

export default Vue.extend ({
  name: "Icon",
  props: {
    name: {
      type: String,
      default: ''
    },
    size: {
      type: [String, Number],
      default: '48'
    },
    // iconColor: {
    //   type: String,
    //   required: true
    // },
    // rippleColor: {
    //   type: String,
    //   required: true
    // }
  },
  methods: {
    onTap(e) {
      this.$emit('onTap', e)
      this.radioRipple()
    },
    radioRipple() {
      const iconRipple = this.$refs.iconRipple.nativeView
      iconRipple
        .animate({
          curve: AnimationCurve.linear,
          duration: 100,
          opacity: 0.4
        })
        .then(() => {
          iconRipple
            .animate({
              curve: AnimationCurve.linear,
              duration: 100,
              opacity: 0.0
            })
            .then(() => {})
        })
        .catch(() => {})
    },
  },
})
</script>
<style lang="scss" scoped>
@import '../../app-variables';

.icon_ripple {
  background-color: $accent;
}
.icon_image {
  color: white;
}
</style>
