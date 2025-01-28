<template>
  <section id="home" v-if="!isLoading">
    <Navbar />
    <Intro :information="info" :cards="card" v-if="$route.fullPath == '/'" />
    <router-view></router-view>
    <Footer
      :phone="info.phone"
      :location="info.location"
      :email="info.email"
      :facebook="info.FaceBookLink"
      :x="info.XLink"
      :instagram="info.InstagramLink"
      :youtube="info.YoutubeLink"
      :tiktok="info.TikTokLink"
      :snapchat="info.SnapChatLink"
    />
  </section>
</template>

<script setup>
import Navbar from "@/components/home/Navbar.vue";
import Intro from "@/components/home/Intro.vue";
import Footer from "@/components/home/Footer.vue";
import { onMounted, ref } from "vue";
import axios from "axios";

var card = [];
var info = [];
const isLoading = ref(false);
async function fetchInfo() {
  isLoading.value = true;
  await axios
    .get("base/homepage?lang=" + localStorage.getItem("locale"))
    .then((response) => {
      if (response.status == 200) {
        info = response.data.webInfo[0];
        card = response.data.events;
        isLoading.value = false;
      }
    });
}

onMounted(() => {
  fetchInfo();
});
</script>
