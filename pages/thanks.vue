<template>
  <div class="flex flex-col items-center mt-48">
    <CheckIcon class="w-24 h-24 text-abb-100"></CheckIcon>
    <h1 class="text-2xl font-semibold">Thank you</h1>
    <p>Thank you for sending in your survey!</p>
  </div>
</template>

<script lang="ts">
import { CheckIcon } from "@heroicons/vue/outline";

export default {
  components: {
    CheckIcon,
  },
};
</script>
