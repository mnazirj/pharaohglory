<template>
  <section class="details">
    <h2 class="font-bold">{{ header }}</h2>
    <hr class="w-50 hr" />
    <div class="row py-5 pt-0">
      <div class="col-lg-4 col-12" v-for="(item, index) in card" :key="index">
        <div class="card shadow h-100">
          <div class="card-img-top activity-zoom">
            <img :src="item.eventImages" class="w-100" height="300" />
          </div>
          <div class="card-header border-0 bg-transparent">
            <div class="d-flex justify-content-between">
              <Tag :value="item.category" />
              <Button
                icon="fa fa-heart"
                rounded
                variant="text"
                @click="addToWishList(item)"
              />
            </div>
          </div>
          <a :href="'/details/' + item.slug" class="nav-link">
            <div class="card-body bg-transparent">
              <h5 class="font-bold">{{ item.title }}</h5>
              <div class="d-flex justify-content-between">
                <h6>{{ item.formattedDuration }}</h6>
              </div>
            </div>
            <div class="card-footer border-0 bg-transparent">
              <div class="d-flex align-items-center">
                <Rating v-model="item.eventRate" readonly />
                <h6 class="ms-2 mt-2">
                  {{ item.eventRate }} ({{ item.totalEventRate }})
                </h6>
              </div>
              <h6>
                {{ $t("trips.price", { amount: item.adultPrice }) }}
              </h6>
            </div>
          </a>
        </div>
      </div>
    </div>
    <!-- <h2 class="font-bold">{{ subheader }}</h2> -->

    <!-- <Carousel
      :value="items"
      :numVisible="4"
      :responsiveOptions="responsiveOptions"
      circular
      :showIndicators="false"
    >
      <template #item="slotProps">
        <div class="col">
          <div class="card">
            <div class="card-img-top activity-zoom">
              <img src="@/assets/images/test.webp" class="img-fluid" />
              <h4 class="position-absolute mx-2 mt-2 left-0 top-0 p-1">
                <span class="bg-color p-1 rounded font-bold text-white">
                  {{ slotProps.data.id }}. {{ slotProps.data.name }}</span
                >
                <br />
                <span
                  class="bg-white color rounded-bottom p-1 pt-0 position-absolute --font-18"
                  >{{ slotProps.data.activities }} activities</span
                >
              </h4>
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
    </Carousel> -->
  </section>
</template>

<script setup>
import Card from "primevue/card";
import Tag from "primevue/tag";
import Rating from "primevue/rating";
import { ref } from "vue";
import Button from "primevue/button";
import Carousel from "primevue/carousel";
import { useStore } from "vuex";
const store = useStore();

const stars = ref(4.7);
defineProps({
  header: String,
  subheader: String,
  card: Array,
});

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

function addToWishList(payload) {
  store.commit("addToWishList", payload);
}
</script>
