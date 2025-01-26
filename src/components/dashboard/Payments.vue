<template>
  <div class="">
    <div class="d-flex align-content-center mt-1 mb-3 w-100">
      <div
        class="d-flex justify-content-end align-content-center w-70 input-group"
      >
        <i
          class="pi pi-search fs-5 p-2 bg-main-color rounded-start-2 text-white"
        ></i>
        <input
          type="text"
          id="search"
          class="w-50 p-1 pe-2 ps-2 border-2 border-start-0 rounded-end-2"
        />
      </div>
    </div>
    <div
      class="table-responsive d-flex justify-content-center align-content-center flex-wrap mt-1 mb-1"
    >
      <table class="table-page table align-middle text-center text-nowrap">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col" colspan="2">User</th>
            <th scope="col">Trip</th>
            <th scope="col">Count</th>
            <th>Total Price</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="payment in paginatedPayments" :key="payment.id">
            <td scope="row">#{{ payment.id }}</td>
            <td>
              <img
                :src="payment.from.userImg"
                alt="user-img"
                class="img-user rounded-circle"
              />
            </td>
            <td>{{ payment.from.name }}</td>
            <td>
              {{ payment.to.title }}
            </td>
            <td>
              {{ payment.adultCount }} Adults<br />
              {{ payment.childernCount }} Children
            </td>
            <td>{{ payment.total }}</td>
            <td>
              <button
                type=" button"
                class="btn btn-main me-1 ms-1"
                data-bs-toggle="modal"
                data-bs-target="#show-modal"
                @click="currentDataSeeder(payment)"
              >
                <i class="pi pi-eye pt-1"></i>
              </button>
              <button
                type=" button"
                class="btn btn-danger me-1 ms-1"
                data-bs-toggle="modal"
                data-bs-target="#delete-modal"
                @click="currentDataSeeder(payment)"
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
      :totalRecords="payments.length"
      :rowsPerPageOptions="[5, 10, 20, 30]"
      @page="onPageChange"
    ></Paginator>
    <!-- show Modal -->
    <div id="show-modal" class="modal fade" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h2>Payment #{{ currentData.id }}</h2>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div
              class="d-flex justify-content-center align-items-center flex-wrap w-100 pb-2"
            >
              <div
                class="w-90 d-flex justify-content-center align-content-center flex-wrap"
              >
                <!-- payment information -->
                <div
                  class="w-100 d-flex justify-content-center align-items-center flex-wrap"
                >
                  <span class="w-100 text-center fs-4"
                    >Payment #{{ currentData.id }} information</span
                  >
                  <div class="w-100 py-1">
                    <span class="text-muted">Total Price: </span>
                    <span class="ms-1">{{ currentData.total }}</span>
                  </div>
                  <div class="w-100 py-1">
                    <span class="text-muted">Adult Count : </span>
                    <span>{{ currentData.adultCount }}</span>
                  </div>
                  <div class="w-100 py-1">
                    <span class="text-muted">Children Count : </span>
                    <span>{{ currentData.childernCount }}</span>
                  </div>
                </div>
                <Divider />
                <!-- user information -->
                <div
                  class="w-100 d-flex justify-content-center align-items-center flex-wrap py-1"
                >
                  <span class="w-100 text-center fs-4"
                    >User #{{ currentData.from.id }} information</span
                  >
                  <div
                    class="w-100 d-flex justify-content-center align-items-center"
                  >
                    <img
                      :src="currentData.from.userImg"
                      alt="user-image"
                      class="rounded-circle"
                      :style="{ width: '7rem', height: '7rem' }"
                    />
                  </div>

                  <div class="w-100 py-1">
                    <span class="text-muted">Name: </span>
                    <span class="ms-1">{{ currentData.from.name }}</span>
                  </div>
                  <div class="w-100 py-1">
                    <span class="text-muted">Username : </span>
                    <span class="ms-1">{{ currentData.from.username }}</span>
                  </div>
                  <div class="w-100 py-1">
                    <span class="text-muted">Username : </span>
                    <span class="ms-1">{{ currentData.from.username }}</span>
                  </div>
                  <div class="w-100 py-1">
                    <span class="text-muted">Email : </span>
                    <span class="ms-1">{{ currentData.from.email }}</span>
                  </div>
                </div>
                <Divider />
                <!-- trip information -->
                <div
                  class="w-100 py-1 d-flex flex-wrap justify-content-center align-items-center"
                >
                  <span class="w-100 text-center fs-4">Trip Information </span>
                  <div class="w-100 py-1">
                    <span class="text-muted">Title : </span>
                    <span class="ms-1">{{ currentData.to.title }}</span>
                  </div>
                  <div class="w-100 py-1">
                    <span class="text-muted">Type : </span>
                    <span class="ms-1">{{ currentData.to.type }}</span>
                  </div>
                  <div class="w-100 py-1">
                    <span class="text-muted">Adults Price : </span>
                    <span class="ms-1">{{ currentData.to.adultPrice }}</span>
                  </div>
                  <div class="w-100 py-1">
                    <span class="text-muted">Children Price : </span>
                    <span class="ms-1">{{ currentData.to.childPrice }}</span>
                  </div>
                  <div class="w-100 py-1">
                    <span class="text-muted">Discount : </span>
                    <span class="ms-1">{{ currentData.to.discount }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- delete modal -->
    <div class="modal fade" id="delete-modal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title fs-5">
              Delete Payment #{{ currentData.id }}
            </h2>
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
              Are you Sure you want delete Payment #{{ currentData.id }} From
              User #{{ currentData.from.id }} "{{ currentData.from.name }} " ?
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
import Paginator from "primevue/paginator";
import Divider from "primevue/divider";
export default {
  components: {
    Paginator,
    Divider,
  },
  data() {
    return {
      currentPage: 0,
      rowsPerPage: 5,
      currentData: {
        id: null,
        total: null,
        to: {
          id: null,
          title: null,
          type: null,
          adultPrice: null,
          childPrice: null,
          discount: null,
        },
        from: {
          id: null,
          name: null,
          username: null,
          email: null,
          userImg: null,
        },
        childernCount: null,
        adultCount: null,
      },
      payments: [
        {
          id: 1,
          total: "125$",
          to: {
            id: 1,
            title: "Tatous Trip",
            type: "Sea Trip",
            adultPrice: "50$",
            childPrice: "25$",
            discount: "0",
          },
          from: {
            id: 1,
            name: "Omar Ammar",
            username: "OmarAmmar1999",
            email: "omar@test.com",
            userImg: require("@/assets/images/dashboard/avatar-1.png"),
          },
          childernCount: 1,
          adultCount: 2,
        },
        {
          id: 2,
          total: "40$",
          to: {
            id: 10,
            title: "Mhajren Mountin Tirp",
            type: "Mountin Trip",
            adultPrice: "20$",
            childPrice: "10$",
            discount: "0",
          },
          from: {
            id: 45,
            name: "Sara Alsrsara",
            username: "SaraS",
            email: "sara@test.com",
            userImg: require("@/assets/images/dashboard/avatar-1.png"),
          },
          childernCount: 0,
          adultCount: 2,
        },
        {
          id: 2,
          total: "48$",
          to: {
            id: 10,
            title: "Al-Adawe Animal Garden Tirp",
            type: "Garden Trip",
            adultPrice: "8$",
            childPrice: "4$",
            discount: "0",
          },
          from: {
            id: 2,
            name: "Jamal Jmal",
            username: "JmalJmal_123",
            email: "jmal@test.com",
            userImg: require("@/assets/images/dashboard/avatar-1.png"),
          },
          childernCount: 10,
          adultCount: 1,
        },
      ],
    };
  },
  computed: {
    paginatedPayments() {
      const start = this.currentPage * this.rowsPerPage;
      const end = start + this.rowsPerPage;
      return this.payments.slice(start, end);
    },
  },
  methods: {
    currentDataSeeder(newData) {
      this.currentData = newData;
    },
    onPageChange(event) {
      this.currentPage = event.page;
      this.rowsPerPage = event.rows;
    },
  },
};
</script>
