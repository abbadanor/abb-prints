<template>
  <div class="flex flex-col items-center mt-48">
    <AcademicCapIcon class="w-24 h-24 text-abb-100"></AcademicCapIcon>
    <h1 class="text-xl font-semibold">
      För att det ska bli bättre nästa gång:
    </h1>
    <p class="whitespace-pre-line">{{ suggestions[id] }}</p>
  </div>
</template>

<script lang="ts" setup>
import { AcademicCapIcon } from "@heroicons/vue/outline/index.js";
import { useRoute } from "vue-router";
import suggestions from "../assets/suggestions.json";

const route = useRoute();
const id = route.query.id! as any; //för att få TS att hålla käften;
</script>
