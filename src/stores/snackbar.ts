import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSnackbarStore = defineStore('snackbar', () => {
  const isVisible = ref(false)
  const message = ref('')
  const color = ref<'success' | 'error' | 'info'>('info')
  const timeout = ref(4000)

  function show(msg: string, type: 'success' | 'error' | 'info' = 'info', duration = 4000) {
    message.value = msg
    color.value = type
    timeout.value = duration
    isVisible.value = true
  }

  return { isVisible, message, color, timeout, show }
})