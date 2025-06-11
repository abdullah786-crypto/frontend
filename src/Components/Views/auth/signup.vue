<script setup>

import { useAuthStore } from '@/stores/auth/authStore';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { ref } from 'vue';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';

const router = useRouter()
const toast = useToast()
const username = ref()
const password = ref()
const authStore = useAuthStore()

const signupUser = async () => {
    let userSignup = await authStore.signup(username.value, password.value)
    if (userSignup.success) {
        username.value = ''
        password.value = ''
        setTimeout(() => {
            router.push('/home');
        }, 1000);
        toast.add({
            severity: 'success',
            summary: 'Signup',
            detail: userSignup.message,
            life: 3000,
        })
    } else {
        toast.add({
            severity: 'error',
            summary: 'Signup',
            detail: userSignup.message,
            life: 3000,
        })
    }
}

</script>

<template>

    <div class="p-15 flex flex-row justify-center">
        <div class="flex flex-col mt-10">
            <h1 class="text-5xl font-semibold">Welcome to Blog App</h1>
            <p class="mt-5 text-2xl font-bold mt-16">Signup</p>
            <InputText class="mt-4" name="username" placeholder="Username" v-model="username" />
            <InputText class="mt-6" name="password" placeholder="Password" v-model="password" />
            <Toast />
            <Button :loading="authStore.isLoading" class="bg-black focus:outline-0 mt-6" label="Signup"
                @click="signupUser" />
            <div class="flex flex-row mt-3">
                <p>Already have an account?</p>&nbsp;<p><a href="/login">Login</a></p>
            </div>
        </div>
    </div>

</template>