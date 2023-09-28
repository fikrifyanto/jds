<script setup lang="ts">
import { computed } from 'vue'
import CheckIcon from './Icon/CheckIcon.vue'

const emit = defineEmits(['clickBadge'])

const props = defineProps({
  steps: {
    type: Object,
    required: true
  },
  current: {
    type: Number,
    required: true
  }
})

const currentStep = computed(() => {
  return props.steps[props.current]
})

function toPrevious(previous: number) {
  if (previous < props.current) {
    {
      emit('clickBadge', previous)
    }
  }
}
</script>
<template>
  <div class="mt-10 md:my-20">
    <ul aria-label="Steps" class="items-center text-gray-600 font-medium flex">
      <template :key="i" v-for="(step, i) in props.steps">
        <li aria-current="false" class="flex flex-col flex-1 gap-x-0">
          <div class="flex items-center flex-row flex-1">
            <hr
              class="border w-full h-auto"
              :class="{
                'border-transparent': parseInt(i) == 0,
                'border-indigo-600': parseInt(i) <= props.current
              }"
            />
            <div
              @click="toPrevious(parseInt(i))"
              class="w-8 h-8 rounded-full border-2 flex-none flex items-center justify-center cursor-pointer"
              :class="{
                'bg-indigo-600 border-indigo-600 text-white': parseInt(i) <= props.current,
                'bg-white border-slate-200': parseInt(i) > props.current
              }"
            >
              <span
                v-if="parseInt(i) == props.current"
                class="w-2.5 h-2.5 rounded-full bg-white"
              ></span>
              <span
                v-if="parseInt(i) > props.current"
                class="w-2.5 h-2.5 rounded-full bg-indigo-600"
              ></span>
              <CheckIcon v-if="parseInt(i) < props.current" />
            </div>
            <hr
              class="border w-full h-auto"
              :class="{
                'border-transparent': parseInt(i) == props.steps?.length - 1,
                'border-indigo-600': parseInt(i) <= props.current
              }"
            />
          </div>
          <div class="h-8 flex justify-center items-center md:mt-3 md:h-auto">
            <h3 class="text-sm">{{ step.name }}</h3>
          </div>
        </li>
      </template>
    </ul>

    <slot :name="currentStep.key" />
  </div>
</template>
