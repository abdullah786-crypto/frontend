<script setup>

import Editor from 'primevue/editor';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useBlogStore from '@/stores/blogPostStore';
import InputText from 'primevue/inputtext';
import TextFieldsError from '../validationErrors/textFieldsError.vue';

const blogStore = useBlogStore()
const postId = ref('');
const data = ref({})
const router = useRouter()
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

    await blogStore.getBlogPostsById(postId.value)
    data.value = blogStore.blog
})

const updatePost = async () => {
    let userId = localStorage.getItem('userId')
    isLoading.value = true
    titleError.value = false
    subtitleError.value = false
    imageError.value = false
    blogError.value = false
    let currentUser = localStorage.getItem('user')
    let jsonData = {
        title: data.value.title,
        subtitle: data.value.subtitle,
        image: data.value.image,
        blogData: data.value.blogData,
        // user: currentUser
    }
    jsonData = JSON.stringify(jsonData)

    const result = await blogStore.editBlogPostById(jsonData, postId.value)
    if (result.success) {
        toast.add({
            severity: 'success',
            summary: 'Post updated',
            detail: result.message,
            life: 3000
        })
        isLoading.value = false
        titleError.value = false
        subtitleError.value = false
        imageError.value = false
        blogError.value = false
        setTimeout(() => {
            router.push('/')
        }, 1500)
    } else {
        subtitleError.value = result.error.filter((err) => err.field === 'subtitle').map(e => e.message)
        imageError.value = result.error.filter((err) => err.field === 'image').map(e => e.message)
        blogError.value = result.error.filter((err) => err.field === 'blogData').map(e => e.message)
        titleError.value = result.error.filter((err) => err.field === 'title').map(e => e.message)
        if (titleError.value.length === 0) {
            titleError.value = false
        }
        if (subtitleError.value.length === 0) {
            subtitleError.value = false
        }
        if (imageError.value.length === 0) {
            imageError.value = false
        }
        if (blogError.value.length === 0) {
            blogError.value = false
        }
        toast.add({
            severity: 'error',
            summary: result.message,
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
                <InputText :class="titleError && 'border-2 border-red-500 focus:border-red-500'" name="title"
                    type="text" placeholder="Enter title" v-model="data.title" />
                <div v-if="titleError">
                    <TextFieldsError
                        :error-title="(Array.isArray(titleError) ? titleError.join(' and ') : titleError)" />
                </div>

                <!-- Subtitle -->
                <InputText :class="subtitleError && subtitleError && 'border-2 border-red-500 focus:border-red-500'"
                    name="subtitle" type="text" placeholder="Enter subtitle" v-model="data.subtitle" />
                <div v-if="subtitleError && subtitleError">
                    <TextFieldsError
                        :error-title="(Array.isArray(subtitleError) ? subtitleError.join(' and ') : subtitleError)" />
                </div>

                <!-- Image URL -->
                <InputText :class="imageError ? 'border-2 border-red-500 focus:border-red-500' : ''" name="image"
                    type="text" placeholder="Enter image url" v-model="data.image" />
                <div v-if="imageError">
                    <TextFieldsError
                        :error-title="(Array.isArray(imageError) ? imageError.join(' and ') : imageError)" />
                </div>

                <!-- Blog Editor -->
                <Editor :class="blogError && blogError && 'border-2 border-red-500 focus:border-red-500'"
                    v-model="data.blogData" editorStyle="height: 320px" />
                <div v-if="blogError && blogError">
                    <TextFieldsError :error-title="(Array.isArray(blogError) ? blogError.join(' and ') : blogError)" />
                </div>
            </div>

            <Toast />
            <Button :loading="blogStore.isLoading" @click="updatePost" class="bg-black text-white p-2 mt-10 w-[95%]"
                label="Update" />
        </div>
    </div>
</template>
