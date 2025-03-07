<template>
  <div class="">
    <div class="d-flex align-content-center mt-1 mb-3 w-100">
      <div class="d-flex justify-content-between align-content-center w-90">
        <div class="w-30 d-flex">
          <span class="font-bold fs-4 cursor-pointer" @click="$router.back()"
            >{{ $t('dash.trips.reviews.reviews_for_trip') }} {{ $route.params.tripId }}</span
          >
        </div>
        <div class="d-flex align-content-center w-60 input-group">
          <IconField class="w-50">
            <InputIcon class="pi pi-search text-main-color" />
            <InputText
              v-model="searchValue"
              :placeholder="$t('dash.trips.reviews.search')"
              class="w-100"
            />
          </IconField>
        </div>
      </div>
    </div>
    <DataTable
      :value="tripReviews"
      paginator
      :rows="5"
      :class="['w-100 px-2 main-table', isEng ? 'ltr' : 'rtl' , isDark? 'dark':'']"
    >
      <Column :header="$t('dash.trips.reviews.user')">
        <template #body="slotProps">
          <img
            :src="slotProps.data.user.img"
            alt="user-img"
            :class="['rounded-circle', isEng ? 'me-2' : 'ms-2']"
            :style="{ width: '3rem', height: '3rem' }"
          />
          <span>{{ slotProps.data.user.name }}</span>
        </template>
      </Column>
      <Column :header="$t('dash.trips.reviews.rate')">
        <template #body="slotProps">
          <Rating
            v-model="slotProps.data.rate"
            readonly
            class="d-flex justify-content-center align-items-center"
          ></Rating>
        </template>
      </Column>
      <Column :header="$t('dash.trips.reviews.description')">
        <template #body="slotProps">
          <span>{{ clipText(slotProps.data.description) }}</span>
        </template>
      </Column>
      <Column :header="$t('dash.trips.reviews.actions')">
        <template #body="slotProps">
          <Button
            icon="pi pi-eye"
            severity="secondary"
            class="mx-1"
            @click="triggerShowDialog(slotProps.data)"
          ></Button>
          <Button
            icon="pi pi-trash"
            class="mx-1"
            @click="triggerDeleteDialog(slotProps.data)"
          ></Button>
        </template>
      </Column>
    </DataTable>
    <!-- show Modal -->
    <Dialog
      v-model:visible="showShowDialog"
      modal
      :header="$t('dash.trips.reviews.curd.show_review')+' #' + currentData.id"
      :style="{ width: '35rem' }"
      :dir="isEng ? 'ltr' : 'rtl'"
    >
      <div
        class="w-100 d-flex justify-content-center align-items-center flex-wrap"
      >
        <!-- User Data -->
        <div
          class="w-90 d-flex justify-content-center align-items-center flex-wrap"
        >
          <span class="text-center w-100 mb-1 fs-5 font-bold">{{ $t('dash.trips.reviews.curd.user_information') }}</span>
          <div
            class="w-100 d-flex justify-content-center align-items-center my-1"
          >
            <Image
              :src="currentData.user.img"
              alt="User-Image"
              class="rounded-circle"
              width="120"
            />
          </div>
          <div class="w-100 py-1">
            <span class="text-muted">{{ $t('dash.trips.reviews.curd.id') }} : </span>
            <span>{{ currentData.user.id }}</span>
          </div>
          <div class="w-100 py-1">
            <span class="text-muted">{{ $t('dash.trips.reviews.curd.name') }} : </span>
            <span>{{ currentData.user.name }}</span>
          </div>
        </div>
        <Divider />
        <!-- Review Info -->
        <div
          class="w-90 d-flex justify-content-center align-items-center flex-wrap"
        >
          <span class="text-center w-100 mb-1 fs-5 font-bold">{{ $t('dash.trips.reviews.curd.review_information') }}</span>
          <div class="w-100 d-flex align-items-center py-1">
            <span class="text-muted">{{ $t('dash.trips.reviews.rate') }} : </span>
            <span class="ms-1"
              ><Rating v-model="currentData.rate" readonly
            /></span>
          </div>
          <div class="w-100 py-1">
            <span class="text-muted">{{ $t('dash.trips.reviews.description') }} : </span>
            <span>{{ currentData.description }}</span>
          </div>
        </div>
      </div>
    </Dialog>

    <!-- Delete Modal -->
    <Dialog
      v-model:visible="showDeleteDialog"
      modal
      :header="$t('dash.trips.reviews.curd.delete_reivew') +' #' + currentData.id"
      :style="{ width: '35rem' }"
      :dir="isEng ? 'ltr' : 'rtl'"
    >
      <span
        >{{ $t('dash.trips.reviews.curd.delete_qustion1') }} #{{ currentData.id }} {{ $t('dash.trips.reviews.curd.delete_qustion2') }} '{{
          currentData.user.name
        }}' {{ $t('dash.trips.reviews.curd.?') }}</span
      >
      <template #footer>
        <Button
          icon="pi pi-trash"
          :label="$t('dash.trips.reviews.curd.delete')"
          severity="danger"
          @click="deleteReview"
        ></Button>
      </template>
    </Dialog>
  </div>
</template>

<script>
import Rating from "primevue/rating";
import Paginator from "primevue/paginator";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Image from "primevue/image";
import Divider from "primevue/divider";
export default {
  components: {
    Rating,
    Paginator,
    IconField,
    InputIcon,
    InputText,
    DataTable,
    Column,
    Button,
    Dialog,
    Image,
    Divider,
  },
  data() {
    return {
      isEng: null,
      isDark:null,
      showShowDialog: false,
      showDeleteDialog: false,
      currentPage: 0,
      rowsPerPage: 5,
      searchValue: "",
      currentData: {
        id: null,
        user: {
          id: null,
          name: null,
          img: null,
        },
        rate: null,
        description: null,
      },
      tripReviews: [
        {
          id: 1,
          user: {
            id: 1,
            name: "Ahmad Alahmad",
            img: require("@/assets/images/dashboard/avatar-1.png"),
          },
          rate: 3.5,
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi sunt alias veritatis odit minima assumenda, eveniet voluptas repellendus sint. Doloribus unde ab commodi autem. Repellendus eum atque non accusantium quod?Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi sunt alias veritatis odit minima assumenda, eveniet voluptas repellendus sint. Doloribus unde ab commodi autem. Repellendus eum atque non accusantium quod?Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi sunt alias veritatis odit minima assumenda, eveniet voluptas repellendus sint. Doloribus unde ab commodi autem. Repellendus eum atque non accusantium quod?Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi sunt alias veritatis odit minima assumenda, eveniet voluptas repellendus sint. Doloribus unde ab commodi autem. Repellendus eum atque non accusantium quod?Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi sunt alias veritatis odit minima assumenda, eveniet voluptas repellendus sint. Doloribus unde ab commodi autem. Repellendus eum atque non accusantium quod?",
        },
        {
          id: 2,
          user: {
            id: 1,
            name: "Samer GG",
            img: require("@/assets/images/dashboard/avatar-1.png"),
          },
          rate: 3.5,
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi sunt alias veritatis odit minima assumenda, eveniet voluptas repellendus sint. Doloribus unde ab commodi autem. Repellendus eum atque non accusantium quod?",
        },
        {
          id: 3,
          user: {
            id: 1,
            name: "Ahmad Alahmad",
            img: require("@/assets/images/dashboard/avatar-1.png"),
          },
          rate: 4.5,
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi sunt alias veritatis odit minima assumenda, eveniet voluptas repellendus sint. Doloribus unde ab commodi autem. Repellendus eum atque non accusantium quod?",
        },
        {
          id: 4,
          user: {
            id: 1,
            name: "Sara Alsrsasa",
            img: require("@/assets/images/dashboard/avatar-1.png"),
          },
          rate: 2.5,
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi sunt alias veritatis odit minima assumenda, eveniet voluptas repellendus sint. Doloribus unde ab commodi autem. Repellendus eum atque non accusantium quod?",
        },
        {
          id: 5,
          user: {
            id: 1,
            name: "Omar AlOmary",
            img: require("@/assets/images/dashboard/avatar-1.png"),
          },
          rate: 3,
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi sunt alias veritatis odit minima assumenda, eveniet voluptas repellendus sint. Doloribus unde ab commodi autem. Repellendus eum atque non accusantium quod?",
        },
        {
          id: 6,
          user: {
            id: 1,
            name: "Ammar Alatar",
            img: require("@/assets/images/dashboard/avatar-1.png"),
          },
          rate: 2,
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi sunt alias veritatis odit minima assumenda, eveniet voluptas repellendus sint. Doloribus unde ab commodi autem. Repellendus eum atque non accusantium quod?",
        },
        {
          id: 7,
          user: {
            id: 1,
            name: "Osama AlBihk",
            img: require("@/assets/images/dashboard/avatar-1.png"),
          },
          rate: 4.5,
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi sunt alias veritatis odit minima assumenda, eveniet voluptas repellendus sint. Doloribus unde ab commodi autem. Repellendus eum atque non accusantium quod?",
        },
        {
          id: 8,
          user: {
            id: 1,
            name: "Sami Mousa",
            img: require("@/assets/images/dashboard/avatar-1.png"),
          },
          rate: 3.4,
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi sunt alias veritatis odit minima assumenda, eveniet voluptas repellendus sint. Doloribus unde ab commodi autem. Repellendus eum atque non accusantium quod?",
        },
        {
          id: 9,
          user: {
            id: 1,
            name: "Abrahim anan",
            img: require("@/assets/images/dashboard/avatar-1.png"),
          },
          rate: 2.69,
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi sunt alias veritatis odit minima assumenda, eveniet voluptas repellendus sint. Doloribus unde ab commodi autem. Repellendus eum atque non accusantium quod?",
        },
        {
          id: 10,
          user: {
            id: 1,
            name: "Adnan AlDnan",
            img: require("@/assets/images/dashboard/avatar-1.png"),
          },
          rate: 5,
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi sunt alias veritatis odit minima assumenda, eveniet voluptas repellendus sint. Doloribus unde ab commodi autem. Repellendus eum atque non accusantium quod?",
        },
        {
          id: 11,
          user: {
            id: 1,
            name: "Dina Almdina",
            img: require("@/assets/images/dashboard/avatar-1.png"),
          },
          rate: 0.5,
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi sunt alias veritatis odit minima assumenda, eveniet voluptas repellendus sint. Doloribus unde ab commodi autem. Repellendus eum atque non accusantium quod?",
        },
      ],
    };
  },
  computed: {
    // paginatedTripReviews() {
    //   const start = this.currentPage * this.rowsPerPage;
    //   const end = start + this.rowsPerPage;
    //   return this.tripReviews.slice(start, end);
    // },
  },
  methods: {
    clipText(text) {
      let newText = text;
      if (newText.split(" ").length > 5) {
        newText = newText.split(" ").slice(0, 5).join(" ") + "....";
      }
      return newText;
    },
    // currentDataSeeder(newData) {
    //   this.currentData = newData;
    // },
    // onPageChange(event) {
    //   this.currentPage = event.page;
    //   this.rowsPerPage = event.rows;
    // },
    triggerDeleteDialog(data) {
      this.currentData = data;
      this.showDeleteDialog = true;
    },
    triggerShowDialog(data) {
      this.currentData = data;
      this.showShowDialog = true;
    },
    deleteReview() {
      this.showDeleteDialog = false;
    },
  },
  beforeMount() {
    this.isEng = localStorage.getItem("locale") == "en";
    this.isDark = localStorage.getItem("mode") == "dark";
  },
};
</script>

<style scoped>
/* ::v-deep .p-rating-option,
.p-rating-option-active {
  cursor: default !important;
}
::v-deep .p-rating-option-active .p-rating-icon {
  color: #014f51 !important;
}
::v-deep .p-rating-icon {
  color: #014f51 !important;
} */
</style>
