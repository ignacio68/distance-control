<template>
  <Page actionBarHidden="true">
    <StackLayout class="welcome">
      <Label
        class="title"
        :text="$t('lang.views.welcome.title')"
      />
      <Label
        class="subtitle"
        :text="$t('lang.views.welcome.subtitle')"
      />
      <TextView
        class="text"
        :text="$t('lang.views.welcome.phone')"
      />
      <PhoneNumber
        :phoneNumberHint="$t('lang.views.welcome.phoneNumber')"
        :buttonText="$t('lang.views.welcome.button')"
        @doLogIn="doLogIn"
      />
      <!-- TERMS OF SERVICE & PRIVACY POLICY -->
      <FlexboxLayout
        flexWrap="wrap"
        class="accept"
      >
        <Label
          class="accept__text--text"
          :text="$t('lang.views.welcome.accept')"
          textWrap="true"
        />
        <Label
          class="accept__text--link"
          :text="$t('lang.views.welcome.privacy')"
          textWrap="true"
          @tap="toPage(navigation.privacyPolicy)"
        />
        <Label
          class="accept__text--text"
          :text="$t('lang.views.welcome.and')"
          textWrap="true"
        />
        <Label
          class="accept__text--link"
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
import { Elevation } from '@/utils/elevations'

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
.welcome {
  margin: {
    left: 16;
    right: 16;
    top: 36;
  }
}
.title {
  font-size: 24;
  font-weight: 700;
  text-align: center;
}
.subtitle {
  margin-top: 16;
  font-size: 16;
  font-weight: 700;
  text-align: center;
}
.text {
  margin-top: 12;
  font-weight: 400;
  font-size: 16;
}
TextField {
  text-align: center;
  font-size: 16;
  font-weight: 700;
}
TextField.hint {
  font-size: 14;
  font-weight: 400;
}
.button {
  background-color: teal;
}
.accept {
  padding: {
    top: 16;
    right: 16;
    left: 24;
    bottom: 8;
  }
}
.accept__text--link {
  color: teal;
  font-weight: bold;
}

</style>