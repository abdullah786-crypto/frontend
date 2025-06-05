<script setup>

    import { defineProps } from 'vue';
    const props = defineProps(['errorTitle'])

</script>

<template>
    <h1 class="text-red-600 text-sm">{{ errorTitle }}</h1>
</template>

