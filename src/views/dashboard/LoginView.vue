<template>
  <div class="container-fluid">
    <div class="d-flex justify-content-center align-items-center w-100 h-100vh">
      <div
        id="container"
        class="d-flex justify-content-center align-items-center shadow-2 rounded-2"
      >
        <div
          id="logo-side"
          :class="[
            'w-40 h-100 d-flex justify-content-center align-items-center bg-main-color',
            isEng ? 'rounded-start-2' : 'rounded-end-2',
            isDark ? 'dark' : '',
          ]"
        >
          <img
            src="../../assets/images/dashboard/logo-full.svg"
            alt="logo-image"
            :style="{ width: '100%', height: 'auto' }"
          />
        </div>
        <div
          id="main-side"
          :class="[
            'w-60 h-100 ',
            isEng ? 'rounded-end-2' : 'rounded-start-2',
            isDark ? 'bg-dark' : 'bg-white',
          ]"
        >
          <div class="w-100 text-center mt-2 mb-3">
            <span class="fs-3">{{ $t("dash.login.login") }}</span>
          </div>
          <div
            class="w-100 d-flex justify-content-center align-items-center flex-wrap mt-4"
          >
            <Form
              v-slot="$form"
              :initialValues="initialValues"
              :resolver="resolver"
              @submit="onFormSubmit"
            >
              <!-- email -->
              <div class="w-100 mb-4 mt-2">
                <InputText
                  name="email"
                  v-model="email"
                  type="text"
                  :placeholder="$t('dash.login.email')"
                  fluid
                />
                <Message
                  v-if="$form.email?.invalid"
                  severity="error"
                  size="small"
                  variant="simple"
                  >{{ $t($form.email.error?.message) }}</Message
                >
                <!-- <input
                  type="text"
                  class="form-control"
                  placeholder="Username"
                  aria-label="Username"
                  ref="usernameInput"
                /> -->
              </div>
              <!-- Password -->
              <div class="w-100 my-2">
                <Password
                  name="password"
                  v-model="password"
                  :feedback="false"
                  :placeholder="$t('dash.login.password')"
                  toggleMask
                  fluid
                />
                <Message
                  v-if="$form.password?.invalid"
                  severity="error"
                  size="small"
                  variant="simple"
                  >{{ $t($form.password.error?.message) }}</Message
                >
              </div>
              <!-- <div class="w-100 mb-2 mt-2 relative">
                <input
                  type="password"
                  class="form-control"
                  placeholder="Password"
                  aria-label="Password"
                  ref="passwordInput"
                />
                <div class="show-toggle" @click="passwordShowHideToggle">
                  <i
                    ref="toggleIcon"
                    class="pi pi-eye text-muted"
                    v-if="inputType == 'password'"
                  ></i>
                  <i v-else class="pi pi-eye-slash text-muted"></i>
                </div>
              </div> -->
              <div class="w-100 mb-4 flex items-center gap-2">
                <!-- <input
                  class="form-check-input"
                  type="checkbox"
                  id="remember-me"
                  v-model="rememberMe"
                />
                <label class="form-check-label text-nowrap" for="remember-me">
                  Remember me
                </label> -->
                <Checkbox
                  v-model="rememberMe"
                  inputId="remember-me"
                  name="rememberMe"
                  binary
                />
                <label for="remember-me">
                  {{ $t("dash.login.remember_me") }}
                </label>
              </div>
              <div class="w-100">
                <Message
                  v-if="isAuth"
                  severity="error"
                  size="small"
                  variant="simple"
                  >Email or Password or both is invalid</Message
                >
              </div>
              <!-- Login Button -->
              <div class="w-100 mb-2 d-flex justify-content-center mt-2">
                <!-- <button type="button" class="btn btn-main" @click="login">
                  Login
                </button> -->
                <Button
                  type="submit"
                  :loading="loadingForData"
                  :label="$t('dash.login.log')"
                  @click="isAuth = false"
                />
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Password from "primevue/password";
import InputText from "primevue/inputtext";
import { Form } from "@primevue/forms";
import Button from "primevue/button";
import Message from "primevue/message";
import Checkbox from "primevue/checkbox";
import Card from "primevue/card";
import axios from "axios";
import { promise } from "zod";
export default {
  components: {
    Form,
    Password,
    InputText,
    Button,
    Message,
    Checkbox,
  },

  data() {
    return {
      loadingForData: false,
      isAuth: null,
      isEng: "",
      isDark: "",
      rememberMe: false,
      // inputType: "password",
      initialValues: {
        email: "",
        password: "",
      },
      email: "",
      password: "",
      user: {
        id: 56,
        name: "Admin",
        username: "admin",
        email: "admin@test.com",
        birthday: "1999-09-21",
        address: "Syria , Damascus-Ref , Adsia",
        img: "http://localhost:8080/dashboard/@/assets/images/dashboard/avatar-1.png",
        phone: "+963 978 654 123",
        password: "admin",
      },
    };
  },
  methods: {
    // passwordShowHideToggle() {
    //   if (this.$refs.passwordInput.type == "password") {
    //     this.$refs.passwordInput.type = "text";
    //     this.inputType = "text";
    //   } else {
    //     this.$refs.passwordInput.type = "password";
    //     this.inputType = "password";
    //   }
    // },
    // login() {},
    resolver: ({ values }) => {
      const errors = { email: [], password: [] };
      if (!values.email) {
        errors.email.push({
          type: "required",
          message: "dash.login.email_is_required",
        });
      }
      if (!values.password) {
        errors.password.push({
          type: "required",
          message: "dash.login.password_is_required",
        });
      }
      return {
        errors,
      };
    },
    doAuth() {
      this.loadingForData = true;
      axios
        .post("account/auth/admin/login", {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          if (res.status == 200) {
            if (this.rememberMe) {
              localStorage.setItem("_token", res.data.tokens.access);
            } else {
              sessionStorage.setItem("_token", res.data.tokens.access);
            }
            // setTimeout(this.$router.go("/dashboard/home"), 1000);
            this.$router.push({ name: "dash.home" });
          } else {
            this.loadingForData = false;
            this.isAuth = true;
          }
        })
        .catch((e) => {
          this.loadingForData = false;
          this.isAuth = true;
          console.log(e);
        });
    },
    onFormSubmit({ valid }) {
      if (valid) {
        this.doAuth();

        // console.log(this.isAuth);
      }
    },
  },
  beforeMount() {
    this.isEng = localStorage.getItem("locale") == "en";
    this.isDark = localStorage.getItem("mode") == "dark";
  },
};
</script>

<style scoped>
#container {
  height: 50%;
}
@media (min-width: 1440px) {
  #container {
    width: 40%;
  }
  form {
    width: 60%;
  }
}
@media (max-width: 1440px) {
  #container {
    width: 50%;
  }
  form {
    width: 70%;
  }
}
@media (max-width: 1023px) {
  #container {
    width: 75%;
  }
  form {
    width: 80%;
  }
}
@media (max-width: 768px) {
  #container {
    width: 95%;
  }
  form {
    width: 90%;
  }
}
#logo-side:is(.rounded-start-2) {
  background: linear-gradient(
    45deg,
    #c71737,
    #e61b40,
    #ff1d48,
    #fb2f55,
    #fc3f62,
    #fe4e6e,
    #fa5674,
    #ff708a,
    #ff849a
  );
}
#logo-side:is(.rounded-end-2) {
  background: linear-gradient(
    315deg,
    #c71737,
    #e61b40,
    #ff1d48,
    #fb2f55,
    #fc3f62,
    #fe4e6e,
    #fa5674,
    #ff708a,
    #ff849a
  );
}

.show-toggle {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
.show-toggle i:hover {
  cursor: pointer;
}
/* inputs */
.form-control:focus {
  border-color: rgb(255, 61, 97);
  box-shadow: 0 0 0 0.25rem rgba(255, 46, 84, 0.397);
}
</style>
