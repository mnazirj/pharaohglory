<template>
  <h3 class="fw-bold">{{ header }}</h3>
  <Carousel
    :value="card"
    :numVisible="3"
    :responsiveOptions="responsiveOptions"
    circular
    :showIndicators="false"
  >
    <template #item="slotProps">
      <div class="col-12 col-lg-4 h-100">
        <a :href="'/details/' + slotProps.data.slug" class="nav-link">
          <div class="card border-color h-100">
            <div class="card-img-top activity-zoom">
              <img
                :src="slotProps.data.eventImages"
                class="w-100"
                height="300"
              />
            </div>
            <div class="card-header border-0 bg-transparent">
              <div class="d-flex justify-content-between">
                <Tag :value="slotProps.data.category" />
                <Button icon="fa fa-heart" rounded variant="text" />
              </div>
            </div>
            <div class="card-body bg-transparent">
              <h5 class="font-bold">{{ slotProps.data.title }}</h5>
              <div class="d-flex justify-content-between">
                <h6>{{ slotProps.data.formattedDuration }}</h6>
              </div>
            </div>
            <div class="card-footer border-0 bg-transparent">
              <div class="d-flex align-items-center">
                <Rating v-model="slotProps.data.eventRate" readonly />
                <h6 class="ms-2 mt-2">
                  {{ slotProps.data.eventRate }} ({{
                    slotProps.data.totalEventRate
                  }})
                </h6>
              </div>
              <h6>From ${{ slotProps.data.adultPrice }} per perosn</h6>
            </div>
          </div>
        </a>
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
</script>
