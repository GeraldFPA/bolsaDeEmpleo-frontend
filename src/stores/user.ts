import { defineStore } from 'pinia';

interface UserState {
  token: string;
  id: number | null; 
  role: string;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: '',
    id: null,
    role: ''
  }),
  actions: {
    setUserData({ token, id, role }: { token: string; id: number; role: string }) {
      this.token = token;
      this.id = id;
      this.role = role;
    },
    clearUserData() {
      this.token = '';
      this.id = null;
      this.role = '';
    }
  },
  persist: true 
});