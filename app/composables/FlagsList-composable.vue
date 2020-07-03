// TODO: to refactore when composition works in Nativescript
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
// import Vue from 'vue'
import { ref, reactive, onMounted, watch, defineComponent } from '@vue/composition-api'

import { useCountry } from '@/composables/useCountry'
 
// import { createThumbFromImage, CropImage } from '@/utils/image'

import JSONCountries from '@/data/phone_country_code.json'
import JSONFlagsIndices from '@/data/flag_indices.json'

export default defineComponent({
  name: 'FlagsList',
  props: {
    isFlagsListVisible:{
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit, root }) {
    const { prefix, flag, countries, countryCode } = useCountry()
    // const { state } = useCountry()
    const { loadCountries, setPrefix, setFlag, setCountryCode, getCountries } = useCountry()
    const selectedIndex = ref(210)
    const filePath = 'assets/images/flags@2x.png'
    
    // watch ( prefix, (first, second) => console.log(`FlagsList prefix are changed, old: ${second}, new: ${first}`) )
    // watch (countries, (oldValue, newValue) => console.log('countries are changed'))

    const setValues = (selectedIndex: number) => {
      console.log(`setValues()`)
      console.log(`countries: ${countries.value.length}`)
      flag.value = countries.value[selectedIndex].flag
      prefix.value = countries.value[selectedIndex].phone_code
      countryCode.value = countries.value[selectedIndex].country_code
      // setFlag(countries[selectedIndex].flag)
      // setPrefix(countries[selectedIndex].phone_code)
      // setCountryCode(countries[selectedIndex].country_code)
      // console.log('flag:')
      // console.dir(flag.value) 
    }

    const selectedPrefix = e => {
      console.log(`selectedPrefix: ${e.index}`)
      e.preventDefault()
      selectedIndex.value = e.index
      setValues(selectedIndex.value)
      const values = {
        prefix: prefix.value,
        flag: flag.value
      }
      console.dir(values)
      emit('selected-prefix', values)
    }

    onMounted( async() => {
      console.log(`countries_1: ${countries.value.length}`)
      await loadCountries(JSONCountries, filePath, JSONFlagsIndices )
      countries.value = getCountries.value
      console.log(`countries_2: ${countries.value.length}`)
      await setValues(selectedIndex.value)
      const values = {
        prefix: prefix.value,
        flag: flag.value
      }
      console.dir(values)
      // console.log(`prefix: ${prefix.value}`)
      // emit('selected-prefix')
      // emit('selected-prefix', values)
      root.$nextTick(() => emit('selected-prefix', values))
      // root.$nextTick(() => emit('selected-prefix'))
    })
    return {
      prefix, flag, countries, countryCode, selectedPrefix, setPrefix, setFlag,
      // ...toRefs(state) , selectedPrefix, setPrefix, setFlag,
    }
  },
  // data(){
  //   return {
  //     countriesList: null
  //   }
  // },
  // mounted() {
  //   this.countriesList = this.countries
  //   console.log ('countries list: ')
  //   console.dir(this.countriesList)
  // } 
})
</script>
<style lang="scss" scoped>

</style>