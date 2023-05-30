<template>
  <TheHeader />
  <main
    md:px-4 md:py-10
    text="center gray-700 dark:gray-200"
    class="h-[calc(100vh-122px)] overflow-x-auto"
  >
    <RouterView />
    <TheFooter />
  </main>
</template>
