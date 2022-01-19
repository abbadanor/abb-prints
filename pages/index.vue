<template>
  <div class="w-full max-w-md mx-auto py-2">
    <RadioGroup v-model="selected">
      <RadioGroupLabel class="text-xl leading-10 font-semibold">{{
        questions[question].question
      }}</RadioGroupLabel>
      <div class="space-y-2">
        <RadioGroupOption
          as="template"
          v-for="q in questions[question].options"
          :key="q.title"
          :value="q"
          v-slot="{ active, checked }"
        >
          <div
            :class="[
              active
                ? 'ring-2 ring-offset-2 ring-offset-sky-300 ring-white ring-opacity-60'
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
        :class="question > 0 ? '' : 'opacity-70'"
        @click="backward()"
      >
        Backward
      </button>
      <button
        class="bg-abb-300 text-sm font-medium text-white px-5 py-2 rounded-lg shadow-md cursor-pointer focus:outline-none"
        @click="forward()"
      >
        {{
          (questions[0].answer === 0 && question === 1) ||
          (questions[0].answer === 1 && question === 3)
            ? "Done"
            : "Forward"
        }}
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
import axios, { AxiosError } from "axios";
import questionTemplate from "@/assets/questions.json";

interface PostBody {
  success?: boolean;
  printer?: string;
  reason?: number;
}

interface Questions {
  question: string;
  answer?: number;
  options: {
    title: string;
    description: string;
    id: number;
    type?: string;
    printerNum?: number;
    success?: boolean;
  }[];
}

export default {
  components: {
    RadioGroup,
    RadioGroupLabel,
    RadioGroupDescription,
    RadioGroupOption,
  },
  setup() {
    const questions = ref<Questions[]>(questionTemplate);
    const question = ref(0);
    const selected = ref(questions.value[0].options[0]);
    return { selected, questions, question };
  },
  created() {
    this.$watch("question", (newQuestion: number) => {
      if (this.questions[newQuestion].answer !== undefined) {
        const answer = this.questions[newQuestion].answer as number;
        if (this.questions[newQuestion].options[answer] !== undefined) {
          this.selected = this.questions[newQuestion].options[answer];
        }
      } else {
        this.selected = this.questions[newQuestion].options[0];
      }
    });
  },
  methods: {
    forward() {
      if (this.questions[0].answer === 0) {
        if (this.question === 1) {
          this.setAnswer();
          this.done(false);
          return;
        }
      } else {
        if (this.question === 3) {
          this.setAnswer();
          if (this.questions[3].answer === 0) {
            this.done(true);
          } else {
            this.done(false);
          }
          return;
        }
      }
      this.setAnswer();
      this.question++;
    },
    backward() {
      if (this.question > 0) {
        this.setAnswer();
        this.question--;
      }
    },
    done(showTips: boolean) {
      this.postSurvey();
      if (showTips) {
        console.log("Show tips");
        this.$router.push({
          name: "tips",
          params: { reason: this.questions[2].answer },
        });
      } else {
        console.log("Show end screen");
        this.$router.push("/end");
      }
    },
    setAnswer() {
      this.questions[this.question].answer = this.selected.id;
    },
    async postSurvey() {
      console.log("Trying to post...");
      const successAnswer = this.questions[0].answer as number;
      const printerAnswer = this.questions[1].answer as number;
      let reason = null;
      if (this.questions[2].answer) {
        reason = this.questions[2].answer as number;
      }
      const body = {
        printer: this.questions[1].options[printerAnswer].type,
        printerNr: this.questions[1].options[printerAnswer].printerNum,
        success: this.questions[0].options[successAnswer].success,
        reason: reason,
      };
      try {
        await axios.post("https://printer-success-api.herokuapp.com/", body);
        console.log("Post success!");
      } catch (error: any) {
        console.log("Error!");
        console.error(error.response.data.error);
      }
    },
  },
};
</script>
