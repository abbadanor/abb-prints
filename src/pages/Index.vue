<template>
  <div class="">
    <RadioGroup v-model="selected">
      <RadioGroupLabel as="h1" class="font-semibold text-lg mb-1">{{
        availableQuestions[question].question
      }}</RadioGroupLabel>
      <div class="space-y-2">
        <RadioGroupOption
          as="template"
          v-for="q in availableQuestions[question].options"
          :key="q.id"
          :value="q"
          v-slot="{ active, checked }"
        >
          <div
            :class="[
              active
                ? 'ring-2 ring-offset-2 ring-offset-indigo-300 ring-white ring-opacity-60'
                : '',
              checked ? 'bg-abb-100 bg-opacity-75 text-white ' : 'bg-white ',
            ]"
            class="relative flex px-5 py-4 rounded-lg shadow-md cursor-pointer focus:outline-none"
          >
            <div class="flex items-center justify-between w-full">
              <div class="flex items-center">
                <div class="text-sm">
                  <RadioGroupLabel
                    as="p"
                    :class="checked ? 'text-white' : 'text-gray-900'"
                    class="font-medium"
                  >
                    {{ q.title }}
                  </RadioGroupLabel>
                  <RadioGroupDescription
                    as="span"
                    :class="checked ? 'text-sky-100' : 'text-gray-500'"
                    class="inline"
                  >
                    <span> {{ q.description }}</span>
                  </RadioGroupDescription>
                </div>
              </div>
              <div v-show="checked" class="flex-shrink-0 text-white">
                <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="12"
                    cy="12"
                    r="12"
                    fill="#fff"
                    fill-opacity="0.2"
                  />
                  <path
                    d="M7 13l3 3 7-7"
                    stroke="#fff"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </RadioGroupOption>
      </div>
    </RadioGroup>
    <div class="mt-2 w-full flex justify-between">
      <button
        class="bg-white text-sm font-medium text-black px-5 py-2 rounded-lg shadow-md cursor-pointer focus:outline-none"
        :class="question == 0 ? 'invisible' : ''"
        @click="previous()"
      >
        Backward
      </button>
      <button
        class="bg-abb-300 text-sm font-medium text-white px-5 py-2 rounded-lg shadow-md cursor-pointer focus:outline-none"
        @click="isDone ? done() : next()"
      >
        {{ isDone ? "Done" : "Forward" }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, computed, ComputedRef } from "vue";
import { useRouter } from "vue-router";
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupDescription,
  RadioGroupOption,
} from "@headlessui/vue";
import questionsJson from "../assets/questions.json";
import { Question } from "../interfaces/Question";
import axios, { AxiosError } from "axios";

const router = useRouter();
const questions = ref<Question[]>(questionsJson);
const question = ref(0);
const selected = ref(questions.value[0].options![0]);
questions.value[0].answer = 0;

const availableQuestions: ComputedRef<Question[]> = computed(() => {
  const getOption = (q: Question) => {
    for (const d in q.dependencies!) {
      if (
        questions.value[q.dependencies[d].depends].answer ===
        q.dependencies[d].value
      ) {
        return q.dependencies[d].options;
      }
    }
  };
  let availableQuestions = [];
  for (const q in questions.value) {
    if ("options" in questions.value[q]) {
      availableQuestions.push(questions.value[q]);
    } else {
      if (getOption(questions.value[q])) {
        if ("answer" in questions.value[q]) {
          const availableQuestion = {
            id: questions.value[q].id,
            question: questions.value[q].question,
            options: getOption(questions.value[q]),
            answer: questions.value[q].answer,
          };
          availableQuestions.push(availableQuestion);
        } else {
          const availableQuestion = {
            id: questions.value[q].id,
            question: questions.value[q].question,
            options: getOption(questions.value[q]),
          };
          availableQuestions.push(availableQuestion);
        }
      }
    }
  }
  return availableQuestions;
});

const isDone = computed(() => {
  if (availableQuestions.value.length - 1 === question.value) {
    return true;
  } else {
    return false;
  }
});

watch(question, (newQuestion) => {
  if ("answer" in availableQuestions.value[newQuestion]) {
    const answer = availableQuestions.value[newQuestion].answer!;
    selected.value = availableQuestions.value[newQuestion].options![answer];
  } else {
    selected.value = availableQuestions.value[newQuestion].options![0];
  }
});

watch(selected, (newSelected) => {
  {
    questions.value.find(
      (q) => q.id === availableQuestions.value[question.value].id
    )!.answer = newSelected.id;
  }
});

function previous() {
  if (question.value > 0) {
    question.value--;
  }
}

function next() {
  if (availableQuestions.value[question.value] !== undefined) {
    question.value++;
  }
}

function done() {
  postSurvey();
  if (questions.value[4].answer === 0) {
    router.push({
      path: "suggestions",
      query: { id: questions.value[4].answer },
    });
  } else {
    router.push("thanks");
  }
  for (const q in questions.value) {
    if ("answer" in questions.value[q]) {
      delete questions.value[q].answer;
    }
  }
  questions.value[0].answer = 0;
  question.value = 0;
  selected.value = questionsJson[0].options![0];
}

async function postSurvey() {
  interface PostBody {
    printer: String;
    printerNr: number;
    success: boolean;
    reason?: String;
  }
  let printerAnswer;
  if (questions.value[1].answer === 1) {
    printerAnswer = "prod-Adventurer";
  } else {
    printerAnswer =
      "spets-" +
      availableQuestions.value.find((q) => q.id === 2)!.options![
        questions.value[2].answer!
      ].value;
  }
  let body: PostBody = {
    success: availableQuestions.value.find((q) => q.id === 0)!.options![
      questions.value[0].answer!
    ].value,
    printer: printerAnswer,
    printerNr: availableQuestions.value.find((q) => q.id === 3)!.options![
      questions.value[3].answer!
    ].value,
  };
  if ("answer" in questions.value[4]) {
    body.reason = availableQuestions.value.find((q) => q.id === 3)!.options![
      questions.value[3].answer!
    ].value;
  }
  console.log("Posting...");
  try {
    await axios.post("https://printer-success-api.herokuapp.com/", body);
    console.log("Post success!");
  } catch (error: any) {
    console.log("Post error!");
    console.error(error.response.data.error);
  }
}
</script>
