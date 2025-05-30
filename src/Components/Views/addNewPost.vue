<script setup>
import Editor from 'primevue/editor';
import Button from 'primevue/button';
import { ref, onMounted } from 'vue';
import useBlogStore from '@/State managment/blogPostStore';
import { useRouter } from 'vue-router';
import InputText from 'primevue/inputtext';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
const router = useRouter();

const toast = useToast()
const newBlogStore = useBlogStore();
const title = ref('');
const subtitle = ref('');
const image = ref('');
const editorData = ref('');

const postBlogsList = async () => {
    const data = JSON.stringify({
        title: title.value,
        subtitle: subtitle.value,
        image: image.value,
        blogData: editorData.value,
    });
    const result = await newBlogStore
        .addBlogPosts(data)

    if (result.success) {
        toast.add({
            severity: 'success',
            summary: 'Post added',
            detail: result.message,
            life: 3000,
        })
    } else {
        toast.add({
            severity: 'error',
            summary: result.message,
            detail: result.errors,
            life: 3000,
        })
    }
};
const goHomePage = () => {
    router.push('/');
};

onMounted(() => newBlogStore.getBlogPosts());
</script>

<template>
    <div class="mainDiv">
        <div class="w-[60%] h-auto">
            <div class="flex flex-row text-center items-center">
                <Button class="bg-black m-[0] text-white p-2 mt-10" label="Back Home" @click="goHomePage" />
                <h1
                    class="justify-self-center place-content-center ml-25 text-center text-5xl text-[#000638] font-bold">
                    Add New Blog
                </h1>
            </div>

            <div class="card mt-10 flex flex-col gap-1 w-[95%] self-center">
                <InputText class="mb-2" name="title" type="text" placeholder="Enter title" v-model="title" />
                <InputText class="mb-2" name="subtitle" type="text" placeholder="Enter Subtitle" v-model="subtitle" />
                <InputText class="mb-2" name="image" type="text" placeholder="Enter Image url" v-model="image" />
                <Editor v-model="editorData" editorStyle="height: 320px" />
            </div>
            <Toast />
            <Button @click="postBlogsList()" class="bg-black text-white p-2 mt-10 w-[95%]" label="Post" />
        </div>
    </div>
</template>

<style>
.blog-box h1 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 10px;
}

.blog-box h2 {
    font-size: 1.5rem;
    font-weight: semi-bold;
    margin-bottom: 8px;
}

.blog-box p {
    font-size: 1rem;
    margin-bottom: 6px;
}
</style>
