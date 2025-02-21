<template>
  <div class="">
    <div class="d-flex align-content-center mt-1 mb-3 w-100">
      <div
        class="d-flex justify-content-end align-content-center w-60 input-group"
      >
        <IconField class="w-50">
          <InputIcon class="pi pi-search text-main-color" />
          <InputText v-model="searchValue" placeholder="Search" class="w-100" />
        </IconField>
      </div>
    </div>
    <!-- Table -->
    <DataTable
      :value="filteredData"
      paginator
      :rows="5"
      :class="['w-100 px-2 main-table', isEng ? 'ltr' : 'rtl']"
    >
      <Column header="Name">
        <template #body="slotProps">
          <div class="d-flex align-items-center">
            <img
              :src="slotProps.data.img"
              alt="user-image"
              class="img-user rounded-circle"
            />
            <span :class="['text-nowrap', isEng ? 'ms-3' : 'me-3']">{{
              slotProps.data.name
            }}</span>
          </div>
        </template>
      </Column>
      <Column field="username" header="Username"></Column>
      <Column field="email" header="Email"></Column>
      <Column header="Payments">
        <template #body="slotProps">
          <span>{{ slotProps.data.payments.length }}</span>
        </template>
      </Column>
      <Column header="Actions">
        <template #body="slotProps">
          <Button
            icon="pi pi-eye"
            severity="secondary"
            @click="showDialogTrigger(slotProps.data)"
          ></Button>
        </template>
      </Column>
    </DataTable>
    <!-- <div class="table-responsive">
      <table class="table-page table align-middle text-center text-nowrap">
        <thead>
          <tr>
            <th scope="col" colspan="2">Name</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th>Payments</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="account in paginatedAccounts" :key="account.id">
            <td>
              <img
                :src="account.img"
                alt="user-img"
                class="img-user rounded-circle"
              />
            </td>
            <td>{{ account.name }}</td>
            <td>
              {{ account.username }}
            </td>
            <td>{{ account.email }}</td>
            <td>{{ account.payments.length }}</td>
            <td>
              <button
                type=" button"
                class="btn btn-outline-second me-1 ms-1"
                data-bs-toggle="modal"
                data-bs-target="#show-modal"
                @click="currentDataSeeder(account)"
              >
                <i class="pi pi-eye pt-1"></i>
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
      :totalRecords="filteredData.length"
      :rowsPerPageOptions="[5, 10, 20, 30]"
      @page="onPageChange"
    ></Paginator> -->
    <!-- show Modal -->
    <Dialog
      v-model:visible="showShowDialog"
      modal
      :header="'Show Account #' + currentData.id"
      :style="{ width: '35rem' }"
    >
      <div
        class="d-flex justify-content-center align-items-center flex-wrap w-100 mb-2"
      >
        <!-- user info -->
        <div
          class="w-100 d-flex justify-content-center align-items-center flex-wrap mb-2"
        >
          <div
            class="w-100 d-flex justify-content-center align-items-center mb-2"
          >
            <img
              :src="currentData.img"
              alt="user-image"
              class="rounded-circle"
              :style="{ width: '7rem', height: '7rem' }"
            />
          </div>
          <div class="w-100 d-flex mb-2">
            <span class="text-muted">Name : </span>
            <span class="ms-1">{{ currentData.name }}</span>
          </div>
          <div class="w-100 d-flex mb-2">
            <span class="text-muted">Username : </span>
            <span>{{ currentData.username }}</span>
          </div>
          <div class="w-100 d-flex mb-2">
            <span class="text-muted">Email : </span>
            <span>{{ currentData.email }}</span>
          </div>
        </div>
        <Divider />
        <div
          class="w-100 d-flex justify-content-center align-items-center flex-wrap mb-2"
        >
          <span class="text-muted w-100 fs-5 mb-2 text-center">Payments </span>
          <DataTable
            :value="currentData.payments"
            paginator
            :rows="3"
            :class="['w-90 px-2 second-table ', isEng ? 'ltr' : 'rtl']"
          >
            <Column field="id" header="ID"></Column>
            <Column field="to" header="To Trip"></Column>
            <Column field="cash" header="Cash"></Column>
          </DataTable>
        </div>
      </div>
    </Dialog>
    <!-- <div id="show-modal" class="modal fade" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h2>Account {{ currentData.id }}</h2>
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
                <div
                  class="w-100 d-flex justify-content-center align-items-center py-1"
                >
                  <img
                    :src="currentData.img"
                    alt="user-image"
                    class="rounded-circle"
                    :style="{ width: '7rem', height: '7rem' }"
                  />
                </div>
                <div class="w-100 py-1">
                  <span class="text-muted">Name: </span>
                  <span class="ms-1">{{ currentData.name }}</span>
                </div>
                <div class="w-100 py-1">
                  <span class="text-muted">Username : </span>
                  <span>{{ currentData.username }}</span>
                </div>
                <div class="w-100 py-1">
                  <span class="text-muted">Email : </span>
                  <span>{{ currentData.email }}</span>
                </div>
                <Divider />
                <div
                  class="w-100 py-1 d-flex flex-wrap justify-content-center align-items-center"
                >
                  <span class="text-muted w-100 fs-5 mb-2 text-center"
                    >Payments
                  </span>
                  <div class="table-responsive w-100">
                    <table class="table table-sm">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">To Trip</th>
                          <th scope="col">Cash</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="payment in currentData.payments"
                          :key="payment.id"
                        >
                          <td>{{ payment.id }}</td>
                          <td>{{ payment.to }}</td>
                          <td>{{ payment.cash }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import Paginator from "primevue/paginator";
import Divider from "primevue/divider";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
export default {
  components: {
    Paginator,
    Divider,
    IconField,
    InputIcon,
    InputText,
    DataTable,
    Column,
    Button,
    Dialog,
  },
  data() {
    return {
      isEng: null,
      showShowDialog: false,
      currentPage: 0,
      rowsPerPage: 5,
      searchValue: "",
      currentData: {
        id: null,
        name: null,
        username: null,
        email: null,
        img: null,
        payments: [],
      },
      accounts: [
        {
          id: 1,
          name: "Mohammad MM",
          username: "mohammadMM1999",
          email: "Mohammad@test.com",
          img: require("@/assets/images/dashboard/avatar-1.png"),
          payments: [
            {
              id: 1,
              to: "Tartous Trip",
              cash: "120$",
            },
            {
              id: 2,
              to: "Al-shikh mountin Trip",
              cash: "320$",
            },
          ],
        },
        {
          id: 2,
          name: "Mohammad MM",
          username: "mohammadMM1999",
          email: "Mohammad@test.com",
          img: require("@/assets/images/dashboard/avatar-1.png"),
          payments: [
            {
              id: 1,
              to: "Tartous Trip",
              cash: "120$",
            },
            {
              id: 2,
              to: "Qasun Mountuin Trip",
              cash: "10$",
            },
            {
              id: 3,
              to: "Tartous Trip",
              cash: "120$",
            },
            {
              id: 4,
              to: "Qasun Mountuin Trip",
              cash: "10$",
            },
            {
              id: 5,
              to: "Tartous Trip",
              cash: "120$",
            },
            {
              id: 6,
              to: "Qasun Mountuin Trip",
              cash: "10$",
            },
          ],
        },
        {
          id: 3,
          name: "Ahmad MM",
          username: "Ahmad1999",
          email: "ahmad@test.com",
          img: require("@/assets/images/dashboard/avatar-1.png"),
          payments: [
            {
              id: 1,
              to: "Tartous Trip",
              cash: "120$",
            },
            {
              id: 25,
              to: "Latakia Trip",
              cash: "450$",
            },
          ],
        },
        {
          id: 4,
          name: "Omar AlAmmar",
          username: "Omar123",
          email: "omar@test.com",
          img: require("@/assets/images/dashboard/avatar-1.png"),
          payments: [
            {
              id: 2,
              to: "Mhajren Trip",
              cash: "120$",
            },
            {
              id: 25,
              to: "Latakia Trip",
              cash: "450$",
            },
          ],
        },
        {
          id: 5,
          name: "Samer skar",
          username: "samer",
          email: "samer@test.com",
          img: require("@/assets/images/dashboard/avatar-1.png"),
          payments: [
            {
              id: 2,
              to: "Mhajren Trip",
              cash: "120$",
            },
            {
              id: 25,
              to: "Latakia Trip",
              cash: "450$",
            },
          ],
        },
        {
          id: 6,
          name: "Dina Dnow",
          username: "Dina879",
          email: "dina@test.com",
          img: require("@/assets/images/dashboard/avatar-1.png"),
          payments: [
            {
              id: 2,
              to: "Mhajren Trip",
              cash: "120$",
            },
            {
              id: 25,
              to: "Latakia Trip",
              cash: "450$",
            },
          ],
        },
      ],
    };
  },
  computed: {
    paginatedAccounts() {
      const start = this.currentPage * this.rowsPerPage;
      const end = start + this.rowsPerPage;
      return this.filteredData.slice(start, end);
    },
    filteredData() {
      if (!this.searchValue) {
        return this.accounts;
      }
      return this.accounts.filter(
        (item) =>
          item.name.toLowerCase().includes(this.searchValue.toLowerCase()) ||
          item.username
            .toLowerCase()
            .includes(this.searchValue.toLowerCase()) ||
          item.email
            .toLocaleLowerCase()
            .includes(this.searchValue.toLocaleLowerCase()) ||
          item.payments.some((payment) =>
            payment.to
              .toLowerCase()
              .includes(this.searchValue.toLocaleLowerCase())
          ) ||
          item.payments.some((payment) =>
            payment.cash
              .toLowerCase()
              .includes(this.searchValue.toLocaleLowerCase())
          )
      );
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
    showDialogTrigger(data) {
      this.currentData = data;
      this.showShowDialog = true;
    },
  },
  beforeMount() {
    this.isEng = localStorage.getItem("locale") == "en";
  },
};
</script>

<style scoped>
::v-deep .second-table .p-datatable-thead {
  background-color: #ff1d48;
  border-radius: 2rem;
}
::v-deep .second-table tr {
  background-color: transparent;
}
::v-deep .second-table th {
  background-color: transparent;
  color: #353535;
}
::v-deep .second-table:is(.ltr) th:first-child {
  border-top-left-radius: 0.5rem;
}
::v-deep .second-table:is(.ltr) th:last-child {
  border-top-right-radius: 0.5rem;
}
::v-deep .second-table:is(.rtl) th:first-child {
  border-top-left-radius: 0.5rem;
}
::v-deep .second-table:is(.rtl) th:last-child {
  border-top-right-radius: 0.5rem;
}
</style>
