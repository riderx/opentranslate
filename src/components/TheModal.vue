<script setup lang="ts">
import { useApiKeyStore } from '~/stores/apikey'

// add props open and onClose
const { open } = defineProps({
  open: Boolean,
})
// emit event close
const emit = defineEmits(['close'])
const keyStore = useApiKeyStore()
const key = ref(`${keyStore.savedKey}`)

async function saveKey() {
  // console.log('saving key', key.value)
  keyStore.setNewKey(key.value)
  emit('close')
}
</script>

<template>
  <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="max-w-md w-full rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
      <h2 class="mb-4 text-2xl font-bold text-gray-800 dark:text-white">
        🔑 Enter API Key:
      </h2>
      <p class="mb-6 text-gray-600 dark:text-gray-300">
        Your API Key is stored locally on your browser and never sent anywhere else.
      </p>
      <label for="api_key" class="mb-2 block text-gray-800 dark:text-white">OpenAI API Key:</label>
      <input id="api_key" v-model="key" type="text" class="mb-4 w-full border border-gray-300 rounded p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white" placeholder="Enter your API key">
      <div class="flex justify-end">
        <button class="mr-2 rounded bg-blue-500 px-4 py-2 text-white" @click="saveKey">
          Save
        </button>
        <button class="rounded bg-gray-300 px-4 py-2 text-gray-800 dark:bg-gray-600 dark:text-gray-300" @click="emit('close')">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>
