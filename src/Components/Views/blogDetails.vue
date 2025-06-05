<script setup>

import { ref, onMounted } from 'vue';
import useBlogStore from '@/stores/blogPostStore';
import { useRoute, useRouter } from 'vue-router';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';
import Comments from '../comment/comments.vue';
import TextFieldsError from '../validationErrors/textFieldsError.vue';

const props = defineProps(['id', 'title', 'subtitle', 'comments'])

const route = useRoute();
const router = useRouter();

const blogStore = useBlogStore();
const userName = ref('')
const userEmail = ref('')
const comment = ref('')
const postId = ref('')
const toast = useToast()
const isLoadingComment = ref(false)
let userNameError = ref(false)
let emailError = ref(false)
let commentErr = ref(false)

onMounted(async () => {
    postId.value = Number(route.params.id)



    await blogStore.getBlogPostsById(postId.value);
})
const gotToUpdatePostPage = (id) => {
    router.push({ name: 'update-post', })
}

const postComment = async () => {
    isLoadingComment.value = true
    userNameError.value = false
    emailError.value = false
    commentErr.value = false
    const pushingData = JSON.stringify({
        username: userName.value,
        email: userEmail.value,
        comment: comment.value,
    })
    const result = await blogStore.postComment(pushingData, postId.value)
    if (result.success) {
        toast.add({
            severity: 'success',
            summary: 'Add Comment',
            detail: result.message,
            life: 3000,
        })
        userName.value = '',
        userEmail.value = ''
        comment.value = ''
        userNameError.value = false
        emailError.value = false
        commentErr.value = false
        isLoadingComment.value = false
    } else {
        if (result.errors) {
            userNameError.value = result.errors.find(v => v.field === 'username')
            emailError.value = result.errors.find(v => v.field === 'email')
            commentErr.value = result.errors.find((e) => e.field === 'comment')
            toast.add({
                severity: 'error',
                summary: result.message,
                life: 3000,
            })
            isLoadingComment.value = false
        }
    }
}

</script>

<template>
    <div v-if="blogStore.isLoading">
        <div class="flex flex-row text-center justify-center h-[100%] w-[100%]">
            <h1 class="text-xl font-bold">Please wait data is loading ......</h1>
        </div>
    </div>
    <div v-else-if="blogStore.blog" class="p-10">
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
            <div v-if="blogStore.commentsList.length > 0">
                <div v-for="(newComment) in blogStore.commentsList">
                    <div
                        class="border-gray-200 p-5 m-0 m-[0px] mb-0 bg-grey-400 flex flex-col items-center overflow-auto overflow-y-auto content-center max-h-450px min-h-auto justify-center ">
                        <!-- comment comp here -->
                        <Comments :id="newComment.id" :email="newComment.email" :username="newComment.username"
                            :comment="newComment.comment" />
                    </div>
                </div>
            </div>
            <div v-else-if="blogStore.isLoading">
                <div class="flex flex-row text-center justify-center h-[100%] w-[100%]">
                    <h1 class="text-xl font-bold">Please wait data is loading ......</h1>
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
                    <InputText :class="userNameError && 'border-2 border-red-500 focus:border-red-500 focus:border-2'"
                        name="username" type="text" placeholder="Your name" v-model="userName" />
                    <div v-if="userNameError">
                        <TextFieldsError :error-title="userNameError.message" />
                    </div>
                    <InputText :class="emailError && 'border-2 border-red-500 focus:border-red-500 focus:border-2'"
                        name="userEmail" type="text" placeholder="Email" v-model="userEmail" />
                    <div v-if="emailError">
                        <TextFieldsError :error-title="emailError.message" />
                    </div>
                    <InputText :class="commentErr && 'border-2 border-red-500 focus:border-red-500 focus:border-2'"
                        name="comment" type="text" placeholder="Write your comment here...!!" v-model="comment" />
                    <div v-if="commentErr">
                        <TextFieldsError :error-title="commentErr.message" />
                    </div>
                    <Toast />
                    <Button :loading="blogStore.isCommentLoading" @click="postComment" class="w-[100%] bg-black mt-10"
                        label="Post Comment" />
                </div>
            </div>

        </div>
    </div>

    <div v-else>
        <div class="flex flex-row text-center justify-center h-[100%] w-[100%]">
            <h1 class="text-xl font-bold">Failed to fetch post</h1>
        </div>
    </div>

</template>

<style></style>