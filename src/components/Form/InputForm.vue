<template>
  <div>
    <label for="email" class="block py-3 text-gray-500">{{ props.label }}</label>
    <input
      :type="props.type"
      :placeholder="props.placeholder"
      :value="props.value"
      v-model="inputed"
      class="w-full text-gray-500 outline-none bg-transparent flex items-center p-2.5 border rounded-md focus:border-indigo-600 bg-white"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUpdated } from 'vue'

const emit = defineEmits(['update:value'])

const props = defineProps({
  label: {
    type: String
  },
  type: {
    type: String
  },
  placeholder: {
    type: String,
    default: ''
  },
  value: {
    type: [String, Number],
    required: false
  }
})

const inputed = ref<string | number | null>(null)

watch(inputed, () => {
  emit('update:value', inputed.value)
})

onMounted(() => {
  if (props.value) {
    inputed.value = props.value
  }
})

onUpdated(() => {
  if (props.value) {
    inputed.value = props.value
  }
})
</script>
