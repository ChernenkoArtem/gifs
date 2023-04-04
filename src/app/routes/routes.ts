import { createWebHashHistory, createRouter } from "vue-router";
import Home from "@/app/pages/Home.vue";
const AuthorGif = import("@/app/pages/AuthorGif.vue");
const Gif = import("@/app/pages/Gif.vue");

const routes = [
    {
        path: '',
        component: Home,
    },
    {
        path: '/gif/:gifId',
        component: Gif
    },
    {
        path: '/author/:authorId',
        component: AuthorGif
    },
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
