<template>
  <GridLayout
    class="flags-list-wrapper"
    columns="120, *"
    rows="64, 64, 250"
    verticalAlignment="top"
  >
    <GridLayout
      class="flags-list-result"
      columns="*, auto"
      rows="*"
      col="0"
      row="0"
      orientation="horizontal"
      @tap="onTapPrefix"
    >
      <Image
        class="flags-list-result__flag m-l-16"
        verticalAlignment="center"
        row="0"
        col="0"
        :src="flag"
        stretch="none"
      />
      <Label
        v-model="prefix"
        class="flags-list-result__prefix p-r-8 m-y-8 text-right"
        verticalAlignment="center"
        row="0"
        col="1"
        :text="prefix"
      />
    </GridLayout>

    <TextField
      v-model="phoneNumber"
      class="phone-number m-x-0"
      col="1"
      row="0"
      keyboardType="phone"
      borderBottomRightRadius="16"
      borderTopRightRadius="16"
      borderColor="#d1dbdd"
      :text="phoneNumber"
      :hint="phoneNumberHint"
      returnKeyType="done"
      @focus="onFocus"
      @blur="onBlur"
      @textChange="onTextChange"
    />
    <FlagsList
      ref="flagsList"
      class="flags-list"
      col="0"
      row="1"
      rowSpan="2"
      :isFlagsListVisible="isFlagsListVisible"
      @selected-prefix="onSelectedPrefix"
    />

    <MDButton
      class="continue-btn m-x-0"
      col="0"
      colSpan="2"
      row="1"
      :text="buttonText"
      @tap="onDoLogIn"
    />
    <StackLayout
      class="dummy-layout"
      col="0"
      row="2"
    />
  </GridLayout>
</template>
<script lang="ts">
import Vue from 'vue'

import { AnimationRange, JsAnimationDefinition, animate } from '@/utils/animation'
import * as d3 from 'd3-ease'
// import { AnimationCurve} from '@nativescript/core/ui/enums'

import FlagsList from './FlagsList.vue'

export default Vue.extend({
  name: "PhoneNumber",

  components: {
    FlagsList
  },

  props: {
    phoneNumberHint: {
      type: String,
      default: ''
    },
    buttonText: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      phoneNumber: '',
      prefix: '',
      flag: null,
      isFlagsListVisible: false
    }
  },
  computed: {
     fullPhoneNumber() {
      return this.prefix + this.phoneNumber
    }
  },
  methods: {
    onTapPrefix(){
      if(!this.isFlagsListVisible) {
        this.isFlagsListVisible = true
        this.showFlagslist()
      } else {
        this.hideFlagslist()
      }
    },
    onSelectedPrefix(values) {
      // {prefix, flag} = values
      this.prefix = values.prefix
      this.flag = values.flag
      this.hideFlagslist()
    },
    onTextChange() {
      console.log(`phoneNumber: ${this.phoneNumber}`)
    },
    onDoLogIn() {
      // const fullPhoneNumber = this.prefix + this.phoneNumber
      console.log(`nº de teléfono: ${this.fullPhoneNumber}`)
      // setPhoneNumber(fullPhoneNumber.value)
      this.$emit('do-login', this.fullPhoneNumber)
    },
    onFocus() {
      console.log('onFocus()')
      if(this.isFlagsListVisible) this.hideFlagslist()
    },
    onBlur() {
      console.log('onBlur(')
    },

    /***** ANIMATION *****/
    showFlagslist(){
      const range: AnimationRange = {
          from: 0,
          to: 280
        }
        this.animationList(range)
    },
    hideFlagslist() {
      // TODO: Reverse the animation curve
       const range: AnimationRange = {
          from: 280,
          to: 0
        }
        this.animationList(range)
    },
    animationList(range: AnimationRange) {
      const flagsListView = this.$refs.flagsList.nativeView

      const def1: JsAnimationDefinition = {
        getRange:  () => {
          return { from: range.from, to: range.to}
        },
        curve: d3.easeCubicInOut,
        step: v => flagsListView.height = v

      }
      animate(500, [def1]).then(() => {
        if( range.to <= 0) this.isFlagsListVisible = false
      })

      // // Nativescript animation module
      // flagsList.originY = 0
      // flagsList.animate({
      //   height: 300,
      //   duration: 1000,
      //   curve: AnimationCurve.easeInOut
      // })
    }
  }
})
</script>
<style lang="scss" scoped>
@import '../../app-variables';

.flags-list-wrapper {
     background-color: white;
}

.flags-list-result {
  background-color: $surface;
  border-radius: $border-radius, 0, 0, $border-radius;

}
.flags-list-result__prefix {
  font-weight: bold;
  font-size: $font-sz-l;
  background-color: $surface;
  color: $primary-variant;
  border: {
    style: solid;
    color: $primary-light;
    width: 0 2 0 0;
  }
}
.phone-number {
  text-align: left;
  font-size: $font-sz-m;
  background-color: $surface;
  height: 100%;

  &[text] {
    padding-left: 8;
    color: $primary-variant;
    vertical-align: center;
  }
  &:focus {
    font-size: $font-sz-l;
  }
}

.flags-list {
  height: 0;
  z-index: 999;
  opacity: .8;
}
.continue-btn {
  z-index: 1;
}
.dummy-layout {
  background-color: white;
}
</style>