<template>
  <Teleport to="body">
    <div v-show="open" class="fixed inset-0 z-10 overflow-y-auto">
      <div class="fixed inset-0 w-full h-full bg-black opacity-40"></div>
      <div class="flex items-center min-h-screen px-4 py-8">
        <div class="relative w-full max-w-lg mx-auto bg-white rounded-md shadow-lg">
          <template v-if="props.variant == 'default'">
            <div
              class="flex items-center justify-between p-4"
              :class="{ 'border-b': confirmButton || cancelButton }"
            >
              <h4 class="text-lg font-medium text-gray-800">{{ props.title }}</h4>
              <button
                @click="openModal = false"
                class="p-2 text-gray-400 rounded-md hover:bg-gray-100"
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
                  />
                </svg>
              </button>
            </div>
            <div class="space-y-2 p-4 mt-3 text-[15.5px] leading-relaxed text-gray-500">
              <slot />
            </div>
          </template>
          <template v-if="props.variant == 'success'">
            <div class="flex items-center justify-center p-4">
              <div className="my-3">
                <div
                  className="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6 text-green-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div className="mt-2 text-center">
                  <h4 className="text-lg font-medium text-gray-800">{{ props.title }}</h4>
                  <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
                    <slot />
                  </p>
                </div>

                <Button
                  class="block mx-auto mt-4"
                  @click="emit('onConfirm')"
                  v-if="props.confirmButton"
                >
                  {{ props.confirmButtonName }}
                </Button>
              </div>
            </div>
          </template>
          <template v-if="props.variant == 'error'">
            <div class="flex items-center justify-center p-4">
              <div className="my-3">
                <div
                  className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6 text-red-600"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                    />
                  </svg>
                </div>
                <div className="mt-2 text-center">
                  <h4 className="text-lg font-medium text-gray-800">{{ props.title }}</h4>
                  <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
                    <slot />
                  </p>
                </div>

                <Button
                  class="block mx-auto mt-4"
                  @click="emit('onConfirm')"
                  v-if="props.confirmButton"
                >
                  {{ props.confirmButtonName }}
                </Button>
              </div>
            </div>
          </template>
          <div
            v-if="props.variant == 'default' && (confirmButton || cancelButton)"
            class="flex items-center gap-3 p-4 mt-5 border-t"
          >
            <Button
              class="flex items-center gap-4"
              @click="emit('onConfirm')"
              v-if="props.confirmButton"
            >
              {{ props.confirmButtonName }}
              <svg
                v-if="props.loadSubmit"
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </Button>
            <Button variant="secondary" v-if="props.cancelButton" @click="openModal = false">
              {{ props.cancelButtonName }}
            </Button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Button from './ButtonItem.vue'

const emit = defineEmits(['onConfirm', 'onClose', 'onOpen'])

const props = defineProps({
  open: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    required: true
  },
  confirmButton: {
    type: Boolean,
    default: true
  },
  confirmButtonName: {
    type: String,
    default: 'Confirm'
  },
  cancelButton: {
    type: Boolean,
    default: true
  },
  cancelButtonName: {
    type: String,
    default: 'Cancel'
  },
  variant: {
    type: String,
    default: 'default'
  },
  loadSubmit: {
    type: Boolean,
    default: false
  }
})

const openModal = ref<boolean>(false)

watch(
  () => props.open,
  () => {
    openModal.value = props.open
  }
)

watch(openModal, () => {
  if (openModal.value) {
    emit('onOpen')
  } else {
    emit('onClose')
  }
})
</script>
