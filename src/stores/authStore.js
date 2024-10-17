// src/stores/authStore.js
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('authToken') || null,
  }),
  actions: {
    setToken(token) {
      this.token = token;
      localStorage.setItem('authToken', token);
    },
    removeToken() {
      this.token = null;
      localStorage.removeItem('authToken');
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
});
