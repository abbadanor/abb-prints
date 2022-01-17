<script lang="ts" setup>
import "./assets/tailwind.scss";
</script>

<template>
  <div class="min-h-screen relative">
    <Header></Header>
    <div class="container mx-auto flex p-4 justify-center">
      <NuxtPage />
    </div>
    <Footer></Footer>
  </div>
</template>

<style lang="scss">
body {
  @apply bg-gray-50;
}
.global-text {
  @apply text-gray-900;
}
</style>
