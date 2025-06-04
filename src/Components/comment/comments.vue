<script setup>
import { deleteCommentById } from '@/services/blog.services';
import useBlogStore from '@/State managment/blogPostStore';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Menu from 'primevue/menu';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref, watch } from 'vue';

const props = defineProps(['username', 'email', 'comment', 'id', 'commentsList'])
const menu = ref(null)
const showDialog = ref(false)
const blogStore = useBlogStore()
const toast = useToast()

const commentData = {
    username: props.username,
    email: props.email,
    comment: props.comment
}

const toggle = (event) => {
    menu.value.toggle(event)
}
const updateButton = async () => {
    const commentId = props.id
    const result = await blogStore.updateComment(commentData, commentId)

    if (result.success) {

        toast.add({
            severity: 'success',
            summary: 'Update comment',
            detail: result.message,
            life: 3000,
        })
        showDialog.value = false
    } else {
        console.log('error while updating comment is', result.error);

        toast.add({
            severity: 'error',
            summary: result.message,
            detail: result.error,
            life: 3000
        })
    }
}

const deleteButton = async () => {
    const commentId = props.id
    console.log('id in comment comp', commentId)
    const result = await blogStore.deleteComment(commentId)

    if (result.success) {
        toast.add({
            severity: 'success',
            summary: 'Comment Delete',
            detail: result.message,
            life: 3000,
        })
        console.log('comment id is', typeof commentId, commentId);
        
        blogStore.commentsList = blogStore.commentsList.filter((com) => com.id !== commentId)
        showDialog.value = false
    } else {
        toast.add({
            severity: 'error',
            summary: 'Failed delete comment',
            detail: result.error,
            life: 3000
        })
    }
}
const items = [
    {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => {
            deleteButton()
        }
    },
    {
        label: 'Update',
        icon: 'pi pi-pencil',
        command: async () => {
            document.activeElement.blur();
            showDialog.value = true;
            // showDialog.value = !showDialog.value

        }
    }
]
</script>

<template>
    <Card class="border-gray-200 w-[100%] m-0 m-[0px] mb-0 shadow-lg shadow-xl shadow-2xl shadow-md">
        <template #title>
            <div class="flex flex-row w-full justify-between">
                {{ commentData.username }} &nbsp; id: {{ props.id }}
                <Button type="button" icon="pi pi-ellipsis-v" @click="toggle" aria-haspopup="true"
                    aria-controls="overlay_menu" />
                <Menu ref="menu" :model="items" :popup="true" />
                <Dialog v-model:visible="showDialog" header="Update Comment" modal :style="{ width: '30rem' }">
                    <div class="flex flex-col gap-y-5">
                        
                        <div class="items-center flex flex-row w-full justify-between gap-x-5">
                            <label for="username" class="font-semibold w-24">Username</label>
                            <InputText class="w-full" name="username" type="text" placeholder="Your name"
                                v-model="commentData.username" />
                        </div>
                        <div class="items-center flex flex-row w-full justify-between gap-x-5">
                            <label for="username" class="font-semibold w-24">Email</label>
                            <InputText class="w-full" name="userEmail" type="text" placeholder="Email"
                                v-model="commentData.email" />
                        </div>
                        <div class="items-center flex flex-row w-full justify-between gap-x-5">
                            <label for="username" class="font-semibold w-24">Comment</label>
                            <InputText class="w-full" name="comment" type="text"
                                placeholder="Write your comment here...!!" v-model="commentData.comment" />
                        </div>
                        <Toast />
                        <Button @click="updateButton" class="bg-black p-[8px] mt-5" label="Update" />
                    </div>
                </Dialog>
            </div>
        </template>
        <template #subtitle>{{ commentData.email }}</template>
        <template #content>
            <p class="m-0">
                {{ commentData.comment }}
            </p>
        </template>
    </Card>
</template>
<style scoped>
::v-deep(.p-button.p-button-icon-only) {
    background-color: black;
    width: 30px;
    height: 30px;
}
</style>