<template>
  <div class="container">
    <Details :header="$t('nav.result')" v-if="!isLoading" :card="info" />
  </div>
</template>

<script setup>
import Details from "@/components/home/CardDetails";
import router from "@/router";
import axios from "axios";
import { onMounted, ref } from "vue";

const info = ref(null);
const isLoading = ref(false);
async function GetResult() {
  isLoading.value = true;
  axios
    .get(
      "base/search/event?title=" +
        router.currentRoute.value.query.places +
        "&date=" +
        router.currentRoute.value.query.startDate
    )
    .then((response) => {
      if (response.status == 200) {
        info.value = response.data;
        isLoading.value = false;
      }
    })
    .catch((e) => {
      console.log(e);
      isLoading.value = false;
    });
}

onMounted(() => {
  GetResult();
});
</script>
