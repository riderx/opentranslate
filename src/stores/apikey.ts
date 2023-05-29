import { acceptHMRUpdate, defineStore } from 'pinia'

export const useApiKeyStore = defineStore('apikey', () => {
  /**
   * Current name of the user.
   */
  const savedKey = ref(localStorage.getItem('apikey') || '')
  const tokenUsage = ref(Number(localStorage.getItem('tokenUsage') || '0'))
  const tokenUsagePrompt = ref(Number(localStorage.getItem('tokenUsagePrompt') || '0'))
  const tokenUsageDate = ref(Number(localStorage.getItem('tokenDate') || new Date().getTime()))

  /**
   * Changes the current key of the user and saves in localstorage
   * before.
   *
   * @param key - new key to set
   */
  function setNewKey(key: string) {
    localStorage.setItem('apikey', key)
    savedKey.value = key
  }
  /**
   * Changes the current usage of the user and saves in localstorage
   * before.
   *
   * @param usage - new usage to set
   */
  function setNewUsage(usage: number) {
    localStorage.setItem('tokenUsage', usage.toString())
    tokenUsage.value = usage
  }
  /**
   * Changes the current Prompt usage of the user and saves in localstorage
   * before.
   *
   * @param usage - new usage to set
   */
  function setNewUsagePrompt(usage: number) {
    localStorage.setItem('tokenUsagePrompt', usage.toString())
    tokenUsagePrompt.value = usage
  }
  function resetTokenUsage() {
    localStorage.setItem('tokenUsage', '0')
    tokenUsage.value = 0
    localStorage.setItem('tokenUsagePrompt', '0')
    tokenUsagePrompt.value = 0
    tokenUsageDate.value = new Date().getTime()
  }
  // 8K context $0.03 / 1K tokens $0.06 / 1K tokens
  const tokenPrice = computed(() => {
    const tokenPrice = 0.06
    const tokenUsagePrice = tokenUsage.value * tokenPrice / 1000
    return tokenUsagePrice
  })
  const tokenPromptPrice = computed(() => {
    const tokenPrice = 0.03
    const tokenUsagePrice = tokenUsagePrompt.value * tokenPrice / 1000
    return tokenUsagePrice
  })

  return {
    setNewKey,
    savedKey,
    tokenUsage,
    setNewUsage,
    setNewUsagePrompt,
    tokenUsageDate,
    tokenUsagePrompt,
    resetTokenUsage,
    tokenPrice,
    tokenPromptPrice,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore as any, import.meta.hot))
