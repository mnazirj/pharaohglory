import { createRouter, createWebHistory } from "vue-router";
import store from "@/store/index.js";

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
    beforeEnter: (to, from, next) => {
      if (!store.getters.isAuth) {
        next({ name: "dash.login" });
      } else {
        if (to.name === "dash") {
          next({ name: "dash.home" });
        }
        next();
      }
    },
    children: [
      {
        path: "home",
        name: "dash.home",
        component: () => import("@/components/dashboard/Home.vue"),
      },
      {
        path: "trip/:tripId/reviews",
        name: "dash.tripReviews",
        component: () => import("@/components/dashboard/TripReviews.vue"),
      },
      {
        path: "trips",
        name: "dash.trips",
        component: () => import("@/components/dashboard/Trips.vue"),
      },
      {
        path: "trips/edit/:tripId",
        name: "dash.trips.edit",
        component: () => import("@/components/dashboard/EditTrip.vue"),
      },
      {
        path: "payments",
        name: "dash.payments",
        component: () => import("@/components/dashboard/Payments.vue"),
      },
      {
        path: "accounts",
        name: "dash.accounts",
        component: () => import("@/components/dashboard/Accounts.vue"),
      },
      {
        path: "website-settings",
        name: "dash.websiteSettings",
        component: () => import("@/components/dashboard/Website_Settings.vue"),
      },
      {
        path: "profile",
        name: "dash.profile",
        component: () => import("@/components/dashboard/Profile.vue"),
      },
    ],
  },
  {
    path: "/dashboard/login",
    name: "dash.login",
    component: () => import("@/views/dashboard/LoginView.vue"),
  },
  // End Dashboard routes
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
