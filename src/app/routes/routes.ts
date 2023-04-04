import { createWebHashHistory, createRouter } from "vue-router";
import Home from "@/app/pages/Home.vue";

const routes = [
    {
        path: '',
        component: Home,
    },
    {
        path: '/gif/:gifId',
        component: () => import("@/app/pages/Gif.vue")
    },
    {
        path: '/author/:authorId',
        component: () => import("@/app/pages/AuthorGif.vue")
    },
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
