<script setup lang="ts">
import { useApiKeyStore } from '~/stores/apikey'

// add props open and onClose
const { open } = defineProps({
  open: Boolean,
})
// emit event close
const emit = defineEmits(['close'])
const keyStore = useApiKeyStore()
const { t } = useI18n()

const dateUsage = computed(() => {
  const date = new Date(keyStore.tokenUsageDate)
  return date.toLocaleString()
})
</script>

<template>
  <div v-if="open" class="absolute top-0 z-50 flex items-center justify-center px-0 md:fixed md:inset-0 md:px-4">
    <div class="h-screen w-screen border bg-white p-4 shadow-lg md:max-w-md sm:h-auto sm:w-auto md:rounded-lg dark:bg-gray-800 md:p-6">
      <h2 class="mb-4 text-2xl font-bold text-gray-800 dark:text-white">
        🔑 {{ t('enter-api-key') }}:
      </h2>
      <p class="mb-6 text-gray-600 dark:text-gray-300">
        {{ t('your-api-key-is-stor') }}
      </p>
      <p class="mb-6 text-red-600 dark:text-red-300">
        {{ t('works-only-with-gpt-') }}
      </p>

      <label for="api_key" class="mb-2 block text-gray-800 dark:text-white">OpenAI API Key: <a class="text-light-blue-600 underline" href="https://platform.openai.com/account/api-keys" target="_blank">({{ t('get-api-key-here') }})</a></label>
      <input id="api_key" v-model="keyStore.savedKey" type="text" class="mb-4 w-full border border-gray-300 rounded p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white" :placeholder="t('enter-your-api-key')">
      <label for="model" class="mb-2 block text-gray-800 dark:text-white">OpenAI Model:</label>
      <select id="model" v-model="keyStore.model" class="mb-4 bg-transparent p-2 md:mb-0 md:mr-2 md:w-auto dark:text-white">
        <option value="gpt-4-0613">
          ✨ GPT-4 8k
        </option>
        <option value="gpt-3.5-turbo-0613">
          ✨ GPT-3 4k
        </option>
        <option value="gpt-3.5-turbo-16k">
          ✨ GPT-3 16k
        </option>
      </select>
      <div class="my-4 max-h-100 overflow-y-auto rounded-md bg-green-100 px-2 py-1 text-left dark:bg-sky-900">
        <div class="my-4 cursor-pointer text-center font-semibold hover:underline">
          💸 {{ t('token-usage-report') }}
        </div>
        <ul class="list-disc pl-4 text-left text-sm space-y-1">
          <li>
            {{ t('recorded-since') }}: <br>
            <b>{{ dateUsage }}
            </b>
          </li>
          <li>
            {{ t('tokens-used-for-tran') }}: <br>
            <b>{{ keyStore.tokenUsage }}</b> <b>(${{ keyStore.tokenPrice }})</b>
          </li>
          <li>
            {{ t('tokens-used-for-prom') }}t: <br>
            <b>{{ keyStore.tokenUsagePrompt }}</b> <b>(${{ keyStore.tokenPromptPrice }})</b>
          </li>
          <li>
            {{ t('total-token-usage') }} (*): <br>
            <b>{{ keyStore.tokenUsage + keyStore.tokenUsagePrompt }}</b> <b>(${{ keyStore.tokenPrice + keyStore.tokenPromptPrice }})</b>
          </li>
        </ul>
        <div class="my-4 text-center">
          <button class="text-red-500 underline" @click="keyStore.resetTokenUsage()">
            {{ t('reset-usage-data') }}
          </button>
        </div>
        <div class="my-2">
          (*) {{ t('see-more-info-below') }}:
        </div>
        <details>
          <summary class="my-2 cursor-pointer text-left text-base font-semibold hover:underline">
            {{ t('how-is-the-cost-calc') }}
          </summary>
          <ul class="list-disc pl-4 space-y-2">
            <li class="">
              {{ t('cost-associated-with') }}
            </li>
            <li class="">
              {{ t('some-enhanced-featur') }}
            </li>
            <li class="">
              {{ t('all-costs-are') }} <b class="font-bold">{{ t('estimated') }}</b>, {{ t('please-refer-to-your') }} <a target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline" href="https://platform.openai.com/account/usage">OpenAI {{ t('dashboard') }}</a> {{ t('for-the-most-accurat') }}
            </li>
            <li class="">
              {{ t('the-cost-is-calculat') }} <a target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline" href="https://openai.com/pricing">{{ t('public-pricing-of-op') }}</a>. {{ t('each-model-has-its-o') }}
            </li>
            <li class="">
              {{ t('token-usages-are-not') }} <b>{{ t('streaming-response') }}</b> {{ t('is-enabled-we-will-w') }}
            </li>
            <li>
              <a class="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer" href="https://platform.openai.com/docs/guides/chat">{{ t('learn-more-about-ope') }}</a>
            </li>
          </ul>
        </details>
      </div>
      <div class="flex justify-end">
        <button class="rounded bg-gray-300 px-4 py-2 text-gray-800 dark:bg-gray-600 dark:text-gray-300" @click="emit('close')">
          {{ t('close') }}
        </button>
      </div>
    </div>
  </div>
</template>
