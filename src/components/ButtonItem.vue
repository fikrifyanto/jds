<template>
  <button :class="[variantClass]">
    <slot />
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  variant: {
    type: String,
    default: 'primary'
  }
})

const variantClass = {
  'px-6 py-3 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm disabled:bg-indigo-400 disabled:cursor-not-allowed':
    props.variant == 'primary',
  'px-6 py-3 text-gray-800 duration-150 font-medium bg-white border rounded-lg active:bg-indigo-700 md:text-sm disabled:bg-indigo-400 disabled:cursor-not-allowed ring-indigo-600 focus:ring-2 hover:text-indigo-600 focus:text-white':
    props.variant == 'secondary'
}
</script>
