import AppNavigator from '@/views/AppNavigator.vue'

import Welcome from '@/views/Welcome/Welcome.vue'

import SignUp from '@/views/Auth/SignUp.vue'
import LogIn from '@/views/Auth/LogIn.vue'
import PrivacyPolicy from '@/views/Shared/PrivacyPolicy.vue'
import TermsOfService from '@/views/Shared/TermsOfService.vue'

interface RouteInfo {
  component: any,
  meta?: any
}

export type RoutePath =
  | '/home'
  | '/welcome'
  | '/signup'
  | '/login'
  | '/privacy-policy'
  | '/terms-of-service'

export const routes: Record<RoutePath, RouteInfo> = {
  '/home': {
    component: AppNavigator,
    // meta: { needsAuth: true }
  },
  '/welcome': {
    component: Welcome
  },
  '/signup': {
    component: SignUp,
    meta: { needsAuth: false }
  },
  '/login': {
    component: LogIn,
    meta: { needsAuth: false }
  },
  '/privacy-policy': {
    component: PrivacyPolicy,
  },
  '/terms-of-service': {
    component: TermsOfService,
  },
}
