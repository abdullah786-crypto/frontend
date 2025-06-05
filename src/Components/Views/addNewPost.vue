<script setup>
import Editor from 'primevue/editor';
import Button from 'primevue/button';
import { ref } from 'vue';
import useBlogStore from '@/stores/blogPostStore';
import { useRouter } from 'vue-router';
import InputText from 'primevue/inputtext';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import TextFieldsError from '../validationErrors/textFieldsError.vue';
const router = useRouter();

const toast = useToast()
const newBlogStore = useBlogStore();
const title = ref('');
const subtitle = ref('');
const image = ref('');
const editorData = ref('');
let titleError = ref(false)
let subtitleError = ref(false)
let imageError = ref(false)
let blogError = ref(false)
let formSubmit = ref(false)

const postBlogsList = async () => {
    formSubmit.value = true
    titleError.value = false
    subtitleError.value = false
    imageError.value = false
    blogError.value = false
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
    } else {

        titleError.value = result.errors.filter((err) => err.field === 'title').map(v => v.message)
        subtitleError.value = result.errors.filter((err) => err.field === 'subtitle').map(v => v.message)
        imageError.value = result.errors.filter((err) => err.field === 'image').map(v => v.message)
        blogError.value = result.errors.filter((err) => err.field === 'blogData').map(v => v.message)

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
            life: 3000,
        })
    }
};
const goHomePage = () => {
    router.push('/');
};

</script>
<template>
    <div class="mainDiv">
        <div class="w-[60%] h-auto">
            <div class="flex flex-row text-center items-center">
                <Button class="bg-black m-[0] text-white p-2 mt-10" label="Back Home" @click="goHomePage" />
                <h1 class="ml-25 text-center text-5xl text-[#000638] font-bold">Add New Blog</h1>
            </div>

            <div class="card mt-10 flex flex-col gap-3 w-[95%] self-center">
                <InputText :class="formSubmit && titleError ? 'border-2 border-red-500' : ''" name="title" type="text"
                    placeholder="Enter title" v-model="title" />
                <div v-if="formSubmit && (titleError)">
                    <TextFieldsError :error-title="Array.isArray(titleError) ? titleError.join(' & ') : titleError" />
                </div>
                <InputText :class="formSubmit && (subtitleError) ? 'border-2 border-red-500' : ''" name="subtitle"
                    type="text" placeholder="Enter subtitle" v-model="subtitle" />
                <div v-if="formSubmit && (subtitleError)">
                    <TextFieldsError
                        :error-title="(Array.isArray(subtitleError)) ? subtitleError.join(' & ') : subtitleError" />
                </div>

                <InputText :class="formSubmit && (imageError) ? 'border-2 border-red-500' : ''" name="image" type="text"
                    placeholder="Enter image url" v-model="image" />
                <div v-if="formSubmit && (imageError)">
                    <TextFieldsError :error-title="(Array.isArray(imageError) ? imageError.join(',') : imageError)" />
                </div>
                <Editor v-model="editorData" editorStyle="height: 320px"
                    :class="formSubmit && (blogError) ? 'border-2 border-red-500' : ''" />
                <div v-if="formSubmit && (blogError)">
                    <TextFieldsError :error-title="(Array.isArray(blogError) ? blogError.join(', ') : blogError)" />
                </div>
            </div>

            <Toast />
            <Button :loading="newBlogStore.isLoading" @click="postBlogsList()"
                class="bg-black text-white p-2 mt-10 w-[95%]" label="Post" />
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
