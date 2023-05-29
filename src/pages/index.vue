<script setup lang="ts">
import { getTokenTotalLength, sendTranslateRequest } from '~/composables/openai'
import type { OpenAiRequest } from '~/composables/openai'
import { langs } from '~/composables/langs'
import { tones } from '~/composables/tones'

defineOptions({
  name: 'IndexPage',
})
const requestText = ref('')
const responseText = ref('')
const requestLang = ref('auto')
const responseLang = ref('English')
const keyStore = useApiKeyStore()
const tone = ref('Formal')

// const router = useRouter()
// function go() {
//   if (name.value)
//     router.push(`/hi/${encodeURIComponent(name.value)}`)
// }

// const { t } = useI18n()
function invertText() {
  const tmp = requestLang.value === 'auto' ? 'English' : requestLang.value
  requestLang.value = responseLang.value
  responseLang.value = tmp
  const tmp2 = requestText.value
  requestText.value = responseText.value
  responseText.value = tmp2
}
const tokenLenght = computed(() => getTokenTotalLength(requestText.value))

async function translateText() {
  const request: OpenAiRequest = {
    lang_from: requestLang.value,
    lang_to: responseLang.value,
    payload: requestText.value,
    tone: tone.value,
  }
  const res = await sendTranslateRequest(keyStore.savedKey, request)
  if (res?.result)
    responseText.value = res?.result
}
</script>

<template>
  <div class="md:container md:mx-auto md:px-4 md:py-8">
    <div class="bg-white p-2 md:rounded dark:bg-gray-800 md:p-4 md:p-6 md:shadow-md">
      <div class="flex items-center md:flex-wrap md:justify-between">
        <div class="flex flex-1 items-start">
          <select v-model="requestLang" class="mb-4 bg-transparent p-2 md:mb-0 md:mr-2 md:w-auto dark:text-white">
            <option value="auto">
              ✨Detect language
            </option>
            <option v-for="lang in langs" :key="lang.code" :value="lang.name">
              {{ lang.emoji }} {{ lang.name }}
            </option>
          <!-- Add more languages here -->
          </select>
        </div>
        <button i-lucide-arrow-right-left class="flex-grow" @click="invertText" />
        <div class="flex flex-1 flex-row-reverse">
          <select v-model="responseLang" class="mb-4 bg-transparent p-2 md:mb-0 md:ml-2 md:w-auto dark:text-white">
            <option v-for="lang in langs" :key="lang.code" :value="lang.name">
              {{ lang.emoji }} {{ lang.name }}
            </option>
          <!-- Add more languages here -->
          </select>
        </div>
      </div>
      <div class="grid grid-cols-1 mt-8 gap-4 md:grid-cols-2">
        <div class="h-1/2-screen flex flex-col">
          <textarea v-model="requestText" class="w-full flex-grow border border-gray-300 rounded p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white" rows="10" placeholder="Enter text to translate" />
          <div class="mt-2 text-right text-gray-600 dark:text-gray-300">
            {{ tokenLenght }} / 8 000
          </div>
        </div>

        <div class="relative h-1/2-screen w-full">
          <textarea v-model="responseText" class="h-full w-full border border-gray-300 rounded p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white" rows="10" placeholder="Translated text will appear here" readonly />
          <button class="absolute right-2 top-2 rounded bg-gray-300 p-2 text-gray-700 dark:bg-gray-600 dark:text-gray-300">
            <div i-lucide-clipboard-copy />
          </button>
        </div>
      </div>
      <div class="fixed bottom-0 right-0 w-full flex-row-reverse items-center md:relative md:flex md:flex-wrap md:justify-between">
        <div class="flex items-center md:flex-wrap md:justify-between">
          <select v-model="tone" class="w-auto bg-transparent px-4 py-2 md:ml-2 md:mt-0 md:w-auto dark:text-white">
            <option v-for="t in tones" :key="t.code" :value="t.name">
              {{ t.emoji }} {{ t.name }}
            </option>
          <!-- Add more tones here -->
          </select>
          <button class="w-full rounded bg-blue-500 px-4 py-2 text-white md:ml-2 md:w-auto" @click="translateText">
            Translate
          </button>
        </div>
      </div>
      <!-- <button class="fixed bottom-0 right-0 w-full rounded bg-blue-500 px-4 py-2 text-white md:hidden">
        Translate
      </button> -->
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
