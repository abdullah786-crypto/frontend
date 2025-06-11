<script setup>
import { onMounted, ref } from 'vue';

let userId = ref()
onMounted(() => {
    userId.value = localStorage.getItem('userId')
    console.log('user id is', userId.value);
})

</script>

<template>

    <div class="m-auto w-[70%]">
        <router-view />
    </div>

</template>

<style></style>
