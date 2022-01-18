<script lang="ts">
import "./assets/tailwind.scss";
export default {
  setup() {
    const sidebar = useState("sidebar", () => false);
    return { sidebar };
  },
};
</script>

<template>
  <div class="min-h-screen relative overflow-hidden pb-24">
    <transition name="fade">
      <Sidebar v-if="sidebar"></Sidebar>
    </transition>
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
