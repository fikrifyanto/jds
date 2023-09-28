<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Table from '@/components/TableItem.vue'
import Button from '@/components/ButtonItem.vue'
import { RouterLink } from 'vue-router'
import Modal from '@/components/ModalItem.vue'
import router from '@/router'

const tableHeaders = ['Nama', 'Usia', 'Alamat']
const tableData = [
  { Nama: 'John', Usia: 30, Alamat: 'New York', _id: 1, _edit: true, _view: true, _delete: true },
  {
    Nama: 'Alice',
    Usia: 25,
    Alamat: 'Los Angeles',
    _id: 2,
    _edit: true,
    _view: true,
    _delete: true
  },
  { Nama: 'Bob', Usia: 35, Alamat: 'Chicago', _id: 3, _edit: true, _view: true, _delete: true }
]

/** View **/
const openViewModal = ref<boolean>(false)
function view() {
  openViewModal.value = true
}

function edit(id: number) {
  router.push(`/edit/${id}`)
}

/** Delete **/
const deleted = ref<boolean>(false)
const openDeleteModal = ref<boolean>(false)
function destroy() {
  openDeleteModal.value = true
}
function deleting() {
  openDeleteModal.value = false
  deleted.value = true
}

function logout() {
  localStorage.removeItem('logged')
  router.push('/login')
}

onMounted(() => {
  const logged = localStorage.getItem('logged')
  if (!logged || !JSON.parse(logged)) {
    router.push('/login')
  }
})
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
      <div class="mt-5 md:mt-0 flex flex-col gap-4">
        <div>
          <Button class="flex gap-2 items-center" @click="logout"
            >Logout
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
          </Button>
        </div>
        <RouterLink to="/add"><Button>Tambahkan</Button> </RouterLink>
      </div>
    </div>

    <Table
      :headers="tableHeaders"
      :items="tableData"
      @onView="view"
      @onEdit="edit"
      @onDelete="destroy"
    />
  </main>

  <Modal
    title="Apakah anda yakin?"
    confirmButtonName="Hapus!"
    cancelButtonName="Batal"
    :open="openDeleteModal"
    @onClose="openDeleteModal = false"
    @onConfirm="deleting"
  >
    <p>Data yang dihapus tidak dapat dikembalikan!</p>
  </Modal>

  <Modal
    title="Detail Data"
    :confirmButton="false"
    :cancelButton="false"
    :open="openViewModal"
    @onConfirm="deleting"
    @onClose="openViewModal = false"
    size="3xl"
  >
    <div class="overflow-x-auto">
      <table class="w-full table-auto">
        <tbody>
          <tr>
            <td class="font-semibold border px-3 py-2 whitespace-nowrap">Nama</td>
            <td class="border px-3 py-2 whitespace-nowrap">Fikri</td>
          </tr>
          <tr>
            <td class="font-semibold border px-3 py-2 whitespace-nowrap">Umur</td>
            <td class="border px-3 py-2 whitespace-nowrap">21</td>
          </tr>
          <tr>
            <td class="font-semibold border px-3 py-2 whitespace-nowrap">Jenis Kelamin</td>
            <td class="border px-3 py-2 whitespace-nowrap">Laki-Laki</td>
          </tr>
          <tr>
            <td class="font-semibold border px-3 py-2 whitespace-nowrap">
              Penghasilan sebelum pandemi
            </td>
            <td class="border px-3 py-2 whitespace-nowrap">123123</td>
          </tr>
          <tr>
            <td class="font-semibold border px-3 py-2 whitespace-nowrap">
              Penghasilan setelah pandemi
            </td>
            <td class="border px-3 py-2 whitespace-nowrap">123123s</td>
          </tr>
          <tr>
            <td class="font-semibold border px-3 py-2 whitespace-nowrap">NIK</td>
            <td class="border px-3 py-2 whitespace-nowrap">123123</td>
          </tr>
          <tr>
            <td class="font-semibold border px-3 py-2 whitespace-nowrap">KK</td>
            <td class="border px-3 py-2 whitespace-nowrap">123123123</td>
          </tr>
          <tr>
            <td class="font-semibold border px-3 py-2 whitespace-nowrap">Provinsi</td>
            <td class="border px-3 py-2 whitespace-nowrap">JAWA BARAT</td>
          </tr>
          <tr>
            <td class="font-semibold border px-3 py-2 whitespace-nowrap">Kab/Kota</td>
            <td class="border px-3 py-2 whitespace-nowrap">KAB. MAJALENGKA</td>
          </tr>
          <tr>
            <td class="font-semibold border px-3 py-2 whitespace-nowrap">Kecamatan</td>
            <td class="border px-3 py-2 whitespace-nowrap">KERTAJATI</td>
          </tr>
          <tr>
            <td class="font-semibold border px-3 py-2 whitespace-nowrap">Kelurahan/Desa</td>
            <td class="border px-3 py-2 whitespace-nowrap">PALASAH</td>
          </tr>
          <tr>
            <td class="font-semibold border px-3 py-2 whitespace-nowrap">RT</td>
            <td class="border px-3 py-2 whitespace-nowrap">10</td>
          </tr>
          <tr>
            <td class="font-semibold border px-3 py-2 whitespace-nowrap">RW</td>
            <td class="border px-3 py-2 whitespace-nowrap">5</td>
          </tr>
          <tr>
            <td class="font-semibold border px-3 py-2 whitespace-nowrap">Alamat</td>
            <td class="border px-3 py-2 whitespace-nowrap">DUSUN BANGGALA</td>
          </tr>
        </tbody>
      </table>
    </div>
  </Modal>

  <Modal
    confirmButtonName="OK"
    @onConfirm="deleted = false"
    :variant="'success'"
    title="Berhasil!"
    @onClose="deleted = false"
    :open="deleted"
  >
    <p>Berhasil menghapus data!</p>
  </Modal>
</template>
