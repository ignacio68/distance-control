<template>
  <StackLayout
    id="flagsList"
    verticalAlignment="top"
  >
    <ListView
      v-if="isFlagsListVisible"
      ref="flags-list"
      height="280"
      for="country in countries"
      @itemTap="selectedPrefix"
    >
      <v-template>
        <GridLayout
          class="list-item"
          rows="*"
          columns="auto, auto"
          verticalAlignment="center"
        >
          <Image 
            class="list-item__flag"
            row="0"
            col="0"
            :src="country.flag" 
            stretch="none" 
          />
          <Label
            class="list-item__prefix p-l-16 font-sz-s"
            row="0"
            col="1"           
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
import JSONFlagsIndices from '@/data/flag_indices.json'

export default Vue.extend({
  
  name: 'FlagsList',
  props: {
    isFlagsListVisible:{
      type: Boolean,
      default: false
    }
  },
  data() {
    return{ 
      countries: [],
      countryCode: '',
      prefix: '',
      flag: null,
      selectedIndex: 210,
      countriesFilePath: 'assets/images/flags@2x.png'
    }
  },
  created() {
    console.log('created()')
    this.loadCountries(JSONCountries, this.countriesFilePath, JSONFlagsIndices)
  },
  async mounted() {
    console.log('mounted()')
    this.setValues(this.selectedIndex)
    const values = {
        prefix: this.prefix,
        flag: this.flag
      }
    this.$nextTick(() => this.$emit('selected-prefix', values))
  },
  methods: {
    loadCountries (countriesList, filePath: string, flagsIndices) {
      console.log('loadCountries()')
      countriesList.map((country) => {
        this.countries.push (
          {
            country_code: country.country_code,
            flag: this.loadFlag(country.country_code, filePath, flagsIndices),
            phone_code: `+${country.phone_code}`
          }
        )
      })
      console.log(`countries: ${this.countries.length}`)
    },
    loadFlag(country: string, filePath: string, flagsIndices){
      console.log('loadFlag()')
      const leftTop = {
        x: 0,
        y: flagsIndices[country] * 2
      }
      const size = {
        height: 32,
        width: 32
      }
      const resize = {
        height: 96,
        width: 96
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
      console.log(`setValues()`)
      this.flag = this.countries[selectedIndex].flag
      this.prefix = this.countries[selectedIndex].phone_code
      this.countryCode = this.countries[selectedIndex].country_code
    },
    selectedPrefix(e) {
      console.log(`selectedPrefix: ${e.index}`)
      this.selectedIndex = e.index
      this.setValues(this.selectedIndex)
      const values = {
        prefix: this.prefix,
        flag: this.flag
      }
      console.dir(values)
      this.$emit('selected-prefix', values)
    },
  }
})
</script>
<style lang="scss" scoped>

</style>