import { acceptHMRUpdate, defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

const tokenPriceBase = 0.06
export const useApiKeyStore = defineStore('apikey', () => {
  /**
   * Current name of the user.
   */
  const savedKey = useStorage('apikey', '')
  const model = useStorage('model', 'gpt-3.5-turbo-0613')
  const tokenUsage = useStorage('tokenUsage', 0)
  const tokenUsagePrompt = useStorage('tokenUsagePrompt', 0)
  const tokenUsageDate = useStorage('tokenDate', new Date().getTime())

  if (model.value === 'gpt-4') {
    // migrate model
    model.value = 'gpt-4-0613'
  }
  function resetTokenUsage() {
    tokenUsage.value = 0
    tokenUsagePrompt.value = 0
    tokenUsageDate.value = new Date().getTime()
  }

  const tokenPriceBaseInput = computed(() => {
    if (model.value === 'gpt-4-0613')
      return 0.03
    else if (model.value === 'gpt-3.5-turbo-0613')
      return 0.0015
    else if (model.value === 'gpt-3.5-turbo-16k')
      return 0.003
    return 0 // default
  })

  const contextAllowed = computed(() => {
    if (model.value === 'gpt-4-0613')
      return 8000
    else if (model.value === 'gpt-3.5-turbo-0613')
      return 4000
    else if (model.value === 'gpt-3.5-turbo-16k')
      return 16000
    return 0 // default
  })

  const tokenPriceBaseOutput = computed(() => {
    if (model.value === 'gpt-4-0613')
      return 0.06
    else if (model.value === 'gpt-3.5-turbo-0613')
      return 0.002
    else if (model.value === 'gpt-3.5-turbo-16k')
      return 0.004
    return 0 // default
  })

  // 8K context $0.03 / 1K tokens $0.06 / 1K tokens
  const tokenPrice = computed(() => {
    const tokenUsagePrice = tokenUsage.value * tokenPriceBaseOutput.value / 1000
    return tokenUsagePrice
  })

  const tokenPromptPrice = computed(() => {
    const tokenUsagePrice = tokenUsagePrompt.value * tokenPriceBaseInput.value / 1000
    return tokenUsagePrice
  })

  const maxToken = computed(() => {
    return contextAllowed.value - getTokenSystemLength()
  })

  return {
    savedKey,
    tokenUsage,
    tokenUsageDate,
    tokenUsagePrompt,
    resetTokenUsage,
    tokenPrice,
    maxToken,
    model,
    tokenPromptPrice,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore as any, import.meta.hot))
