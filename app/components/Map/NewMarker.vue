<template>
  <Page actionBarHidden="true">
    <StackLayout orientation="vertical">
      <Label
        class="menu_title"
        :text="$t('lang.components.newMarker.title')"
        height="32"
        borderColor="#00251e"
      />
      <GridLayout
        class="new-marker-menu"
        rows="64, auto, 48, auto, 48, auto, 64"
        columns="*"
      >
        <GroupsList
          class="group-list"
          row="0"
          :labelWidth="64"
          :labelText="$t('lang.components.newMarker.group')"
          :listWidth="120"
          @selected-group="setGroup"
        />
        <Label
          v-if="hasGroupError"
          row="1"
          class="new-marker-menu_error"
          :text="$t('lang.components.newMarker.groupError')"
        />
        <TextForm
          row="2"
          class="new-marker-menu__id"
          :labelWidth="64"
          :labelText="$t('lang.components.newMarker.id')"
          returnKeyType="done"
          :maxLengthText="24"
          @on-text-change="setId"
          @on-return-press="enabledFab"
        />
        <Label
          v-if="hasIdError"
          row="3"
          class="new-marker-menu_error"
          :text="$t('lang.components.newMarker.idError')"
        />
        <ColorSelector
          row="4"
          :labelWidth="64"
          @on-selected-color="setColor"
        />
        <Label
          v-if="hasColorError"
          row="5"
          class="new-marker-menu_error"
          :text="$t('lang.components.newMarker.colorError')"
        />
        <StackLayout
          row="6"
          class="new-marker-menu_buttons"
          width="100%"
          orientation="horizontal"
          horizontalAlignment="right"
        >
          <!-- <Label
            class="new-marker-menu_button_cancel"
            :text="$t('lang.components.newMarker.cancelButton')"
            width="100"
            verticalAlignment="center"
            @tap="onCancel"
          /> -->
          <MDButton
            class="new-marker-menu_button_cancel"
            width="144"
            :text="$t('lang.components.newMarker.cancelButton')"
            borderColor="#007a70"
            borderWidth="1"
            @tap="onCancel"
          />
          <MDButton
            class="new-marker-menu_button_add m-r-0"
            width="144"
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

export default Vue.extend({
  name: 'NewMarker',
  components: {
    GroupsList,
    TextForm,
    ColorSelector,
  },
  props: {
    isCanceled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      markerValue: '',
      markerColor: null,
      marker: {
        id: null,
        coordinates: {
          lat: '40.456074',
          lng: '-3.6806088',
        },
        group: null,
        color: null,
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
      },
      hasGroupError: false,
      hasIdError: false,
      hasColorError: false
    }
  },
  watch: {

  },
  methods: {
    reset() {
      this.marker.id = null,
      this.group = null,
      this.color = null
    },
    enabledFab() {
      this.$emit('enabled-fab', true)
    },
    setId(id) {
      console.log(`id: ${id}`)
      this.marker.id = id
      this.hasIdError = null
      this.$emit('enabled-fab', false)
    },
    setGroup(group) {
      console.log(`group: ${group}`)
      this.marker.group = group
      this.hasGroupError = null
    },
    setColor(color) {
      console.log(`color: ${color.name}`)
      // TODO: remove for production
      this.markerColor = color
      this.marker.color = color.color
      this.hasColorError = null
    },
    isValid() {
      console.log('isValid()')
      const isValid = Promise.resolve(
        this.marker.group === null ? this.hasGroupError = true :
          this.marker.id === null || undefined ? this.hasIdError = true :
            this.marker.color === null ? this.hasColorError = true : console.log('There are nort errors')
      )
      return isValid
    },
    onRadiusChange(radius) {
      console.log('onRadiusChange()')
      this.$emit('on-radius-change', radius)
    },
    onCancel() {
      console.log('onCancel()')
      this.reset()
      this.$emit('on-marker-cancel')
    },
    async onAdd() {
      console.log('onAdd()')
      await this.isValid().then(() => {
        if (this.hasError === null) this.$emit('on-marker-done', this.marker)
        else return
      })
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
.new-marker-menu_error {
  color: red;
}
.new-marker-menu_button_cancel {
  color: $primary;
  background-color: white;
  text-align: center;
}
.new-marker-menu_button_add {

}

</style>
