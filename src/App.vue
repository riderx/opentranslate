<script setup lang="ts">
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: 'OpenTranslate',
  meta: [
    { name: 'description', content: 'Translate interface made with Chat-gpt, allow using voice tone, 100% open source' },
    {
      name: 'theme-color',
      content: () => isDark.value ? '#1F2937' : '#ffffff',
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: () => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg',
    },
  ],
})
</script>

<template>
  <RouterView />
</template>
