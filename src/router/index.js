import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/home/HomeView.vue"),
  },
  {
    path: "/details/:uid",
    name: "details",
    component: () => import("../views/home/DetailsView.vue"),
  },
  // Dashboard Routes
  {
    path: "/dashboard",
    name: "dash",
    component: () => import("@/views/dashboard/DashboardView.vue"),
    children: [
      {
        path: "/dashboard/home",
        name: "dash.home",
        component: () => import("@/components/dashboard/Home.vue"),
      },
      {
        path: "/dashboard/reviews",
        name: "dash.reviews",
        component: () => import("@/components/dashboard/Reviews.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
