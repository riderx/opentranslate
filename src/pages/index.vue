<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})
const user = useUserStore()
const name = ref(user.savedName)

const router = useRouter()
function go() {
  if (name.value)
    router.push(`/hi/${encodeURIComponent(name.value)}`)
}

const { t } = useI18n()
</script>

<template>
  <div class="md:container md:mx-auto md:px-4 md:py-8">
    <div class="bg-white p-2 md:rounded dark:bg-gray-800 md:p-4 md:p-6 md:shadow-md">
      <div class="flex items-center md:flex-wrap md:justify-between">
        <div class="flex flex-1 items-start">
          <select class="mb-4 bg-transparent p-2 md:mb-0 md:mr-2 md:w-auto dark:text-white">
            <option>✨Detect language</option>
            <option>🇬🇧 English</option>
            <option>🇵🇹 Portuguese</option>
          <!-- Add more languages here -->
          </select>
        </div>
        <button i-lucide-arrow-right-left class="flex-grow" />
        <div class="flex flex-1 flex-row-reverse">
          <select class="mb-4 bg-transparent p-2 md:mb-0 md:ml-2 md:w-auto dark:text-white">
            <option>🇵🇹 Portuguese</option>
            <option>🇬🇧 English</option>
          <!-- Add more languages here -->
          </select>
        </div>
      </div>
      <div class="grid grid-cols-1 mt-8 gap-4 md:grid-cols-2">
        <textarea class="h-1/2-screen w-full border border-gray-300 rounded p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white" rows="10" placeholder="Enter text to translate" />
        <div class="relative h-1/2-screen w-full">
          <textarea class="h-full w-full border border-gray-300 rounded p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white" rows="10" placeholder="Translated text will appear here" readonly />
          <button class="absolute right-2 top-2 rounded bg-gray-300 p-2 text-gray-700 dark:bg-gray-600 dark:text-gray-300">
            <div i-lucide-clipboard-copy />
          </button>
        </div>
      </div>
      <div class="fixed bottom-0 right-0 w-full flex-row-reverse items-center md:relative md:flex md:flex-wrap md:justify-between">
        <div class="flex items-center lg:flex-wrap md:justify-between">
          <select class="w-auto bg-transparent px-4 py-2 md:ml-2 md:mt-0 md:w-auto dark:text-white">
            <option>🤵 Formal</option>
            <option>😄 Informal</option>
          <!-- Add more tones here -->
          </select>
          <button class="w-full rounded bg-blue-500 px-4 py-2 text-white md:ml-2">
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
