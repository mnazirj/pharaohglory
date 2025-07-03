<template>
  <div class="container-fluid">
    <div class="row flex-nowrap">
      <div
        ref="sidebarContainer"
        :class="[
          'col-auto px-0 m-0',
          isShown ? 'shown' : '',
          isEng ? 'ltr' : 'rtl',
        ]"
        id="sidebar-container"
      >
        <Sidebar @sidebarToggleShown="sidebarToggleShown" />
      </div>
      <main :class="['col p-0 mt-2', isEng ? 'ltr' : 'rtl']">
        <!-- <Navbar /> -->
        <div v-if="!isShown" class="fixed z-3">
          <button
            type="button"
            class="btn btn-main"
            data-bs-toggle="collapse"
            data-bs-target="#sidebar"
            @click="isShown = !isShown"
          >
            <i class="pi pi-align-justify"></i>
          </button>
        </div>
        <div
          id="navbar"
          class="w-100 d-flex justify-content-end align-items-center mb-4"
        >
          <div class="d-flex align-items-center">
            <SelectButton
              v-model="langValue"
              :options="languages"
              id="languages"
              class="mx-4"
              @change="changeLang"
            />
            <Button
              :icon="['pi', isDark ? 'pi-sun' : 'pi-moon']"
              class="rounded-circle"
              @click="toggleMode"
            ></Button>
          </div>
        </div>
        <div id="content">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/dashboard/Sidebar.vue";
import SelectButton from "primevue/selectbutton";
import FloatLabel from "primevue/floatlabel";
import IftaLabel from "primevue/iftalabel";
import Button from "primevue/button";
// import Navbar from "@/components/dashboard/Navbar.vue";
export default {
  components: {
    Sidebar,
    SelectButton,
    FloatLabel,
    IftaLabel,
    Button,
    // Navbar,
  },
  data() {
    return {
      isShown: true,
      langValue: null,
      languages: ["En", "Ar"],
      isEng: null,
      isDark:null ,
    };
  },
  methods: {
    sidebarToggleShown() {
      this.isShown = !this.isShown;
    },
    changeLang() {
      localStorage.setItem("locale", this.langValue.toLowerCase());
      window.location.reload();
    },
    toggleMode() {

      document.documentElement.classList.toggle("my-app-dark");
      document.body.classList.toggle("custom-dark");

      if (localStorage.getItem("mode")) {
        localStorage.removeItem("mode");
      } else {
        localStorage.setItem("mode", "dark");
      }
      console.log(this.isDark);
    },
  },
  beforeMount() {
    this.isEng = localStorage.getItem("locale") == "en";
  },
};
</script>

<style scoped>
::v-deep a {
  color: inherit !important;
  text-decoration: none !important;
}
::v-deep .dark-shadow {
  box-shadow: 0px 4px 10px rgba(255, 255, 255, 0.03),
    0px 0px 2px rgba(255, 255, 255, 0.06), 0px 2px 6px rgba(255, 255, 255, 0.12) !important;
}
main {
  transition: all 0.3s ease;
}
main:is(.ltr) {
  margin-left: 1rem;
  min-width: calc(100% - 1rem);
}
main:is(.rtl) {
  margin-right: 1rem;
  width: calc(100% - 1rem);
}
#sidebar-container:not(.shown) + main:is(.ltr) #content {
  margin-left: 1rem;
  min-width: calc(100% - 1rem);
}
#sidebar-container:not(.shown) + main:is(.rtl) #content {
  margin-left: 1rem;
  min-width: calc(100% - 1rem);
}
#sidebar-container:is(.shown) + main:is(.ltr) {
  margin-left: 15rem;
  min-width: calc(100% - 15rem);
}
#sidebar-container:is(.shown) + main:is(.rtl) {
  margin-right: 15rem;
  min-width: calc(100% - 15rem);
}
/* table */
::v-deep .table-page {
  width: 98%;
}
::v-deep .table-page thead tr th {
  background-color: transparent;
  color: #ffffff;
}
::v-deep .table-page thead tr {
  background-color: transparent;
}
::v-deep .table-page thead {
  width: 100%;
  /* background: linear-gradient(
    1.2deg,
    #fc5b78,
    #ff3c60,
    #ff1d48,
    #ff3c60,
    #fc5b78
  ); */
  /* background: linear-gradient(
    1.2deg,
    #e1e1e1,
    #c2c1c1,
    #9f9f9f,
    #c2c1c1,
    #e1e1e1
  ); */
  background-color: #353535;
}
::v-deep .table-page thead tr th:first-child {
  border-top-left-radius: 0.5rem;
}
::v-deep .table-page thead tr th:last-child {
  border-top-right-radius: 0.5rem;
}
/* Pagination */
::v-deep .p-paginator-page.p-paginator-page-selected {
  background-color: #ff1d48 !important;
  color: #fff !important;
}
/* ::v-deep .p-select-option.p-select-option-selected {
  background: #c6c6c6;
  color: #005659;
} */
::v-deep .p-select-option.p-select-option-selected.p-focus {
  background: #a7a7a7;
  color: #ff1d48;
}
::v-deep .p-select:not(.p-disabled).p-focus {
  border-color: #ff3b5f;
}
/* Rate */
::v-deep .p-rating-option,
.p-rating-option-active {
  cursor: default !important;
}
::v-deep .p-rating-option-active .p-rating-icon {
  color: #ff1d48 !important;
}
::v-deep .p-rating-icon {
  color: #ff1d48 !important;
}
/* inputs */
::v-deep .form-control:focus {
  border-color: rgb(255, 61, 97);
  box-shadow: 0 0 0 0.25rem rgba(255, 46, 84, 0.397);
}
/* Toggle Switch */
::v-deep .p-toggleswitch-slider {
  background: #c6c6c6 !important;
}
::v-deep .p-toggleswitch.p-toggleswitch-checked .p-toggleswitch-slider {
  background: #ff1d48 !important;
}
::v-deep
  .p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover)
  .p-toggleswitch-slider {
  background: #959595 !important;
}
::v-deep
  .p-toggleswitch:not(.p-disabled):has(
    .p-toggleswitch-input:hover
  ).p-toggleswitch-checked
  .p-toggleswitch-slider {
  background: #ff0e3a !important;
}
/* Data Table */
/* main table */
::v-deep .main-table .p-datatable-thead {
  background-color: #353535;
  border-radius: 2rem;
}
::v-deep .main-table:is(.dark) .p-datatable-thead {
  background-color: #ff1d48;
  border-radius: 2rem;
}
::v-deep .main-table tr {
  background-color: transparent;
}
::v-deep .main-table th {
  background-color: transparent;
  color: #fff;
}
::v-deep .main-table:is(.ltr) th:first-child {
  border-top-left-radius: 0.5rem;
}
::v-deep .main-table:is(.ltr) th:last-child {
  border-top-right-radius: 0.5rem;
}
::v-deep .main-table:is(.rtl) th:first-child {
  border-top-right-radius: 0.5rem;
}
::v-deep .main-table:is(.rtl) th:last-child {
  border-top-left-radius: 0.5rem;
}
/* navbar */
#navbar div button {
  min-width: 2.7rem;
  min-height: 2.7rem;
}
@media (min-width: 1440px) {
  #navbar > div {
    width: 18%;
    justify-content: space-evenly;
  }
}
@media (max-width: 1440px) {
  #navbar > div {
    width: 30%;
    justify-content: space-evenly;
  }
}
@media (max-width: 1023px) {
  #navbar > div {
    width: 40%;
    justify-content: space-evenly;
  }
}
@media (max-width: 768px) {
  #navbar > div {
    width: 90%;
    justify-content: center;
  }
}
</style>
