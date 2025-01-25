<template>
  <nav class="navbar navbar-expand-lg bg-transparent" id="nav">
    <div class="container">
      <a href="/"
        ><img :src="logo" alt="PG" class="img-fluid text-center" width="250"
      /></a>
      <button class="navbar-toggler" type="button" @click="nav = true">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <div class="col">
          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-search" />
            </InputGroupAddon>
            <InputText
              v-model="search"
              placeholder="Find places and things to do"
            />
            <DatePicker
              v-model="date"
              showIcon
              showButtonBar
              placeholder="Anytime"
              iconDisplay="input"
              dateFormat="dd/mm/yy"
            />
            <Button label="Search" @click="searchPlace" />
          </InputGroup>
        </div>
        <div class="col">
          <div
            class="d-flex justify-content-lg-end justify-content-md-end justify-content-center align-items-center gap-3"
          >
            <Button icon="fas fa-heart" label="Wishlist" variant="text" />
            <Menubar
              :model="isLoggedIn == true ? client : items"
              class="border-0 color-always"
            >
              <template #item="{ item, props, hasSubmenu }">
                <router-link
                  v-if="item.route"
                  v-slot="{ href, navigate }"
                  :to="item.route"
                  custom
                >
                  <a
                    v-ripple
                    :href="href"
                    v-bind="props.action"
                    @click="navigate"
                    class="color-always"
                  >
                    <span :class="item.icon" />
                    <span>{{ item.label }}</span>
                  </a>
                </router-link>
                <a
                  v-else
                  v-ripple
                  :href="item.url"
                  :target="item.target"
                  v-bind="props.action"
                  class="color-always"
                >
                  <span :class="item.icon" />
                  <span>{{ item.label }}</span>
                  <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down" />
                </a>
              </template>
            </Menubar>

            <Button
              :icon="[
                { 'pi pi-moon': !isDarkMode },
                { 'pi pi-sun': isDarkMode },
              ]"
              rounded
              @click="ToggleDarkMode()"
            />
          </div>
        </div>
      </div>
    </div>
  </nav>

  <Drawer v-model:visible="nav" header="Explore..." position="full">
    <div class="col">
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-search" />
        </InputGroupAddon>
        <InputText
          v-model="search"
          placeholder="Find places and things to do"
        />
        <DatePicker
          v-model="date"
          showIcon
          showButtonBar
          placeholder="Anytime"
          iconDisplay="input"
          dateFormat="dd/mm/yy"
        />
        <Button label="Search" @click="searchPlace" />
      </InputGroup>
    </div>
    <div class="col">
      <div
        class="d-flex justify-content-lg-end justify-content-md-end justify-content-center align-items-center gap-3"
      >
        <Button icon="fas fa-heart" label="Wishlist" variant="text" />
        <Menubar
          :model="isLoggedIn == true ? client : items"
          class="border-0"
          breakpoint="100px"
        >
          <template #item="{ item, props, hasSubmenu }">
            <router-link
              v-if="item.route"
              v-slot="{ href, navigate }"
              :to="item.route"
              custom
            >
              <a
                v-ripple
                :href="href"
                v-bind="props.action"
                @click="navigate"
                class="color"
              >
                <span :class="item.icon" />
                <span>{{ item.label }}</span>
              </a>
            </router-link>
            <a
              v-else
              v-ripple
              :href="item.url"
              :target="item.target"
              v-bind="props.action"
              class="color"
            >
              <span :class="item.icon" />
              <span>{{ item.label }}</span>
              <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down" />
            </a>
          </template>
        </Menubar>

        <Button
          :icon="[{ 'fas fa-moon': !isDarkMode }, { 'fas fa-sun': isDarkMode }]"
          rounded
          @click="ToggleDarkMode()"
        />
      </div>
    </div>
  </Drawer>
</template>

<script setup>
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import InputText from "primevue/inputtext";
import DatePicker from "primevue/datepicker";
import { onMounted, ref } from "vue";
import FloatLabel from "primevue/floatlabel";
import Button from "primevue/button";
import Menubar from "primevue/menubar";
import axios from "axios";
import router from "@/router";
import Drawer from "primevue/drawer";

const logo = require("@/assets/images/logo.svg");
const search = ref("");
const date = ref("");
const isDarkMode = ref(false);
const isLoggedIn = ref(false);
const nav = ref(false);
const items = ref([
  {
    label: "Profile",
    icon: "fas fa-user-circle",
    items: [
      {
        label: "Register",
        icon: "fas fa-user-plus",
        route: "/auth/register",
      },
      {
        label: "Login",
        icon: "fas fa-key",
        route: "/auth/login",
      },
    ],
  },
]);

const client = ref([
  {
    label: "NAME",
    icon: "fas fa-user-circle",
    items: [
      {
        label: "Client Area",
        icon: "fas fa-shapes",
        route: "/clientarea",
      },

      {
        label: "Logout",
        icon: "fas fa-door-open",
        command: () => {
          localStorage.removeItem("_token");
          window.location.reload();
        },
      },
    ],
  },
]);
function isDarkModeActive() {
  if (document.documentElement.classList.contains("my-app-dark")) {
    isDarkMode.value = true;
    return true;
  }
  isDarkMode.value = false;
  return false;
}

function ToggleDarkMode() {
  document.documentElement.classList.toggle("my-app-dark");

  document.body.classList.toggle("custom-dark");
  document.querySelector("#nav").classList.toggle("bg-body-tertiary");
  document.querySelector("#footer").classList.toggle("bg-body-secondary");
  var isdark = isDarkModeActive();
  isdark
    ? document.documentElement.setAttribute("data-bs-theme", "dark")
    : document.documentElement.setAttribute("data-bs-theme", "light");
  localStorage.setItem("mode", isdark ? "dark" : "light");
}

async function fetchUserInfo(token) {
  await axios
    .get("account/get/user/info", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((response) => {
      client.value[0].label = response.data.first_name;
    });
}

function searchPlace() {
  var startDate = new Date(date.value).toLocaleDateString("en-UK");

  date.value = null;
  router.push("/search/?places=" + search.value + "&startDate=" + startDate);
}

onMounted(() => {
  isLoggedIn.value = localStorage.getItem("_token") == null ? false : true;
  if (isLoggedIn.value) {
    fetchUserInfo(localStorage.getItem("_token"));
  }
  date.value = null;
  search.value = null;
  isDarkModeActive();
});
</script>
