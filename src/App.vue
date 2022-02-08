<template>
  <div class="min-h-screen relative overflow-hidden pb-24">
    <transition name="fade">
      <Sidebar v-if="store.sidebar"></Sidebar>
    </transition>
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

.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
