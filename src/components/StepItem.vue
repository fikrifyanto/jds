<script setup lang="ts">
import CheckIcon from './Icon/CheckIcon.vue'
</script>
<template>
  <ul aria-label="Steps" class="items-center text-gray-600 font-medium md:flex">
    <li aria-current="false" class="flex gap-x-3 md:flex-col md:flex-1 md:gap-x-0">
      <div class="flex flex-col items-center md:flex-row md:flex-1">
        <hr class="w-full border hidden md:block border-none" />
        <div
          class="w-8 h-8 rounded-full border-2 flex-none flex items-center justify-center bg-indigo-600 border-indigo-600"
        >
          <span class="w-2.5 h-2.5 rounded-full bg-indigo-600 hidden"></span>
          <CheckIcon />
        </div>
        <hr class="h-12 border md:w-full md:h-auto border-indigo-600" />
      </div>
      <div class="h-8 flex justify-center items-center md:mt-3 md:h-auto">
        <h3 class="text-sm">Profile</h3>
      </div>
    </li>
    <li aria-current="step" class="flex gap-x-3 md:flex-col md:flex-1 md:gap-x-0">
      <div class="flex flex-col items-center md:flex-row md:flex-1">
        <hr class="w-full border hidden md:block border-indigo-600" />
        <div
          class="w-8 h-8 rounded-full border-2 flex-none flex items-center justify-center border-indigo-600"
        >
          <span class="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
        </div>
        <hr class="h-12 border md:w-full md:h-auto" />
      </div>
      <div class="h-8 flex justify-center items-center md:mt-3 md:h-auto">
        <h3 class="text-sm text-indigo-600">Contact</h3>
      </div>
    </li>
    <li aria-current="false" class="flex gap-x-3 md:flex-col md:flex-1 md:gap-x-0">
      <div class="flex flex-col items-center md:flex-row md:flex-1">
        <hr class="w-full border hidden md:block" />
        <div class="w-8 h-8 rounded-full border-2 flex-none flex items-center justify-center">
          <span class="w-2.5 h-2.5 rounded-full bg-indigo-600 hidden"></span>
        </div>
        <hr class="h-12 border md:w-full md:h-auto" />
      </div>
      <div class="h-8 flex justify-center items-center md:mt-3 md:h-auto">
        <h3 class="text-sm">Identity</h3>
      </div>
    </li>
    <li aria-current="false" class="flex gap-x-3 md:flex-col md:flex-1 md:gap-x-0">
      <div class="flex flex-col items-center md:flex-row md:flex-1">
        <hr class="w-full border hidden md:block" />
        <div class="w-8 h-8 rounded-full border-2 flex-none flex items-center justify-center">
          <span class="w-2.5 h-2.5 rounded-full bg-indigo-600 hidden"></span>
        </div>
        <hr class="h-12 border md:w-full md:h-auto border-none" />
      </div>
      <div class="h-8 flex justify-center items-center md:mt-3 md:h-auto">
        <h3 class="text-sm">Passport</h3>
      </div>
    </li>
  </ul>
</template>
