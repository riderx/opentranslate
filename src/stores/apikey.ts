import { acceptHMRUpdate, defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

const tokenPriceBase = 0.06
export const useApiKeyStore = defineStore('apikey', () => {
  /**
   * Current name of the user.
   */
  const savedKey = useStorage('apikey', '')
  const model = useStorage('model', 'gpt-3')
  const tokenUsage = useStorage('tokenUsage', 0)
  const tokenUsagePrompt = useStorage('tokenUsagePrompt', 0)
  const tokenUsageDate = useStorage('tokenDate', new Date().getTime())

  function resetTokenUsage() {
    tokenUsage.value = 0
    tokenUsagePrompt.value = 0
    tokenUsageDate.value = new Date().getTime()
  }
  // 8K context $0.03 / 1K tokens $0.06 / 1K tokens
  const tokenPrice = computed(() => {
    const tokenUsagePrice = tokenUsage.value * tokenPriceBase / 1000
    return tokenUsagePrice
  })
  const tokenPromptPrice = computed(() => {
    const tokenUsagePrice = tokenUsagePrompt.value * tokenPriceBase / 1000
    return tokenUsagePrice
  })

  return {
    savedKey,
    tokenUsage,
    tokenUsageDate,
    tokenUsagePrompt,
    resetTokenUsage,
    tokenPrice,
    model,
    tokenPromptPrice,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore as any, import.meta.hot))
