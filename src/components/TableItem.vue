<template>
  <div class="mt-12 shadow-sm border rounded-lg overflow-x-auto">
    <table class="w-full table-auto text-sm text-left">
      <thead class="bg-gray-50 text-gray-600 font-medium border-b">
        <tr>
          <th class="py-3 px-6">Username</th>
          <th class="py-3 px-6">Email</th>
          <th class="py-3 px-6">Position</th>
          <th class="py-3 px-6">Salary</th>
          <th class="py-3 px-6"></th>
        </tr>
      </thead>
      <tbody class="text-gray-600 divide-y">
        <template :key="i" v-for="i in 10">
          <tr>
            <td class="px-6 py-4 whitespace-nowrap">{item.name}</td>
            <td class="px-6 py-4 whitespace-nowrap">{item.email}</td>
            <td class="px-6 py-4 whitespace-nowrap">{item.position}</td>
            <td class="px-6 py-4 whitespace-nowrap">{item.salary}</td>
            <td class="text-right px-6 whitespace-nowrap">
              <a
                href="javascript:void()"
                class="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
              >
                Edit
              </a>
              <button
                href="javascript:void()"
                class="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
              >
                Delete
              </button>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
