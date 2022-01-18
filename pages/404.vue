<template>
  <div class="flex flex-col items-center mt-32">
    <ExclamationCircleIcon
      class="w-24 h-24 text-abb-100"
    ></ExclamationCircleIcon>
    <h1 class="text-2xl font-semibold">404</h1>
    <p>The page you are looking for was not found.</p>
  </div>
</template>

<script lang="ts">
import { ExclamationCircleIcon } from "@heroicons/vue/outline";

export default {
  components: {
    ExclamationCircleIcon,
  },
};
</script>
