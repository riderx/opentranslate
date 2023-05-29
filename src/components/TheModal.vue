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
const dateUsage = computed(() => {
  const date = new Date(keyStore.tokenUsageDate)
  return date.toLocaleString()
})
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
      <div class="my-4 rounded-md bg-green-100 px-2 py-1 text-left dark:bg-sky-900">
        <div class="my-4 cursor-pointer text-center font-semibold hover:underline">
          💸 Token Usage Report
        </div>
        <ul class="list-disc pl-4 text-left text-sm space-y-1">
          <li>
            Recorded since: <br>
            <b>{{ dateUsage }}
            </b>
          </li>
          <li>
            Tokens used for translation: <br>
            <b>{{ keyStore.tokenUsage }}</b> <b>(${{ keyStore.tokenPrice }})</b>
          </li>
          <li>
            Tokens used for prompt: <br>
            <b>{{ keyStore.tokenUsagePrompt }}</b> <b>(${{ keyStore.tokenPromptPrice }})</b>
          </li>
          <li>
            Total token usage (*): <br>
            <b>{{ keyStore.tokenUsage + keyStore.tokenUsagePrompt }}</b> <b>(${{ keyStore.tokenPrice + keyStore.tokenPromptPrice }})</b>
          </li>
        </ul>
        <div class="my-4 text-center">
          <button class="text-red-500 hover:underline" @click="keyStore.resetTokenUsage()">
            Reset Usage Data
          </button>
        </div>
        <div class="my-2">
          (*) See more info below:
        </div>
        <details>
          <summary class="my-2 cursor-pointer text-left text-base font-semibold hover:underline">
            How is the cost calculated?
          </summary>
          <ul class="list-disc pl-4 space-y-2">
            <li class="">
              Cost associated with a chat includes the token cost for the translation.
            </li>
            <li class="">
              Some enhanced features on OpenTranslate will increase your token usage. The enhanced features include: Tone of voice, Upload Document, etc. Amount of tokens used depends on the length of your document.
            </li>
            <li class="">
              All costs are <b class="font-bold">estimated</b>, please refer to your <a target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline" href="https://platform.openai.com/account/usage">OpenAI dashboard</a> for the most accurate cost of your API key.
            </li>
            <li class="">
              The cost is calculated based on the <a target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline" href="https://openai.com/pricing">public pricing of OpenAI's API</a>. Each model has its own pricing, each type of tokens in each model also has its own pricing.
            </li>
            <li class="">
              Token usages are not recorded when <b>streaming response</b> is enabled. We will work on improving this soon.
            </li>
            <li>
              <a class="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer" href="https://platform.openai.com/docs/guides/chat">Learn more about OpenAI's model, tokens, and context length here.</a>
            </li>
          </ul>
        </details>
      </div>
      <div class="flex justify-end">
        <button class="rounded bg-gray-300 px-4 py-2 text-gray-800 dark:bg-gray-600 dark:text-gray-300" @click="emit('close')">
          Cancel
        </button>
        <button class="mr-2 rounded bg-blue-500 px-4 py-2 text-white" @click="saveKey">
          Save
        </button>
      </div>
    </div>
  </div>
</template>
