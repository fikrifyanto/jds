<script setup lang="ts">
import { computed, onMounted, onUpdated, ref } from 'vue'
import InputForm from '@/components/Form/InputForm.vue'
import SelectForm from '@/components/Form/SelectForm.vue'
import Button from '@/components/ButtonItem.vue'
import Step from '@/components/StepItem.vue'
import Textarea from '@/components/Form/TextareaForm.vue'
import FileForm from '@/components/Form/FileForm.vue'
import { useDataStore } from '@/stores/data'
import { onBeforeRouteLeave } from 'vue-router'
import Modal from '@/components/ModalItem.vue'
import router from '@/router'

const dataStore = useDataStore()

const steps = [
  {
    key: 'identity',
    name: 'Data Diri'
  },
  { key: 'file', name: 'Berkas Identitas' },
  {
    key: 'address',
    name: 'Alamat'
  }
]

const currentStep = computed(() => dataStore.data.step)

/** Gender **/
const genders = ref<object>([
  {
    id: 'L',
    name: 'Laki-Laki'
  },
  {
    id: 'P',
    name: 'Perempuan'
  }
])
const selectedGender = computed(() => dataStore.data.gender)
function selectGender(value: string) {
  dataStore.setGender(value)
}

/** Provinces **/
const provinces = ref<object>([])
function searchProvince() {
  fetch(`http://www.emsifa.com/api-wilayah-indonesia/api/provinces.json`)
    .then((response) => response.json())
    .then((data) => {
      provinces.value = data
    })
}

const selectedProvince = computed(() => dataStore.data.province)
function selectProvince(value: number) {
  if (selectedProvince.value != value) {
    dataStore.setProvince(value)
    regencies.value = {}
    dataStore.setRegency(null)
    dataStore.setDistrict(null)
    dataStore.setVillage(null)
  }
}

/** Regencies **/
const regencies = ref<object>([])
function searchRegency() {
  if (selectedProvince.value) {
    fetch(
      `http://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvince.value}.json`
    )
      .then((response) => response.json())
      .then((data) => {
        regencies.value = data
      })
  } else {
    regencies.value = []
  }
}

const selectedRegency = computed(() => dataStore.data.regency)
function selectRegency(value: number) {
  if (selectedRegency.value != value) {
    dataStore.setRegency(value)
    dataStore.setDistrict(null)
    dataStore.setVillage(null)
  }
}

/** Districts **/
const districts = ref<object>([])
function searchDistrict() {
  if (selectedRegency.value) {
    fetch(`http://www.emsifa.com/api-wilayah-indonesia/api/districts/${selectedRegency.value}.json`)
      .then((response) => response.json())
      .then((data) => {
        districts.value = data
      })
  } else {
    districts.value = []
  }
}

const selectedDistrict = computed(() => dataStore.data.district)
function selectDistrict(value: number) {
  if (selectedDistrict.value != value) {
    dataStore.setDistrict(value)
    dataStore.setVillage(null)
  }
}

/** Villages **/
const villages = ref<object>([])
function searchVillage() {
  if (selectedDistrict.value) {
    fetch(`http://www.emsifa.com/api-wilayah-indonesia/api/villages/${selectedDistrict.value}.json`)
      .then((response) => response.json())
      .then((data) => {
        villages.value = data
      })
  } else {
    villages.value = []
  }
}

const selectedVillage = computed(() => dataStore.data.village)
function selectVillage(value: number) {
  if (selectedVillage.value != value) {
    dataStore.setVillage(value)
  }
}

/** Submit **/
const loadSubmit = ref<boolean>(false)
const submitted = ref<boolean>(false)
const openModalConfirm = ref<boolean>(false)
const openModalSubmitStatus = ref<boolean>(false)
const titleSubmitStatus = ref<string>('')
const descSubmitStatus = ref<string>('')
function submit() {
  loadSubmit.value = true

  setTimeout(() => {
    openModalConfirm.value = false

    if (getRandomInt(2)) {
      submitted.value = true

      const desc = 'Data warga penerima bansos telah ditambahkan!'
      titleSubmitStatus.value = 'Berhasil!'
      descSubmitStatus.value = desc
      openModalSubmitStatus.value = true

      dataStore.clear()

      let time = 4
      const timeout = setInterval(() => {
        time = time - 1
        descSubmitStatus.value = desc + '<br/>' + `Kembali dalam ${time}`
        if (time == 0) {
          clearInterval(timeout)
          router.push('/')
        }
      }, 1000)
    } else {
      submitted.value = false

      titleSubmitStatus.value = 'Gagal!'
      descSubmitStatus.value = 'Terjadi kesalahan! Silahkan coba beberapa saat lagi.'
      openModalSubmitStatus.value = true
    }

    loadSubmit.value = false
  }, 1500)
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max)
}

function updateAddressOptions() {
  if (selectedProvince.value) {
    searchProvince()
  }

  if (selectedRegency.value) {
    searchRegency()
  }

  if (selectedRegency.value) {
    searchDistrict()
  }

  if (selectedVillage.value) {
    searchVillage()
  }
}

onMounted(() => {
  dataStore.setStep(0)
  dataStore.setName('Fikri')
  dataStore.setAge(21)
  dataStore.setGender('L')
  dataStore.setIncomeBefore(123123)
  dataStore.setIncomeAfter(123123)
  dataStore.setNik(123123)
  dataStore.setNikFile(null)
  dataStore.setKk(12312313)
  dataStore.setKkFile(null)
  dataStore.setProvince(32)
  dataStore.setRegency(3210)
  dataStore.setDistrict(3210180)
  dataStore.setVillage(3210180002)
  dataStore.setRt(10)
  dataStore.setRw(5)
  dataStore.setAddress('Dusun Banggala')

  const exampleImage =
    'data:image/png;base64,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AIBhBCwAAADDCFgAAACGEbAAAAAMI2ABAAAYRsACAAAwjIAFAABgGAELAADAMAIWAACAYQQsAAAAwwhYAAAAhhGwAAAADCNgAQAAGEbAAgAAMIyABQAAYBgBCwAAwDACFgAAgGEELAAAAMMIWAAAAIYRsAAAAAwjYAEAABhGwAIAADCMgAUAAGAYAQsAAMAwAhYAAIBhBCwAAADDCFgAAACGEbAAAAAMI2ABAAAYRsACAAAwjIAFAABgGAELAADAMAIWAACAYQQsAAAAwwhYAAAAhhGwAAAADCNgAQAAGEbAAgAAMIyABQAAYBgBCwAAwDACFgAAgGEELAAAAMMIWAAAAIYRsAAAAAwjYAEAABhGwAIAADCMgAUAAGAYAQsAAMAwAhYAAIBhBCwAAADDCFgAAACGEbAAAAAMI2ABAAAYRsACAAAwjIAFAABgGAELAADAMAIWAACAYQQsAAAAwwhYAAAAhhGwAAAADCNgAQAAGEbAAgAAMIyABQAAYBgBCwAAwDACFgAAgGEELAAAAMMIWAAAAIYRsAAAAAwjYAEAABhGwAIAADCMgAUAAGAYAQsAAMAwAhYAAIBhBCwAAADDCFgAAACGEbAAAAAMI2ABAAAYRsACAAAwjIAFAABgGAELAADAsP8P6gi6x05xRlkAAAAASUVORK5CYII='
  dataStore.setNikFile(exampleImage)
  dataStore.setKkFile(exampleImage)

  updateAddressOptions()
})

onUpdated(() => {
  updateAddressOptions()
})

onBeforeRouteLeave(() => {
  dataStore.clear()
})
</script>

<template>
  <main>
    <div class="items-start justify-between md:flex mt-4 md:mt-0">
      <div class="max-w-lg">
        <h3 class="text-gray-800 text-xl font-bold sm:text-2xl">Edit Penerima Bantuan Sosial</h3>
        <p class="text-gray-600 mt-2">
          Isikan data valid warga Kabupaten Bandung Barat yang berhak menerima bantuan sosial.
        </p>
      </div>
    </div>

    <Step :steps="steps" :current="currentStep" @clickBadge="(value) => dataStore.setStep(value)">
      <template #identity>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 mt-10">
          <div class="col-span-1 flex flex-col gap-5">
            <InputForm
              label="Nama"
              type="text"
              placeholder="Nama"
              :value="dataStore.data.name"
              @update:value="(value) => dataStore.setName(value)"
            />
            <InputForm
              label="Umur"
              type="number"
              placeholder="Umur"
              :value="dataStore.data.age"
              @update:value="(value) => dataStore.setAge(value)"
            />
            <SelectForm
              label="Jenis Kelamin"
              type="text"
              placeholder="Jenis Kelamin"
              :options="genders"
              :value="selectedGender"
              @onSelect="selectGender"
            />
          </div>
          <div class="col-span-1 flex flex-col gap-5">
            <InputForm
              label="Penghasilan Sebelum Pandemi"
              placeholder="Penghasilan Sebelum Pandemi"
              type="number"
              :value="dataStore.data.incomeBefore"
              @update:value="(value) => dataStore.setIncomeBefore(value)"
            />
            <InputForm
              label="Penghasilan Setelah Pandemi"
              placeholder="Penghasilan Setelah Pandemi"
              type="number"
              :value="dataStore.data.incomeAfter"
              @update:value="(value) => dataStore.setIncomeAfter(value)"
            />
          </div>
        </div>
        <Button
          :disabled="
            !dataStore.data.name ||
            !dataStore.data.age ||
            !selectedGender ||
            !dataStore.data.incomeBefore ||
            !dataStore.data.incomeAfter
          "
          @click="dataStore.setStep(1)"
          class="mx-auto block w-64 mt-10"
          >Lanjut</Button
        >
      </template>
      <template #file>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 mt-10">
          <div class="col-span-1 flex flex-col gap-5">
            <InputForm
              label="NIK"
              type="number"
              placeholder="NIK"
              :value="dataStore.data.nik"
              @update:value="(value) => dataStore.setNik(value)"
            />
            <FileForm
              label="Foto KTP"
              type="text"
              placeholder="Foto KTP"
              :value="dataStore.data.nikFile"
              @onChange="(value) => dataStore.setNikFile(value)"
            />
          </div>
          <div class="col-span-1 flex flex-col gap-5">
            <InputForm
              label="Nomor Kartu Keluarga"
              type="number"
              placeholder="Nomor Kartu Keluarga"
              :value="dataStore.data.kk"
              @update:value="(value) => dataStore.setKk(value)"
            />
            <FileForm
              label="Foto Kartu Keluarga"
              type="text"
              placeholder="Foto Kartu Keluarga"
              :value="dataStore.data.kkFile"
              @onChange="(value) => dataStore.setKkFile(value)"
            />
          </div>
        </div>
        <Button
          :disabled="
            !dataStore.data.nik ||
            !dataStore.data.kk ||
            !dataStore.data.nikFile ||
            !dataStore.data.kkFile
          "
          @click="dataStore.setStep(2)"
          class="mx-auto block w-64 mt-10"
          >Lanjut</Button
        >
      </template>
      <template #address>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 mt-10">
          <div class="col-span-1 flex flex-col gap-5">
            <SelectForm
              :search="true"
              label="Provinsi"
              placeholder="Pilih Provinsi"
              @onOpen="searchProvince"
              @onSelect="selectProvince"
              :value="selectedProvince"
              :options="provinces"
            />
            <SelectForm
              :search="true"
              label="Kab/Kota"
              placeholder="Pilih Kab/Kota"
              @onOpen="searchRegency"
              @onSelect="selectRegency"
              :value="selectedRegency"
              :options="regencies"
            />
            <SelectForm
              :search="true"
              label="Kecamatan"
              placeholder="Pilih Kecamatan"
              @onOpen="searchDistrict"
              @onSelect="selectDistrict"
              :value="selectedDistrict"
              :options="districts"
            />
            <SelectForm
              :search="true"
              label="Kelurahan/Desa"
              placeholder="Pilih Kelurahan/Desa"
              @onOpen="searchVillage"
              @onSelect="selectVillage"
              :value="selectedVillage"
              :options="villages"
            />
          </div>
          <div class="col-span-1 flex flex-col gap-5">
            <InputForm
              label="RT"
              type="number"
              placeholder="RT"
              :value="dataStore.data.rt"
              @update:value="(value) => dataStore.setRt(value)"
            />
            <InputForm
              label="RW"
              type="number"
              placeholder="RW"
              :value="dataStore.data.rw"
              @update:value="(value) => dataStore.setRw(value)"
            />
            <Textarea
              label="Alamat"
              type="text"
              placeholder="Alamat"
              :value="dataStore.data.address"
              @update:value="(value) => dataStore.setAddress(value)"
            />
          </div>
        </div>
        <Button
          :disabled="
            !selectedProvince ||
            !selectedRegency ||
            !selectedDistrict ||
            !selectedVillage ||
            !dataStore.data.rt ||
            !dataStore.data.rw ||
            !dataStore.data.address
          "
          @click="openModalConfirm = true"
          class="mx-auto block w-64 mt-10"
          >Edit</Button
        >
      </template>
    </Step>
  </main>

  <Modal
    @onConfirm="submit"
    @onClose="openModalConfirm = false"
    confirmButtonName="Setuju"
    cancelButtonName="Batal"
    title="Pernyataan"
    :open="openModalConfirm"
    :loadSubmit="loadSubmit"
    size="max-w-xl"
  >
    <p>
      Saya menyatakan bahwa data yang diisikan adalah benar dan siap mempertanggungjawabkan apabila
      ditemukan ketidaksesuaian dalam data tersebut.
    </p>
  </Modal>

  <Modal
    :variant="submitted ? 'success' : 'error'"
    @onConfirm="openModalSubmitStatus = false"
    :confirmButton="!submitted"
    confirmButtonName="OK"
    :cancelButton="false"
    :title="titleSubmitStatus"
    :open="openModalSubmitStatus"
    size="max-w-xl"
  >
    <p v-html="descSubmitStatus" />
  </Modal>
</template>
