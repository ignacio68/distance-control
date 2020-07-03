// TODO: to refactore when composition works in Nativescript
<template>
  <Page 
    actionBarHidden="true"
    androidStatusBarBackground="#00251e"
  >
    <StackLayout class="welcome">
      <Label
        class="title m-t-64 m-b-32 font-sz-l"
        :text="$t('lang.views.signup.text')"
      />
      <PhoneNumber
        class="m-x-32"
        :phoneNumberHint="$t('lang.views.signup.phoneNumberHint')"
        :buttonText="$t('lang.views.signup.button')"
        @do-login="doLogIn"
      />
        
      <!-- TERMS OF SERVICE & PRIVACY POLICY -->
      <FlexboxLayout
        flexWrap="wrap"
        class="pull-right accept font-sz-s m-x-32 m-y-16"
      >
        <Label
          class="accept__text"
          :text="$t('lang.views.signup.accept')"
          textWrap="true"
        />
        <Label
          class="accept__link"
          :text="$t('lang.views.signup.privacy')"
          textWrap="true"
          @tap="toPage(navigation.privacyPolicy)"
        />
        <Label
          class="accept__text"
          :text="$t('lang.views.signup.and')"
          textWrap="true"
        />
        <Label
          class="accept__link"
          :text="$t('lang.views.signup.service')"
          textWrap="true"
          @tap="toPage(navigation.termsOfService)"
        />
      </flexboxlayout>
    </StackLayout>
  </Page>
</template>

<script lang="ts">
import Vue from 'vue'
import { reactive } from '@vue/composition-api'

import { useUser } from '@/composables/useUser'

import { userLogin } from '@/api/auth'
// import { Elevation } from '@/utils/elevations'

import PhoneNumber from '@/components/UI/PhoneNumber.vue'

import AppNavigator from '../AppNavigator.vue'
import PrivacyPolicy from '../Shared/PrivacyPolicy.vue'
import TermsOfService from '../Shared/TermsOfService.vue'

export default Vue.extend({
  name: 'SignUp',
  components:{
    PhoneNumber
  },
  setup() {
    const { fullPhoneNumber } = useUser()
    const navigation = reactive({
        appNavigator: AppNavigator,
        privacyPolicy: PrivacyPolicy,
        termsOfService: TermsOfService
    })
    return { navigation, fullPhoneNumber }
  },
  methods: {
    async doLogIn(phoneNumber) {
      console.log('doLogin()')
      await userLogin(this.fullPhoneNumber.value).then(() => this.toPage(this.navigation.appNavigator))
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
