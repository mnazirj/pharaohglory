<template>
  <h3 class="fw-bold">{{ header }}</h3>
  <Carousel
    :value="items"
    :numVisible="4"
    :responsiveOptions="responsiveOptions"
    circular
    :showIndicators="false"
  >
    <template #item="slotProps">
      <div class="col-12 h-100">
        <div class="card border-color h-100">
          <div class="card-img-top activity-zoom">
            <img src="@/assets/images/test.webp" class="img-fluid" />
          </div>
          <div class="card-header border-0 bg-transparent">
            <div class="d-flex justify-content-between">
              <Tag value="Entry Ticket" />
              <Button icon="fa fa-heart" rounded variant="text" />
            </div>
          </div>
          <div class="card-body bg-transparent">
            <h5 class="font-bold">{{ slotProps.data.name }}</h5>
            <div class="d-flex justify-content-between">
              <h6>1 day</h6>
            </div>
          </div>
          <div class="card-footer border-0 bg-transparent">
            <div class="d-flex align-items-center">
              <Rating v-model="stars" readonly />
              <h6 class="ms-2 mt-2">4.9 (2,250)</h6>
            </div>
            <h6>From $209.99 per perosn</h6>
          </div>
        </div>
      </div>
    </template>
    <template #nexticon>
      <Button icon="fas fa-arrow-right" />
    </template>
    <template #previcon>
      <Button icon="fas fa-arrow-left" />
    </template>
  </Carousel>
</template>

<script setup>
import Button from "primevue/button";
import Rating from "primevue/rating";
import Tag from "primevue/tag";
import { ref } from "vue";
import Carousel from "primevue/carousel";

defineProps({
  header: String,
  card: Array,
});
const stars = ref(5);
const responsiveOptions = ref([
  {
    breakpoint: "1400px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "1199px",
    numVisible: 3,
    numScroll: 1,
  },
  {
    breakpoint: "767px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "575px",
    numVisible: 1,
    numScroll: 1,
  },
]);
const items = ref([
  { id: 1, name: "Statue of Liberty", activities: 168 },
  { id: 2, name: "Vatican Museums", activities: 501 },
  { id: 3, name: "Eiffel Tower", activities: 457 },
  { id: 4, name: "Metropolitan Museum of Art", activities: 45 },
  { id: 5, name: "United States Capitol", activities: 97 },
]);
</script>
