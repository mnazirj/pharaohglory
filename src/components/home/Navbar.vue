<template>
  <nav class="navbar navbar-expand-lg bg-transparent" id="nav">
    <div class="container-fluid">
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
            <InputText v-model="search" :placeholder="$t('nav.input')" />
            <DatePicker
              v-model="date"
              showIcon
              showButtonBar
              :placeholder="$t('nav.time')"
              iconDisplay="input"
              dateFormat="dd/mm/yy"
            />
            <Button :label="$t('nav.search')" @click="searchPlace" />
          </InputGroup>
        </div>
        <div class="col">
          <div
            class="d-flex justify-content-lg-end justify-content-md-end justify-content-center align-items-center gap-3"
          >
            <SelectButton
              v-model="value"
              :options="options"
              @change="changeLocale"
            />

            <Button
              icon="fas fa-heart"
              :label="$t('nav.wishlist')"
              variant="text"
              @click="wishlist = true"
            />
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
                    <span>{{ $t("nav." + item.label) }}</span>
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
                  <span v-if="item.label == 'logout'">{{
                    $t("nav." + item.label)
                  }}</span>
                  <span v-if="item.label == 'profile'">{{
                    $t("nav." + item.label)
                  }}</span>
                  <span v-else>{{ item.label }}</span>
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
        <InputText v-model="search" :placeholder="$t('nav.input')" />
        <DatePicker
          v-model="date"
          showIcon
          showButtonBar
          :placeholder="$t('nav.time')"
          iconDisplay="input"
          dateFormat="dd/mm/yy"
        />
        <Button :label="$t('nav.search')" @click="searchPlace" />
      </InputGroup>
    </div>
    <div class="col">
      <div
        class="d-flex justify-content-lg-end justify-content-md-end justify-content-center align-items-center gap-3"
      >
        <Button
          icon="fas fa-heart"
          :label="$t('nav.wishlist')"
          variant="text"
          @click="wishlist = true"
        />
        <Menubar
          :model="isLoggedIn == true ? client : items"
          class="border-0 color-always"
          :breakpoint="100"
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
                <span>{{ $t("nav." + item.label) }}</span>
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
              <span v-if="item.label == 'logout'">{{
                $t("nav." + item.label)
              }}</span>
              <span v-if="item.label == 'profile'">{{
                $t("nav." + item.label)
              }}</span>
              <span v-else>{{ item.label }}</span>
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
      <div class="text-center">
        <SelectButton
          v-model="value"
          :options="options"
          @change="changeLocale"
        />
      </div>
    </div>
  </Drawer>

  <Drawer
    v-model:visible="wishlist"
    :header="$t('wishlist.title')"
    position="right"
    class="w-25"
  >
    <div v-if="$store.state.item.length <= 0">
      <h5 class="color text-center">{{ $t("wishlist.empty") }} :'(</h5>
    </div>
    <div
      class="d-flex flex-row"
      v-for="(item, index) in $store.state.item"
      :key="index"
    >
      <div class="col">
        <img :src="item.eventImage" class="img-fluid rounded" />
      </div>
      <div class="col">
        <h6>{{ item.title }}</h6>
        <div class="d-flex flex-row gap-5">
          <div class="col">
            <h4>${{ item.adultPrice }}</h4>
          </div>
          <div class="col">
            <Button
              icon="fas fa-trash"
              rounded
              size="small"
              @click="removeFromWishList(item)"
            />
          </div>
        </div>
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
import SelectButton from "primevue/selectbutton";
import { useStore } from "vuex";
const store = useStore();
const logo = ref(require("@/assets/images/logo.svg"));
const search = ref("");
const date = ref("");
const isDarkMode = ref(false);
const isLoggedIn = ref(false);
const nav = ref(false);
const wishlist = ref(false);
const options = ref(["AR", "EN"]);
const value = ref(null);
const items = ref([
  {
    label: "profile",
    icon: "fas fa-user-circle",
    items: [
      {
        label: "reigster",
        icon: "fas fa-user-plus",
        route: "/auth/register",
      },
      {
        label: "login",
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
        label: "clientarea",
        icon: "fas fa-shapes",
        route: "/clientarea",
      },

      {
        label: "logout",
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
    logo.value = require("@/assets/images/dark-logo.svg");
    return true;
  }
  isDarkMode.value = false;
  logo.value = require("@/assets/images/logo.svg");
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

function changeLocale() {
  localStorage.setItem("locale", value.value.toLowerCase());
  window.location.reload();
}

function removeFromWishList(payload) {
  store.commit("removeFromWishList", payload);
}

onMounted(() => {
  isLoggedIn.value = localStorage.getItem("_token") == null ? false : true;
  if (isLoggedIn.value) {
    fetchUserInfo(localStorage.getItem("_token"));
  }
  date.value = null;
  search.value = null;
  isDarkModeActive();
  value.value = localStorage.getItem("locale").toLocaleUpperCase();
});
</script>
