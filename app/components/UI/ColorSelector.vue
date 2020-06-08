<template>
  <GridLayout columns="auto,auto">
    <Label
      class="color_title"
      text="Select the icon color"
      textWrap="true"
    />
    <StackLayout alignment="horizontal">
      <Label
        v-for="color in colors"
        :key="color.name"
        class="color_list-item"
        :backgroundColor="color.color" 
        color="black"
        width="24"
        height="24"
        paddingleft="4"
        @Tap="onTap"
      />
    </StackLayout>
  </GridLayout>
</template>

<script>
export default {
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
}
</script>

<style lang="scss" scoped>
  .color_title {
    color: black;
  }
  .color_list-item {
    color: black;
  }
</style>>
