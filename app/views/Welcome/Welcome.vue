<template>
  <Page 
    actionBarHidden="true"
    androidStatusBarBackground="#00251e"
  >
    <StackLayout class="welcome">
      <Label
        class="title m-t-64 font-sz-xxl"
        :text="$t('lang.views.welcome.title')"
      />
      <Label
        class="subtitle m-t-16 font-sz-l"
        :text="$t('lang.views.welcome.subtitle')"
      />
      <TextView
        class="text m-x-32 m-t-32 m-b-16 font-sz-m"
        color="black"
        editable="false"
        lineHeihgt="0"
        :text="$t('lang.views.welcome.presentation')"
      />
      <stacklayout
        orientation="horizontal"
        class="pull-right m-x-32"
      >
        <Label 
          class="skip--button text-uppercase"
          textWrap="true"
          :text="$t('lang.views.welcome.skip')"
          @tap="toPage(navigation.appNavigator)"
        />
        <MDButton 
          class="-primary m-r-0"
          width="160"
          :text="$t('lang.views.welcome.toSignUp')"
          @tap="toPage(navigation.signUp)"
        />
      </stacklayout>
      <Label
        class="tologin m-r-32 pull-right"
        :text="$t('lang.views.welcome.toLogIn')"
        textWrap="true"
        @tap="toPage(navigation.logIn)"
      />
    </StackLayout>
  </Page>
</template>

<script lang="ts">
import Vue from 'vue'

import SignUp from '../Auth/SignUp.vue'
import LogIn from '../Auth/LogIn.vue'
import AppNavigator from '../AppNavigator.vue'
export default Vue.extend({
  name: 'Welcome',
  data () {
    return {
      navigation: {
        signUp: SignUp,
        logIn: LogIn,
        appNavigator: AppNavigator,
      }
    }
  },
  methods: {
    toPage(page) {
      this.$navigateTo(page)
    },
    phoneOnFocus() {
      console.log(`phoneFocus()`)
    }
  }
})
</script>

<style lang="scss" scoped>

@import '../../app-variables';

.title {
  font-weight: bold;
  text-align: center;
  color: $primary-variant;
}
.subtitle {
  font-weight: bold;
  text-align: center;
  color: $secondary-variant;
}
.text {
  background-color: $background;
  color: $primary;
}
.skip--button {
  color: $primary-variant;
  text-align: center;
  vertical-align: center;
  font-weight: bold;
}
.tologin {
  color: $primary;
}

</style>