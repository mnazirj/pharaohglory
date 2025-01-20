import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/home/HomeView.vue"),
    children: [
      {
        path: "/details/:uid",
        name: "details",
        component: () => import("../views/home/DetailsView.vue"),
      },
    ],
  },
  {
    path: "/confirm/:(?params)",
    name: "confirminvoice",
    component: () => import("@/components/home/registerInvoice.vue"),
  },
  // Dashboard Routes
  {
    path: "/dashboard",
    name: "dash",
    component: () => import("@/views/dashboard/DashboardView.vue"),
    children: [
      {
        path: "home",
        name: "dash.home",
        component: () => import("@/components/dashboard/Home.vue"),
      },
      {
        path: "reviews",
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
