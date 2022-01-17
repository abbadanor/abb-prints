<template>
  <div class="w-full max-w-md mx-auto">
    <RadioGroup v-model="selected">
      <RadioGroupLabel>{{
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
        @click="previous()"
      >
        Backward
      </button>
      <button
        class="bg-white text-sm font-medium text-black px-5 py-2 rounded-lg shadow-md cursor-pointer focus:outline-none"
        @click="availableQuestions()"
      >
        Test
      </button>
      <button
        class="bg-abb-300 text-sm font-medium text-white px-5 py-2 rounded-lg shadow-md cursor-pointer focus:outline-none"
        @click="next()"
      >
        Forward
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupDescription,
  RadioGroupOption,
} from "@headlessui/vue";
import questionsJson from "@/assets/questions.json";
import Question from "@/interfaces/Question";

export default {
  components: {
    RadioGroup,
    RadioGroupLabel,
    RadioGroupDescription,
    RadioGroupOption,
  },
  created() {
    this.$watch("question", (newQuestion: number) => {
      this.selected = this.availableQuestions[newQuestion].options[0];
    });
    this.$watch("selected", (selected) => {
      this.questions.find(
        (q) => q.id === this.availableQuestions[this.question].id
      ).answer = selected.id;
    });
  },
  setup() {
    const questions = ref<Question[]>(questionsJson);
    const question = ref(0);
    const selected = ref(questionsJson[0].options[0]);
    questions.value[question.value].answer = selected.value.id;

    return { questions, question, selected };
  },
  methods: {
    previous() {
      this.question--;
    },
    next() {
      this.question++;
    },
    isDone() {},
    done() {},
  },
  computed: {
    availableQuestions() {
      const getOption = (q: Question) => {
        for (const d in q.dependencies) {
          if (
            this.questions[q.dependencies[d].depends].answer ===
            q.dependencies[d].value
          ) {
            return q.dependencies[d].options;
          }
        }
      };
      let availableQuestions = [];
      for (const q in this.questions) {
        if ("options" in this.questions[q]) {
          availableQuestions.push(this.questions[q]);
        } else {
          if (getOption(this.questions[q])) {
            if (this.questions[q].answer) {
              const availableQuestion = {
                id: this.questions[q].id,
                question: this.questions[q].question,
                options: getOption(this.questions[q]),
                answer: this.questions[q].answer,
              };
              availableQuestions.push(availableQuestion);
            } else {
              const availableQuestion = {
                id: this.questions[q].id,
                question: this.questions[q].question,
                options: getOption(this.questions[q]),
              };
              availableQuestions.push(availableQuestion);
            }
          }
        }
      }
      return availableQuestions;
    },
  },
};
</script>
