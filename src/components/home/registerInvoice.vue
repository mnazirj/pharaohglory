<template>
  <div class="d-flex justify-items-center align-items-center min-vh-100">
    <div class="mx-auto text-center">
      <ProgressSpinner fill="transparent" strokeWidth="6" />
      <h5 v-if="!isWrong">Please wait while registration completed</h5>
      <div v-if="isWrong" class="py-2">
        <h5>Ops something went wrong please try again after few minutes!</h5>
        <Button label="Go Back" icon="fas fa-home" variant="text" rounded
        as="router-link" to=/ />
      </div>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
import axios from "axios";
import { onMounted, ref } from "vue";
const param = ref([]);
const isWrong = ref(false);
import ProgressSpinner from "primevue/progressspinner";
import Button from "primevue/button";

onMounted(() => {
  param.value = router.currentRoute.value.query;
  axios
    .post(
      "https://publicws.pharaohglory.com/base/execute/payment",
      {
        paymentId: param.value.paymentId,
        PayerID: param.value.PayerID,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("_token"),
        },
      }
    )
    .then((response) => {
      if (response.status == 200) {
        router.go("/client");
      }
    })
    .catch((e) => {
      isWrong.value = true;
      console.log(e);
    });
});
</script>
