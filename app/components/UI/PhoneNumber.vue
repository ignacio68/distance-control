<template>
  <GridLayout
    columns="88, *"
    rows="auto, 64, 200"
    backgroundColor="white"
    verticalAlignment="top"
  >
    <StackLayout
      id="flagsList_result"
      col="0" 
      row="0"
      orientation="horizontal"
      color="black"
      @tap="onTapPrefix"
    >
      <Image 
        row="0"
        col="0"
        :src="flag" 
        stretch="none" 
      />
      <Label
        class="flagsList_result_prefix" 
        :text="prefix"
      /> -->
    </StackLayout>

    <MDTextField
      id="textField"
      col="1"
      row="0"
      backgroundColor="white"
      color="black"
      keyboardType="number"
      placeholderColor="gray"
      :text="phone"
      :hint="phoneNumberHint"
      returnKeyType="done"
      @focus="onFocus"
      @blur="onBlur"
      @textChange="onTextChange"
    />

    <FlagsList
      ref="flagsList"
      class="flagsList"
      col="0"
      row="1"
      rowSpan="2"
      :isVisibleList="isVisibleList"
      @selectedPrefix="onSelectedPrefix"
    />

    <MDButton
      col="0"
      colSpan="2"
      row="1"
      class="button"
      :text="buttonText"
      @tap="onDoLogIn"
    />
  </GridLayout>
</template>
<script lang="ts">
import Vue from 'vue'

import { AnimationRange, JsAnimationDefinition, animate } from '@/utils/animation'
import * as d3 from 'd3-ease'

import FlagsList from '@/components/UI/FlagsList.vue'

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
    return{
      isVisibleList: false,
      selectedIndex: 210,
      flag: '',
      prefix: '',
      phone: '',
    }
  },

  mounted(){
    console.log('PhoneNumber mounted()')
  },

  methods: {
    onTapPrefix() {
      if(!this.isVisibleList) {
        this.isVisibleList = true
        this.expandList()
      } else {
       this.contrainList()
      }
    },
    expandList () {
      const range: AnimationRange = {
          from: 1, 
          to: 300
        }
        this.animationList(range)
    },
    contrainList() {
       const range: AnimationRange = {
          from: 300, 
          to: 1
        }
        this.animationList(range)
    },
    onSelectedPrefix(values) {
      this.prefix = values.prefix
      this.flag = values.flag
      this.contrainList()
    },
    onTextChange(args) {
      this.phone = args.value
      console.log(this.phone)
    },
    onDoLogIn() {
      const completePhoneNumber: string = this.prefix + this.phone
      console.log(`nº de teléfono: ${completePhoneNumber}`)
      this.$emit('doLogIn', completePhoneNumber)   
    },
    onFocus(){
      console.log('onFocus()')
      if(this.isVisibleList) this.contrainList()
    },
    onBlur() {},

    /***** ANIMATION *****/
    animationList(range: AnimationRange) {
      const flagsList = this.$refs.flagsList.nativeView

      const def1: JsAnimationDefinition = {
        getRange:  () => {
          return { from: range.from, to: range.to}
        },
        curve: d3.easeCubicInOut,
        step: v => flagsList.height = v
          
      }
      animate(500, [def1]).then(() => {
        if( range.to === 1) this.isVisibleList = false
      })
    }
  }
})
</script>
<style lang="scss" scoped>
#countriesList {
  font-size: 16;
  height: 24;
  padding-left: 8;
  background-color: white;
}
#textField {
  font-size: 16;
}
#flagsList_result {
  margin-left: 12;
  margin-top: 26;
  font-size: 16;
}
.flagsList_result_prefix {
  margin-left: 12;
}
.flagsList {
  height: 1;
  z-index: 999;
}
.button {
  background-color: teal;
  z-index: 1;
}
</style>