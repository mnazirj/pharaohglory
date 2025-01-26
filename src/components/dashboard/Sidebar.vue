<template>
  <div
    id="sidebar"
    class="sidebar h-100 collapse collapse-horizontal show fixed z-5"
  >
    <div id="sidebar-nav" class="min-vh-100 bg-main-color h-100">
      <div class="d-flex flex-column justify-content-between flex-wrap h-100">
        <div class="w-100">
          <div
            id="sidebar-header"
            class="d-flex flex-nowrap justify-content-between p-1 pb-3 mt-0"
          >
            <div class="d-flex">
              <img
                src="../../assets/images/dashboard/logo.svg"
                class="text-white"
                alt="logo"
                :style="{ width: '100%', hight: '100%' }"
              />
            </div>
            <div class="d-flex justify-content-end align-items-center me-2">
              <i
                class="pi pi-align-justify text-white pt-2 cursor-pointer ms-2"
                data-bs-toggle="collapse"
                data-bs-target="#sidebar"
                @click="sidebarToggleShown"
              ></i>
            </div>
          </div>
          <div
            class="profile-section bg-main-color d-flex justify-content-center align-content-center flex-wrap py-3 border-bottom-1"
          >
            <div class="d-flex justify-content-center align-items-center w-100">
              <img
                src="@/assets/images/dashboard/avatar-1.png"
                class="user-img"
                alt="user-image"
              />
            </div>
            <div class="my-2">
              <span
                class="bg-second-color text-main-color px-2 py-1 rounded-2 text-nowrap"
                >Mohammad GG</span
              >
            </div>
          </div>
          <div
            class="d-flex justify-content-center align-items-center flex-wrap w-100 py-2"
          >
            <div class="list-group border-0 w-90">
              <router-link
                :to="{ name: 'dash.home' }"
                :class="[
                  'd-flex flex-nowrap align-items-center w-100 h-100 list-group-item rounded-2 my-1',
                  isActive('dash.home') ? 'active' : '',
                ]"
              >
                <i class="pi pi-objects-column me-2"></i><span>Overview</span>
              </router-link>

              <router-link
                :to="{ name: 'dash.trips' }"
                :class="[
                  'd-flex flex-nowrap align-items-center w-100 h-100 list-group-item rounded-2 my-1',
                  isActive('dash.trips') ? 'active' : '',
                ]"
              >
                <i class="fa-solid fa-plane me-2"></i>
                <span>Trips</span>
              </router-link>

              <router-link
                :to="{ name: 'dash.payments' }"
                :class="[
                  'd-flex flex-nowrap align-items-center w-100 h-100 list-group-item rounded-2 my-1',
                  isActive('dash.payments') ? 'active' : '',
                ]"
              >
                <i class="fa-solid fa-money-bill-wave me-2"></i
                ><span>Payments</span>
              </router-link>

              <router-link
                :to="{ name: 'dash.accounts' }"
                :class="[
                  'd-flex flex-nowrap align-items-center w-100 h-100 list-group-item rounded-2 my-1',
                  isActive('dash.accounts') ? 'active' : '',
                ]"
              >
                <i class="fa-solid fa-users me-2"></i><span>Accounts</span>
              </router-link>

              <router-link
                :to="{ name: 'dash.websiteSettings' }"
                :class="[
                  'd-flex flex-nowrap align-items-center w-100 h-100 list-group-item rounded-2 my-1',
                  isActive('dash.websiteSettings') ? 'active' : '',
                ]"
              >
                <i class="fa-solid fa-gears me-2"></i
                ><span class="text-nowrap">Website Settings</span>
              </router-link>

              <!-- <div
                :class="[
                  'list-group-item m-2 mt-1 rounded-2 ',
                  isActive('dash.reviews') ? 'active' : '',
                ]"
              >
                <router-link
                  :to="{ name: 'dash.reviews' }"
                  class="d-flex flex-nowrap align-items-center w-100 h-100"
                >
                  <i class="pi pi-star-fill me-2"></i
                  ><span
                    :class="[
                      'collapse collapse-horizontal',
                      isExpanded || isHovered ? 'show' : '',
                    ]"
                    >Reviews</span
                  >
                </router-link>
              </div> -->

              <router-link
                :to="{ name: 'dash.profile' }"
                :class="[
                  'd-flex flex-nowrap align-items-center w-100 h-100 list-group-item rounded-2 my-1',
                  isActive('dash.profile') ? 'active' : '',
                ]"
              >
                <i class="pi pi-address-book me-2"></i><span>My Profile</span>
              </router-link>
            </div>
          </div>
        </div>
        <div id="footer-section" class="d-flex justify-content-center">
          <button
            class="btn btn-second h-100 w-100 d-flex justify-content-center align-items-center rounded-0"
          >
            <i class="pi pi-sign-out me-2"></i>
            <span> Logout</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Accordion from "primevue/accordion";
import AccordionPanel from "primevue/accordionpanel";
import AccordionHeader from "primevue/accordionheader";
import AccordionContent from "primevue/accordioncontent";
export default {
  components: {
    Accordion,
    AccordionPanel,
    AccordionHeader,
    AccordionContent,
  },
  data() {
    return {
      isExpanded: false,
      isHovered: false,
      isShown: true,
      isLargeScreen: window.innerWidth >= 1024,
    };
  },
  computed: {},
  methods: {
    expandSidebarByButton() {
      if (this.isExpanded) {
        this.isExpanded = false;
      } else {
        this.isExpanded = true;
      }
    },
    sidebarMouseOver() {
      console.log(this.isLargeScreen);
      if (!this.isExpanded && this.isLargeScreen) {
        this.isHovered = true;
      }
    },
    sidebarMouseLeave() {
      console.log(this.isLargeScreen);
      if (!this.isExpanded && this.isLargeScreen) {
        this.isHovered = false;
      }
    },
    sidebarToggleShown() {
      this.isShown = !this.isShown;
      this.$emit("sidebarToggleShown", this.isShown);
    },
    isActive(routeName) {
      return this.$route.name === routeName;
    },
    handleResize() {
      this.isLargeScreen = window.innerWidth >= 1024;
      if (!this.isLargeScreen) {
        this.isExpanded = true; // Automatically expand sidebar for smaller screens
      }
    },
    mounted() {
      window.addEventListener("resize", this.handleResize); // Listen for screen size changes
      this.handleResize(); // Set the initial state
    },
    beforeUnmount() {
      window.removeEventListener("resize", this.handleResize); // Cleanup event listener
    },
  },
};
</script>

<style scoped>
#sidebar-nav {
  width: 14rem;
  transition: width 0.3s ease;
}

#sidebar-header {
  background-color: #014042;
  height: 3.6rem;
}

#sidebar-header div i {
  font-size: 0.8rem;
}
.list-group {
  border-radius: 0px;
}
.list-group-item {
  height: 2.5rem !important;
  border: none;
  background-color: transparent;
  color: #cdcdcd !important;
}
.list-group-item:hover {
  background-color: #01383a;
  cursor: pointer;
  color: #fff;
}
.list-group-item:is(.active) {
  background-color: #eae19d;
  color: #01383a !important;
}
.profile-section {
  height: 9rem;
}

#footer-section {
  height: 3.2rem;
}
#sidebar-nav .profile-section div .user-img {
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
}
</style>
