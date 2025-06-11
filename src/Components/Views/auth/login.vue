<script setup>

import { useAuthStore } from '@/stores/auth/authStore';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { ref } from 'vue';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';

const router = useRouter();
const toast = useToast()
const username = ref()
const password = ref()
const authStore = useAuthStore()

const loginUser = async () => {
    let userLogin = await authStore.login(username.value, password.value)
    if (userLogin.success) {
        username.value = ''
        password.value = ''
        setTimeout(() => {
          router.push('/');
        }, 1000);
        localStorage.setItem('user', userLogin.userData.data.user)
        localStorage.setItem('userId', userLogin.userData.data.user.id)
        toast.add({
            severity: 'success',
            summary: 'Login',
            detail: userLogin.message,
            life: 3000
        })
    } else {
        toast.add({
            severity: 'error',
            summary: 'Login',
            detail: userLogin.message,
            life: 3000
        })
    }
}

</script>

<template>

    <div class="p-15 flex flex-row justify-center">
        <div class="flex flex-col mt-10">
            <h1 class="text-5xl font-semibold">Welcome to Blog App</h1>
            <p class="mt-5 text-2xl font-bold mt-16">Login</p>
            <InputText class="mt-4" name="username" placeholder="Username" v-model="username" />
            <InputText class="mt-6" name="password" placeholder="Password" v-model="password" />
            <Toast />
            <Button :loading="authStore.isLoading" class="bg-black focus:outline-0 mt-6" label="Login"
                @click="loginUser" />
            <div class="flex flex-row mt-3">
                <p>Don't have an account?</p>&nbsp;<p><a href="/signup">Signup</a></p>
            </div>
        </div>
    </div>

</template>