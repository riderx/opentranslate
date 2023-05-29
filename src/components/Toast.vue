<script setup lang="ts">
import { Toaster } from 'vue-sonner'
</script>

<template>
  <client-only>
    <Toaster rich-colors close-button position="top-right" />
    <template #placeholder>
      <div class="invisible" />
    </template>
  </client-only>
</template>
