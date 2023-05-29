import { acceptHMRUpdate, defineStore } from 'pinia'

export const useApiKeyStore = defineStore('apikey', () => {
  /**
   * Current name of the user.
   */
  const savedKey = ref(localStorage.getItem('apikey') || '')

  /**
   * Changes the current name of the user and saves the one that was used
   * before.
   *
   * @param name - new name to set
   */
  function setNewKey(key: string) {
    localStorage.setItem('apikey', key)
    savedKey.value = key
  }

  return {
    setNewKey,
    savedKey,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore as any, import.meta.hot))
