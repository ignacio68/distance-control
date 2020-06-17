<template>
  <StackLayout
    id="flagsList"
    verticalAlignment="top"
  >
    <ListView
      v-if="isVisibleList"
      ref="flagsList"
      height="300"
      color="black"
      backgroundColor="white"
      for="country in countries"
      @itemTap="selectedPrefix"
    >
      <v-template>
        <GridLayout
          class="list-group-item"
          rows="*"
          columns="auto, auto"
        >
          <Image 
            row="0"
            col="0"
            :src="country.flag" 
            stretch="none" 
          />
          <Label
            row="0"
            col="1"
            paddingLeft="16"
            :text="country.phone_code"
          />
        </GridLayout>
      </v-template>
    </ListView>
  </StackLayout>
</template>
<script lang="ts">
import Vue from 'vue'

import { createThumbFromImage, CropImage } from '@/utils/image'

import JSONCountries from '@/data/phone_country_code.json'
import JSONFlagIndices from '@/data/flag_indices.json'

export default Vue.extend({
  name: 'FlagsList',
  props: {
    isVisibleList:{
      type: Boolean,
      default: false
    }
  },
   data() {
    return{
      countries: [],
      countryCode: '',
      phone: '',
      prefix: '',
      flag: null,
      selectedIndex: 210,
    }
  },
  mounted() {
    this.setCountries()
    this.setValues(this.selectedIndex)
    const values = {
        prefix: this.prefix,
        flag: this.flag
      }
    this.$nextTick(() => this.$emit('selectedPrefix', values))
  },
  methods: {
    setCountries() {
      JSONCountries.map(country => {
      this.countries.push({
        country_code: country.country_code,
        flag: this.setFlag(country.country_code),
        phone_code: `+${country.phone_code}`
        })
      })
    },
    setFlag(country: string) {
      const filePath = 'assets/images/flags@2x.png'
      const leftTop = {
        x: 0,
        y: JSONFlagIndices[country] * 2
      }
      const size = {
        height: 32,
        width: 32
      }
      const resize = {
        height: 64,
        width: 64
      }
      const options: CropImage = {
        leftTop: leftTop,
        size: size,
        resize: resize
      }
      const image = createThumbFromImage(filePath, options)
      return image
    },
    setValues(selectedIndex: string) {
      this.flag = this.countries[selectedIndex].flag
      this.prefix = this.countries[selectedIndex].phone_code
      this.countryCode = this.countries[selectedIndex].country_code
    },
    selectedPrefix(e) {
      this.selectedIndex = e.index
      this.setValues(this.selectedIndex)
      const values = {
        prefix: this.prefix,
        flag: this.flag
      }
      this.$emit('selectedPrefix', values)
    },
    onFocus(){
      },
    onBlur() {}
  }
})
</script>
<style lang="scss" scoped>

</style>