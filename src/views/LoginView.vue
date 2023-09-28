<script setup lang="ts">
import { ref } from 'vue'
import InputForm from '@/components/Form/InputForm.vue'
import Button from '@/components/ButtonItem.vue'
import router from '@/router'

const username = ref<string>()
const password = ref<string>()

function login() {
  localStorage.setItem('logged', JSON.stringify(true))
  router.push('/')
}
</script>
<template>
  <form class="border border-indigo-600 rounded-md max-w-sm p-6 mx-auto mt-40">
    <InputForm
      :value="username"
      @update:value="(value) => (username = value)"
      label="Username"
      type="text"
      placeholder="Username"
    />
    <InputForm
      :value="password"
      @update:value="(value) => (password = value)"
      label="Password"
      type="password"
      placeholder="Password"
    />
    <Button @click="login" class="mt-4 !block w-full">Login</Button>
  </form>
</template>
