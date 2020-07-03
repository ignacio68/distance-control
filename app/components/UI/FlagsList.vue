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
          columns="auto, auto, auto"
          verticalAlignment="center"
        >
          <Image 
            class="list-item__flag"
            col="0"
            :src="country.flag" 
            stretch="none" 
          />
          <Label
            class="list-item__code p-l-8 font-sz-s"
            col="1"           
            :text="country.country_code"
          />
          <Label
            class="list-item__prefix p-l-8 font-sz-s"
            col="2"           
            :text="country.phone_code"
          />
        </GridLayout>
      </v-template>
    </ListView>
  </StackLayout>
</template>
<script lang="ts">
import Vue from 'vue'

import { loadCountries } from '@/utils/countries'

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
      countriesFilePath: 'assets/images/flags@2x.png'
    }
  },
  created() {
    this.countries = loadCountries({
                        countriesList: JSONCountries, 
                        filePath: this.countriesFilePath, 
                        flagsIndices: JSONFlagsIndices
                        })
  },
  async mounted() {
    this.setValues('50')
  },
  methods: {
    setValues(index: string) {
      this.flag = this.countries[index].flag
      this.prefix = this.countries[index].phone_code
      this.countryCode = this.countries[index].country_code
      const values = {
        prefix: this.prefix,
        flag: this.flag
      }
      this.$emit('selected-prefix', values)
    },
    selectedPrefix(e) {
      this.setValues(e.index)
    },
  }
})
</script>
<style lang="scss" scoped>

</style>