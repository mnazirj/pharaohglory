<template>
  <div class="container">
    <div class="d-flex justify-content-center align-items-center min-vh-100">
      <Card class="col-lg-6 col-md-6 col-12 shadow-none">
        <template #title>
          <div class="text-center">
            <img :src="logo" alt="Pharaohgolry" class="img-fluid" width="512" />
          </div>
        </template>
        <template #content>
          <div>
            <Form
              v-slot="$form"
              class="w-full"
              :resolver="resolver"
              @submit="onFormSubmit"
            >
              <div class="d-flex flex-column gap-3">
                <FloatLabel variant="on">
                  <InputText
                    id="email"
                    name="email"
                    type="text"
                    v-model="email"
                    fluid
                  />
                  <label for="email">{{ $t("auth.email") }}</label>
                </FloatLabel>
                <Message
                  v-if="$form.email?.invalid"
                  severity="error"
                  size="small"
                  variant="simple"
                  >{{ $form.email.error?.message }}</Message
                >

                <FloatLabel variant="on">
                  <Password
                    v-model="password"
                    id="password"
                    name="password"
                    :feedback="false"
                    toggleMask
                    fluid
                  />
                  <label>{{ $t("auth.password") }}</label>
                </FloatLabel>
                <Message
                  v-if="$form.password?.invalid"
                  severity="error"
                  size="small"
                  variant="simple"
                  >{{ $form.password.error?.message }}</Message
                >
              </div>
              <Button
                type="submit"
                :label="$t('auth.button')"
                class="w-100 mt-2"
                :loading="isLoading"
              />
            </Form>
            <Message v-if="message != null" severity="error" class="mt-2">{{
              message
            }}</Message>
          </div>
        </template>
        <template #footer>
          <hr class="hr" />
          <div class="d-flex flex-column gap-2">
            <h5 class="text-center">{{ $t("auth.or") }}</h5>
            <div class="text-center">
              <Button
                icon="fab fa-google"
                :label="$t('auth.login.google')"
                rounded
                @click="googleLogin()"
                :loading="isLoading"
              />
            </div>
          </div>
          <hr />
          <div
            class="d-flex flex-lg-row flex-md-row flex-column gap-3 justify-content-between mt-4"
          >
            <div>
              <Button
                as="router-link"
                to="/auth/login"
                :label="$t('auth.login.forget')"
                variant="text"
                icon="fas fa-gears"
                class="text-decoration-none"
                :iconPos="$i18n.locale == 'ar' ? 'right' : 'left'"
              />
            </div>
            <div>
              <Button
                as="router-link"
                to="/auth/register"
                :label="$t('auth.login.new')"
                variant="text"
                icon="fas fa-user-plus"
                class="text-decoration-none"
                :iconPos="$i18n.locale == 'ar' ? 'right' : 'left'"
              />
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { Form } from "@primevue/forms";
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import FloatLabel from "primevue/floatlabel";
import Password from "primevue/password";
import Button from "primevue/button";
const logo = ref(require("@/assets/images/logo.svg"));
import { onMounted, reactive, ref } from "vue";
import Message from "primevue/message";
import { decodeCredential } from "vue3-google-login";

const email = ref(null);
const password = ref(null);
const isLoading = ref(false);
const message = ref(null);
const resolver = ({ values }) => {
  const errors = {};

  if (!values.email) {
    errors.email = [{ message: "Please enter your email address." }];
  }
  if (!values.password) {
    errors.password = [{ message: "Please enter your password." }];
  }

  return {
    errors,
  };
};
import { googleTokenLogin } from "vue3-google-login";
import axios from "axios";
import router from "@/router";

const googleLogin = () => {
  googleTokenLogin().then((response) => {
    console.log(response);
    if (response.access_token) {
      getGoogleAcconutInfo(response.access_token);
    }
  });
};

const getGoogleAcconutInfo = (token) => {
  axios
    .get("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((response) => {
      sendDataToBackEnd(response.data.email);
    });
};

const sendDataToBackEnd = (email) => {
  axios
    .post("account/auth/google/login", {
      email: email,
    })
    .then((response) => {
      if (response.status == 200) {
        localStorage.setItem("_token", response.data.tokens.access);
        router.push("/");
      }
    });
};

function login() {
  isLoading.value = true;
  axios
    .post("account/auth/login?lang=" + localStorage.getItem("locale"), {
      email: email.value,
      password: password.value,
    })
    .then((response) => {
      if (response.status == 200) {
        isLoading.value = false;
        localStorage.setItem("_token", response.data.tokens.access);
        setTimeout(() => {
          router.push("/");
        }, 1000);
      }
    })
    .catch((e) => {
      if (e.response.status == 401) {
        message.value = e.response.data.detail;
        isLoading.value = false;
      }
    });
}

const onFormSubmit = ({ valid }) => {
  if (valid) {
    login();
  }
};

onMounted(() => {
  var mode = localStorage.getItem("mode");
  if (mode == "dark") {
    logo.value = require("@/assets/images/dark-logo.svg");
  }
});
</script>
