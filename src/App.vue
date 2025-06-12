<script setup>
import { onMounted, ref } from 'vue';
import http from './services/httpServices/httpService';

let userId = ref()
onMounted(() => {
    userId.value = localStorage.getItem('userId')
    console.log('user id is', userId.value);
})

const methodCalled = () => {
    return http.get("helloworld").catch((e) => {
        return e
        // throw e
    })
}

const callMethod = async () => {
    await methodCalled()
    console.log("success")
}

</script>

<template>
    <button @click="callMethod">call method</button>

    <div class="m-auto w-[70%]">
        <router-view />
    </div>

</template>

<style></style>
