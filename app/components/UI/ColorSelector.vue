<template>
  <StackLayout orientation="horizontal">
    <Label
      class="color_title"
      text="select the icon color"
      textWrap="true"
    />
    <StackLayout orientation="horizontal">
      <Label
        v-for="color in colors"
        :key="color.name"
        class="color_list-item"
        :backgroundColor="color.color"
        borderColor="black"
        borderWidth="1"
        @Tap="onTap(color)"
      />
    </StackLayout>
  </StackLayout>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ColorSelector',
  data() {
    return {
      colors: 
        [
          { name: 'blue', color: '#31aec4' },
          { name: 'indigo', color: '#a191ff' },
          { name: 'violet', color: '#d17bff' },
          { name: 'orange', color: '#cc9633' },
          { name: 'red', color: '#ff765d'} ,
          { name: 'pink', color: '#ff6ea1' }
        ]
    }
  },
  methods:{
      onTap(color) {
        this.$emit('onSelectedColor', color.color)
        console.log(`color: ${color.name}`)
      }
    }
})
</script>

<style lang="scss" scoped>
  .color_title {
    color: black;
    font-size: 16;
  }
  .color_list-item {
    margin-left: 8;
    width: 24;
    height: 24;
  }
</style>>
