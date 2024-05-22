<!--<template>
  <div>
    <section class="card">
    <ol v-if="users.length" class="px-6 py-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      <li v-for="user in paginatedUsers" :key="user.id" class="max-w-md rounded overflow-hidden shadow-lg px-6 py-4">
        <h4 class="font-bold text-xl mb-2">Name: {{ user.firstName }}</h4>
        <h5 class="text-gray-700 text-base">Surname: {{ user.lastName }}</h5>
        <h5 class="text-gray-700 text-base mb-2">Age: {{ user.age }}</h5>
        <div class="group">
          <NuxtLink :to="`/${user.id}`" class="hover:underline inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">Read More</NuxtLink>
          <button @click="toggleSave(user)" v-if="!isUserSaved(user.id)" class="bg-blue-500 hover:bg-blue-700 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2">Save</button>
          <button @click="toggleSave(user)" v-else class="bg-red-500 hover:bg-red-700 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2">Delete </button>
        </div>
      </li>        
    </ol>
  </section>
    <div class=" gap-2 justify-center items-center flex" v-if="users.length > 0">
  <button @click="handlePageChange(page - 1)"
        :class="{ 'arrow': true, 'pagination__disabled': page === 1 }"
    class="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
    type="button">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
      aria-hidden="true" class="w-4 h-4">
      <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path>
    </svg>
    Previous
  </button>
  <div class="flex items-center gap-2">
      <span class="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" v-for="pageNumber in totalPages"
        :key="pageNumber"
        @click="handlePageChange(pageNumber)"
        :class="{ 'page__number': true, 'relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg bg-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none': page === pageNumber }">
        <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">{{ pageNumber }}</span>
      </span>
  </div>
  <button @click="handlePageChange(page + 1)"
        :class="{ 'arrow': true, 'pagination__disabled': page === totalPages }"
    class="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
    type="button">
    Next
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
      aria-hidden="true" class="w-4 h-4">
      <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
    </svg>
  </button>
</div> 

  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/store/userStore';
import { ref, onMounted, computed } from 'vue';

const userStore = useUserStore();

interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
}

const users = ref<User[]>([]);
const page = ref<number>(1);

const fetchUsers = async () => {
  const res = await fetch("https://dummyjson.com/users");
  const data = await res.json();
  if (data.users && data.users.length) users.value = data.users;
};

onMounted(() => {
  fetchUsers();
});

const handlePageChange = (pageNumber: number): void => {
  if (
    pageNumber > 0 &&
    pageNumber <= Math.ceil(users.value.length / 10) &&
    pageNumber !== page.value
  )
    page.value = pageNumber;    
};

const paginatedUsers = computed<User[]>(() => {
  const startIndex = (page.value - 1) * 10;
  const endIndex = startIndex + 10;
  return users.value.slice(startIndex, endIndex);
});

const totalPages = computed<number>(() => Math.ceil(users.value.length / 10));

const toggleSave = (user: User) => {
  if (userStore.isUserSaved(user.id)) {
    userStore.deleteUser(user.id);
  } else {
    userStore.saveUser(user);
  }
};

const isUserSaved = (userId: number) => userStore.isUserSaved(userId);
</script>
<style scoped></style>-->



<template>
  <div>
    <UserListComponent />
  </div>
</template>

<script setup lang="ts">
import UserListComponent from '~/components/UserList.vue';
</script>

