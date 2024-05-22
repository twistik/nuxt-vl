<template>
    <section v-if="user" class="px-6 py-4 grid grid-cols-1 gap-4">
      <div class="max-w-full rounded overflow-hidden shadow-lg px-6 py-4">
        <h4 class="font-bold text-xl mb-2">Name: {{ user.firstName }}</h4>
        <h5 class="text-gray-700 text-base">Surname: {{ user.lastName }}</h5>
        <h5 class="text-gray-700 text-base mb-2">Age: {{ user.age }}</h5>
        <h6 class="text-gray-700 text-base">Gender: {{ user.gender }}</h6>
        <h6 class="text-gray-700 text-base">Email: {{ user.email }}</h6>
        <h6 class="text-gray-700 text-base">Phone: {{ user.phone }}</h6>
        <h6 class="text-gray-700 text-base">Username: {{ user.username }}</h6>
        <h6 class="text-gray-700 text-base">Password: {{ user.password }}</h6>
        <h6 class="text-gray-700 text-base">BirthDate: {{ user.birthDate }}</h6>
        <h6 class="text-gray-700 text-base">Image: {{ user.image }}</h6>
        <h6 class="text-gray-700 text-base">BloodGroup: {{ user.bloodGroup }}</h6>
        <h6 class="text-gray-700 text-base">Height: {{ user.height }}</h6>
        <h6 class="text-gray-700 text-base">Weight: {{ user.weight }}</h6>
        <h6 class="text-gray-700 text-base">EyeColor: {{ user.eyeColor }}</h6>
        <h6 class="text-gray-700 text-base mb-2"></h6>
        <div>
          <NuxtLink @click="$router.back()" class="hover:underline inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 cursor-pointer">Back all users</NuxtLink>
          <button @click="toggleSave(user)" v-if="!isUserSaved(user.id)" class="bg-blue-500 hover:bg-blue-700 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2">Save</button>
          <button @click="toggleSave(user)" v-else class="bg-red-500 hover:bg-red-700 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2">Delete </button>
        </div>
      </div>
    </section>
    <p v-else>Loading...</p>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useUserStore } from '~/store/userStore';
  import { useRoute, useRouter } from 'vue-router';
  
  const userStore = useUserStore();
  const route = useRoute();
  const router = useRouter();
  
  interface User {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    username: string;
    password: string;
    birthDate: string;
    image: string;
    weight: string;
    height: string;
    bloodGroup: string;
    eyeColor: string;
  }
  
  const user = ref<User | null>(null);
  
  
  // Fetch data on server-side before rendering
  onMounted(async () => {
    if (user.value === null) {
      await fetchData();
    }
  });

  const fetchData = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/users/${route.params.id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data && data.id) {
        user.value = data;
      } else {
        throw new Error('Invalid user data received');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  
  const toggleSave = (user: User) => {
    if (userStore.isUserSaved(user.id)) {
      userStore.deleteUser(user.id);
    } else {
      userStore.saveUser(user);
    }
  };
  
  const isUserSaved = (userId: number) => userStore.isUserSaved(userId);
  </script>
  


  