<script setup lang="ts">
import { ref } from 'vue'
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
  console.log(id)
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
