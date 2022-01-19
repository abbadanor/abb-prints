<template>
  <div class="flex flex-col justify-center items-center mt-52">
    <CheckCircleIcon class="w-28 h-28 mr-2 text-abb-300"></CheckCircleIcon>
    <h1 class="text-2xl font-semibold">Tack för att du skickade in!</h1>
  </div>
</template>

<script lang="ts">
import { CheckCircleIcon } from "@heroicons/vue/outline";

export default {
  components: {
    CheckCircleIcon,
  },
};
</script>
