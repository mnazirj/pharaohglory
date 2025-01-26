<template>
  <div class="container-fluid">
    <div class="row flex-nowrap">
      <div
        ref="sidebarContainer"
        :class="['col-auto px-0 m-0', isShown ? 'shown' : '']"
        id="sidebar-container"
      >
        <Sidebar @sidebarToggleShown="sidebarToggleShown" />
      </div>
      <main class="col p-0 mt-2">
        <!-- <Navbar /> -->
        <div v-if="!isShown" class="fixed z-3">
          <button
            type="button"
            class="btn btn-main"
            data-bs-toggle="collapse"
            data-bs-target="#sidebar"
            @click="isShown = !isShown"
          >
            <i class="pi pi-align-justify text-second-color"></i>
          </button>
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
// import Navbar from "@/components/dashboard/Navbar.vue";
export default {
  components: {
    Sidebar,
    // Navbar,
  },
  data() {
    return {
      isShown: true,
    };
  },
  methods: {
    sidebarToggleShown() {
      this.isShown = !this.isShown;
    },
  },
};
</script>

<style scoped>
::v-deep a {
  color: inherit !important;
  text-decoration: none !important;
}
main {
  margin-left: 1rem;
  transition: all 0.3s ease;
}
#sidebar-container:not(.shown) + main #content {
  margin-left: 1rem;
}
#sidebar-container:is(.shown) + main {
  margin-left: 15rem;
}
/* table */
::v-deep .table-page {
  width: 98%;
}
::v-deep .table-page thead tr th {
  background-color: transparent;
  color: white;
}
::v-deep .table-page thead tr {
  background-color: transparent;
}
::v-deep .table-page thead {
  width: 100%;
  background: linear-gradient(
    1.2deg,
    #036f72,
    #01686a,
    #014f51,
    #01686a,
    #036f72
  );
  /* background-color: #014f51; */
}
::v-deep .table-page thead tr th:first-child {
  border-top-left-radius: 0.5rem;
}
::v-deep .table-page thead tr th:last-child {
  border-top-right-radius: 0.5rem;
}
/* Pagination */
::v-deep .p-paginator-page.p-paginator-page-selected {
  background-color: #014f51 !important;
  color: #fff !important;
}
::v-deep .p-select-option.p-select-option-selected {
}
/* ::v-deep .p-select-option.p-select-option-selected {
  background: #c6c6c6;
  color: #005659;
} */
::v-deep .p-select-option.p-select-option-selected.p-focus {
  background: #a7a7a7;
  color: #01474a;
}
::v-deep .p-select:not(.p-disabled).p-focus {
  border-color: #036f72;
}
/* Rate */
::v-deep .p-rating-option,
.p-rating-option-active {
  cursor: default !important;
}
::v-deep .p-rating-option-active .p-rating-icon {
  color: #014f51 !important;
}
::v-deep .p-rating-icon {
  color: #014f51 !important;
}
/* inputs */
::v-deep .form-control:focus {
  border-color: #036f72;
  box-shadow: 0 0 0 0.25rem rgba(1, 106, 110, 0.25);
}
/* Toggle Switch */
::v-deep .p-toggleswitch-slider {
  background: #c6c6c6 !important;
}
::v-deep .p-toggleswitch.p-toggleswitch-checked .p-toggleswitch-slider {
  background: #014f51 !important;
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
  background: #013a3c !important;
}
</style>
