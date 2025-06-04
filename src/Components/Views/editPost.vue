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
import InputText from 'primevue/inputtext';
import TextFieldsError from '../comment/textFieldsError.vue';
import debounce from 'lodash/debounce'

const blogStore = useBlogStore()
const postId = ref('');
const data = ref({})
const router = useRouter()
const blogData = ref('')
const toast = useToast()
const isLoading = ref(false)
let titleError = ref(false)
let subtitleError = ref(false)
let imageError = ref(false)
let blogError = ref(false)
const goHomePage = () => {
    router.push('/')
}

onMounted(async () => {
    postId.value = useRoute().params.id
    console.log('id is ', postId.value);
    console.log('data is ', data.value);

    await blogStore.getBlogPostsById(postId.value)
    // data.value = blogStore.blog
    Object.assign(data.value, blogStore.blog)
    // blogData.value = data.value.blogData
    console.log('data is 3', data.value.blogData);
})

const updatePost = async () => {
    isLoading.value = true
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
        isLoading.value = false
        setTimeout(() => {
            router.push('/')
        }, 1500)
    } else {
        subtitleError.value = result.error.find((err) => err.property === 'subtitle' ? err.error : false)
        imageError.value = result.error.find((err) => err.property === 'image' ? err.error : false)
        blogError.value = result.error.find((err) => err.property === 'blogData' ? err.error : false)
        titleError.value = result.error.find((err) => err.property === 'title' ? err.error : false)
        console.log('Title error is', titleError.value);
        console.log('Title error is', subtitleError.value);
        console.log('Title error is', imageError.value);
        console.log('Title error is', blogError.value);
        console.log('error while updating post', result.error)
        toast.add({
            severity: 'error',
            summary: result.message,
            detail: result.error,
            life: 3000
        })
        isLoading.value = false
    }
}

</script>

<template>
    <div class="mainDiv">
        <div class="w-[60%] h-auto">
            <div class="flex flex-row text-center items-center">
                <Button class="bg-black m-[0] text-white p-2 mt-10" label="Back Home" @click="goHomePage" />
                <h1 class="ml-[160px] text-5xl text-[#000638] font-bold mt-10">
                    Update Blog
                </h1>
            </div>

            <div class="card mt-10 flex flex-col gap-3 w-[95%] self-center">
                <!-- Title -->
                <InputText
                    :class="titleError && (!data.title || data.title.length < 3) && 'border-2 border-red-500 focus:border-red-500'"
                    name="title"
                    type="text"
                    placeholder="Enter title"
                    v-model="data.title"
                />
                <div v-if="titleError && (!data.title || data.title.length < 3)">
                    <TextFieldsError :error-title="titleError.error.join(', ')" />
                </div>

                <!-- Subtitle -->
                <InputText
                    :class="subtitleError && (!data.subtitle || data.subtitle.length < 3) && 'border-2 border-red-500 focus:border-red-500'"
                    name="subtitle"
                    type="text"
                    placeholder="Enter subtitle"
                    v-model="data.subtitle"
                />
                <div v-if="subtitleError && (!data.subtitle || data.subtitle.length < 3)">
                    <TextFieldsError :error-title="subtitleError.error.join(', ')" />
                </div>

                <!-- Image URL -->
                <InputText
                    :class="imageError && (!data.image || data.image.length < 3) && 'border-2 border-red-500 focus:border-red-500'"
                    name="image"
                    type="text"
                    placeholder="Enter image url"
                    v-model="data.image"
                />
                <div v-if="imageError && (!data.image || data.image.length < 3)">
                    <TextFieldsError :error-title="imageError.error.join(', ')" />
                </div>

                <!-- Blog Editor -->
                <Editor
                    :class="blogError && (!data.blogData || data.blogData.length < 10) && 'border-2 border-red-500 focus:border-red-500'"
                    v-model="data.blogData"
                    editorStyle="height: 320px"
                />
                <div v-if="blogError && (!data.blogData || data.blogData.length < 10)">
                    <TextFieldsError :error-title="blogError.error.join(', ')" />
                </div>
            </div>

            <Toast />
            <Button
                :loading="isLoading"
                @click="updatePost"
                class="bg-black text-white p-2 mt-10 w-[95%]"
                label="Update"
            />
        </div>
    </div>
</template>
