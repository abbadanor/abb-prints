<script lang="ts" setup>
import "./assets/tailwind.scss";
import Header from "./components/header.vue";
</script>

<template>
  <div class="min-h-screen relative">
    <div class="pb-24">
      <Header />
      <NuxtPage class="px-4" />
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
