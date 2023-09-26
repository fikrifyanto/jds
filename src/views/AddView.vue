<script setup lang="ts">
import InputForm from '@/components/Form/InputForm.vue'
import SelectForm from '../components/Form/SelectForm.vue'
import Button from '@/components/ButtonItem.vue'
import Step from '@/components/StepItem.vue'
</script>

<template>
  <main>
    <div class="items-start justify-between md:flex">
      <div class="max-w-lg">
        <h3 class="text-gray-800 text-xl font-bold sm:text-2xl">Tambah Penerima Bantuan Sosial</h3>
        <p class="text-gray-600 mt-2">
          Isikan data valid warga Kabupaten Bandung Barat yang berhak menerima bantuan sosial.
        </p>
      </div>
    </div>

    <Step class="mt-10" />

    <form class="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
      <div class="col-span-1 flex flex-col gap-5">
        <InputForm label="Nama" />
        <InputForm label="NIK" />
        <InputForm label="Nomor Kartu Keluarga" />
        <InputForm label="Foto KTP" />
        <InputForm label="Foto Kartu Keluarga" />
        <InputForm label="Umur" />
        <SelectForm label="Jeni Kelamin" />
        <SelectForm label="Provinsi" />
      </div>
      <div class="col-span-1 flex flex-col gap-5">
        <SelectForm label="Kab/Kota" />
        <SelectForm label="Kecamatan" />
        <SelectForm label="Kelurahan/Desa" />
        <InputForm label="Alamat" />
        <InputForm label="RT" />
        <InputForm label="RW" />
        <InputForm label="Penghasilan Sebelum Pandemi" />
        <InputForm label="Penghasilan Setelah Pandemi" />
      </div>
      <Button>Tambahkan</Button>
    </form>
  </main>
</template>
