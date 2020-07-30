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
    <RadAutoCompleteTextView
      ref="autocomplete"
      v-model="location"
      class="search_text m-y-8 m-x-0"
      col="1"
      verticalAlignment="middle"
      :minimumCharactersToSearch="minimumCharactersToSearch"
      :text="location"
      :hint="hint"
      :noResultsText="noResultsText"
      :completionMode="completionMode"
      :suggestMode="suggestMode"
      :displayMode="displayMode"
      :layaoutMode="layoutMode"
      :items="dataItems"
    >
      <SuggestionView
        ~suggestionView
        suggestionViewHeight="200"
      >
        <StackLayout
          v-suggestionItemTemplate
          orientation="vertical"
        >
          <v-template scope="item">
            <StackLayout orientation="vertical">
              <Label
                :text="item.text"
              />
            </StackLayout>
          </v-template>
        </StackLayout>
      </SuggestionView>
    </RadAutoCompleteTextView>
  </GridLayout>
</template>

<script script lang="ts">
import Vue from 'vue'

import { ObservableArray } from '@nativescript/core'
import { getJSON } from '@nativescript/core/http'

import {
  AutoCompleteSuggestMode,
  AutoCompleteCompletionMode,
  AutoCompleteDisplayMode,
  AutoCompleteLayoutMode,
  TokenModel } from 'nativescript-ui-autocomplete'

import RadAutoComplete from 'nativescript-ui-autocomplete/vue'
Vue.use(RadAutoComplete)

export default Vue.extend({
  name: "Geocoder",
  props: {
    hint: {
      type: String,
      default: 'Search'
    },
    noResultsText: {
      type: String,
      default: 'No match results'
    },
    minimumCharactersToSearch: {
      type: Number,
      default: 3
    }
  },
  data(){

    return {
      location: '',
      result: null,
      dataItems: new ObservableArray(),
      suggestMode: AutoCompleteSuggestMode.Suggest,
      // suggestMode: AutoCompleteSuggestMode.SuggestAppend, // TODO: Testing
      completionMode: AutoCompleteCompletionMode.StartsWith,
      // completionMode: AutoCompleteCompletionMode.Contains, // TODO: Testing
      displayMode: AutoCompleteDisplayMode.Tokens,
      layoutMode: AutoCompleteLayoutMode.Wrap,
    }
  },

  mounted() {
    const jsonUrl = 'https://raw.githubusercontent.com/NativeScript/nativescript-ui-samples/master/examples-data/airports.json'

    this.$refs.autocomplete.setLoadSuggestionsAsync(text => {
      const getAirportsCollection = new Promise((resolve, reject) => {
        getJSON(jsonUrl)
          .then((result: any) => {
            const airportsCollection = result.airports
            const airports: Array<TokenModel> = new Array()
            airportsCollection.map(airport => airports.push(new TokenModel(airport.FIELD2, null)))
            resolve(airports)
          })
          .catch(error => {
            const message = `Error fetching remote data from ${jsonUrl}: ${error.message}`
            console.log(message)
            alert(message)
            reject()
          })
      })
      return getAirportsCollection
    })
  },
})
</script>

<style lang="scss" scoped>
@import '../../app-variables';

.search_icon {
  width: 36;
  height: 36;
}
// RadAutoCompleteTextView.search_text {
// margin: 5 10;
// padding: 0 6;
// color: #00C147;
// background: white;
// token-item-spacing: 12;
// display-mode: tokens;
// layout-mode: horizontal;
// }

// RadAutoCompleteTextView.search_text Token {
// color: #00C147;
// background: white;
// border-radius: 20;
// border-color: #00C147;
// border-width: 4;
// font-weight: bold;
// }

// RadAutoCompleteTextView.search_text Token:selected {
// color: white;
// background: #00C147;
// }

// RadAutoCompleteTextView.search_text Token TokenClearButton {
// color: #00C147;
// }

// RadAutoCompleteTextView.search_text Token:selected TokenClearButton {
// color: white;
// }


// RadAutoCompleteTextView.search_text ClearButton {
// color: #00C147;
// }

RadAutoCompleteTextView {
  height: 36;
  font-size: $font-sz-m;
}

RadAutoCompleteTextView:focus {
  height: 36;
  color: $primary-variant;
  font-size: $font-sz-l;
}

RadAutoCompleteTextView Token {
  font-size: $font-sz-l;
  background:white;
}

RadAutoCompleteTextView Token:selected{
  background: chartreuse;
}

RadAutoCompleteTextView SuggestionView{
  background-color: green;
  font-size: $font-sz-m;
}

RadAutoCompleteTextView ClearButton{
  color: #668d8e;
}

RadAutoCompleteTextView TextView{
  background: yellow;
}
</style>