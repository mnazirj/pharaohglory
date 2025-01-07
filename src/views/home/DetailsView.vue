<template>
  <Navbar />
  <div class="container">
    <h1 class="text-uppercase font-bold text-center">
      Viewing details for uid /{{ $route.params.uid }}/
    </h1>

    <div>
      <div>
        <Tag value="Guided Tour" />
        <h1 class="fw-bold">
          Orlando: Chocolate Kingdom Factory Adventure Tour
        </h1>
      </div>
      <div class="d-flex justify-content-between py-2">
        <div class="d-flex gap-2 align-items-center">
          <Rating v-model="stars" readonly class="d-inline" />
          <h6 class="mt-1 fw-bold">
            4.8 / 5
            <a href="#" class="ms-1 fw-normal">119 Reviews</a>
          </h6>
        </div>
        <div class="d-flex gap-2 align-items-center">
          <Button label="Add to wishlist" icon="fas fa-heart" size="small" />
          <Button label="Share" icon="fas fa-share" size="small" />
        </div>
      </div>

      <div class="card d-flex justify-content-center">
        <Galleria
          v-model:activeIndex="activeIndex"
          v-model:visible="displayCustom"
          :value="images"
          :numVisible="3"
          :showItemNavigators="true"
          :showThumbnailNavigators="false"
          :showThumbnails="false"
          :circular="true"
          :fullScreen="true"
        >
          <template #item="slotProps">
            <div>
              <Image :src="slotProps.item.href" preview class="img-fluid" />
            </div>
          </template>
        </Galleria>
      </div>

      <div class="row">
        <template v-for="(image, index) in images.slice(0, 3)" :key="index">
          <div class="col-lg-4 col-md-6 col-12 py-2">
            <div class="d-flex h-full" v-if="index != 2">
              <img
                :src="image.href"
                @click="ShowImage(index)"
                class="img-fluid rounded shadow cursor-pointer"
              />
            </div>
            <div
              class="d-flex h-full justify-content-end align-items-end"
              v-if="index == 2"
            >
              <img
                :src="image.href"
                @click="ShowImage(index)"
                class="img-fluid rounded shadow cursor-pointer"
              />
              <Button
                :label="images.slice(index + 1).length"
                icon="fas fa-image"
                class="position-absolute m-2"
                rounded
                @click="ShowImage(index + 1)"
              />
            </div>
          </div>
        </template>
      </div>
    </div>

    <div class="row flex-row-reverse">
      <!-- Card Price -->
      <div class="col-lg-4 col-md-12 col-12">
        <Card class="border border-color">
          <template #content>
            <Tag value="Liekly to sell out" />
            <div
              class="d-flex justify-content-between align-items-center gap-5"
            >
              <div class="mt-2">
                <h6 class="mb-1">From</h6>
                <h5 class="fw-bold mb-1">$209.15</h5>
                <h6>per person</h6>
              </div>
              <div>
                <Button label="Check availiability" rounded />
              </div>
            </div>
            <div class="d-flex gap-3 align-items-center">
              <i class="fas fa-credit-card font-icon color-always" />
              <h6 class="mt-2">
                Reserve now & pay later to book your spot and pay nothing today
              </h6>
            </div>
          </template>
        </Card>
      </div>
      <!-- Card Price END -->

      <!-- TITLE and ABOUT -->
      <div class="col-lg-8 col-md-12 col-12">
        <h6>
          Indulge your passion for all things chocolate on a 45-minute adventure
          tour at the Chocolate Kingdom in Orlando. Experience the only
          micro-batch chocolate factory and museum tour on the East Coast.
        </h6>
        <div class="py-2">
          <h3 class="fw-bold">About this activity</h3>

          <div class="float-start pt-2">
            <div class="row" v-for="(prob, index) in eventProbs" :key="index">
              <div class="col-1">
                <h6 class="text-center">
                  <i :class="prob.icon + ' color'" />
                </h6>
              </div>
              <div class="col">
                <h6>{{ prob.title }}</h6>
                <h6 class="text-muted" v-if="prob.subtitle != null">
                  {{ prob.subtitle }}
                </h6>
              </div>
            </div>
          </div>
        </div>
        <div class="float-start">
          <h4 class="fw-bold">Experience</h4>
          <div v-for="item in eventHighlight" :key="item" class="col-12">
            <div class="row" v-if="!item.isList">
              <div class="col-lg-3 col-md-3 col-12">
                <h6>{{ item.title }}</h6>
              </div>
              <div class="col">
                <h6>{{ item.subtitle }}</h6>
              </div>
              <hr />
            </div>

            <div class="row" v-if="item.isList">
              <div class="col-lg-3 col-md-3 col-12">
                <h6>{{ item.title }}</h6>
              </div>
              <div class="col">
                <ul class="fa-ul ms-0">
                  <li v-for="list in item.list" :key="list">
                    <i
                      :class="[
                        list.icon,
                        { 'text-danger': list.icon == 'fas fa-circle-xmark' },
                        { 'text-success': list.icon == 'fas fa-circle-check' },
                        { 'color-always': list.icon == 'fas fa-circle-notch' },
                      ]"
                      class="me-1"
                    />
                    {{ list.title }}
                  </li>
                </ul>
              </div>
              <hr />
            </div>
          </div>
        </div>
      </div>
      <!-- TITLE and ABOUT END -->
    </div>
    <div>
      <SimillarActivity header="You might also like..." />
    </div>
    <hr class="hr" />

    <div>
      <Reviews />
    </div>
  </div>

  <Footer />
</template>

<script setup>
import Navbar from "@/components/home/Navbar.vue";
import Footer from "@/components/home/Footer.vue";
import Tag from "primevue/tag";
import Rating from "primevue/rating";
import { ref } from "vue";
import Button from "primevue/button";
import Galleria from "primevue/galleria";
import Image from "primevue/image";
import Card from "primevue/card";
import SimillarActivity from "@/components/home/SimillarActivity.vue";
import Reviews from "@/components/home/CustomerRating.vue";

const stars = ref(5);
const activeIndex = ref(0);
const displayCustom = ref(false);

const images = ref([
  { id: 1, href: require("@/assets/images/test1.jpg") },
  { id: 2, href: require("@/assets/images/test2.jpg") },
  { id: 3, href: require("@/assets/images/test3.jpg") },
  { id: 4, href: require("@/assets/images/test4.jpg") },
  { id: 5, href: require("@/assets/images/test5.jpg") },
  { id: 6, href: require("@/assets/images/test6.jpg") },
]);

const eventProbs = ref([
  {
    id: 1,
    title: "Free cancellation",
    subtitle: "Cancel up to 24 hours in advance for a full refund",
    icon: "fas fa-calendar-check",
  },
  {
    id: 2,
    title: "Reserve now & pay later",
    subtitle:
      "Keep your travel plans flexible — book your spot and pay nothing today.",
    icon: "fas fa-credit-card",
  },

  {
    id: 3,
    title: "Duration 45 minutes",
    subtitle: "Check availability to see starting times.",
    icon: "fas fa-clock",
  },

  {
    id: 4,
    title: "Live tour guide",
    subtitle: "English",
    icon: "fas fa-person",
  },
  {
    id: 5,
    title: "Wheelchair accessible",
    subtitle: null,
    icon: "fas fa-wheelchair",
  },
]);

const eventHighlight = ref([
  {
    id: 1,
    title: "Highlights",
    subtitle: null,
    isList: true,
    list: [
      {
        id: 1,
        title:
          "Learn how cacao beans are transformed into a chocolate bar at Chocolate Kingdom",
        icon: "fas fa-circle-notch",
      },
      {
        id: 2,
        title:
          "Sample chocolate treats on an interactive adventure tour for all ages",
        icon: "fas fa-circle-notch",
      },
      {
        id: 3,
        title:
          "Enjoy a guided tour combined with a multi-media interactive component",
        icon: "fas fa-circle-notch",
      },
      {
        id: 4,
        title:
          "Customize your own chocolate bar with 17 ingredient options to finish your your",
        icon: "fas fa-circle-notch",
      },
    ],
  },
  {
    id: 2,
    title: "Full description",
    subtitle: `Select a departure time and immerse yourself in the indulgent World of Chocolate on a 45-minute Tour of Chocolate Kingdom, located in Orlando, Florida, a combination of a micro-batch chocolate factory, museum with a river of chocolate, and a retail store with freshly-made chocolates.
    
     Your tour guide will join forces with a handsome prince and his dragon sidekick to accompany you through the tour. At the end, you will have an opportunity to create a customized chocolate bar.
     Also, enjoy Chocolate Kingdom wine and chocolate pairings during your experience.`,
    isList: false,
    list: null,
  },
  {
    id: 3,
    title: "Includes",
    subtitle: null,
    isList: true,
    list: [
      {
        id: 1,
        title: "Chocolate Factory tour",
        icon: "fas fa-circle-check",
      },
      {
        id: 2,
        title: "Chocolate samples throughout the tour",
        icon: "fas fa-circle-check",
      },
      {
        id: 3,
        title: "Customized chocolate bar (available for purchase on-site)",
        icon: "fas fa-circle-xmark",
      },
      {
        id: 4,
        title: "Wine and chocolate pairings (available for purchase on-site)",
        icon: "fas fa-circle-xmark",
      },
    ],
  },
  {
    id: 4,
    title: "Meeting point",
    subtitle:
      "Please present your voucher at the ticket counter 15 minutes before the tour begins. Tours take place at our Factory located at 9901 Hawaiian Ct, Orlando, FL 32819. Tours take place every hour from 12 PM-4 PM daily.",
    isList: false,
    list: null,
  },
]);

const ShowImage = (index) => {
  activeIndex.value = index;
  displayCustom.value = true;
};
</script>
