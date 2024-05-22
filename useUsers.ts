import { ref, onMounted, computed } from 'vue';
import { useUserStore } from '~/store/userStore';

const userStore = useUserStore();

interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
}

export const users = ref<User[]>([]);
export const page = ref<number>(1);

export const fetchUsers = async () => {
  const res = await fetch("https://dummyjson.com/users");
  const data = await res.json();
  if (data.users && data.users.length) users.value = data.users;
};

onMounted(() => {
  fetchUsers();
});

export const handlePageChange = (pageNumber: number): void => {
  if (
    pageNumber > 0 &&
    pageNumber <= Math.ceil(users.value.length / 10) &&
    pageNumber !== page.value
  )
    page.value = pageNumber;    
};

export const paginatedUsers = computed<User[]>(() => {
  const startIndex = (page.value - 1) * 10;
  const endIndex = startIndex + 10;
  return users.value.slice(startIndex, endIndex);
});

export const totalPages = computed<number>(() => Math.ceil(users.value.length / 10));

export const toggleSave = (user: User) => {
  if (userStore.isUserSaved(user.id)) {
    userStore.deleteUser(user.id);
  } else {
    userStore.saveUser(user);
  }
};

export const isUserSaved = (userId: number) => userStore.isUserSaved(userId);
