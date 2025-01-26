<template>
  <h4 class="fw-bold">
    <span>{{ $t("trips.customer_review") }}</span>
    <Button
      icon="fas fa-info-circle"
      outlined
      rounded
      variant="text"
      size="large"
      @click="infoDialog = true"
    />
  </h4>
  <div class="col-lg-2 col-md-2 col-12 text-lg-start text-md-start text-center">
    <div class="d-flex flex-column">
      <h6 class="fw-semibold">{{ $t("trips.overall") }}</h6>
      <h1 class="fw-bold text-center">
        {{ rate }}<small class="text-muted">/5</small>
      </h1>
      <Rating :modelValue="rate" readonly class="reviews mb-3 mx-auto" />
      <h6 class="text-muted text-center fw-semibold">
        {{ $t("trips.based", { amount: total }) }}
      </h6>
    </div>
  </div>

  <div class="col" v-if="isBooked && !hasReview">
    <Form v-slot="$form" :resolver="resolver" @submit="onFormSubmit">
      <div class="py-2">
        <Rating name="rating" v-model="stars" />
        <Message
          v-if="$form.rating?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $form.rating.error?.message }}</Message
        >
      </div>
      <FloatLabel variant="on">
        <Textarea v-model="review" rows="5" name="review" class="col-12" />
        <label for="review">{{ $t("trips.your") }}</label>
      </FloatLabel>
      <Message
        v-if="$form.review?.invalid"
        severity="error"
        size="small"
        variant="simple"
        >{{ $form.review.error?.message }}</Message
      >
      <div class="text-end mt-2">
        <Button
          :label="$t('trips.button')"
          type="submit"
          icon="fas fa-check"
          class="text-end"
          :loading="isLoading"
        />
      </div>
    </Form>
  </div>

  <div class="container" v-if="review != null">
    <DataView :value="reviews" paginator :rows="10">
      <template #list="slotProps">
        <div
          class="col py-3"
          v-for="(item, index) in slotProps.items"
          :key="index"
        >
          <Rating :modelValue="item.rate" readonly />
          <!-- <Button
            icon="fas fa-ellipsis"
            variant="text"
            rounded
            class="float-end"
            @click="formatDate(item.createdAt)"
          /> -->
          <div class="d-flex gap-3 py-3">
            <div>
              <h1><i class="fas fa-user-circle color" /></h1>
            </div>
            <div>
              <h6>{{ item.userName }}</h6>
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
import { Form } from "@primevue/forms";
import Textarea from "primevue/textarea";
import FloatLabel from "primevue/floatlabel";
import Message from "primevue/message";
import axios from "axios";
import router from "@/router";

defineProps({
  rate: Number,
  total: String,
  reviews: Array,
  isBooked: Boolean,
  hasReview: Boolean,
});
const infoDialog = ref(false);
const isLoading = ref(false);
const stars = ref(null);
const review = ref(null);
function formatDate(date) {
  var options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  var newDate = new Date(date);
  return newDate.toLocaleDateString("en-US", options);
}

const resolver = ({ values }) => {
  const errors = {};

  if (!values.review) {
    errors.review = [{ message: "Please enter your review." }];
  }
  if (!values.rating) {
    errors.rating = [{ message: "Please enter your rating." }];
  }

  return {
    errors,
  };
};
const onFormSubmit = ({ valid }) => {
  if (valid) {
    sendReview();
  }
};

async function sendReview() {
  isLoading.value = true;
  await axios
    .post(
      "base/add/event/review",
      {
        eventSlug: router.currentRoute.value.params.uid,
        rate: stars.value,
        feedback: review.value,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("_token"),
        },
      }
    )
    .then((response) => {
      if (response.status == 200) {
        isLoading.value = false;
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    });
}
</script>
