<script setup>

import { ref, onMounted, computed, watch } from 'vue';
import useBlogStore from '@/State managment/blogPostStore';
import { useRoute, useRouter } from 'vue-router';
import InputText from 'primevue/inputtext';
import Card from 'primevue/card';
import Button from 'primevue/button';
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';
import Comments from '../comment/comments.vue';

const props = defineProps(['id', 'title', 'subtitle', 'comments'])

const route = useRoute();
const router = useRouter();

const blogStore = useBlogStore();
const userName = ref('')
const userEmail = ref('')
const comment = ref('')
const postId = ref('')
const toast = useToast()
watch(()=> blogStore.blog.comments,  (newComments, oldComments) => {
    console.log('new list s', newComments)
    console.log('old list s', oldComments)
}, {
    deep: true
})

onMounted(async () => {
    postId.value = route.params.id
    await blogStore.getBlogPostsById(postId.value);
})
const gotToUpdatePostPage = (id) => {
    console.log('clicked to edit post button',)
    router.push({ name: 'update-post', })
}

const postComment = async () => {
    console.log('Blog id is', postId.value);
    
    const data = JSON.stringify({
        username: userName.value,
        email: userEmail.value,
        comment: comment.value,
    })
    const result = await blogStore.postComment(data, postId.value)
    if (result.success) {
        toast.add({
            severity: 'success',
            summary: 'Add Comment',
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
}

</script>

<template>

    <div v-if="blogStore.blog" class="p-10">
        <div class="p-10">
            <div>
                <h1 class="text-[30px] text-xl text-lg text-2xl font-bold text-center">{{ blogStore.blog.title }}</h1>
                <Button @click="gotToUpdatePostPage(postId)"
                    :class="'bg-black text-center text-white w-[150px] p-2 rounded-lg rounded-sm rounded-xl cursor-pointer self-end'">
                    <span class="p-button-label">Edit Post</span>
                </Button>
            </div>
            <h2 class="text-[20px] text-xl text-lg text-2xl font-semibold text-gray-500 text-center">{{
                blogStore.blog.subtitle
                }}</h2>
            <img :src="blogStore.blog.image" :style="{ width: '100%' }"
                class="shadow-xl rounded-lg rounded-xl rounded-md mt-10 h-60 object-cover" />
            <div class="mt-15" v-html="blogStore.blog?.blogData" />
        </div>
        <div class="p-10 ">
            <h1 class="mb-10 text-[30px] text-xl text-lg text-2xl font-bold text-center">All Comments list</h1>
            <div v-if="blogStore.blog.comments.length > 0">
                <div v-for="(newComment) in blogStore.blog.comments">
                    <div
                        class="border-gray-200 p-5 m-0 m-[0px] mb-0 bg-grey-400 flex flex-col items-center overflow-auto overflow-y-auto content-center max-h-450px min-h-auto mb-40 justify-center ">
                        <!-- comment comp here -->
                        <Comments :id="newComment.id" :email="newComment.email" :username="newComment.username"
                            :comment="newComment.comment" />
                    </div>
                </div>
            </div>
            <div v-else class="bg-grey-500 mb-10 text-[15px] text-xl text-lg text-2xl font-bold text-center">
                <h3>Sorry no any comment yet</h3>
            </div>
            <h1 class="mt-10 mb-10 text-[30px] text-xl text-lg text-2xl font-bold text-center">
                Comments
            </h1>
            <div class="flex flex-row items-center content-center mb-40 justify-center">
                <div class="flex flex-col gap-2 w-[50%]">
                    <InputText name="username" type="text" placeholder="Your Name" v-model="userName" />
                    <InputText name="userEmail" type="text" placeholder="email" v-model="userEmail" />
                    <InputText name="comment" type="text" placeholder="Write your comment here...!!"
                        v-model="comment" />
                    <Toast />
                    <Button @click="postComment" class="w-[100%] bg-black mt-10" label="Post Comment" />
                </div>
            </div>

        </div>
    </div>
    <div v-else>
        <div class="flex flex-row text-center justify-center h-[100%] w-[100%]">
            <h1 class="text-xl font-bold">Please wait data is loading ......</h1>
        </div>
    </div>

</template>

<style></style>