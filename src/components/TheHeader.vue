<script setup lang="ts">
const tokenModal = ref(false)

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
        <h1 class="text-xl font-bold text-gray-800 dark:text-white">
          OpenTranslate
        </h1>
        <button class="rounded bg-gray-600 px-4 py-2 text-white md:ml-2 dark:bg-gray-700" @click="openKeyModal">
          🔑 Key
        </button>
      </div>
    </div>
    <TheModal :open="tokenModal" @close="closeModal" />
  </div>
</template>
