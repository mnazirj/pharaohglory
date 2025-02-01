<template>
  <div class="container" v-if="!isLoading">
    <div>
      <div>
        <Tag :value="eventDetails.category" />
        <h1 class="fw-bold">
          {{ eventDetails.title }}
        </h1>
      </div>
      <div class="d-lg-flex d-md-flex justify-content-between py-2">
        <div class="d-flex gap-2 align-items-center">
          <Rating v-model="eventDetails.eventRate" readonly class="d-inline" />
          <h6 class="mt-1 fw-bold">
            {{ eventDetails.eventRate }} / 5
            <a href="#reviews" class="ms-1 fw-normal"
              >{{ eventDetails.totalEventRate }} {{ $t("trips.review") }}</a
            >
          </h6>
        </div>
        <div class="d-flex gap-2 align-items-center">
          <Button
            :label="$t('trips.add_wish')"
            icon="fas fa-heart"
            size="small"
            @click="addToWishList(eventDetails)"
            v-if="!$store.state.item.find((i) => i.id == eventDetails.id)"
          />
          <Button
            :label="$t('trips.remove_wish')"
            icon="fas fa-heart"
            size="small"
            @click="removeFromWishList(eventDetails)"
            v-else
          />
          <Button
            :label="hasCopy ? $t('trips.copid') : $t('trips.share')"
            icon="fas fa-share"
            @click="copyLink"
            size="small"
          />
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
              <Image :src="slotProps.item.image" preview class="img-fluid" />
            </div>
          </template>
        </Galleria>
      </div>

      <div class="row">
        <template v-for="(image, index) in images.slice(0, 3)" :key="index">
          <div class="col-lg-4 col-md-6 col-12 py-2">
            <div class="d-flex h-full" v-if="index != 2">
              <img
                :src="image.image"
                @click="ShowImage(index)"
                class="img-fluid rounded shadow cursor-pointer"
              />
            </div>
            <div
              class="d-flex h-full justify-content-end align-items-end"
              v-if="index == 2"
            >
              <img
                :src="image.image"
                @click="ShowImage(index)"
                class="img-fluid rounded shadow cursor-pointer"
              />
              <Button
                v-if="images.length >= 4"
                :label="images.slice(index + 1).length"
                icon="fas fa-image"
                class="position-absolute m-2"
                rounded
                @click="ShowImage(index + 1)"
              />
              <Button
                v-if="images.length <= 4"
                :label="images.slice(index).length"
                icon="fas fa-image"
                class="position-absolute m-2"
                rounded
                @click="ShowImage(index)"
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
            <Tag
              value="You are already booked in"
              v-if="eventDetails.isBooked"
            />

            <div
              class="d-flex justify-content-between align-items-center gap-5"
            >
              <div class="mt-2">
                <h6 class="mb-1">{{ $t("trips.check.from") }}</h6>
                <h5
                  class="fw-bold mb-1"
                  v-if="eventDetails.adultDiscountPrice == null"
                >
                  ${{ eventDetails.adultPrice }}
                </h5>
                <h5 class="fw-bold mb-1" v-else>
                  <sup class="text-decoration-line-through color"
                    >${{ eventDetails.adultPrice }}</sup
                  >
                  ${{ eventDetails.adultDiscountPrice }}
                </h5>
                <h6>{{ $t("trips.check.person") }}</h6>
              </div>
              <div>
                <Button
                  :label="$t('trips.check.title')"
                  rounded
                  @click="openCheck()"
                  v-if="!eventDetails.isBooked"
                />
                <Button
                  :label="$t('nav.clientarea')"
                  rounded
                  as="router-link"
                  to="/clientarea"
                  class="text-decoration-none"
                  v-if="eventDetails.isBooked"
                />
              </div>
            </div>
            <div class="d-flex gap-3 align-items-center">
              <i class="fas fa-credit-card font-icon color-always" />
              <h6 class="mt-2">
                {{ $t("trips.tip") }}
              </h6>
            </div>
          </template>
        </Card>
      </div>
      <!-- Card Price END -->

      <!-- TITLE and ABOUT -->
      <div class="col-lg-8 col-md-12 col-12">
        <h6>
          {{ eventDetails.description }}
        </h6>
        <div class="py-2">
          <h3 class="fw-bold" v-if="eventProbs != null">
            {{ $t("trips.about") }}
          </h3>
          <div
            class="pt-2"
            :class="[
              { 'float-end': $i18n.locale == 'ar' },
              { 'float-start': $i18n.locale == 'en' },
            ]"
            v-if="eventProbs != null"
          >
            <div class="row" v-for="(prob, index) in eventProbs" :key="index">
              <div class="col-1">
                <h6 class="text-center">
                  <i :class="prob.icon + ' color'" />
                </h6>
              </div>
              <div class="col">
                <h6>{{ prob.title }}</h6>
                <h6 class="text-muted" v-if="prob.subTitle != null">
                  {{ prob.subTitle }}
                </h6>
              </div>
            </div>
          </div>
        </div>
        <div class="float-start">
          <h4 class="fw-bold">{{ $t("trips.experience") }}</h4>
          <div class="col-12">
            <div class="row" v-if="eventDetails.eventHighlight">
              <div class="col-lg-3 col-md-3 col-12">
                <h6>{{ $t("trips.highlight") }}</h6>
              </div>
              <div class="col">
                <ul class="fa-ul ms-0">
                  <li v-for="list in eventDetails.eventHighlight" :key="list">
                    <i class="me-1 fas fa-circle-notch color-always" />
                    {{ list.title }}
                  </li>
                </ul>
              </div>
              <hr />
            </div>

            <div class="row">
              <div class="col-lg-3 col-md-3 col-12">
                <h6>{{ $t("trips.desc") }}</h6>
              </div>
              <div class="col">
                <h6>{{ eventDetails.fullDescription }}</h6>
              </div>
              <hr />
            </div>

            <div class="row" v-if="eventDetails.eventIncludes != null">
              <div class="col-lg-3 col-md-3 col-12">
                <h6>{{ $t("trips.include") }}</h6>
              </div>
              <div class="col">
                <ul class="fa-ul ms-0">
                  <li v-for="list in eventDetails.eventIncludes" :key="list">
                    <i
                      class="me-1 fas"
                      :class="[
                        list.icon,
                        { 'text-danger': list.status == false },
                        { 'text-success': list.status == true },
                        { 'fas fa-circle-xmark': list.status == false },
                        { 'fas fa-circle-check': list.status == true },
                      ]"
                    />
                    {{ list.title }}
                  </li>
                </ul>
              </div>
              <hr />
            </div>

            <div class="row">
              <div class="col-lg-3 col-md-3 col-12">
                <h6>{{ $t("trips.meeting") }}</h6>
              </div>
              <div class="col">
                <h6>
                  {{ eventDetails.meetingPoint }}
                </h6>
                <h6>
                  <i class="fa fa-arrow-right color-always me-2" />
                  <a
                    :href="eventDetails.meetingPointLink"
                    class="font-semibold"
                    >{{ $t("trips.map") }}</a
                  >
                </h6>
              </div>
              <hr />
            </div>
          </div>
        </div>
      </div>
      <!-- TITLE and ABOUT END -->
    </div>
    <div>
      <SimillarActivity
        :header="$t('trips.subheader')"
        :card="eventDetails.similarEvents"
      />
    </div>
    <hr class="hr" />

    <div id="reviews">
      <Reviews
        :rate="eventDetails.eventRate"
        :total="eventDetails.totalEventRate"
        :reviews="eventDetails.eventReview"
        :isBooked="eventDetails.isBooked"
        :hasReview="eventDetails.hasReview"
      />
    </div>

    <Dialog
      v-model:visible="checkDialog"
      modal
      :header="$t('trips.check.header')"
      class="col-lg-6 col-md-8 col-12"
      :dir="$i18n.locale == 'ar' ? 'rtl' : 'ltr'"
    >
      <div class="row">
        <div class="col">
          <div class="row">
            <div class="col">
              <h5>{{ $t("trips.check.adult") }}</h5>
              <h6>(13-99)</h6>
            </div>
            <div class="col">
              <div class="d-flex justify-content-end align-items-center gap-2">
                <Button
                  icon="fas fa-minus"
                  rounded
                  variant="text"
                  size="small"
                  @click="adultCount <= 0 ? 0 : adultCount--"
                />
                <h5 class="border py-2 px-3">{{ adultCount }}</h5>
                <Button
                  icon="fas fa-plus"
                  rounded
                  variant="text"
                  size="small"
                  @click="adultCount++"
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col">
              <h5>{{ $t("trips.check.child") }}</h5>
              <h6>(4-12)</h6>
            </div>
            <div class="col">
              <div class="d-flex justify-content-end align-items-center gap-2">
                <Button
                  icon="fas fa-minus"
                  rounded
                  variant="text"
                  size="small"
                  @click="childCount <= 0 ? 0 : childCount--"
                />
                <h5 class="border py-2 px-3">{{ childCount }}</h5>
                <Button
                  icon="fas fa-plus"
                  rounded
                  variant="text"
                  size="small"
                  @click="childCount++"
                />
              </div>
            </div>
          </div>
          <div>
            <h5>{{ $t("trips.check.price") }}</h5>
            <ul>
              <li>
                {{ $t("trips.check.adult") }} 1x ${{
                  eventDetails.adultDiscountPrice != null
                    ? eventDetails.adultDiscountPrice
                    : eventDetails.adultPrice
                }}
                <span
                  :class="[
                    { 'float-start': $i18n.locale == 'ar' },
                    { 'float-end': $i18n.locale == 'en' },
                  ]"
                  >{{
                    new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "USD",
                    }).format(
                      eventDetails.adultDiscountPrice != null
                        ? eventDetails.adultDiscountPrice
                        : eventDetails.adultPrice * adultCount
                    )
                  }}</span
                >
              </li>
              <li>
                {{ $t("trips.check.child") }} 1x ${{
                  eventDetails.childDiscountPrice != null
                    ? eventDetails.childDiscountPrice
                    : eventDetails.childPrice
                }}
                <span
                  :class="[
                    { 'float-start': $i18n.locale == 'ar' },
                    { 'float-end': $i18n.locale == 'en' },
                  ]"
                  >{{
                    new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      maximumSignificantDigits: 2,
                    }).format(eventDetails.childPrice * childCount)
                  }}</span
                >
              </li>
            </ul>
            <h5
              class="color-always"
              :class="[
                { 'float-start': $i18n.locale == 'ar' },
                { 'float-end': $i18n.locale == 'en' },
              ]"
            >
              {{ $t("trips.check.total") }}:
              {{
                new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "USD",
                }).format(
                  eventDetails.adultPrice * adultCount +
                    eventDetails.childPrice * childCount
                )
              }}
            </h5>
            <div>
              <Button
                :label="$t('trips.check.button')"
                @click="checkDate"
                outlined
                :loading="isChecking"
              />
            </div>
          </div>
        </div>
        <div class="col">
          <h4>{{ $t("trips.check.date") }}</h4>
          <div class="card flex justify-center">
            <DatePicker
              v-model="tripDate"
              :disabled="isChecking"
              showIcon
              inline
              :minDate="minmumDate"
              :maxDate="new Date(eventDetails.endDate)"
            />
          </div>
        </div>
      </div>
      <div>
        <div v-if="code == 200 && !isChecking">
          <p>{{ $t("messages.trip.available") }}</p>

          <Button label="Checkout" :loading="isChecking" @click="checkOut" />
        </div>
        <p v-if="code == -1">
          {{ $t("messages.trip.full") }} ({{ remaningSeat }})
        </p>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import Tag from "primevue/tag";
import Rating from "primevue/rating";
import { onMounted, ref, watch } from "vue";

import Button from "primevue/button";
import Galleria from "primevue/galleria";
import Image from "primevue/image";
import Card from "primevue/card";
import SimillarActivity from "@/components/home/SimillarActivity.vue";
import Reviews from "@/components/home/CustomerRating.vue";
import Dialog from "primevue/dialog";
import DatePicker from "primevue/datepicker";
import axios from "axios";
import router from "@/router";

import { useStore } from "vuex";
const store = useStore();
const activeIndex = ref(0); //current active image
const displayCustom = ref(false); //Store Gallira state
var eventDetails = []; //Store Details of trip
const isLoading = ref(false); //Loader state
const isChecking = ref(false); //Checking trip state
const images = ref([]); //Store trip images
const checkDialog = ref(false); //Store check trip dialog state
const eventProbs = ref([]); //Store trip probs
const adultCount = ref(1); //Store selected adult count
const childCount = ref(0); //Store selected child count
const tripDate = ref(); //Store selected trip date
const minmumDate = ref(new Date()); //Store minmum trip date
const code = ref(0); //Store trip reservation state
const remaningSeat = ref(null); //Store trip remaning space
const hasCopy = ref(false);
//Change Image by index
const ShowImage = (index) => {
  activeIndex.value = index; //Set new index to current index
  displayCustom.value = true; //Change state of Gallira to popup
};

async function fetchDetails() {
  isLoading.value = true;
  var url =
    "base/view/event/detail/" +
    router.currentRoute.value.params.uid +
    "?lang=" +
    localStorage.getItem("locale");
  if (localStorage.getItem("_token") != null) {
    url += "&access_token=" + localStorage.getItem("_token");
  }
  await axios
    .get(url)
    .then((response) => {
      console.log(response);
      eventDetails = response.data[0];
      images.value = response.data[0].eventImages;
      eventProbs.value = response.data[0].eventProbs;
      isLoading.value = false;
    })
    .catch((e) => {
      console.log(e);
    });
}

//Watch counter change and call check date function
watch([() => adultCount.value, () => childCount.value], () => {
  if (tripDate.value != null) checkDate();
});

async function checkDate() {
  isChecking.value = true; //Set loader on
  var newDate = tripDate.value.toLocaleDateString("en-UK"); //Format Date
  //Call api and post information to check
  await axios
    .post("base/check/event/availability", {
      eventSlug: eventDetails.slug,
      date: newDate,
      seats: adultCount.value + childCount.value,
    })
    .then((response) => {
      if (response.status == 200) {
        //if server responded with code 200 wait 1 second delay
        setTimeout(() => {
          //if customer can checkout store code 200 or -1 if trip is full
          code.value = response.data.isAvailable ? 200 : -1;
          remaningSeat.value = response.data.remainingQuantity; //store remaning seat to be displayed when limit exceeded
          isChecking.value = false; //set the loder off
        }, 1000);
      }
    });
}
//Open Check Dialog after setting date
function openCheck() {
  //Calculate diffrent in (days) between the today and start date
  var date = Math.abs(new Date() - new Date(eventDetails.startDate)) / 86400000;
  var current = new Date(eventDetails.startDate); //Store trip start date
  var newMin = new Date(); //Init new minmum date
  if (current > newMin) {
    //Check if trip date grater than today
    minmumDate.value = current; //set minmum date to be the first date of trip start date
  } else {
    //if not
    newMin.setDate(current.getDate() + date); //add days to start date
    minmumDate.value = newMin; //set today as minmum start date
  }
  tripDate.value = new Date(minmumDate.value); //automatic set today as selected date
  checkDialog.value = true; //open check dialog
}

async function checkOut() {
  isChecking.value = true;

  var newDate = tripDate.value.toLocaleDateString("en-UK"); //Format Date
  var temp = {
    eventId: eventDetails.id,
    reservationDate: newDate,
    numberOfAdult: adultCount.value,
    numberOfChild: childCount.value,
  };
  await axios
    .post(
      "base/checkout",

      {
        eventSlug: eventDetails.slug,
        reservationDate: newDate,
        numberOfAdult: adultCount.value,
        numberOfChild: childCount.value,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("_token"),
        },
      }
    )
    .then((response) => {
      if (response.status == 201) {
        localStorage.setItem("info", JSON.stringify(temp));
        window.location.href = response.data.approval_url;
        isChecking.value = false;
      }
    })
    .catch((e) => {
      console.log(e);
      isChecking.value = false;
    });
}

function copyLink() {
  hasCopy.value = true;
  var dummy = document.createElement("input"),
    text = window.location.href;

  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
  setTimeout(() => {
    hasCopy.value = false;
  }, 1000);
}

function addToWishList(payload) {
  store.commit("addToWishList", payload);
}
function removeFromWishList(payload) {
  store.commit("removeFromWishList", payload);
}

onMounted(() => {
  fetchDetails(); //Get Details of trip when page mounted
});
</script>
