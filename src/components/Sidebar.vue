<template>
  <div
    ref="target"
    class="absolute top-0 right-0 bg-abb-500 w-3/4 max-w-sm h-screen z-10"
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
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { XIcon } from "@heroicons/vue/outline/index.js";
import { useStore } from "../store";
const target = ref(null);
const store = useStore();
onClickOutside(target, (event) => (store.sidebar = false));
</script>
