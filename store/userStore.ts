import { defineStore } from 'pinia';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
}

export const useUserStore = defineStore('user', {
  state: () => ({
    savedUsers: [] as User[],
  }),

  actions: {
    saveUser(user: User) {
      this.savedUsers.push(user);
    },

    deleteUser(userId: number) {
      this.savedUsers = this.savedUsers.filter(user => user.id !== userId);
    },

    isUserSaved(userId: number) {
      return this.savedUsers.some(user => user.id === userId);
    },
  },
},
);