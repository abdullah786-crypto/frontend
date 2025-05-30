<script setup>

import '../assets/main.css'
import { computed, onMounted, ref } from 'vue';
import Button from 'primevue/button';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import useBlogStore from '@/State managment/blogPostStore';
import BlogPost from './Views/blogPost.vue';

const router = useRouter();
const newBlogStore = useBlogStore()

onMounted(async() => {
   await newBlogStore.getBlogPosts()
console.log('value of the post us', posts.value)

});
const { posts } = storeToRefs(newBlogStore);


const goAddNewPost = () => {
    router.push('/add-new-post')
}

const searchValue = ref('')

const filteredList = computed(() =>
    posts.value.filter((filteredData) =>
        filteredData.title?.toLowerCase().includes(searchValue.value.toLowerCase())
    )
);
</script>

<template>

    <div v-bind:class="'mainDiv'">
        <div>
            <h1 v-bind:class="'mainHeading'">The Food Ninja Blog App
            </h1>
            <p v-bind:class="'subHeader'">A blog about food, experiences, and recipes</p>
            <div
                class="flex flex-row xs:flex-wrap xxs:flex-wrap sm:flex-wrap md:flex-wrap items-center justify-between w-full">
                <input v-model="searchValue"
                    class="shadow-xl md:w-full sm:w-full hover:shadow-xl focus:shadow-xl focus:border-current lg:w-[400px] xl:w-[400px] 2xl:w-[400px] mb-5 mt-5 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                    placeholder="Search Post here...">
                <Button @click="goAddNewPost"
                    :class="'border-none md:w-full sm:w-full outline-none focus:outline-none shadow-xl bg-black text-center text-white xl:w-[150px] 2xl:w- lg:w-[150px] p-2 rounded-lg rounded-sm rounded-xl cursor-pointer'">
                    <span class="p-button-label">Add Post</span>
                </Button>
            </div>
        </div>
        <div :style="{ minWidth: 'auto', maxWidth: '98%' }"
            class="grid x-sm:grid-col-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-5 gap-10 mt-10">
            <div v-for="(blog, index) in filteredList" :key="index" :class="'w-full'">
                <BlogPost :id="blog.id" :title="blog.title" :imgUrl="blog.image" :subtitle="blog.subtitle" :comments="blog.comments" />
            </div>
        </div>
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