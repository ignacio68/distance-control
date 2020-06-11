<template>
  <Page>
    <ActionBar title="Privacy Policy">
      <!-- TODO: areglar el uso de iconos -->
      <NavigationButton
        android.systemIcon="ic_menu_back"
        @tap="$navigateBack"
      />
    </ActionBar>
    <StackLayout>
      <Label
        class="text"
        text="Privacy Policy page"
        textWrap="true"
      />
    </StackLayout>
  </Page>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'PrivacyPolicy',
  data() {
    return {}
  }
})
</script>
<style lang="scss" scoped>
.text {
  vertical-align: center;
  text-align: center;
  margin-top: 16;
  font-size: 16;
}
</style>
