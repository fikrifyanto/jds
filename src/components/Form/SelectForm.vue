<script setup lang="ts">
import CheckIcon from '../Icon/CheckIcon.vue'

const props = defineProps({
  search: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <template v-if="props.search">
    <div class="relative max-w-xs px-4 mx-auto mt-12 text-[15px]">
      <button
        class="flex items-center justify-between w-full px-3 py-2 text-gray-500 bg-white border rounded-md shadow-sm cursor-default outline-none focus:border-indigo-600"
        aria-haspopup="true"
        aria-expanded="true"
      >
        Select a country
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M8 9l4-4 4 4m0 6l-4 4-4-4"
          />
        </svg>
      </button>

      <div class="relative w-full">
        <ul class="absolute w-full mt-3 bg-white border rounded-md shadow-sm" role="listbox">
          <div class="shadow flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 mx-3 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="{2}"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search"
              class="p-2 text-gray-500 w-full rounded-md outline-none"
            />
          </div>
          <div class="max-h-64 mt-2 overflow-y-auto">
            <li
              class="text-indigo-600 bg-indigo-50 menu-el-js flex items-center justify-between px-3 cursor-default py-2 duration-150 hover:text-indigo-600 hover:bg-indigo-50"
            >
              Jakarta
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 text-indigo-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </li>
            <li
              class="flex items-center justify-between px-3 cursor-default py-2 duration-150 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50"
            >
              Jakarta
            </li>
          </div>
        </ul>
      </div>
    </div>
  </template>
  <template v-else>
    <div>
      <label for="email" class="block py-3 text-gray-500"> Your Email </label>
      <div class="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 right-2.5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
        <select
          class="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
        >
          <option>Project manager</option>
          <option>Software engineer</option>
          <option>IT manager</option>
          <option>UI / UX designer</option>
        </select>
      </div>
    </div>
  </template>
</template>
