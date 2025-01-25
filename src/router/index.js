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
      {
        path: "clientarea",
        name: "cleintarea",
        component: () => import("../views/home/ClientView.vue"),
      },
      {
        path: "search:(?params)",
        name: "search",
        component: () => import("../views/home/SearchView.vue"),
      },
    ],
  },
  {
    path: "/confirm/:(?params)",
    name: "confirminvoice",
    component: () => import("@/components/home/registerInvoice.vue"),
  },
  {
    path: "/auth",
    name: "auth",
    beforeEnter: () => {
      if (localStorage.getItem("_token") != null) {
        router.push("/");
      }
    },
    children: [
      {
        path: "login",
        name: "client.login",
        component: () => import("../views/auth/LoginView.vue"),
      },
      {
        path: "register",
        name: "client.register",
        component: () => import("../views/auth/registerView.vue"),
      },
    ],
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
