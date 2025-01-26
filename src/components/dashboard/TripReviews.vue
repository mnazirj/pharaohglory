<template>
  <div class="">
    <div class="d-flex align-content-center mt-1 mb-3 w-100">
      <div class="d-flex justify-content-between align-content-center w-75">
        <div class="w-30 d-flex">
          <span class="font-bold fs-4 text-nowrap cursor-pointer" @click="backToTrip($route.params.tripId)">Reviews for trip #{{ $route.params.tripId }}</span>
        </div>
        <div
          class="d-flex justify-content-center align-content-center w-70 input-group"
        >
          <i
            class="pi pi-search fs-5 p-2 bg-main-color rounded-start-2 text-white"
          ></i>
          <input
            type="text"
            id="search"
            class="w-60 p-1 pe-2 ps-2 border-2 border-start-0 rounded-end-2"
          />
        </div>
      </div>
    </div>
    <div
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
    ></Paginator>
    <!-- show Modal -->
    <div id="show-modal" class="modal fade" tabindex="-1">
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
              </div>

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

              <div
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
    </div>

    <!-- Delete Modal -->

    <div class="modal fade" id="deleteTrip-modal" tabindex="-1">
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
    </div>
  </div>
</template>

<script>
import Rating from "primevue/rating";
import Paginator from "primevue/paginator";
export default {
  components: {
    Rating,
    Paginator,
  },
  data() {
    return {
      currentPage: 0,
      rowsPerPage: 5,
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
    paginatedTripReviews() {
      const start = this.currentPage * this.rowsPerPage;
      const end = start + this.rowsPerPage;
      return this.tripReviews.slice(start, end);
    },
  },
  methods: {
    clipText(text) {
      let newText = text;
      if (newText.split(" ").length > 5) {
        newText = newText.split(" ").slice(0, 5).join(" ") + "....";
      }
      return newText;
    },
    currentDataSeeder(newData) {
      this.currentData = newData;
    },
    onPageChange(event) {
      this.currentPage = event.page;
      this.rowsPerPage = event.rows;
    },
    backToTrip(id){
      this.$router.back();
    }
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
