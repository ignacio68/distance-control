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
        textAlignment="center"
        editable="false"
        lineHeihgt="0"
        color="#00251e"
        :text="$t('lang.views.welcome.presentation')"
      />
      <stacklayout
        orientation="horizontal"
        class="m-x-32"
      >
        <MDButton
          class="skip--button m-l-0"
          width="154"
          :text="$t('lang.views.welcome.skip')"
          borderColor="#007a70"
          borderWidth="1"
          @tap="toPage('/home')"
        />
        <MDButton
          class="-primary ok--button m-r-0"
          width="154"
          :text="$t('lang.views.welcome.toSignUp')"
          @tap="toPage('/signup')"
        />
      </stacklayout>
      <Label
        class="tologin m-r-32 pull-right"
        :text="$t('lang.views.welcome.toLogIn')"
        textWrap="true"
        @tap="toPage('/login')"
      />
    </StackLayout>
  </Page>
</template>

<script lang="ts">
import Vue from 'vue'

import { RoutePath } from '@/routes/routes'

// import SignUp from '../Auth/SignUp.vue'
// import LogIn from '../Auth/LogIn.vue'
// import AppNavigator from '../AppNavigator.vue'
export default Vue.extend({
  name: 'Welcome',
  data () {
    return {
      // navigation: {
      //   signUp: SignUp,
      //   logIn: LogIn,
      //   appNavigator: AppNavigator,
      // }
    }
  },
  methods: {
    toPage(page: RoutePath) {
      this.$navigator.navigate(page)
      // this.$navigateTo(page)
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
  font-weight: bold;
  font-size: $font-sz-m;
}
.ok--button {
  font-weight: bold;
}
.skip--button {
  color: $primary;
  background-color: white;
}
.tologin {
  color: $primary;
}

</style>