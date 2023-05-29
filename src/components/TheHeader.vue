<script setup lang="ts">
import { availableLocales, loadLanguageAsync } from '~/modules/i18n'

const { t, locale } = useI18n()

async function toggleLocales() {
  // change to some real logic
  const locales = availableLocales
  const newLocale = locales[(locales.indexOf(locale.value) + 1) % locales.length]
  await loadLanguageAsync(newLocale)
  locale.value = newLocale
}
</script>

<template>
  <div class="bg-white shadow-md dark:bg-gray-800">
    <div class="mx-auto px-4 py-4 container">
      <div class="flex items-center justify-between">
        <h1 class="text-xl font-bold text-gray-800 dark:text-white">
          OpenTranslate
        </h1>
      </div>
    </div>
  </div>
</template>
