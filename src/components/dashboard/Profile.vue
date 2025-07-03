<template>
  <div class="w-100 d-flex justify-content-center align-items-center">
    <div
      id="container"
      :class="[
        ' d-flex justify-content-center align-items-center flex-wrap rounded-3 my-5 p-3',
        isDark ? 'dark-shadow' : 'shadow-2',
      ]"
    >
      <!-- Image seciton -->
      <!-- <div
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
      </div> -->
      <!-- Buttons Section -->
      <div class=" d-flex justify-content-end mb-2">
        <Button
          icon="pi pi-user-edit"
          class="mx-1"
          @click="showEditDialog = true"
        ></Button>
        <Button
          icon="fa-solid fa-key"
          class="mx-1"
          @click="showChangePassDialog = true"
        ></Button>
      </div>
      <!-- Information Section -->
      <div class=" d-flex align-items-center flex-wrap">
        <div class="w-100 my-1 d-flex align-items-center">
          <span
            :class="['text-muted text-nowrap fs-5', isEng ? 'me-1' : 'ms-1']"
            >{{ $t("dash.my_profile.name") }} :
          </span>
          <span class="text-nowrap">{{ user.name }}</span>
        </div>
        <div class="w-100 my-1 d-flex align-items-center">
          <span
            :class="['text-muted text-nowrap fs-5', isEng ? 'me-1' : 'ms-1']"
            >{{ $t("dash.my_profile.username") }} :
          </span>
          <span class="text-nowrap">{{ user.username }}</span>
        </div>
        <div class="w-100 my-1 d-flex align-items-center">
          <span
            :class="['text-muted text-nowrap fs-5', isEng ? 'me-1' : 'ms-1']"
            >{{ $t("dash.my_profile.email") }} :
          </span>
          <span class="text-nowrap">{{ user.email }}</span>
        </div>
        <div class="w-100 my-1 d-flex align-items-center">
          <span
            :class="['text-muted text-nowrap fs-5', isEng ? 'me-1' : 'ms-1']"
            >{{ $t("dash.my_profile.birthday") }} :
          </span>
          <span class="text-nowrap">{{ user.birthday }}</span>
        </div>
        <div class="w-100 my-1 d-flex align-items-center">
          <span
            :class="['text-muted text-nowrap fs-5', isEng ? 'me-1' : 'ms-1']"
            >{{ $t("dash.my_profile.address") }} :
          </span>
          <span class="text-nowrap">{{ user.address }}</span>
        </div>
        <div class="w-100 my-1 d-flex align-items-center">
          <span
            :class="['text-muted text-nowrap fs-5', isEng ? 'me-1' : 'ms-1']"
            >{{ $t("dash.my_profile.phone") }} :
          </span>
          <span class="text-nowrap">{{ user.phone }}</span>
        </div>
      </div>
    </div>
  </div>
  <!-- edit modal -->
  <Dialog
    v-model:visible="showEditDialog"
    modal
    :header="$t('dash.my_profile.edit_profile')"
    :style="{ width: '35rem' }"
    :dir="isEng ? 'ltr' : 'rtl'"
  >
    <div
      class="d-flex justify-content-center align-items-center flex-wrap w-100"
    >
      <!-- Name -->
      <div
        class="w-90 d-flex justify-content-center align-items-center flex-wrap my-2"
      >
        <!-- <span class="w-100 mb-1">Name</span>
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
        </div> -->
        <FloatLabel variant="on" class="w-100">
          <IconField>
            <InputIcon class="fa-solid fa-font text-main-color" />
            <InputText id="name" name="name" v-model="user.name" fluid />
          </IconField>
          <label for="name">{{ $t("dash.my_profile.name") }}</label>
        </FloatLabel>
      </div>
      <!-- Username -->
      <div
        class="w-90 d-flex justify-content-center align-items-center flex-wrap my-2"
      >
        <!-- <span class="w-100 mb-1">Username</span>
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
        </div> -->
        <FloatLabel variant="on" class="w-100">
          <IconField>
            <InputIcon class="pi pi-user text-main-color" />
            <InputText
              id="username"
              name="username"
              v-model="user.username"
              fluid
            />
          </IconField>
          <label for="username">{{ $t("dash.my_profile.username") }}</label>
        </FloatLabel>
      </div>
      <!-- Email -->
      <div
        class="w-90 d-flex justify-content-center align-items-center flex-wrap my-2"
      >
        <!-- <span class="w-100 mb-1">Email</span>
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
        </div> -->
        <FloatLabel variant="on" class="w-100">
          <IconField>
            <InputIcon class="pi pi-envelope text-main-color" />
            <InputText id="email" name="email" v-model="user.email" fluid />
          </IconField>
          <label for="email">{{ $t("dash.my_profile.email") }}</label>
        </FloatLabel>
      </div>
      <!-- Birthday -->
      <div
        class="w-90 d-flex justify-content-center align-items-center flex-wrap my-2"
      >
        <!-- <span class="w-100 mb-1">Birthday</span>
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
        </div> -->
        <FloatLabel variant="on" class="w-100">
          <DatePicker
            id="birthday"
            name="birthday"
            v-model="user.birthday"
            fluid
            showIcon
            iconDisplay="input"
          >
            <template #inputicon="slotProps">
              <i
                class="fa-solid fa-cake-candles text-main-color"
                @click="slotProps.clickCallback"
              />
            </template>
          </DatePicker>
          <label for="birthday">{{ $t("dash.my_profile.birthday") }}</label>
        </FloatLabel>
      </div>
      <!-- Address -->
      <div
        class="w-90 d-flex justify-content-center align-items-center flex-wrap my-2"
      >
        <!-- <span class="w-100 mb-1">Address</span>
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
        </div> -->
        <FloatLabel variant="on" class="w-100">
          <IconField>
            <InputIcon
              class="fa-solid fa-location-crosshairs text-main-color"
            />
            <InputText
              id="address"
              name="address"
              v-model="user.address"
              fluid
            />
          </IconField>
          <label for="address">{{ $t("dash.my_profile.address") }}</label>
        </FloatLabel>
      </div>
      <!-- Phone -->
      <div
        class="w-90 d-flex justify-content-center align-items-center flex-wrap my-2"
      >
        <!-- <span class="w-100 mb-1">Phone</span>
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
        </div> -->
        <FloatLabel variant="on" class="w-100">
          <IconField>
            <InputIcon class="pi pi-phone text-main-color" />
            <InputText id="phone" name="phone" v-model="user.phone" fluid />
          </IconField>
          <label for="phone">{{ $t("dash.my_profile.phone") }}</label>
        </FloatLabel>
      </div>
    </div>
    <template #footer>
      <!-- <button type="button" class="btn btn-main" @click="saveEdit">Save</button> -->
      <Button
        icon="pi pi-save"
        :label="$t('dash.my_profile.save')"
        @click="saveEdit"
      ></Button>
    </template>
  </Dialog>
  <!-- Change Password modal -->
  <Dialog
    v-model:visible="showChangePassDialog"
    modal
    :header="$t('dash.my_profile.change_password')"
    :style="{ width: '35rem' }"
    :dir="isEng ? 'ltr' : 'rtl'"
  >
    <div
      class="d-flex justify-content-center align-items-center flex-wrap w-100"
    >
      <!-- Current Password -->
      <div
        class="w-80 d-flex justify-content-center align-content-center flex-wrap my-2"
      >
        <!-- <div class="w-100">
          <input
            ref="currentPassword"
            type="password"
            class="form-control"
            placeholder="Current Password"
            aria-label="Current Password"
          />
        </div> -->
        <FloatLabel variant="on" class="w-100">
          <InputText
            ref="currentPassword"
            id="current_password"
            name="currentPassword"
            fluid
          />
          <label for="current_password">{{
            $t("dash.my_profile.current_password")
          }}</label>
        </FloatLabel>
      </div>
      <!-- New Password -->
      <div
        class="w-80 d-flex justify-content-center align-content-center flex-wrap my-2"
      >
        <!-- <div class="w-100">
          <input
            ref="newPassword"
            type="password"
            class="form-control"
            placeholder="New Password"
            aria-label="New Password"
          />
        </div> -->
        <FloatLabel variant="on" class="w-100">
          <InputText
            ref="newPassword"
            id="new_password"
            name="newPassword"
            fluid
          />
          <label for="new_password">{{
            $t("dash.my_profile.new_password")
          }}</label>
        </FloatLabel>
      </div>
      <!-- Confirm New Password -->
      <div
        class="w-80 d-flex justify-content-center align-content-center flex-wrap my-2"
      >
        <!-- <div class="w-100">
          <input
            ref="confirmNewPassword"
            type="password"
            class="form-control"
            placeholder="Confirm New Password"
            aria-label="Confirm New Password"
          />
        </div> -->
        <FloatLabel variant="on" class="w-100">
          <InputText
            ref="confirmNewPassword"
            id="confirm_new_password"
            name="confirmNewPassword"
            fluid
          />
          <label for="confirm_new_password">{{
            $t("dash.my_profile.confirm_new_password")
          }}</label>
        </FloatLabel>
      </div>
    </div>
    <template #footer>
      <!-- <button type="button" class="btn btn-main" @click="savePassword">
        Save
      </button> -->
      <Button
        icon="pi pi-save"
        :label="$t('dash.my_profile.save')"
        @click="savePassword"
      ></Button>
    </template>
  </Dialog>
</template>

<script>
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import FloatLabel from "primevue/floatlabel";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import DatePicker from "primevue/datepicker";
export default {
  components: {
    Dialog,
    Button,
    InputText,
    InputIcon,
    IconField,
    FloatLabel,
    DatePicker,
  },
  data() {
    return {
      isEng: null,
      isDark: null,
      showEditDialog: false,
      showChangePassDialog: false,
      isImageHovered: false,
      thereIsAChange: false,
      user: {
        id: 1,
        name: "Mohammad Almasry",
        username: "mohammadAlmasry",
        password: "mohammad123",
        email: "mohammad@test.com",
        birthday: "2000-01-01",
        img: require("@/assets/images/dashboard/avatar-1.png"),
        address: "Syria , Damascus , Almidan",
        phone: "+963 914 842 248",
      },
    };
  },
  computed: {},
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
  beforeMount() {
    this.isEng = localStorage.getItem("locale") == "en";
    this.isDark = localStorage.getItem("mode") == "dark";
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
#container > div {
  width: 90%;
}
@media (min-width: 1440px) {
  #container{
    width: 50%;
  }
}
@media (max-width: 1440px) {
  #container{
    width: 60%;
  }
}
@media (max-width: 1023px) {
  #container{
    width: 70%;
  }
}
@media (max-width: 768px) {
  #container{
    width: 98%;
    overflow-x: auto;
    margin-right: 1rem;
  }
}
</style>
