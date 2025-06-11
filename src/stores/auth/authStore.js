import { loginUser, signupUser } from '@/services/auth/auth.services';
import { defineStore } from 'pinia';
import { ref } from 'vue';

let isLoading = ref(false);

export const useAuthStore = defineStore('authStore', () => {
  const login = async (username, password) => {
    isLoading.value = true;
    await new Promise((resolve) => setTimeout(resolve, 2000));
    try {
      let user = await loginUser(username, password);

      if (user) {
        isLoading.value = false;
        return {
          success: true,
          message: user.data.message,
          userData: user,
        };
      }
    } catch (error) {
      isLoading.value = false;
      return {
        success: false,
        message: error.response.data.message,
        error: error.response.data.message,
      };
    }
  };

  const signup = async (username, password) => {
    try {
      isLoading.value = true;
      await new Promise((resolve) => setTimeout(resolve, 2000));
      let user = await signupUser(username, password);

      if (user) {
        isLoading.value = false;
        return {
          success: true,
          message: user.data.message,
          userData: user,
        };
      }
    } catch (error) {
      isLoading.value = false;
      return {
        success: false,
        message: error.response.data.message,
        error: error.response.data.message,
      };
    }
  };

  return {
    isLoading,
    login,
    signup,
  };
});
