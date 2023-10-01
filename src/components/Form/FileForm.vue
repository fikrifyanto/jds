<template>
  <div class="relative flex items-center justify-center text-indigo-600 rounded-lg h-64">
    <label
      ref="dropzone"
      @drop="onDrop"
      @dragenter="onDragEnter"
      @dragleave="onDragLeave"
      @dragover.prevent
      :for="uid"
      class="absolute flex items-center justify-center w-full h-64 border-2 border-indigo-300 border-dashed rounded-lg cursor-pointer bg-indigo-600 bg-opacity-5 hover:bg-opacity-10"
    >
    </label>
    <div class="flex flex-col items-center justify-center pt-5 pb-6">
      <template v-if="props.value">
        <div class="bg-indigo-600 p-4 rounded-lg relative">
          <img class="h-44" :src="props.value" />
          <button
            @click="emit('onChange', null)"
            class="absolute -top-2 -right-2 p-1 rounded-full bg-white shadow-xl hover:bg-indigo-600 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 mx-auto"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </template>
      <template v-else>
        <UploadIcon />
        <p class="mb-2 text-sm">
          <span class="font-semibold">Click to upload</span> or drag and drop
        </p>
        <p class="text-xs">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
      </template>
    </div>
    <input :id="uid" type="file" class="hidden" @change="onChange" :accept="props.accept" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import UploadIcon from '../Icon/UploadIcon.vue'

const uid: string = generateUid()
const emit = defineEmits(['onChange'])

const props = defineProps({
  value: {
    type: String,
    required: false
  },
  accept: {
    type: String,
    default: 'image/*'
  }
})

const dropzone = ref<HTMLElement>()

function onDrop(event: DragEvent) {
  event.preventDefault()

  dropzone.value?.classList?.add('hover:bg-opacity-10')
  dropzone.value?.parentElement?.classList?.remove('bg-indigo-600')
  dropzone.value?.parentElement?.classList?.add('text-indigo-600')
  dropzone.value?.parentElement?.classList?.remove('text-white')

  const files = event?.dataTransfer?.items

  if (files && files?.length > 0) {
    if (props.accept && !files[0].type.match(props.accept)) {
      return false
    }

    if (files[0].kind === 'file') {
      const file = files[0].getAsFile()

      if (file) {
        const reader = new FileReader()

        reader.onload = function (event: Event) {
          // event.target.result contains the data URL
          if (event.target) {
            const dataUrl = event.target as any
            emit('onChange', dataUrl.result)
          }
        }

        // Read the file as data URL
        reader.readAsDataURL(file)
      }
    }
  }
}

function onChange(event: Event) {
  const target = event.target as HTMLInputElement

  if (target.files) {
    const file: any = target.files[0]

    if (props.accept && !file.type.match(props.accept)) {
      return false
    }

    if (file) {
      const reader = new FileReader()

      reader.onload = function (event: Event) {
        // event.target.result contains the data URL
        if (event.target) {
          const dataUrl = event.target as any
          emit('onChange', dataUrl.result)
        }
      }

      // Read the file as data URL
      reader.readAsDataURL(file)
    }
  }
}

function onDragEnter() {
  dropzone.value?.classList?.remove('hover:bg-opacity-10')
  dropzone.value?.parentElement?.classList?.add('bg-indigo-600')
  dropzone.value?.parentElement?.classList?.remove('text-indigo-600')
  dropzone.value?.parentElement?.classList?.add('text-white')
}

function onDragLeave() {
  dropzone.value?.classList?.add('hover:bg-opacity-10')
  dropzone.value?.parentElement?.classList?.remove('bg-indigo-600')
  dropzone.value?.parentElement?.classList?.add('text-indigo-600')
  dropzone.value?.parentElement?.classList?.remove('text-white')
}

function generateUid() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}
</script>
