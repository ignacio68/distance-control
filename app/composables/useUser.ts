import { ref, reactive, computed } from '@vue/composition-api'
import { useCountry } from './useCountry'

export const useUser = () => {
  let { prefix } = useCountry()
  const phone = ref('')
  const state = reactive({
    phoneNumber: computed(() => prefix.value + phone.value),
    isLogging: true
  })

  const setLogging = (value: boolean) => state.isLogging = value
  const setPhone = (value) => phone.value = value

  return {
    user: computed(() => state),
    phone: computed(() => phone.value),
    fullPhoneNumber: computed(() => state.phoneNumber),
    isLogging: computed(() => state.isLogging),
    setPhone,
    setLogging
  }
}
