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
import axios, { formToJSON } from "axios";
axios.defaults.baseURL = "https://publicws.pharaohglory.com";
import { onMounted, ref } from "vue";
const param = ref([]);
const isWrong = ref(false);
import ProgressSpinner from "primevue/progressspinner";
import Button from "primevue/button";

onMounted(() => {
  param.value = router.currentRoute.value.query;
  var temp = JSON.parse(localStorage.getItem("info"));
  var newinfo = {};
  newinfo = {
    eventId: temp.eventId,
    numberOfAdult: temp.numberOfAdult,
    numberOfChild: temp.numberOfChild,
    reservationDate: temp.reservationDate,
    paymentId: param.value.paymentId,
    PayerID: param.value.PayerID,
  };
  localStorage.removeItem("info");
  axios
    .post("base/execute/payment", newinfo, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("_token"),
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if (response.status == 200) {
        router.push("/clientarea");
      }
    })
    .catch((e) => {
      isWrong.value = true;
      console.log(e);
    });
});
</script>
