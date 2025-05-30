<script setup>

import Editor from 'primevue/editor';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useBlogStore from '@/State managment/blogPostStore';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import Quill from 'quill'
import InputText from 'primevue/inputtext';

const blogStore = useBlogStore()
const postId = ref('');
const data = ref({})
const router = useRouter()
const blogData = ref('')
const toast = useToast()
const goHomePage = () => {
    router.push('/')
}

onMounted(async () => {
    postId.value = useRoute().params.id
    console.log('id is ', postId.value);
    console.log('data is ', data.value);

    await blogStore.getBlogPostsById(postId.value)
    data.value = blogStore.blog
    blogData.value = data.value.blogData
    console.log('data is 3', data.value.blogData);
})


const updatePost = async () => {

    let jsonData = {
        title: data.value.title,
        subtitle: data.value.subtitle,
        image: data.value.image,
        blogData: data.value.blogData
    }
    jsonData = JSON.stringify(jsonData)
    console.log('update post called here');

    const result = await blogStore.editPostById(jsonData, postId.value)
    if (result.success) {
        toast.add({
            severity: 'success',
            summary: 'Post updated',
            detail: result.message,
            life: 3000
        })
    } else {
        toast.add({
            severity: 'error',
            summary: result.message,
            detail: result.error,
            life: 3000
        })
    }

}

</script>

<template>
    <div class="mainDiv">
        <div class="w-[60%] h-auto">
            <div class="flex flex-row text-center items-center">
                <Button class="bg-black m-[0] text-white p-2 mt-10" label="Back Home" @click="goHomePage" />
                <h1
                    class="ml-[160px] justify-self-center place-content-center m-[0] text-center text-5xl text-[#000638] font-bold">
                    Update Blog</h1>
            </div>
            {{ data }}
            <div class="card mt-10 flex flex-col gap-1 w-[95%] self-center">
                <InputText class="mb-2" name="title" type="text" placeholder="Enter title" v-model="data.title" />
                <InputText class="mb-2" name="subtitle" type="text" placeholder="Enter Subtitle"
                    v-model="data.subtitle" />
                <InputText class="mb-2" name="image" type="text" placeholder="Enter Image url" v-model="data.image" />
                <Editor v-model="data.blogData" editorStyle="height: 320px" />
            </div>
            <Toast />
            <Button @click="updatePost" class="bg-black text-white p-2 mt-10 w-[95%]" label="Update" />
        </div>
    </div>
</template>