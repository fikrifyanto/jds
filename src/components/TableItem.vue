<template>
  <div class="mt-12 shadow-sm border rounded-lg overflow-x-auto">
    <table class="w-full table-auto text-sm text-left">
      <thead class="bg-gray-50 text-gray-600 font-medium border-b">
        <tr>
          <th class="py-3 px-6" v-for="(header, index) in props.headers" :key="index">
            {{ header }}
          </th>
          <th class="py-3 px-6"></th>
        </tr>
      </thead>
      <tbody class="text-gray-600 divide-y">
        <tr v-for="(item, index) in props.items" :key="index">
          <td
            :class="{
              'px-6 py-4 whitespace-nowrap': !['_id', '_edit', '_view', '_delete'].includes(key),
              'w-14': ['_id', '_edit', '_view', '_delete'].includes(key)
            }"
            v-for="(value, key) in item"
            :key="key"
          >
            <template v-if="!['_id', '_edit', '_view', '_delete'].includes(key)">
              {{ value }}
            </template>
            <template v-else-if="['_edit', '_view', '_delete'].includes(key)">
              <a
                @click="emit('onView', (item as any)._id)"
                href="javascript:void(0)"
                v-if="key == '_view'"
                class="text-indigo-600"
                >Lihat</a
              >
              <a
                @click="emit('onEdit', (item as any)._id)"
                href="javascript:void(0)"
                v-if="key == '_edit'"
                class="text-yellow-600"
                >Edit</a
              >
              <a
                @click="emit('onDelete', (item as any)._id)"
                href="javascript:void(0)"
                v-if="key == '_delete'"
                class="text-red-600"
                >Hapus</a
              >
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['onView', 'onEdit', 'onDelete'])

const props = defineProps({
  headers: {
    type: Array,
    required: true
  },
  items: {
    type: Array,
    required: true
  }
})
</script>
