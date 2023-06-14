<script setup lang="ts">
import { toast } from 'vue-sonner'
import Popper from 'vue3-popper'
import { sendTranslateRequest } from '~/composables/openai'
import type { OpenAiRequest } from '~/composables/openai'
import { langs } from '~/composables/langs'
import { tones } from '~/composables/tones'
import { trackEvent } from '~/composables/plausible'

const { t } = useI18n()
defineOptions({
  name: 'IndexPage',
})
const requestText = ref('')
const responseText = ref('')
const isLoading = ref(false)
const requestLang = ref('auto')
const responseLang = ref('English')
const keyStore = useApiKeyStore()
const tone = ref('Formal')

function invertText() {
  const tmp = requestLang.value === 'auto' ? 'English' : requestLang.value
  requestLang.value = responseLang.value
  responseLang.value = tmp
  const tmp2 = requestText.value
  requestText.value = responseText.value
  responseText.value = tmp2
}
const tokenLength = computed(() => getTokenLength(requestText.value))
const maxLength = computed(() => {
  if (tokenLength.value > keyStore.maxToken)
    return requestText.value.length
  return requestText.value.length + 10000
})

function copyToClipboard() {
  navigator.clipboard.writeText(responseText.value)
  toast.success(t('copied-to-clipboard'))
}
async function translateText() {
  if (!keyStore.savedKey) {
    toast.error(t('please-enter-your-api-key'))
    return
  }
  if (!requestText.value) {
    toast.error(t('please-enter-text-to-translate'))
    return
  }
  const request: OpenAiRequest = {
    lang_from: requestLang.value,
    lang_to: responseLang.value,
    payload: requestText.value,
    tone: tone.value,
  }
  const privateRequest = { ...request }
  privateRequest.payload = ''
  trackEvent('opentranslate.app', 'translate', privateRequest)
  isLoading.value = true
  try {
    const res = await sendTranslateRequest(keyStore.savedKey, request, keyStore.model)
    if (res?.result)
      responseText.value = res?.result
  }
  catch (e) {
    toast.error(t('something-went-wrong-'))
  }
  isLoading.value = false
}
</script>

<template>
  <div class="md:container md:mx-auto md:px-4 md:py-8">
    <div class="bg-white p-2 md:rounded dark:bg-gray-800 md:p-4 md:p-6 md:shadow-md">
      <div class="flex items-center md:flex-wrap md:justify-between">
        <div class="flex flex-1 items-start">
          <select v-model="requestLang" class="mb-4 bg-transparent p-2 md:mb-0 md:mr-2 md:w-auto dark:text-white">
            <option value="auto">
              ✨{{ t('detect-language') }}
            </option>
            <option v-for="lang in langs" :key="lang.code" :value="lang.name">
              {{ lang.emoji }} {{ lang.name }}
            </option>
          </select>
        </div>
        <button i-lucide-arrow-right-left class="flex-grow" @click="invertText" />
        <div class="flex flex-1 flex-row-reverse">
          <select v-model="responseLang" class="mb-4 bg-transparent p-2 md:mb-0 md:ml-2 md:w-auto dark:text-white">
            <option v-for="lang in langs" :key="lang.code" :value="lang.name">
              {{ lang.emoji }} {{ lang.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="grid grid-cols-1 mt-8 md:grid-cols-2 md:gap-4">
        <div class="relative h-1/2-screen w-full">
          <textarea v-model="requestText" :maxlength="maxLength" class="h-full w-full border border-gray-300 rounded p-2 pr-10 dark:border-gray-600 dark:bg-gray-700 dark:text-white" rows="10" placeholder="Enter text to translate" />
          <div class="absolute absolute right-2 top-2">
            <client-only>
              <Popper :hover="true">
                <button
                  class="rounded p-2" :class="{
                    'bg-red-500 text-white': tokenLength > keyStore.maxToken,
                    'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300': tokenLength <= keyStore.maxToken,
                  }"
                >
                  {{ tokenLength }}
                </button>
                <template #content>
                  <div class="pointer-events-none w-28 rounded-lg bg-black px-3 py-2 text-center text-xs text-white opacity-100 -left-1/2">
                    {{ tokenLength }} / {{ keyStore.maxToken.toLocaleString() }} tokens
                  </div>
                </template>
              </Popper>
            </client-only>
          </div>
        </div>

        <div class="relative h-1/2-screen w-full">
          <textarea v-model="responseText" class="h-full w-full border border-gray-300 rounded p-2 pr-10 dark:border-gray-600 dark:bg-gray-700 dark:text-white" rows="10" placeholder="Translated text will appear here" readonly />
          <div class="absolute absolute right-2 top-2">
            <client-only>
              <Popper :hover="true">
                <button class="rounded bg-gray-300 p-2 text-gray-700 dark:bg-gray-600 dark:text-gray-300" @click="copyToClipboard()">
                  <div i-lucide-clipboard-copy />
                </button>
                <template #content>
                  <div class="pointer-events-none w-28 rounded-lg bg-black px-3 py-2 text-center text-xs text-white opacity-100 -left-1/2">
                    {{ t('copy-to-clipboard') }}
                  </div>
                </template>
              </Popper>
            </client-only>
          </div>
        </div>
      </div>
      <div class="safe-areas absolute bottom-0 right-0 z-10 w-full flex-row-reverse items-center bg-white pt-2 md:relative md:flex md:flex-wrap md:justify-between dark:bg-gray-800">
        <div class="flex items-center md:flex-wrap md:justify-between">
          <select v-model="tone" class="w-auto bg-transparent px-4 py-2 md:ml-2 md:mt-0 md:w-auto dark:text-white">
            <option v-for="to in tones" :key="to.code" :value="to.name">
              {{ to.emoji }} {{ to.name }}
            </option>
          </select>
          <button class="w-full rounded bg-blue-500 px-4 py-2 text-white md:ml-2 md:w-auto" @click="translateText">
            <p v-if="!isLoading">
              🌏 {{ t('translate') }}
            </p>
            <div v-else class="flex">
              <div i-lucide-loader-2 class="mr-1 mt-1 animate-spin" />
              {{ t('processing') }}...
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
