<template>
  <section :dir="$i18n.locale == 'ar' ? 'rtl' : 'ltr'">
    <router-view />
  </section>
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
  if (localStorage.getItem("locale") == null) {
    localStorage.setItem("locale", "en");
  }
});
</script>

<script>
export default {
  mounted() {
    this.$i18n.locale = localStorage.getItem("locale");
  },
};
</script>
