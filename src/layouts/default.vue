<script setup lang="ts">
</script>

<template>
  <TheHeader />
  <main
    md:px-4 md:py-10 overflow="x-auto"
    text="center gray-700 dark:gray-200"
  >
    <RouterView />
    <TheFooter />
  </main>
</template>
