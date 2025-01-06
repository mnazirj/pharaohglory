<template>
  <nav class="navbar navbar-expand-lg bg-transparent" id="nav">
    <div class="container">
      <img :src="logo" alt="PG" class="img-fluid text-center" width="250" />
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
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
            />
            <Button label="Search" />
          </InputGroup>
        </div>
        <div class="col">
          <div
            class="d-flex justify-content-lg-end justify-content-md-end justify-content-center align-items-center gap-3"
          >
            <Button icon="fas fa-heart" label="Wishlist" variant="text" />
            <Button icon="fas fa-user-circle" label="Profile" variant="text" />
            <Button
              :icon="[
                { 'pi pi-moon': isDarkMode },
                { 'pi pi-sun': !isDarkMode },
              ]"
              rounded
              @click="ToggleDarkMode()"
            />
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import InputText from "primevue/inputtext";
import DatePicker from "primevue/datepicker";
import { ref } from "vue";
import FloatLabel from "primevue/floatlabel";
import Button from "primevue/button";
const logo = require("@/assets/images/logo.svg");
const search = ref("");
const date = ref("");
const isDarkMode = ref(false);

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
  var isdark = isDarkModeActive();
  isdark
    ? document.documentElement.setAttribute("data-bs-theme", "dark")
    : document.documentElement.setAttribute("data-bs-theme", "light");
}
</script>
