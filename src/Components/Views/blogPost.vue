<script setup>
import Button from 'primevue/button';
import Card from 'primevue/card';
import { defineProps, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps(['id', 'imgUrl', 'title', 'subtitle', 'comments'])

const goBlogDetailsPage = (id) => {
    router.push(`/blog-details/${id}`)
}

onMounted(() => {
    console.log(props.id)
    console.log(props.imgUrl)
    console.log('value of the comments is', props.comments)
    console.log(props.title)
    console.log(props.subtitle)

})
</script>

<template>

    <Card class="shadow-xl border border-gray-200" style="width: 100%; overflow: hidden">
        <template #header>
            <img alt="user header" :src="imgUrl" />
        </template>
        <template #title>
            {{ title }}
        </template>
        <template :class="'text-justify'" #subtitle>
            {{ subtitle }}
        </template>
        <template #content>
            <div class="w-full flex flex-row justify-between ">
                <p class="text-[12px] text-gray-400">Total comments:</p>
                <p class="text-[11px] text-gray-400">{{ comments.length }}</p>
            </div>
        </template>
        <template #footer>
            <div class="mt-2">
                <Button label="View" @click="goBlogDetailsPage(props.id)"
                    :class="'bg-black text-white w-full p-2 rounded-lg rounded-sm rounded-xl cursor-pointer'">
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
