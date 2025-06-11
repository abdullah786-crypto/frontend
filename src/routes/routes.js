import HomePage from "@/Components/homePage.vue";
import AddNewPost from "@/Components/Views/addNewPost.vue";
import BlogDetails from "@/Components/Views/blogDetails.vue";
import EditPost from "@/Components/Views/editPost.vue";
import Login from "@/Components/Views/auth/login.vue"
import Signup from "@/Components/Views/auth/signup.vue"
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
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/signup',
        name: 'signup',
        component: Signup
    }
];

const routers = createRouter({
    history: createWebHistory(),
    routes
})
routers.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('userId');

    if (!isAuthenticated && to.name !== 'login' && to.name !== 'signup') {
        next({ name: 'login' });
    } 
    else if (isAuthenticated && (to.name === 'login' || to.name === 'signup')) {
        next({ name: 'home' });
    } 
    else {
        next();
    }
});
export default routers;
