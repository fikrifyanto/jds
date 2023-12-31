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
        <h3 class="text-gray-800 text-xl font-bold sm:text-2xl">Tambah Penerima Bantuan Sosial</h3>
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
          >Submit</Button
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
