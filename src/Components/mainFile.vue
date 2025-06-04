<script setup>

import '../assets/main.css'
import { onMounted, ref, watch } from 'vue';
import Button from 'primevue/button';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import useBlogStore from '@/State managment/blogPostStore';
import BlogPost from './Views/blogPost.vue';
import Paginator from 'primevue/paginator';

const router = useRouter();
const newBlogStore = useBlogStore()
const currentPage = ref(0);
const rowsPerPage = ref(12)
const searchValue = ref('')
const blogStore = useBlogStore()
let timeOut;
let isSearching = ref(false)

onMounted(async () => {
    await newBlogStore.getBlogPosts(searchValue.value,
        searchValue.value,
        currentPage.value,
        rowsPerPage.value)
    console.log('value of the post us', posts.value)
});

const { posts } = storeToRefs(newBlogStore);
const goAddNewPost = () => {
    router.push('/add-new-post')
}

const onPageChange = async (e) => {
    currentPage.value = e.page + 1
    rowsPerPage.value = e.rows
    blogStore.posts = []
    await blogStore.getBlogPosts(searchValue.value, searchValue.value, currentPage.value, rowsPerPage.value)
}

watch(searchValue, async () => {
    currentPage.value = 0;
    if (searchValue.value === null || searchValue.value === '' || searchValue.value === undefined) {
        isSearching.value = false
    } else {
        isSearching.value = true
    }
        await blogStore.getBlogPosts(searchValue.value, searchValue.value, currentPage.value, rowsPerPage.value)
})

</script>

<template>
    <div v-bind:class="'mainDiv'">
        <div>
            <h1 v-bind:class="'mainHeading'">The Food Ninja Blog App
            </h1>
            <p v-bind:class="'subHeader'">A blog about food, experiences, and recipes</p>
            <div
                class="flex flex-row xs:flex-wrap xxs:flex-wrap sm:flex-wrap md:flex-wrap items-center justify-between w-full">
                <input @input="blogStore.getBlogPosts(searchValue, searchValue, currentPage, rowsPerPage)"
                    v-model="searchValue"
                    class="shadow-xl md:w-full sm:w-full hover:shadow-xl focus:shadow-xl focus:border-current lg:w-[400px] xl:w-[400px] 2xl:w-[400px] mb-5 mt-5 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                    placeholder="Search Post here...">
                <Button @click="goAddNewPost"
                    :class="'border-none md:w-full sm:w-full outline-none focus:outline-none shadow-xl bg-black text-center text-white xl:w-[150px] 2xl:w- lg:w-[150px] p-2 rounded-lg rounded-sm rounded-xl cursor-pointer'">
                    <span class="p-button-label">Add Post</span>
                </Button>
            </div>
        </div>
        <div :style="{ minWidth: 'auto', maxWidth: '98%' }">
            <div class="mb-10 grid x-sm:grid-col-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-5 gap-10 mt-10"
                v-if="posts.length > 0">
                <div v-for="(blog) in posts" :key="blog.id" :class="'w-full'">
                    <BlogPost :id="blog.id" :title="blog.title" :imgUrl="blog.image" :subtitle="blog.subtitle"
                        :comments="blog.comments" />
                </div>
            </div>
            <div class="h-[300px] w-full flex text-center flex-row items-center justify-center"
                v-else-if="blogStore.isLoading">
                <h1 class="text-xl self-center text-center">Loading please wait...!!</h1>
            </div>
            <div v-else>
                <div class="h-[300px] w-full flex text-center flex-row items-center justify-center">
                    <h1 class="text-xl self-center text-center">Sorry no any post found..!!</h1>
                </div>
            </div>
        </div>
        <Paginator :template="{
            '640px': 'PrevPageLink CurrentPageReport NextPageLink',
            '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
            '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
            default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown JumpToPageInput'
        }" :rows="rowsPerPage" :totalRecords="isSearching ? posts.length : blogStore.totalRecords"
            @page="onPageChange">
        </Paginator>
    </div>
</template>
<style>
.mainDiv {
    display: flex;
    flex-direction: column;
    width: 98%;
    padding: 20px;
    height: auto;
    margin: 40px 20px 20px 20px;
    justify-content: center;
    align-items: center;
}

.mainHeading {
    font-size: 48px;
    color: #000638;
    font-weight: 700;
    margin: 0px;
}

.subHeader {
    color: #605C59;
    font-size: 20px;
    font-weight: 400;
}

.searchField {
    width: 20%;
    margin-top: 20px;
    height: 50px;
    padding-left: 20px;
    border-radius: 10px;
}

::v-deep(.p-button) {
    border: none;
}
</style>