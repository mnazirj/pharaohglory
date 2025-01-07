<template>
  <h4 class="fw-bold">
    <span>Customer reviews</span>
    <Button
      icon="fas fa-info-circle"
      outlined
      rounded
      variant="text"
      size="large"
      @click="infoDialog = true"
    />
  </h4>
  <div class="col-2">
    <div class="d-flex flex-column">
      <h6 class="fw-semibold">Overall rating</h6>
      <h1 class="fw-bold text-center">
        4.8<small class="text-muted">/5</small>
      </h1>
      <Rating modelValue="4" readonly class="reviews mb-3" />
      <h6 class="text-muted text-center fw-semibold">based on 120 reviews</h6>
    </div>
  </div>
  <Dialog
    v-model:visible="infoDialog"
    modal
    :dismissableMask="true"
    class="col-lg-4 col-md-4 col-12"
  >
    <template #header>
      <div class="float-start">
        <h4 class="fw-bold">Customer reviews</h4>
      </div>
    </template>
    <h6>
      All reviews are from verified customers who purchased the activity.
      Reviews can only be submitted after the activity takes place.
    </h6>
  </Dialog>
</template>

<script setup>
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Rating from "primevue/rating";
import { ref } from "vue";

const infoDialog = ref(false);
</script>
