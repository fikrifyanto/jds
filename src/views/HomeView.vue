<script setup lang="ts">
import Table from '../components/TableItem.vue'
import Button from '../components/ButtonItem.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <main>
    <div class="items-start justify-between md:flex">
      <div class="max-w-lg">
        <h3 class="text-gray-800 text-xl font-bold sm:text-2xl">Data Penerima Bantuan Sosial</h3>
        <p class="text-gray-600 mt-2">
          Data warga penerima bantuan sosial yang terdampak pandemi Covid-19 di Kabupaten Bandung
          Barat.
        </p>
      </div>
      <div class="mt-3 md:mt-0">
        <RouterLink to="/add"><Button>Tambahkan</Button> </RouterLink>
      </div>
    </div>

    <Table />
  </main>
</template>
