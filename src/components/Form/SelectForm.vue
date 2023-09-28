<script setup lang="ts">
import SearchIcon from '../Icon/SearchIcon.vue'
import OptionIcon from '../Icon/OptionIcon.vue'
import CheckIcon from '../Icon/CheckIcon.vue'
import { computed, ref, watch } from 'vue'

const emit = defineEmits(['onSearch', 'onSelect', 'onOpen'])

const props = defineProps({
  label: {
    type: String
  },
  placeholder: {
    type: String,
    default: ''
  },
  search: {
    type: Boolean,
    default: false
  },
  options: {
    type: Object,
    default: () => {
      return []
    }
  },
  value: {
    type: [Number, String],
    default: null
  }
})

const openSearch = ref<boolean>(false)

const selected = computed(() => {
  const selected = props.options.filter((option: any) => {
    return option.id == props.value
  })

  if (selected.length) {
    return selected[0]
  }

  return null
})

watch(
  () => openSearch.value,
  () => {
    if (openSearch.value) {
      emit('onOpen')
    }
  }
)

function select(option: number) {
  openSearch.value = false
  emit('onSelect', option)
}
</script>

<template>
  <template v-if="props.search">
    <div>
      <label for="email" class="block py-3 text-gray-500">{{ props.label }}</label>
      <div class="relative text-[15px]">
        <div
          @click="openSearch = !openSearch"
          class="flex items-center justify-between w-full px-3 py-2 text-gray-500 bg-white border rounded-md shadow-sm cursor-default outline-none focus:border-indigo-600"
          aria-haspopup="true"
          aria-expanded="true"
        >
          {{ props.value && selected ? selected.name : props.placeholder }}
          <OptionIcon />
        </div>

        <div v-show="openSearch" class="relative w-full">
          <ul class="w-full mt-3 bg-white border rounded-md shadow-sm" role="listbox">
            <div :class="{ shadow: options.length }" class="flex items-center">
              <SearchIcon />
              <input
                type="text"
                placeholder="Search"
                @input="(value) => emit('onSearch', value)"
                class="p-2 text-gray-500 w-full rounded-md outline-none"
              />
            </div>
            <div v-show="options.length" class="max-h-64 mt-2 overflow-y-auto">
              <template :key="option.id" v-for="option in props.options">
                <li
                  @click="select(option.id)"
                  class="flex items-center justify-between px-3 cursor-default py-2 duration-150 hover:text-indigo-600 hover:bg-indigo-50"
                  :class="{
                    'text-indigo-600 bg-indigo-50': option.id == value,
                    'text-gray-500': option.id != value
                  }"
                >
                  {{ option.name }}
                  <CheckIcon v-if="option.id == value" />
                </li>
              </template>
            </div>
          </ul>
        </div>
      </div>
    </div>
  </template>
  <template v-else>
    <div>
      <label for="email" class="block py-3 text-gray-500">{{ props.label }}</label>
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
          @change="(value: any) => emit('onSelect', value?.target?.value)"
          class="w-full p-2 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
        >
          <option selected disabled>{{ props.placeholder }}</option>
          <template :key="option.id" v-for="option in options">
            <option :selected="option.id == props.value" :value="option.id">
              {{ option.name }}
            </option>
          </template>
        </select>
      </div>
    </div>
  </template>
</template>
