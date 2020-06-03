<template>
  <StackLayout class="drawer">
    <Label 
      class="drawer-header" 
      text="USUARIO" 
    />
    <Label 
      class="drawer-item" 
      text="Item 1" 
    />
    <Label 
      class="drawer-item" 
      text="Item 2" 
    />
    <Label 
      class="drawer-item" 
      text="Item 3" 
    />
  </StackLayout>
</template>

<script>
export default {
  name: 'DrawerContent'
}
</script>

<style lang="scss" scoped>
.drawer{
  background-color: white;
}
.drawer-header {
  padding: 50 16 16 16;
  margin-bottom: 16;
  background-color:#007a70;
  color: #ffffff;
  font-size: 24;
}

.drawer-item {
  padding: 8 16;
  color: #334240;
  background-color: white;
  font-size: 16;
}
</style>
