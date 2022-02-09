<template>
  <transition name="fade">
    <div
      v-if="store.sidebar"
      @click="store.sidebar = false"
      class="absolute top-0 w-full h-screen z-10 bg-black/[0.4]"
    ></div>
  </transition>
  <transition name="slide">
    <div
      v-if="store.sidebar"
      class="h-full absolute right-0 w-3/4 bg-abb-500 max-w-sm z-20"
    >
      <div class="flex h-14 items-center justify-end w-full">
        <button
          @click="store.sidebar = false"
          class="h-full w-14 flex items-center justify-center"
        >
          <XIcon class="text-abb-400 h-6"></XIcon>
        </button>
      </div>
      <router-link to="/" @click="store.sidebar = false">
        <div
          class="w-full h-14 flex items-center p-4 border-abb-400 text-abb-400 border-b-2 border-opacity-10"
        >
          Home
        </div>
      </router-link>
      <router-link to="/statistics" @click="store.sidebar = false">
        <div
          class="w-full h-14 flex items-center p-4 border-abb-400 text-abb-400 border-b-2 border-opacity-10"
        >
          Statistics
        </div>
      </router-link>
      <router-link to="/about" @click="store.sidebar = false">
        <div
          class="w-full h-14 flex items-center p-4 border-abb-400 text-abb-400 border-b-2 border-opacity-10"
        >
          About us
        </div>
      </router-link>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { XIcon } from "@heroicons/vue/outline/index.js";
import { useStore } from "../store";
const store = useStore();
</script>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.25s;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
