<script setup lang="ts">
import Logo from './Logo.vue'

const tokenModal = ref(false)
const keyStore = useApiKeyStore()

async function openKeyModal() {
  tokenModal.value = true
}
async function closeModal() {
  tokenModal.value = false
}
</script>

<template>
  <div class="bg-white shadow-md dark:bg-gray-800">
    <div class="mx-auto px-4 py-4 container">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <Logo class="h-10 w-10" />
          <h1 class="text-xl font-bold text-gray-800 dark:text-white">
            OpenTranslate
          </h1>
        </div>

        <button class="flex rounded bg-gray-600 px-4 py-2 text-white md:ml-2 dark:bg-gray-700" @click="openKeyModal">
          🔑 Key
          <div v-if="keyStore.savedKey" class="ml-2 flex">
            $ {{ (keyStore.tokenPrice + keyStore.tokenPromptPrice).toFixed(2) }}
          </div>
          <div v-else i-lucide-x class="mt-1 text-red" />
        </button>
      </div>
    </div>
    <TheModal :open="tokenModal" @close="closeModal" />
    <Toast />
  </div>
</template>
