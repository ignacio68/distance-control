<template>
  <GridLayout
    class="SearchLocation"
    columns="auto, 300, auto"
  >
    <Image
      class="search_icon m-8"
      col="0"
      tintColor="#668d8e"
      src="res://ic_search_white_24dp"
    />
    <TextField
      v-model="location"
      class="search_text m-y-8 m-x-0"
      col="1"
      :width="textFieldWidth"
      verticalAlignment="center"
      borderColor="white"
      color="#668d8e"
      isEnabled="isEnabled"
      editable="isEditable"
      keyboardType="url"
      returnKeyType="search"
      :hint="hint"
      :maxLength="maxLengthText"
      :text="location"
      @returnPress="onReturnPress"
      @textChange="onTextChange"
    />
    <Image
      class="remove_icon m-8"
      col="2"
      tintColor="#668d8e"
      src="res://ic_add_circle_white_24dp"
      @tap="removeLocation"
    />
  </GridLayout>
</template>

<script script lang="ts">
import Vue from 'vue'

import { geocoder } from '@/services/geocoderService'

import { mapToken } from '@/setup/map'

export default Vue.extend({
  name: "GeocoderFake",
  props: {
    textFieldWidth: {
      type: Number,
      default: 200
    },
    hint: {
      type: String,
      default: "Search..."
    },
    maxLengthText: {
      type: Number,
      default: 200
    }

  },
  data(){

    return {
      location: '',
      result: null,
    }
  },

  methods: {
    searchLocation(query) {
      const config = {
        query: query
      }
      geocoder(mapToken, config)
    },
    onReturnPress() {
      const result = this.searchLocation(this.location)
      // console.log(`La dirección buscada es: ${JSON.stringify(result)}`)
      this.$emit('on-location-search', result)
    },
    onTextChange() {
      console.log(`onTextChange: ${this.location}`)
    },
    removeLocation() {
      this.location = ""
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../../app-variables';

.SearchLocation {
  border-color: $primary-light;
  &[text] {
    padding-left: 8;
    color: $primary-variant;
    vertical-align: center;
    font-size: $font-sz-l;
  }
}
.search_icon {
  width: 36;
  height: 36;
}
.remove_icon {
  width: 36;
  height: 36;
  rotate: 45;
}
</style>