<template>
  <Page actionBarHidden="true">
    <StackLayout>
      <Label
        class="title"
        :text="$t('lang.views.welcome.title')"
      />
      <Label
        class="subtitle"
        :text="$t('lang.views.welcome.subtitletitle')"
      />
      <Label
        class="subtitle"
        :text="$t('lang.views.welcome.phone')"
      />
      <Label text="AQUI VA EL TELEFONO"/>
      
      <MDButton 
        :text="$t('lang.views.welcome.button')"
        @tap="toPage(appNAvigator)"
      />      
      <!-- TERMS OF SERVICE & PRIVACY POLICY -->
      <FlexboxLayout
        flexWrap="wrap"
        class="accept__wrapper"
      >
        <Label
          class="accept__text-text"
          :text="$t('lang.views.welcome.accept')"
          textWrap="true"
        />
        <Label
          class="accept__text-link"
          :text="$t('lang.views.welcome.privacy')"
          textWrap="true"
          @tap="toPage(privacyPolicy)"
        />
        <Label
          class="accept__text-text"
          :text="$t('lang.views.welcome.and')"
          textWrap="true"
        />
        <Label
          class="accept__text-link"
          :text="$t('lang.views.welcome.service')"
          textWrap="true"
          @tap="toPage(termsOfService)"
        />
      </flexboxlayout>
    </StackLayout>
  </Page>
</template>

<script lang="ts">
import Vue from 'vue'

import AppNavigator from '../AppNavigator.vue'
import PrivacyPolicy from '../Shared/PrivacyPolicy.vue'
import TermsOfService from '../Shared/TermsOfService.vue'

export default Vue.extend({
  name: 'Welcome',
  data(){
    return {
      appNavigator: AppNavigator,
      privacyPolicy: PrivacyPolicy,
      termsOfService: TermsOfService
    }
  },
  methods: {
    toPage(page) {
      this.$navigateTo(page)
    }
  }
})
</script>

<style lang="scss" scoped>
.accept__wrapper {
  padding: {
    top: 16;
    right: 16;
    left: 24;
    bottom: 8;
  }
}
.accept__text-link {
  color: teal;
  font-weight: bold;
}

</style>