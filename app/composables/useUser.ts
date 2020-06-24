import { ref, reactive, computed, toRef } from '@vue/composition-api'

const isLoading = ref(false)

let state = reactive ({
  phone: null,
  prefix: null,
  completePhoneNumber: computed(() => state.prefix + state.phone)
})

export default { isLoading }
