<template>
  <div class="flex items-center justify-center w-full">
    <label
      for="dropzone-file"
      class="flex flex-col items-center justify-center w-full h-64 border-2 border-indigo-300 border-dashed rounded-lg cursor-pointer bg-indigo-50 dark:hover:bg-bray-800 hover:bg-indigo-100"
    >
      <div class="flex flex-col items-center justify-center pt-5 pb-6">
        <UploadIcon />
        <p class="mb-2 text-sm text-indigo-500">
          <span class="font-semibold">Click to upload</span> or drag and drop
        </p>
        <p class="text-xs text-indigo-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
      </div>
      <input id="dropzone-file" type="file" class="hidden" />
    </label>
  </div>
</template>

<script setup lang="ts">
import UploadIcon from '../Icon/UploadIcon.vue'
</script>
