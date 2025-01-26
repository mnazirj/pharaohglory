<template>
  <router-view />
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
  var mode = localStorage.getItem("mode");
  if (mode == "dark") {
    document.documentElement.classList.toggle("my-app-dark");

    document.body.classList.toggle("custom-dark");
    document.documentElement.setAttribute("data-bs-theme", "dark");
  }
});
</script>
