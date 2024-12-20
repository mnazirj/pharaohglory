import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/home/HomeView.vue"),
  },
  // Dashboard Routes
  {
    path: "/dashboard",
    name: "dash",
    component: () => import("@/views/dashboard/DashboardView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
