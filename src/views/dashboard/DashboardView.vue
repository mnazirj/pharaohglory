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
        <router-view />
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
}
#sidebar-container:not(.shown) + main {
  margin-left: 1.5rem;
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
  background-color: #014f51;
}
</style>
