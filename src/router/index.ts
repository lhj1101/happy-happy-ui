import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
// import HappyUI from "../views/HappyUI.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect:"/happyui",
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home.vue"),
    },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/happyui",
    name: "HappyUI",
    component: () => import("../views/HappyUI.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
