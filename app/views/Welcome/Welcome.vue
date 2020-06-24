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
        class="text body m-x-32 m-t-32 m-b-16"
        color="black"
        editable="false"
        lineHeihgt="0"
        :text="$t('lang.views.welcome.phone')"
      />
      <PhoneNumber
        class="m-x-32"
        :phoneNumberHint="$t('lang.views.welcome.phoneNumber')"
        :buttonText="$t('lang.views.welcome.button')"
        @doLogIn="doLogIn"
      />
        
      <!-- TERMS OF SERVICE & PRIVACY POLICY -->
      <FlexboxLayout
        flexWrap="wrap"
        class="accept font-sz-s m-x-32 m-y-16"
      >
        <Label
          class="accept__text"
          :text="$t('lang.views.welcome.accept')"
          textWrap="true"
        />
        <Label
          class="accept__link"
          :text="$t('lang.views.welcome.privacy')"
          textWrap="true"
          @tap="toPage(navigation.privacyPolicy)"
        />
        <Label
          class="accept__text"
          :text="$t('lang.views.welcome.and')"
          textWrap="true"
        />
        <Label
          class="accept__link"
          :text="$t('lang.views.welcome.service')"
          textWrap="true"
          @tap="toPage(navigation.termsOfService)"
        />
      </flexboxlayout>
    </StackLayout>
  </Page>
</template>

<script lang="ts">
import Vue from 'vue'

import { userLogin } from '@/api/auth'
// import { Elevation } from '@/utils/elevations'

import PhoneNumber from '@/components/UI/PhoneNumber.vue'

import AppNavigator from '../AppNavigator.vue'
import PrivacyPolicy from '../Shared/PrivacyPolicy.vue'
import TermsOfService from '../Shared/TermsOfService.vue'

export default Vue.extend({
  name: 'Welcome',
  components:{
    PhoneNumber
  },
  data(){
    return {
      navigation: {
        appNavigator: AppNavigator,
        privacyPolicy: PrivacyPolicy,
        termsOfService: TermsOfService
      }
    }
  },
  methods: {
    // setPhoneNumber(phoneNumber) {
    //   this.phoneNumber = phoneNumber
    //   console.log(`${this.phoneNumber}`)
    // },
    async doLogIn(phoneNumber) {
      console.log('doLogin()')
      // const phoneNumber = this.phoneNumber
      await userLogin(phoneNumber).then(() => this.toPage(this.navigation.appNavigator))
    },
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
  color: $secondary-variant
}
.text {
  background-color: $background;
  color: $primary;
}
.accept__link {
  color: $accent;
  font-weight: bold;
}

</style>