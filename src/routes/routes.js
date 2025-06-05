import HomePage from "@/Components/homePage.vue";
import AddNewPost from "@/Components/Views/addNewPost.vue";
import BlogDetails from "@/Components/Views/blogDetails.vue";
import EditPost from "@/Components/Views/editPost.vue";
import { createWebHistory, createRouter } from "vue-router";

export const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage,
    },
    {
        path: '/add-new-post',
        name: 'addNewPost',
        component: AddNewPost,
    },
    {
        path: '/blog-details/:id',
        name: 'blog-details',
        component: BlogDetails,
    },
    {
        path: '/update-post/:id',
        name: 'update-post',
        component: EditPost,
    }
];

const routers = createRouter({
    history: createWebHistory(),
    routes
})

export default routers;
