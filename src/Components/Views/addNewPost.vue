<script setup>
import Editor from 'primevue/editor';
import Button from 'primevue/button';
import { ref, onMounted, watch } from 'vue';
import useBlogStore from '@/State managment/blogPostStore';
import { useRouter } from 'vue-router';
import InputText from 'primevue/inputtext';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import TextFieldsError from '../comment/textFieldsError.vue';
const router = useRouter();

const toast = useToast()
const newBlogStore = useBlogStore();
const title = ref('');
const subtitle = ref('');
const image = ref('');
const editorData = ref('');
const isLoading = ref(false)
let titleError = ref(false)
let subtitleError = ref(false)
let imageError = ref(false)
let blogError = ref(false)
let formSubmit = ref(false)

const postBlogsList = async () => {
    isLoading.value = true
    formSubmit.value = true
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
        title.value = ''
        subtitle.value = ''
        image.value = ''
        editorData.value = ''
        formSubmit.value = false
        titleError.value = false
        subtitleError.value = false
        imageError.value = false
        blogError.value = false
        setTimeout(() => {
            router.push(`/blog-details/${newBlogStore.addPostId}`)
        }, 1500)
        isLoading.value = false
    } else {
        // titleError.value = result.errors.find((err) => err.property === 'title' ? titleError.value === err.errors.join('and ') : false)
        subtitleError.value = result.errors.find((err) => err.property === 'subtitle' ? err.errors : false)
        imageError.value = result.errors.find((err) => err.property === 'image' ? err.errors : false)
        blogError.value = result.errors.find((err) => err.property === 'blogData' ? err.errors : false)
        titleError.value = result.errors.find((err) => err.property === 'title' ? err.errors : false)
        console.log('Title error is', titleError.value);
        console.log('Title error is', subtitleError.value);
        console.log('Title error is', imageError.value);
        console.log('Title error is', blogError.value);
        console.log('error while adding post is', result.errors);
        toast.add({
            severity: 'error',
            summary: result.message,
            // detail: result.errors,
            life: 3000,
        })
        isLoading.value = false
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
                <h1 class="ml-25 text-center text-5xl text-[#000638] font-bold">Add New Blog</h1>
            </div>

            <div class="card mt-10 flex flex-col gap-3 w-[95%] self-center">
                <!-- Title Field -->
                <InputText :class="formSubmit && (titleError) ? 'border-2 border-red-500' : ''"
                    name="title" type="text" placeholder="Enter title" v-model="title" />
                <div v-if="formSubmit && (titleError)">
                    <TextFieldsError
                        :error-title="titleError?.errors?.join(',') || titleError?.errors[0]" />
                </div>

                <!-- Subtitle Field -->
                <InputText
                    :class="formSubmit && (subtitleError || subtitle.length <= 3) ? 'border-2 border-red-500' : ''"
                    name="subtitle" type="text" placeholder="Enter subtitle" v-model="subtitle" />
                <div v-if="formSubmit && (subtitleError || subtitle.length <= 3)">
                    <TextFieldsError
                        :error-title="subtitleError?.errors?.join(', ') || 'Subtitle must be more than 3 characters.'" />
                </div>

                <!-- Image Field -->
                <InputText :class="formSubmit && (imageError || !image) ? 'border-2 border-red-500' : ''" name="image"
                    type="text" placeholder="Enter image url" v-model="image" />
                <div v-if="formSubmit && (imageError || !image)">
                    <TextFieldsError :error-title="imageError?.errors?.[0] || 'Image URL is required.'" />
                </div>

                <!-- Blog Editor -->
                <Editor v-model="editorData" editorStyle="height: 320px"
                    :class="formSubmit && (blogError || !editorData) ? 'border-2 border-red-500' : ''" />
                <div v-if="formSubmit && (blogError || !editorData)">
                    <TextFieldsError :error-title="blogError?.errors?.[0] || 'Blog content cannot be empty.'" />
                </div>
            </div>

            <Toast />
            <Button :loading="isLoading" @click="postBlogsList()" class="bg-black text-white p-2 mt-10 w-[95%]"
                label="Post" />
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
