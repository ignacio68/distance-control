<template>
  <Page actionBarHidden="true">
    <StackLayout orientation="vertical">
      <Label
        class="menu_title"
        :text="$t('lang.components.newMarker.title')"
        height="32"
        borderColor="#00251e"
      />
      <!-- <GridLayout
        class="new-marker-menu"
        rows="48, auto, 48, 48, 64"
        columns="*"
      >  -->
      <GridLayout
        class="new-marker-menu"
        rows="48, 48, auto, 48, 48, 64"
        columns="*"
      > 
        <GroupsList
          row="0"
          :labelWidth="64"
          :labelText="$t('lang.components.newMarker.group')"
        />
        <!-- <TextForm
          row="0"
          class="new-marker-menu_group"
          :labelWidth="64"
          :labelText="$t('lang.components.newMarker.group')"
          returnKeyType="done"
          :maxLengthText="24"
          @on-text-change="setGroup"
        /> -->
        <TextForm
          row="1"
          class="new-marker-menu__name"
          :labelWidth="64"
          :labelText="$t('lang.components.newMarker.name')"
          returnKeyType="done"
          :maxLengthText="24"
          @on-text-change="setId"
        />
        <Label 
          v-if="hasError"
          row="2"
          class="new-marker-menu__name-error"
          :text="$t('lang.components.newMarker.error')"
        />
        <ColorSelector 
          row="3"
          :labelWidth="64"
          @on-selected-color="onSelectedColor"
        />
        <!-- <NewArea 
          row="4" 
          @on-radius-change="onRadiusChange"
        />-->
        <StackLayout
          row="4"
          class="new-marker-menu_buttons p-r-16"
          orientation="horizontal"
          horizontalAlignment="right"
        >
          <Label
            class="new-marker-menu_button_cancel"
            :text="$t('lang.components.newMarker.cancelButton')"
            verticalAlignment="center"
            @tap="onCancel"
          />
          <MDButton
            class="new-marker-menu_button_add"
            width="88"
            :text="$t('lang.components.newMarker.addButton')"
            @tap="onAdd"
          />
        </StackLayout> 
      </GridLayout>
    </StackLayout>
  </Page>
</template>

<script lang="ts">
import Vue from 'vue'

import { setNewMarker, getMarker } from '@/store/markers'

import GroupsList from '@/components/Markers/GroupsList.vue'
import TextForm from '@/components/UI/TextForm.vue'
import ColorSelector from '@/components/UI/ColorSelector.vue'
import NewArea from '@/components/Map/NewArea.vue'

export default Vue.extend({
  name: 'NewMarker',
  components: {
    GroupsList,
    TextForm,
    ColorSelector,
    NewArea,
  },
  props: {
    hasError: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      markerValue: '',
      markerColor: null,
      marker: {
        id: '',
        coordinates: {
          lat: '40.456074',
          lng: '-3.6806088',
        },
        group: '',
        color: '',
      },
      area: {
        id: '',
        center: {
          lat: '',
          lng: '',
        },
        radius: 1,
        color: '',
        opacity: .5,
        group: '',
      }
    }
  },
  methods: {
    setId(value){
      this.marker.id = value
    },
    setGroup(value){
      this.marker.group = value
    },
    onSelectedColor(color) {
      this.markerColor = color
      this.marker.color = color.color
    },
    onRadiusChange(value) {
      console.log('onRadiusChange()')
      this.$emit('on-radius-change', value)
    },
    onCancel() {
      console.log('onCancel()')
      this.$emit('on-marker-cancel')
    },
    onAdd() {
      console.log('onAdd()')
      console.log(this.marker.id)
      console.log(this.marker.group)
      console.log(this.markerColor.name)
      this.$emit('on-marker-done', this.marker)
    },
  },
})
</script>

<style scoped lang="scss">
@import '../../app-variables';

.menu_title {
 font-weight: 700;
 font-size: 16;
 color: $primary-variant;
 opacity: .8;
 border-bottom: 1, solid, rgba($primary, .1);
}
.new-marker-menu__name-error {
  color: red;
}
.new-marker-menu_button_add {

}

</style>
