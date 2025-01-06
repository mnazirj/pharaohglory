<template>
  <div id="sidebar" class="sidebar h-100 collapse collapse-horizontal show">
    <div
      id="sidebar-nav"
      :class="[' min-vh-100 bg-main-color h-100', isHovered ? 'expanded' : '']"
      @mouseover="sidebarMouseOver"
      @mouseleave="sidebarMouseLeave"
    >
      <div class="d-flex flex-column justify-content-between flex-wrap h-100">
        <div class="w-100">
          <div
            id="sidebar-header"
            class="d-flex flex-nowrap justify-content-between p-1 pb-3 mt-0"
          >
            <div class="d-flex align-items-center">
              <img
                v-if="isExpanded || isHovered"
                src=""
                class="text-white"
                alt="logo1"
              />
              <img
                v-if="!isExpanded && !isHovered"
                src=""
                class="text-white"
                alt="logo2"
              />
            </div>
            <div
              v-if="isExpanded || isHovered"
              class="d-flex justify-content-end align-items-center me-2"
            >
              <i
                :class="[
                  'pi pi-thumbtack text-white mt-2 p-1 rounded-circle cursor-pointer',
                  isExpanded ? 'pressed' : '',
                ]"
                @click="expandSidebarByButton"
              ></i>
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
            <div v-if="isExpanded || isHovered" class="my-2">
              <span
                class="bg-second-color text-main-color px-2 py-1 rounded-2 text-nowrap"
                >Mohammad GG</span
              >
            </div>
          </div>
          <div
            class="d-flex justify-content-center align-items-center flex-wrap w-100 py-2"
          >
            <div class="w-100 d-flex align-items-center mb-2">
              <span class="ms-2 text-white font-bold">Menu</span>
            </div>
            <div class="list-group border-0 w-90">
              <div
                :class="[
                  'list-group-item m-2 mt-1 rounded-2 ',
                  isActive('dash.home') ? 'active' : '',
                ]"
              >
                <router-link
                  :to="{ name: 'dash.home' }"
                  class="d-flex flex-nowrap align-items-center w-100 h-100"
                >
                  <i class="pi pi-home me-2"></i
                  ><span
                    :class="[
                      'collapse collapse-horizontal',
                      isExpanded || isHovered ? 'show' : '',
                    ]"
                    >Home</span
                  >
                </router-link>
              </div>
              <div
                class="list-group-item m-2 mt-1 rounded-2 d-flex flex-nowrap align-items-center"
              >
                <i class="fa-solid fa-plane me-2"></i>
                <span
                  :class="[
                    'collapse collapse-horizontal',
                    isExpanded || isHovered ? 'show' : '',
                  ]"
                  >Trips</span
                >
              </div>
              <div
                class="list-group-item m-2 mt-1 rounded-2 d-flex flex-nowrap align-items-center"
              >
                <i class="fa-solid fa-money-bill-wave me-2"></i
                ><span
                  :class="[
                    'collapse collapse-horizontal',
                    isExpanded || isHovered ? 'show' : '',
                  ]"
                  >Payments</span
                >
              </div>
              <div
                class="list-group-item m-2 mt-1 rounded-2 d-flex flex-nowrap align-items-center"
              >
                <i class="fa-solid fa-users me-2"></i
                ><span
                  :class="[
                    'collapse collapse-horizontal',
                    isExpanded || isHovered ? 'show' : '',
                  ]"
                  >Accounts</span
                >
              </div>
              <div
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
              </div>
              <div class="w-100 d-flex align-items-center mb-2 mt-3">
                <span class="ms-1 text-white font-bold">Account</span>
              </div>
              <div
                class="list-group-item m-2 mt-1 rounded-2 d-flex flex-nowrap align-items-center"
              >
                <i class="pi pi-address-book me-2"></i
                ><span
                  :class="[
                    'collapse collapse-horizontal',
                    isExpanded || isHovered ? 'show' : '',
                  ]"
                  >Profile</span
                >
              </div>
              <div
                class="list-group-item m-2 mt-1 rounded-2 d-flex flex-nowrap align-items-center"
              >
                <i class="pi pi-cog me-2"></i
                ><span
                  :class="[
                    'collapse collapse-horizontal',
                    isExpanded || isHovered ? 'show' : '',
                  ]"
                  >Settings</span
                >
              </div>
            </div>
          </div>
        </div>
        <div id="footer-section" class="d-flex justify-content-center">
          <button
            class="btn btn-second h-100 w-100 d-flex justify-content-center align-items-center rounded-0"
          >
            <i
              :class="['pi pi-sign-out', isExpanded || isHovered ? 'me-2' : '']"
            ></i>
            <span
              :class="[
                'collapse collapse-horizontal',
                isExpanded || isHovered ? 'show' : '',
              ]"
            >
              Logout</span
            >
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isExpanded: false,
      isHovered: false,
      isShown: true,
    };
  },
  methods: {
    expandSidebarByButton() {
      if (this.isExpanded) {
        this.isExpanded = false;
      } else {
        this.isExpanded = true;
      }
    },
    sidebarMouseOver() {
      if (!this.isExpanded) {
        this.isHovered = true;
      }
    },
    sidebarMouseLeave() {
      if (!this.isExpanded) {
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
  },
};
</script>

<style scoped>
#sidebar-nav {
  width: 4.7rem;
  transition: width 0.3s ease;
}
#sidebar-nav:is(.expanded) {
  width: 14rem;
}
#sidebar-nav:hover {
  width: 14rem;
}
#sidebar-header {
  background-color: #014042;
  height: 3.6rem;
}
#sidebar-nav:not(.expanded) div .list-group .list-group-item i {
  display: flex;
  justify-content: center;
}
#sidebar-header div i {
  font-size: 0.8rem;
}
.list-group {
  border-radius: 0px;
}
.list-group-item {
  height: 2.5rem;
  border: none;
  background-color: transparent;
  color: #cdcdcd;
}
.list-group-item:hover {
  background-color: #01383a;
  cursor: pointer;
  color: #fff;
}
.list-group-item:is(.active) {
  background-color: #eae19d;
  color: #01383a;
}
.pressed {
  transform: rotate(45deg); /* Rotates the icon */
  color: #eae19d;
  box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.6);
}
.profile-section {
  height: 9rem;
}
#sidebar-nav:is(.expanded) .profile-section div .user-img {
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
}
#sidebar-nav:not(.expanded) .profile-section div .user-img {
  width: 3rem;
  height: 3rem;
  /* margin-left: 0.9rem; */
  border-radius: 1rem;
}
#footer-section {
  height: 3.2rem;
}
</style>
