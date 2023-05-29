<script setup lang="ts">
import { UseScreenSafeArea } from '@vueuse/components'
</script>

<template>
  <UseScreenSafeArea top right bottom left>
    <main
      md:px-4 md:py-10
      text="center gray-700 dark:gray-200"
    >
      <RouterView />
      <TheFooter />
    </main>
  </UseScreenSafeArea>
</template>
