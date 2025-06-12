<script setup>
import Button from 'primevue/button';
import Card from 'primevue/card';
import { defineProps, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps(['id', 'imgUrl', 'title', 'subtitle', 'comments', 'postedBy'])

const goBlogDetailsPage = (id) => {
    router.push(`/blog-details/${id}`)
}

</script>

<template>

    <Card class="shadow-xl border border-gray-200 w-full h-[339px]" style="width: 100%; overflow: hidden">
        <template #header>
            <div class="h-[142px]">
                <img class="self-center" alt="Failed to load image ☹️" :src="imgUrl" />
            </div>
        </template>
        <template #title>
            <div class="max-w-[99%] h-[37px] min-w-[99%] whitespace-nowrap overflow-hidden text-ellipsis">{{ title
            }}</div>
        </template>
        <template class="text-justify" #subtitle>
            <div class="h-[24px]">
                {{ subtitle }}
            </div>
        </template>
        <template #content>
            <div class="w-full flex flex-row justify-between h-[18px]">
                <p class="text-[12px] text-gray-400">Total comments:</p>
                <p class="text-[11px] text-gray-400">{{ comments.length }}</p>
            </div>
            <div class="w-full flex flex-row justify-between h-[18px]">
                <p class="text-[12px] text-gray-400">Posted by:</p>
                <p class="text-[11px] text-gray-400">{{ postedBy }}</p>
            </div>
        </template>
        <template #footer>
            <div class="mt-2">
                <Button label="View" @click="goBlogDetailsPage(id)"
                    class="bg-black text-white w-full p-2 rounded-lg rounded-sm rounded-xl cursor-pointer">
                </Button>
            </div>
        </template>
    </Card>
</template>

<style scoped>
::v-deep(.p-card-body) {
    text-align: justify;
    gap: 5px;
    padding: 15px;
}

::v-deep(.p-card-footer) {
    padding: 0;
}

::v-deep(.p-card-content) {
    padding: 0px 0px 0px 0px;
}

::v-deep(.p-card-footer) {
    padding: 0px 0px 0px 0px;

}
</style>
