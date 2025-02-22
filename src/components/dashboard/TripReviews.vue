<template>
  <div class="">
    <div class="d-flex align-content-center mt-1 mb-3 w-100">
      <div class="d-flex justify-content-between align-content-center w-90">
        <div class="w-30 d-flex">
          <span class="font-bold fs-4 cursor-pointer" @click="$router.back()"
            >Reviews for trip #{{ $route.params.tripId }}</span
          >
        </div>
        <div class="d-flex align-content-center w-60 input-group">
          <IconField class="w-50">
            <InputIcon class="pi pi-search text-main-color" />
            <InputText
              v-model="searchValue"
              placeholder="Search"
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
      :class="['w-100 px-2 main-table', isEng ? 'ltr' : 'rtl']"
    >
      <Column header="User">
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
      <Column header="Rate">
        <template #body="slotProps">
          <Rating
            v-model="slotProps.data.rate"
            readonly
            class="d-flex justify-content-center align-items-center"
          ></Rating>
        </template>
      </Column>
      <Column header="Description">
        <template #body="slotProps">
          <span>{{ clipText(slotProps.data.description) }}</span>
        </template>
      </Column>
      <Column header="Actions">
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
    <!-- <div
      class="table-responsive d-flex justify-content-center align-content-center flex-wrap mt-1 mb-1"
    >
      <table class="table-page table align-middle text-center text-nowrap">
        <thead>
          <tr>
            <th scope="col" colspan="2">User</th>
            <th scope="col">Review</th>
            <th scope="col">Description</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="tripReview in paginatedTripReviews" :key="tripReview.id">
            <td>
              <img
                :src="tripReview.user.img"
                alt="user-img"
                class="img-user rounded-circle"
              />
            </td>
            <td>{{ tripReview.user.name }}</td>
            <td>
              <Rating
                v-model="tripReview.rate"
                readonly
                class="d-flex justify-content-center align-items-center"
              />
            </td>
            <td>{{ clipText(tripReview.description) }}</td>
            <td>
              <button
                type=" button"
                class="btn btn-main me-1 ms-1"
                data-bs-toggle="modal"
                data-bs-target="#show-modal"
                @click="currentDataSeeder(tripReview)"
              >
                <i class="pi pi-eye pt-1"></i>
              </button>
              <button
                type=" button"
                class="btn btn-danger me-1 ms-1"
                data-bs-toggle="modal"
                data-bs-target="#deleteTrip-modal"
                @click="currentDataSeeder(tripReview)"
              >
                <i class="pi pi-trash pt-1"></i>
              </button>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
    <Paginator
      class="w-100"
      :rows="rowsPerPage"
      :totalRecords="tripReviews.length"
      :rowsPerPageOptions="[5, 10, 20, 30]"
      @page="onPageChange"
    ></Paginator> -->
    <!-- show Modal -->
    <Dialog
      v-model:visible="showShowDialog"
      modal
      :header="'Show Review #' + currentData.id"
      :style="{ width: '35rem' }"
    >
      <div
        class="w-100 d-flex justify-content-center align-items-center flex-wrap"
      >
        <!-- User Data -->
        <div
          class="w-90 d-flex justify-content-center align-items-center flex-wrap"
        >
          <span class="text-center w-100 mb-1 fs-5 font-bold">User Data</span>
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
            <span class="text-muted">User id : </span>
            <span>{{ currentData.user.id }}</span>
          </div>
          <div class="w-100 py-1">
            <span class="text-muted">User Name : </span>
            <span>{{ currentData.user.name }}</span>
          </div>
        </div>
        <Divider />
        <!-- Review Info -->
        <div
          class="w-90 d-flex justify-content-center align-items-center flex-wrap"
        >
          <span class="text-center w-100 mb-1 fs-5 font-bold">Review info</span>
          <div class="w-100 d-flex align-items-center py-1">
            <span class="text-muted">Rate : </span>
            <span class="ms-1"
              ><Rating v-model="currentData.rate" readonly
            /></span>
          </div>
          <div class="w-100 py-1">
            <span class="text-muted">Description : </span>
            <span>{{ currentData.description }}</span>
          </div>
        </div>
      </div>
    </Dialog>
    <!-- <div id="show-modal" class="modal fade" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h2>Review #{{ currentData.id }}</h2>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div
              class="d-flex justify-content-center align-items-center w-100 flex-wrap"
            >
              <div
                class="d-flex justify-content-center align-items-center flex-wrap w-90 border-bottom-1 pb-2"
              >
                <span class="text-center w-100 mb-1 fs-5 font-bold"
                  >User Data</span
                >
                <div
                  class="w-100 d-flex justify-content-center align-content-center flex-wrap"
                >
                  <div
                    class="d-flex justify-content-center align-items-center w-100 py-1"
                  >
                    <img
                      :src="currentData.user.img"
                      alt="user-img"
                      class="img-user"
                    />
                  </div>
                  <div class="w-100 py-1">
                    <span class="text-muted">User id : </span>
                    <span>{{ currentData.user.id }}</span>
                  </div>
                  <div class="w-100 py-1">
                    <span class="text-muted">User Name : </span>
                    <span>{{ currentData.user.name }}</span>
                  </div>
                </div>
              </div> -->

    <!-- <div
                class="d-flex justify-content-center align-items-center flex-wrap w-90 border-bottom-1 pb-2"
              >
                <span class="text-center w-100 mb-1 fs-5 font-bold"
                  >Trip Data</span
                >
                <div
                  class="w-100 d-flex justify-content-center align-content-center flex-wrap"
                >
                  <div class="w-100 py-1">
                    <span class="text-muted">Trip id : </span>
                    <span>{{ currentData.trip.id }}</span>
                  </div>
                  <div class="w-100 py-1">
                    <span class="text-muted">Trip Name : </span>
                    <span>{{ currentData.trip.name }}</span>
                  </div>
                  <div class="w-100 py-1">
                    <span class="text-muted">Trip Type : </span>
                    <span>{{ currentData.trip.type }}</span>
                  </div>
                </div>
              </div> -->

    <!-- <div
                class="d-flex justify-content-center align-items-center flex-wrap w-90 pb-2"
              >
                <div
                  class="w-100 d-flex justify-content-center align-content-center flex-wrap"
                >
                  <div class="w-100 d-flex align-items-center py-1">
                    <span class="text-muted">Rate : </span>
                    <span class="ms-1"
                      ><Rating v-model="currentData.rate" readonly
                    /></span>
                  </div>
                  <div class="w-100 py-1">
                    <span class="text-muted">Description : </span>
                    <span>{{ currentData.description }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->

    <!-- Delete Modal -->
    <Dialog
      v-model:visible="showDeleteDialog"
      modal
      :header="'Delete Review #' + currentData.id"
      :style="{ width: '35rem' }"
    >
      <span
        >Are you sure you want delete review #{{ currentData.id }} form user '{{
          currentData.user.name
        }}' ?</span
      >
      <template #footer>
        <Button
          icon="pi pi-trash"
          label="Delete"
          severity="danger"
          @click="deleteReview"
        ></Button>
      </template>
    </Dialog>
    <!-- <div class="modal fade" id="deleteTrip-modal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title font-kanit fs-5">
              Delete Review #{{ currentData.id }}
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div
            class="modal-body d-flex justify-content-center align-items-center"
          >
            <p>
              Are you Sure you want delete review #{{ currentData.id }} from
              user "{{ currentData.user.name }} ?"
            </p>
          </div>
          <div class="modal-footer d-flex justify-content-end">
            <button
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
              @click="deleteData"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div> -->
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
