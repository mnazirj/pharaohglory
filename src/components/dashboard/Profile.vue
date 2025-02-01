<template>
  <div class="w-100 d-flex justify-content-center align-items-center">
    <div
      class="w-60 d-flex justify-content-center align-items-center flex-wrap shadow-2 rounded-3 mt-5 p-3"
    >
      <!-- Image seciton -->
      <div
        id="image-container"
        class="d-flex justify-content-center align-items-center w-100 overflow-hidden relative"
        @mouseenter="isImageHovered = true"
        @mouseleave="isImageHovered = false"
      >
        <img
          v-if="user.img != ''"
          :src="user.img"
          alt="user-img"
          class="user-img rounded-circle"
        />
        <i
          v-else
          class="pi pi-user defult-img d-flex justify-content-center align-items-center text-main-color user-img rounded-circle"
        ></i>
        <div
          v-show="isImageHovered"
          class="overlay-img d-flex justify-content-center align-items-center"
        >
          <input
            type="file"
            ref="fileInput"
            style="display: none"
            @change="changeImage"
          />
          <button
            type="button"
            class="btn btn-second rounded-circle"
            @click="triggerFileInput"
            title="Edit Image"
          >
            <i class="pi pi-pencil pt-1"></i>
          </button>
          <button
            type="button"
            class="btn btn-danger rounded-circle"
            @click="deleteImage"
            title="Delete Image"
          >
            <i class="pi pi-trash pt-1"></i>
          </button>
        </div>
      </div>
      <!-- Buttons Section -->
      <div class="w-90 d-flex justify-content-end mb-2">
        <button
          type="button"
          class="btn btn-outline-main mx-1"
          @click="showEditDialog = true"
        >
          <i class="pi pi-user-edit pt-1 fs-4"></i>
        </button>
        <button
          type="button"
          class="btn btn-outline-main mx-1"
          @click="showChangePassDialog = true"
        >
          <i class="fa-solid fa-key pt-1 fs-4"></i>
        </button>
      </div>
      <!-- Information Section -->
      <div class="w-70 d-flex align-items-center flex-wrap">
        <div class="w-100 my-1 d-flex align-items-center">
          <span class="text-muted text-nowrap fs-5 me-1">Name : </span>
          <span class="text-nowrap">{{ user.name }}</span>
        </div>
        <div class="w-100 my-1">
          <span class="text-muted text-nowrap fs-5 me-1">Username : </span>
          <span class="text-nowrap">{{ user.username }}</span>
        </div>
        <div class="w-100 my-1">
          <span class="text-muted text-nowrap fs-5 me-1">Email : </span>
          <span class="text-nowrap">{{ user.email }}</span>
        </div>
        <div class="w-100 my-1">
          <span class="text-muted text-nowrap fs-5 me-1">Birthday : </span>
          <span class="text-nowrap">{{ user.birthday }}</span>
        </div>
        <div class="w-100 my-1">
          <span class="text-muted text-nowrap fs-5 me-1">Address : </span>
          <span class="text-nowrap">{{ user.address }}</span>
        </div>
      </div>
    </div>
  </div>
  <!-- edit modal -->
  <Dialog
    v-model:visible="showEditDialog"
    modal
    header="Edit Profile"
    :style="{ width: '35rem' }"
  >
    <div
      class="d-flex justify-content-center align-items-center flex-wrap w-100"
    >
      <!-- Name -->
      <div
        class="w-90 d-flex justify-content-center align-items-center flex-wrap my-2"
      >
        <span class="w-100 mb-1">Name</span>
        <div class="w-100 input-group">
          <span class="input-group-text"
            ><i class="fa-solid fa-font text-main-color"></i
          ></span>
          <input
            type="text"
            class="form-control"
            placeholder="Name"
            aria-label="Name"
            v-model="user.name"
          />
        </div>
      </div>
      <!-- Username -->
      <div
        class="w-90 d-flex justify-content-center align-items-center flex-wrap my-2"
      >
        <span class="w-100 mb-1">Username</span>
        <div class="w-100 input-group">
          <span class="input-group-text"
            ><i class="pi pi-user text-main-color"></i
          ></span>
          <input
            type="text"
            class="form-control"
            placeholder="Username"
            aria-label="Username"
            v-model="user.username"
          />
        </div>
      </div>
      <!-- Email -->
      <div
        class="w-90 d-flex justify-content-center align-items-center flex-wrap my-2"
      >
        <span class="w-100 mb-1">Email</span>
        <div class="w-100 input-group">
          <span class="input-group-text"
            ><i class="pi pi-envelope text-main-color"></i
          ></span>
          <input
            type="text"
            class="form-control"
            placeholder="Email"
            aria-label="Email"
            v-model="user.email"
          />
        </div>
      </div>
      <!-- Birthday -->
      <div
        class="w-90 d-flex justify-content-center align-items-center flex-wrap my-2"
      >
        <span class="w-100 mb-1">Birthday</span>
        <div class="w-100 input-group">
          <span class="input-group-text"
            ><i class="fa-solid fa-cake-candles text-main-color"></i
          ></span>
          <input
            type="date"
            class="form-control"
            placeholder="Birthday"
            aria-label="Birthday"
            v-model="user.birthday"
          />
        </div>
      </div>
      <!-- Address -->
      <div
        class="w-90 d-flex justify-content-center align-items-center flex-wrap my-2"
      >
        <span class="w-100 mb-1">Address</span>
        <div class="w-100 input-group">
          <span class="input-group-text"
            ><i class="fa-solid fa-location-crosshairs text-main-color"></i
          ></span>
          <input
            type="text"
            class="form-control"
            placeholder="Address"
            aria-label="Address"
            v-model="user.address"
          />
        </div>
      </div>
      <!-- Phone -->
      <div
        class="w-90 d-flex justify-content-center align-items-center flex-wrap my-2"
      >
        <span class="w-100 mb-1">Phone</span>
        <div class="w-100 input-group">
          <span class="input-group-text"
            ><i class="pi pi-phone text-main-color"></i
          ></span>
          <input
            type="text"
            class="form-control"
            placeholder="Phone"
            aria-label="Phone"
            v-model="user.phone"
          />
        </div>
      </div>
    </div>
    <template #footer>
      <button type="button" class="btn btn-main" @click="saveEdit">Save</button>
    </template>
  </Dialog>
  <!-- Change Password modal -->
  <Dialog
    v-model:visible="showChangePassDialog"
    modal
    header="Change Password"
    :style="{ width: '35rem' }"
  >
    <div
      class="d-flex justify-content-center align-items-center flex-wrap w-100"
    >
      <!-- Current Password -->
      <div
        class="w-80 d-flex justify-content-center align-content-center flex-wrap my-2"
      >
        <div class="w-100">
          <input
            ref="currentPassword"
            type="password"
            class="form-control"
            placeholder="Current Password"
            aria-label="Current Password"
          />
        </div>
      </div>
      <!-- New Password -->
      <div
        class="w-80 d-flex justify-content-center align-content-center flex-wrap my-2"
      >
        <div class="w-100">
          <input
            ref="newPassword"
            type="password"
            class="form-control"
            placeholder="New Password"
            aria-label="New Password"
          />
        </div>
      </div>
      <!-- Confirm New Password -->
      <div
        class="w-80 d-flex justify-content-center align-content-center flex-wrap my-2"
      >
        <div class="w-100">
          <input
            ref="confirmNewPassword"
            type="password"
            class="form-control"
            placeholder="Confirm New Password"
            aria-label="Confirm New Password"
          />
        </div>
      </div>
    </div>
    <template #footer>
      <button type="button" class="btn btn-main" @click="savePassword">
        Save
      </button>
    </template>
  </Dialog>
</template>

<script>
import Tooltip from "primevue/tooltip";
import Dialog from "primevue/dialog";
export default {
  components: {
    Tooltip,
    Dialog,
  },
  data() {
    return {
      showEditDialog: false,
      showChangePassDialog: false,
      isImageHovered: false,
      thereIsAChange: false,
      // user: {
      //   id: 1,
      //   name: "Mohammad Almasry",
      //   username: "mohammadAlmasry",
      //   password: "mohammad123",
      //   email: "mohammad@test.com",
      //   birthday: "2000-01-01",
      //   img: require("@/assets/images/dashboard/avatar-1.png"),
      //   address: "Syria , Damascus , Almidan",
      //   phone: "+963 914 842 248",
      // },
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    changeImage() {
      this.user.img = this.$refs.fileInput.value;
      this.thereIsAChange = true;
    },
    deleteImage() {
      this.user.img = "";
      this.thereIsAChange = true;
    },
    saveEdit() {
      this.showEditDialog = false;
      this.thereIsAChange = true;
    },
    savePassword() {
      if (
        this.$refs.currentPassword.value == this.user.password &&
        this.$refs.confirmNewPassword.value == this.$refs.newPassword.value
      ) {
        this.user.password = this.$refs.newPassword.value;
        this.showChangePassDialog = false;
        this.thereIsAChange = true;
      } else {
        console.log("error");
      }
    },
  },
  mounted() {
    console.log(this.user);
  },
};
</script>

<style scoped>
.user-img {
  width: 14rem;
  height: 14rem;
}
.defult-img {
  font-size: 8rem;
  width: 14rem;
  height: 14rem;
  border-radius: 50%;
  border: 1px solid black;
  transition: filter 0.3s ease;
}
.overlay-img {
  position: absolute;
  top: 10;
  left: 100;
  width: 14rem;
  height: 14rem;
  background: rgba(0, 0, 0, 0.5);
  gap: 10px;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  border-radius: 50%;
}
#image-container:hover .overlay-img {
  opacity: 1;
  pointer-events: auto;
}
#image-container:hover .user-img {
  filter: blur(3px);
}
.overlay-img div {
  border-radius: 0;
  height: fit-content;
  background: rgba(48, 48, 48, 0.34);
  color: white;
}
</style>
