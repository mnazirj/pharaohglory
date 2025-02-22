import { createRouter, createWebHistory } from "vue-router";
import store from "@/store/index.js";

const routes = [
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    beforeEnter: () => {
      router.push("/");
    },
  },
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
        beforeEnter: () => {
          if (localStorage.getItem("_token") == null) {
            router.push("/auth/login");
          }
        },
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
    beforeEnter: (to, from, next) => {
      if (
        localStorage.getItem("_token") != null ||
        sessionStorage.getItem("_token") != null
      ) {
        if (to.name == "dash") {
          next({ name: "dash.home" });
        } else {
          next();
        }
      } else {
        next({ name: "dash.login" });
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
      {
        path: "category",
        name: "dash.category",
        component: () => import("@/components/dashboard/Category.vue"),
      },
    ],
  },
  {
    path: "/dashboard/login",
    name: "dash.login",
    component: () => import("@/views/dashboard/LoginView.vue"),
    beforeEnter: (to, from, next) => {
      console.log(from);
      console.log(
        "Check login cond : ",
        localStorage.getItem("_token") != null ||
          sessionStorage.getItem("_token") != null
      );
      if (
        localStorage.getItem("_token") != null ||
        sessionStorage.getItem("_token") != null
      ) {
        next({ name: "dash.home" });
      } else {
        next();
      }
    },
  },
  // End Dashboard routes
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
