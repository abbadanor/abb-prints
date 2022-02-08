<template>
  <div class="min-h-screen relative overflow-hidden pb-24">
    <Sidebar></Sidebar>
    <Header></Header>
    <div class="max-w-xl w-full mx-auto px-4">
      <router-view></router-view>
    </div>
    <Footer></Footer>
  </div>
</template>

<script setup lang="ts">
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import Sidebar from "./components/Sidebar.vue";
import { useStore } from "./store";

document.title = "ABB Prints";
const store = useStore();
</script>

<style lang="scss">
body {
  @apply bg-gray-50;
}
.global-text {
  @apply text-gray-900;
}
</style>
