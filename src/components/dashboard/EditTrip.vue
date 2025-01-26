<template>
  <h1>edit trip {{ $route.params.tripId }}</h1>
  <div class="d-flex justify-content-center align-content-center w-100">
    <div
      class="d-flex justify-content-center align-content-center flex-wrap w-90"
    >
      <div class="w-100">
        <h2 class="text-center">Edit Trip #{{ trip.id }}</h2>
      </div>
      <!-- Availability -->
      <div
        id="availability-container"
        class="d-flex align-item-center w-100 mt-2 mb-3"
      >
        <span class="fs-5 me-3">Availability : </span>
        <div class="pt-1"><ToggleSwitch v-model="trip.status" /></div>
      </div>
      <!-- title -->
      <div
        id="title-container"
        class="d-flex justify-content-between align-content-center w-100 mt-2 mb-3"
      >
        <div class="w-40">
          <div class="w-100">
            <i class="fa-solid fa-heading me-2 text-main-color"></i>
            <span class="fs-5">Title in English</span>
          </div>
          <input
            type="text"
            id="titleEn"
            class="form-control"
            :value="trip.titleEn"
          />
        </div>
        <div class="w-40">
          <div class="w-100">
            <i class="fa-solid fa-heading me-2 text-main-color"></i>
            <span class="fs-5">Title in Arabic</span>
          </div>
          <input
            type="text"
            id="titleAr"
            class="form-control"
            :value="trip.titleAr"
          />
        </div>
      </div>
      <!-- description -->
      <div
        id="description-container"
        class="d-flex justify-content-between align-content-center w-100 mt-2 mb-3"
      >
        <div class="w-40">
          <i class="fa-solid fa-paragraph me-2 text-main-color"></i>
          <span class="w-100 fs-5">Description in English</span>
          <textarea
            class="form-control w-100"
            :value="trip.descriptionEn"
            id="descriptionEn"
          ></textarea>
        </div>
        <div class="w-40">
          <i class="fa-solid fa-paragraph me-2 text-main-color"></i>
          <span class="w-100 fs-5">Description in Arabic</span>
          <textarea
            class="form-control w-100"
            :value="trip.descriptionAr"
            id="descriptionAr"
          ></textarea>
        </div>
      </div>
      <!-- Full Desciption -->
      <div
        id="fullDescription-container"
        class="d-flex justify-content-between align-content-center w-100 mt-2 mb-3"
      >
        <div class="w-40">
          <i class="fa-solid fa-paragraph me-2 text-main-color"></i>
          <span class="w-100 fs-5">Full Description in English</span>
          <textarea
            class="form-control w-100"
            :value="trip.fullDescriptionEn"
            id="descriptionEn"
          ></textarea>
        </div>
        <div class="w-40">
          <i class="fa-solid fa-paragraph me-2 text-main-color"></i>
          <span class="w-100 fs-5">Full Description in Arabic</span>
          <textarea
            class="form-control w-100"
            :value="trip.fullDescriptionAr"
            id="descriptionAr"
          ></textarea>
        </div>
      </div>
      <!-- HeighLights -->
      <div
        id="heighlights-container"
        class="d-flex justify-content-between align-content-center w-100 mt-2 mb-3"
      >
        <div class="w-40">
          <div class="w-100">
            <i class="fa-solid fa-highlighter me-2 text-main-color"></i>
            <span class="fs-5">Heighlights in English</span>
          </div>
          <table class="table">
            <tbody>
              <tr
                v-for="(heighlightEn, i) in trip.heighlightsEn"
                :key="i"
                class="align-middle"
              >
                <td>
                  <textarea
                    class="form-control border-0"
                    v-model="trip.heighlightsEn[i]"
                    @input="autoResize($event)"
                  ></textarea>
                </td>

                <td class="text-end">
                  <button
                    type=" button"
                    class="btn btn-outline-danger border-0"
                    @click="removeHighlightEn(i)"
                  >
                    <i class="pi pi-trash pt-1"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="d-flex justify-content-center align-items-center w-100">
            <button
              type="button "
              class="btn btn-outline-main rounded-2 border-0 d-flex justify-content-center align-items-center"
              @click="addHighlightEn"
            >
              <i class="pi pi-plus me-1"></i>
              <span>Add</span>
            </button>
          </div>
        </div>
        <div class="w-40">
          <div class="w-100">
            <i class="fa-solid fa-highlighter me-2 text-main-color"></i>
            <span class="fs-5">Heighlights in Arabic</span>
          </div>
          <table class="table">
            <tbody>
              <tr
                v-for="(heighlightAr, i) in trip.heighlightsAr"
                :key="i"
                class="align-middle"
              >
                <td>
                  <textarea
                    class="form-control border-0"
                    v-model="trip.heighlightsAr[i]"
                    @input="autoResize($event)"
                  ></textarea>
                </td>

                <td>
                  <button
                    type=" button"
                    class="btn btn-outline-danger border-0"
                    @click="removeHighlightAr(i)"
                  >
                    <i class="pi pi-trash pt-1"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="d-flex justify-content-center align-items-center w-100">
            <button
              type="button "
              class="btn btn-outline-main rounded-2 border-0 d-flex justify-content-center align-items-center"
              @click="addHighlightAr"
            >
              <i class="pi pi-plus me-1"></i>
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
      <!-- Includs -->
      <div
        id="include-container"
        class="d-flex align-content-center w-100 mt-2 mb-3"
      >
        <div class="w-90">
          <div class="w-100">
            <i class="fa-regular fa-square-plus me-2 text-main-color"></i>
            <span class="fs-5">Includes</span>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th>Include in English</th>
                <th>Include in Arabic</th>
                <th>Availability</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(include, i) in trip.includes"
                :key="i"
                class="align-middle"
              >
                <td>
                  <textarea
                    class="form-control border-0"
                    v-model="trip.includes[i].includeEn"
                    @input="autoResize($event)"
                  ></textarea>
                </td>
                <td>
                  <textarea
                    class="form-control border-0"
                    v-model="trip.includes[i].includeAr"
                    @input="autoResize($event)"
                  ></textarea>
                </td>
                <td><ToggleSwitch v-model="trip.includes[i].status" /></td>
                <td class="text-end">
                  <button
                    type=" button"
                    class="btn btn-outline-danger border-0"
                    @click="removeInclude(i)"
                  >
                    <i class="pi pi-trash pt-1"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="d-flex justify-content-center align-items-center w-100">
            <button
              type="button "
              class="btn btn-outline-main rounded-2 border-0 d-flex justify-content-center align-items-center"
              @click="addInclude"
            >
              <i class="pi pi-plus me-1"></i>
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
      <!-- About Activity-->
      <div
        id="about-container"
        class="d-flex align-content-center w-100 mt-2 mb-3"
      >
        <div class="w-90">
          <div class="w-100">
            <i class="fa-solid fa-circle-info me-2 text-main-color"></i>
            <span class="fs-5">About Activity</span>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th>Title in English</th>
                <th>Description in English</th>
                <th>Title in Arabic</th>
                <th>Description in Arabic</th>
                <th>icon</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(about, i) in trip.aboutActivity"
                :key="i"
                class="align-middle"
              >
                <td>
                  <textarea
                    class="form-control border-0"
                    v-model="trip.aboutActivity[i].aboutTitleEn"
                    @input="autoResize($event)"
                  ></textarea>
                </td>
                <td>
                  <textarea
                    class="form-control border-0"
                    v-model="trip.aboutActivity[i].aboutDescriptionEn"
                    @input="autoResize($event)"
                  ></textarea>
                </td>
                <td>
                  <textarea
                    class="form-control border-0"
                    v-model="trip.aboutActivity[i].aboutTitleAr"
                    @input="autoResize($event)"
                  ></textarea>
                </td>
                <td>
                  <textarea
                    class="form-control border-0"
                    v-model="trip.aboutActivity[i].aboutDescriptionAr"
                    @input="autoResize($event)"
                  ></textarea>
                </td>
                <td>
                  <IconPicker
                    v-model="trip.aboutActivity[i].icon"
                    class="text-main-color"
                  />
                </td>
                <td class="text-end">
                  <button
                    type=" button"
                    class="btn btn-outline-danger border-0"
                    @click="removeaboutActivity(i)"
                  >
                    <i class="pi pi-trash pt-1"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="d-flex justify-content-center align-items-center w-100">
            <button
              type="button "
              class="btn btn-outline-main rounded-2 border-0 d-flex justify-content-center align-items-center"
              @click="addAboutActivity"
            >
              <i class="pi pi-plus me-1"></i>
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
      <!-- Duration & start date & end date -->
      <div
        id="time-container"
        class="d-flex justify-content-between align-content-center w-100 mt-2 mb-3"
      >
        <div class="w-30">
          <div class="w-100">
            <i class="fa-regular fa-calendar-plus me-2 text-main-color"></i>
            <span class="fs-5">Start Date</span>
          </div>
          <input
            type="date"
            class="form-control"
            :v-model="trip.startDate"
            :value="trip.startDate"
          />
        </div>
        <div class="w-30">
          <div class="w-100">
            <i class="fa-regular fa-calendar-xmark me-2 text-main-color"></i>
            <span class="fs-5">End Date</span>
          </div>
          <input
            type="date"
            class="form-control"
            :v-model="trip.endDate"
            :value="trip.endDate"
          />
        </div>
        <div class="w-30">
          <div class="w-100">
            <i class="fa-regular fa-clock me-2 text-main-color"></i>
            <span class="fs-5">Duration</span>
          </div>
          <input type="text" class="form-control" v-model="trip.duration" />
        </div>
      </div>
      <!-- price adult & price child & discount -->
      <div
        id="pay-container"
        class="d-flex justify-content-between align-content-center w-100 mt-2 mb-3"
      >
        <div class="w-20">
          <div class="w-100">
            <i class="fa-solid fa-person-half-dress me-2 text-main-color"></i>
            <span class="fs-5">Adult Price</span>
          </div>

          <input type="text" class="form-control" v-model="trip.priceAdult" />
        </div>
        <div class="w-20">
          <div class="w-100">
            <i class="fa-solid fa-child-reaching me-2 text-main-color"></i>
            <span class="fs-5">Child Price</span>
          </div>
          <input type="text" class="form-control" v-model="trip.priceChild" />
        </div>
        <div class="w-20">
          <div class="w-100">
            <i class="fa-solid fa-percent me-2 text-main-color"></i>
            <span class="fs-5">Adults Discount</span>
          </div>

          <input
            type="text"
            class="form-control"
            v-model="trip.adultsDiscount"
          />
        </div>
        <div class="w-20">
          <div class="w-100">
            <i class="fa-solid fa-percent me-2 text-main-color"></i>
            <span class="fs-5">Children Discount</span>
          </div>

          <input
            type="text"
            class="form-control"
            v-model="trip.ChildrenDiscount"
          />
        </div>
      </div>
      <!-- images -->
      <div
        id="images-container"
        class="d-flex align-content-center flex-wrap w-100 mt-2 mb-3"
      >
        <div class="w-100 mb-3">
          <i class="fa-regular fa-image me-2 text-main-color"></i>
          <span class="fs-5">Images</span>
        </div>
        <div class="w-100 d-flex justify-content-center flex-wrap">
          <div
            v-for="(image, i) in trip.images"
            :key="i"
            class="image-container mx-3 my-2 relative"
            @mouseenter="isImageHovered = true"
            @mouseleave="isImageHovered = false"
          >
            <img :src="image" :alt="'image' + i" class="trip-img" />
            <div
              v-show="isImageHovered"
              class="overlay-img d-flex justify-content-center align-items-center"
            >
              <i
                class="pi pi-eye mx-1 text-second-color fs-3 cursor-pointer"
                data-bs-toggle="modal"
                data-bs-target="#viewImage-modal"
                @click="viewImage(image)"
              ></i>
              <i
                class="pi pi-trash mx-1 text-danger fs-3 cursor-pointer"
                @click="deleteImage(i)"
              ></i>
            </div>
          </div>
          <!-- view image modal -->
          <div class="modal fade" id="viewImage-modal" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered modal-lg">
              <div class="modal-content bg-transparent border-0">
                <div
                  class="modal-header p-0 bg-transparent border-0 justify-content-end"
                >
                  <button
                    type="button"
                    class="btn"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    @click="closeImageModal"
                  >
                    <i class="fa-solid fa-x mt-1 text-white"></i>
                  </button>
                </div>
                <div class="modal-body text-center p-0 bg-transparent">
                  <img
                    :src="currentImage"
                    alt="Full Image"
                    class="full-image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="d-flex justify-content-center align-items-center w-100 mt-4"
        >
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            class="d-none"
            @change="addImage"
          />
          <button
            type="button "
            class="btn btn-outline-main rounded-2 border-0 d-flex justify-content-center align-items-center"
            @click="triggerFileInput"
          >
            <i class="pi pi-plus me-1"></i>
            <span>Add</span>
          </button>
        </div>
      </div>
      <!-- Map -->
      <div
        id="map-container"
        class="d-flex justify-content-between align-content-center flex-wrap w-100 mt-2 mb-3"
      >
        <div class="w-100 mb-3">
          <i class="fa-solid fa-location-dot me-2 text-main-color"></i>
          <span class="fs-5">Meeting Point</span>
        </div>

        <div id="map" class="my-2"></div>
        <div
          class="w-100 d-flex justify-content-center align-items-center flex-wrap my-2"
        >
          <span class="w-100 fs-5 my-1">Meeting Point Description</span>
          <textarea
            class="form-control w-100"
            v-model="trip.meetingPoint.description"
            @input="autoResize($event)"
          ></textarea>
        </div>
      </div>
      <!-- submit button -->
      <div class="w-50 d-flex justify-content-center align-items-center my-3">
        <button type="button" class="btn btn-main" @click="updateTrip">
          Update
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ToggleSwitch from "primevue/toggleswitch";
import IconPicker from "./Vue3IconPicker.vue";

export default {
  components: {
    ToggleSwitch,
    IconPicker,
  },
  data() {
    return {
      isImageHovered: false,
      currentImage: "",
      trip: {
        id: 1,
        status: true,
        titleAr: "رحلة الى طرطوس",
        titleEn: "Tartous trip",
        descriptionAr:
          "رحلة إلى طرطوس مع فطار وغداء وزيارة ارواد ووجبة غداء وفي النهاية حفلة على الشاطئ",
        descriptionEn:
          "A trip to Tartous with breakfast, lunch, a visit to Arwad, lunch and finally a party on the beach.",
        duration: "2 Hour",
        startDate: "2025-01-20",
        endDate: "2025-03-01",
        adultsDiscount: "10%",
        ChildrenDiscount: "1%",
        priceAdult: "$200",
        priceChild: "$100",
        heighlightsEn: [
          "The journey takes 5 hours in a first class bus.",
          "Breakfast at the restaurant 'Zatar w Shie'",
          "Vist Arwad island",
          "Lunch at a restaurant is called 'Altona-alaneda fish'",
          "Free time for 4 hours",
          "Beach party",
        ],
        heighlightsAr: [
          "الذهاب بولمان درجة أولى 5 ساعات مدة الطريق",
          "الفطار في مطعم زعتر وشاي",
          " زيارة جزيرة أرواد",
          "الغداء في أحد المطاعم يدعى سمكة التونة العنيدة",
          "وقت فراغ لـ 4 ساعات",
          "حفلة على الشاطئ",
        ],
        fullDescriptionAr:
          "رحلة إلى طرطوس مع فطار وغداء وزيارة ارواد ووجبة غداء وفي النهاية حفلة على الشاطئ و رحلة إلى طرطوس مع فطار وغداء وزيارة ارواد ووجبة غداء وفي النهاية حفلة على الشاطؤ رحلة إلى طرطوس مع فطار وغداء وزيارة ارواد ووجبة غداء وفي النهاية حفلة على الشاط رحلة إلى طرطوس مع فطار وغداء وزيارة ارواد ووجبة غداء وفي النهاية حفلة على الشاط",
        fullDescriptionEn:
          "A trip to Tartous with breakfast, lunch, a visit to Arwad, lunch and finally a party on the beach. A trip to Tartous with breakfast, lunch, a visit to Arwad, lunch and finally a party on the beach. A trip to Tartous with breakfast, lunch, a visit to Arwad, lunch and finally a party on the beach. ",
        includes: [
          {
            includeEn: "Visit Arwad Castle",
            includeAr: "زيارة قلعة أرواد ",
            status: false,
          },
          {
            includeEn: "Breakfast",
            includeAr: "إفطار",
            status: true,
          },
          {
            includeEn: "Lunch",
            includeAr: "غداء",
            status: true,
          },
        ],
        aboutActivity: [
          {
            aboutTitleAr: "إلغاء مجاني",
            aboutTitleEn: "Free cancellation",
            aboutDescriptionAr:
              "يمكنك الإلغاء قبل 24 ساعة مقدمًا لاسترداد المبلغ بالكامل",
            aboutDescriptionEn:
              "Cancel up to 24 hours in advance for a full refund",
            icon: "fas fa-calendar-check",
          },
          {
            aboutTitleAr: "احجز الآن وادفع لاحقًا",
            aboutTitleEn: "Reserve now & pay later",
            aboutDescriptionAr:
              "حافظ على مرونة خطط سفرك - احجز مكانك ولا تدفع أي شيء اليوم.",
            aboutDescriptionEn:
              "Keep your travel plans flexible — book your spot and pay nothing today.",
            icon: "fas fa-credit-card",
          },
          {
            aboutTitleAr: "دليل سياحي مباشر",
            aboutTitleEn: "Live tour guide",
            aboutDescriptionAr: "إنجليزي",
            aboutDescriptionEn: "English",
            icon: "fas fa-person",
          },
        ],
        images: [
          require("@/assets/images/hero1.jpeg"),
          require("@/assets/images/hero2.jpeg"),
          require("@/assets/images/hero3.jpeg"),
          require("@/assets/images/hero4.jpeg"),
          require("@/assets/images/hero1.jpeg"),
          require("@/assets/images/hero2.jpeg"),
          require("@/assets/images/hero3.jpeg"),
          require("@/assets/images/hero4.jpeg"),
        ],
        meetingPoint: {
          point: {
            lat: 29.29098853597453,
            lng: 30.833824730056282,
          },
          description: "Meet us In Bauome Coffe ,after 1 Hour we will move",
        },
      },
      map: null,
      marker: null,
    };
  },

  methods: {
    removeHighlightEn(index) {
      this.trip.heighlightsEn.splice(index, 1);
    },
    removeHighlightAr(index) {
      this.trip.heighlightsAr.splice(index, 1);
    },
    removeInclude(index) {
      this.trip.includes.splice(index, 1);
    },
    removeaboutActivity(index) {
      this.trip.aboutActivity.splice(index, 1);
    },
    addInclude() {
      this.trip.includes.push({ includeAr: "", includeEn: "", status: false });
    },
    addHighlightEn() {
      this.trip.heighlightsEn.push("");
    },
    addHighlightAr() {
      this.trip.heighlightsAr.push("");
    },
    addAboutActivity() {
      this.trip.aboutActivity.push({
        aboutTitleAr: "",
        aboutTitleEn: "",
        aboutDescriptionAr: "",
        aboutDescriptionEn: "",
        icon: "fa-solid fa-circle",
      });
    },
    autoResize(event) {
      const textarea = event.target;
      textarea.style.height = "auto"; // Reset height to auto
      textarea.style.height = textarea.scrollHeight + "px"; // Set height to content height
    },
    deleteImage(index) {
      this.trip.images.splice(index, 1);
    },
    viewImage(image) {
      this.currentImage = image;
    },
    triggerFileInput() {
      this.$refs.fileInput.click(); // Trigger the hidden file input
    },
    addImage(event) {
      const file = event.target.files?.[0]; // Safely access the first file
      if (!file) {
        console.error("No file selected");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        this.trip.images.push(e.target.result); // Add the image to the gallery
      };
      reader.readAsDataURL(file); // Read the file as a Data URL
    },
    updateTrip() {
      console.log(this.trip);
    },
    initMap() {
      // Initialize the map
      this.map = new google.maps.Map(document.getElementById("map"), {
        center: this.trip.meetingPoint.point,
        zoom: 10,
      });

      // Add a marker to the map
      const svgIcon = {
        path: "M288 0C422.4 0 512 35.2 512 80l0 16 0 32c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l0 160c0 17.7-14.3 32-32 32l0 32c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-32-192 0 0 32c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-32c-17.7 0-32-14.3-32-32l0-160c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32c0 0 0 0 0 0l0-32s0 0 0 0l0-16C64 35.2 153.6 0 288 0zM128 160l0 96c0 17.7 14.3 32 32 32l112 0 0-160-112 0c-17.7 0-32 14.3-32 32zM304 288l112 0c17.7 0 32-14.3 32-32l0-96c0-17.7-14.3-32-32-32l-112 0 0 160zM144 400a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm288 0a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM384 80c0-8.8-7.2-16-16-16L208 64c-8.8 0-16 7.2-16 16s7.2 16 16 16l160 0c8.8 0 16-7.2 16-16z",
        fillColor: "#014f51", // Fill color of the icon
        fillOpacity: 1, // Opacity
        strokeWeight: 0, // No border
        scale: 0.05, // Scale the size
      };

      this.marker = new google.maps.Marker({
        position: this.trip.meetingPoint.point,
        map: this.map,
        icon: svgIcon,
        animation: google.maps.Animation.BOUNCE,
        title: "Meeting Point",
        draggable: false, // Allow the marker to be dragged
      });

      // Add click event to the map
      this.map.addListener("click", (event) => {
        this.updatePoint(event.latLng.lat(), event.latLng.lng());
      });
    },
    updatePoint(lat, lng) {
      // Update the point and move the marker
      this.trip.meetingPoint.point.lat = lat;
      this.trip.meetingPoint.point.lng = lng;
      this.marker.setPosition({ lat, lng });
    },
  },
  mounted() {
    // Define the global initMap function
    window.initMap = () => {
      this.initMap();
    };

    // Dynamically load the Google Maps API script
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCDfsSktFiU5jHwgde6UTYYHspsCCmzkqo&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  },
};
</script>

<style scoped>
#descriptionAr,
#descriptionEn {
  height: 7rem;
}
/* #heighlights-container div table tbody tr td textarea,
#include-container div table tbody tr td textarea,
#about-container div table tbody tr td textarea {
  resize: none;
  overflow-y: hidden;
} */
textarea {
  resize: none;
  overflow-y: hidden;
}

/* image */
.image-container {
  width: 13%;
  height: 7.5rem;
}
.trip-img {
  width: 100%;
  height: 100%;
  border-radius: 0.8rem;
}

.overlay-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 7.5rem;
  background: rgba(0, 0, 0, 0.5);
  gap: 10px;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  border-radius: 0.8rem;
}
.image-container:hover .overlay-img {
  opacity: 1;
  pointer-events: auto;
}
.image-container:hover .trip-img {
  filter: blur(3px);
}
.overlay-img div {
  border-radius: 0;
  height: fit-content;
  background: rgba(48, 48, 48, 0.5);
  color: white;
}
.full-image {
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  /* box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5); */
}
/* #images-container .modal .modal-dialog .modal-content .modal-header .btn-close {
  --bs-btn-close-color: #fff;
} */
/* #images-container .modal .modal-dialog .modal-content{
  background-color: transparent;
}
#images-container .modal .modal-dialog .modal-content .modal-header {
  background-color: transparent;
}
#images-container .modal .modal-dialog .modal-content .modal-body {
  background-color: transparent;
} */

/* map */
#map {
  width: 100%;
  height: 25rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}
</style>
