<template>
  <div class="container-fluid">
    <div class="d-flex justify-content-center align-items-center w-100 h-100vh">
      <div
        id="container"
        class="d-flex justify-content-center align-items-center rounded-2 shadow-2"
      >
        <div
          id="logo-side"
          class="w-40 h-100 d-flex justify-content-center align-items-center bg-main-color rounded-start-2"
        >
          <img
            src="../../assets/images/dashboard/logo-full.svg"
            alt="logo-image"
            :style="{ width: '100%', height: 'auto' }"
          />
        </div>
        <div id="main-side" class="w-60 h-100 bg-white rounded-end-2">
          <div class="w-100 text-center mt-2 mb-4">
            <span class="fs-3">Login</span>
          </div>
          <div
            class="w-100 d-flex justify-content-center align-items-center flex-wrap mt-5"
          >
            <form action="">
              <!-- username -->
              <div class="w-100 mb-4 mt-2">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Username"
                  aria-label="Username"
                  ref="usernameInput"
                />
              </div>
              <!-- Password -->
              <div class="w-100 mb-2 mt-2 relative">
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
              </div>
              <div class="form-check mb-4">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="remember-me"
                  v-model="rememberMe"
                />
                <label class="form-check-label text-nowrap" for="remember-me">
                  Remember me
                </label>
              </div>

              <!-- Login Button -->
              <div class="w-100 mb-2 d-flex justify-content-center mt-2">
                <button type="button" class="btn btn-main" @click="login">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rememberMe: false,
      inputType: "password",
      user: {
        username: "admin",
        password: "admin",
      },
    };
  },
  methods: {
    passwordShowHideToggle() {
      if (this.$refs.passwordInput.type == "password") {
        this.$refs.passwordInput.type = "text";
        this.inputType = "text";
      } else {
        this.$refs.passwordInput.type = "password";
        this.inputType = "password";
      }
    },
    login() {
      if (
        this.$refs.usernameInput.value == this.user.username &&
        this.$refs.passwordInput.value == this.user.password
      ) {
        if (this.rememberMe) {
          localStorage.setItem("isAuth", "true");
        } else {
          sessionStorage.setItem("isAuth", "true");
        }
        this.$store.dispatch("login");
        this.$router.push({ name: "dash.home" });
      } else {
        console.log("error");
      }
    },
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
#logo-side {
  background: linear-gradient(
    45deg,
    #013e40,
    #014f51,
    #015558,
    #015b5f,
    #01696e,
    #017980,
    #01868d,
    #029da5,
    #03b1bb
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
</style>
