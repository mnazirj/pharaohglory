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
        {{ rate }}<small class="text-muted">/5</small>
      </h1>
      <Rating :modelValue="rate" readonly class="reviews mb-3" />
      <h6 class="text-muted text-center fw-semibold">
        based on {{ total }} reviews
      </h6>
    </div>
  </div>
  <div class="container">
    <DataView :value="reviews" paginator :rows="10">
      <template #list="slotProps">
        <div
          class="col py-3"
          v-for="(item, index) in slotProps.items"
          :key="index"
        >
          <Rating :modelValue="item.rate" />
          <Button
            icon="fas fa-ellipsis"
            variant="text"
            rounded
            class="float-end"
            @click="formatDate(item.createdAt)"
          />
          <div class="d-flex gap-3 py-3">
            <div>
              <h1><i class="fas fa-user-circle color" /></h1>
            </div>
            <div>
              <h6>{{ item.userName }} - City</h6>
              <h6>{{ formatDate(item.createdAt) }} - Verified booking</h6>
            </div>
          </div>
          <p class="font-medium">
            {{ item.feedback }}
          </p>
          <hr class="hr" />
        </div>
      </template>
    </DataView>
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
import DataView from "primevue/dataview";
import { ref } from "vue";
defineProps({
  rate: Number,
  total: String,
  reviews: Array,
});
const infoDialog = ref(false);

function formatDate(date) {
  var options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  var newDate = new Date(date);
  return newDate.toLocaleDateString("en-US", options);
}
</script>
