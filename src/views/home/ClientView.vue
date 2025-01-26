<template>
  <div class="container">
    <div class="col text-end">
      <Button
        :label="$t('clientarea.account.title')"
        icon="fas fa-gears"
        variant="text"
        rounded
        @click="accountDialog = true"
      />
    </div>
    <div class="col">
      <DataTable
        :value="trips"
        size="large"
        stripedRows
        paginator
        :rows="5"
        removableSort
        v-if="trips != ''"
      >
        <Column field="eventTitle" :header="$t('clientarea.details.trip')">
        </Column>
        <Column
          field="reservationDate"
          :header="$t('clientarea.details.date')"
          sortable
        ></Column>
        <Column
          field="numberOfAdults"
          :header="$t('clientarea.adult')"
        ></Column>
        <Column
          field="numberOfChildren"
          :header="$t('clientarea.child')"
        ></Column>
        <Column :header="$t('clientarea.details.action')">
          <template #body="slotProps">
            <Button
              :label="$t('clientarea.details.view')"
              rounded
              icon="fas fa-eye"
              @click="displayDetails(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>
      <Message v-else severity="warn" class="col-lg-6 col-md-6 col-12 mx-auto">
        There is no reservation yet, once you reserve a trip it will appear
        here!
      </Message>
    </div>
    <Dialog
      v-model:visible="detailsDialog"
      modal
      :header="currentTrip.eventTitle"
      dismissableMask
    >
      <div class="row">
        <div class="col">
          <h6>{{ $t("clientarea.details.member") }}</h6>
          <ul>
            <li>
              {{ currentTrip.numberOfAdults }}x {{ $t("clientarea.adult") }}
            </li>
            <li>
              {{ currentTrip.numberOfChildren }}x {{ $t("clientarea.child") }}
            </li>
          </ul>
        </div>
        <div class="col">
          <h6>{{ $t("clientarea.details.dates") }}</h6>
          <ul>
            <li class="font-semibold">
              {{ $t("clientarea.details.reservtion") }}:
              <span class="color">{{
                formatDate(currentTrip.reservationDate)
              }}</span>
            </li>
            <li class="font-semibold">
              {{ $t("clientarea.details.pay_date") }}:
              <span class="color">{{ formatDate(currentTrip.createdAt) }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="col">
        <h6>{{ $t("clientarea.details.payment") }}</h6>
        <ul>
          <li class="font-semibold">
            {{ $t("clientarea.details.payment_id") }}
            <span class="color">{{ currentTrip.paymentId }}</span>
          </li>
          <li class="font-semibold">
            {{ $t("clientarea.details.price") }}
            <span class="color">{{ formatPrice(currentTrip.totalPrice) }}</span>
          </li>
        </ul>
      </div>
      <Button
        :label="$t('clientarea.details.refund')"
        class="float-end"
        variant="text"
        @click="refundTrip(currentTrip.id)"
      />
    </Dialog>

    <Dialog
      v-model:visible="accountDialog"
      modal
      header="Acconut Settings"
      dismissableMask
      class="col-lg-6 col-md-6 col-12"
    >
      <Tabs value="0">
        <TabList>
          <Tab value="0">{{ $t("clientarea.account.personal") }}</Tab>
          <Tab value="1">{{ $t("clientarea.account.auth") }}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="0">
            <Form
              v-slot="$form"
              :resolver="infoResolver"
              @submit="onFormSubmit"
            >
              <div class="row">
                <div class="col">
                  <FloatLabel variant="on">
                    <InputText
                      id="firstname"
                      name="firstname"
                      type="text"
                      v-model="userInfo.first_name"
                      fluid
                    />
                    <label for="firstname">{{
                      $t("clientarea.account.first_name")
                    }}</label>
                  </FloatLabel>
                  <Message
                    v-if="$form.firstname?.invalid"
                    severity="error"
                    size="small"
                    variant="simple"
                    >{{ $form.firstname.error?.message }}</Message
                  >
                </div>
                <div class="col">
                  <FloatLabel variant="on">
                    <InputText
                      id="lastname"
                      name="lastname"
                      type="text"
                      v-model="userInfo.last_name"
                      fluid
                    />
                    <label for="lastname">{{
                      $t("clientarea.account.last_name")
                    }}</label>
                  </FloatLabel>
                  <Message
                    v-if="$form.lastname?.invalid"
                    severity="error"
                    size="small"
                    variant="simple"
                    >{{ $form.lastname.error?.message }}</Message
                  >
                </div>
              </div>
              <FloatLabel variant="on">
                <InputMask
                  id="phone"
                  name="phone"
                  v-model="userInfo.phone"
                  mask="(+21)999999999"
                  fluid
                />

                <label for="phone">{{ $t("clientarea.account.phone") }}</label>
              </FloatLabel>
              <Message
                v-if="$form.phone?.invalid"
                severity="error"
                size="small"
                variant="simple"
                >{{ $form.phone.error?.message }}</Message
              >
              <Button
                :label="$t('clientarea.account.button')"
                icon="fas fa-save"
                class="mt-3 float-end"
                type="submit"
                :loading="isLoading"
              />
              <Message
                v-if="status != null"
                severity="success"
                class="mt-2"
                variant="simple"
                >{{ status }}</Message
              >
            </Form>
          </TabPanel>
          <TabPanel value="1">
            <Form
              v-slot="$form"
              :resolver="passwordResolver"
              @submit="onPasswordSubmit"
            >
              <div class="row">
                <div class="col">
                  <FloatLabel variant="on">
                    <Password
                      v-model="oldPassword"
                      id="password"
                      name="oldPassword"
                      :feedback="false"
                      toggleMask
                      fluid
                    />
                    <label for="old_password">{{
                      $t("clientarea.account.old")
                    }}</label>
                  </FloatLabel>
                  <Message
                    v-if="$form.oldPassword?.invalid"
                    severity="error"
                    size="small"
                    variant="simple"
                    >{{ $form.oldPassword.error?.message }}</Message
                  >
                </div>
                <div class="col">
                  <FloatLabel variant="on">
                    <Password
                      v-model="newPassword"
                      id="password"
                      name="newPassword"
                      toggleMask
                      fluid
                    />
                    <label for="new_password">{{
                      $t("clientarea.account.new")
                    }}</label>
                  </FloatLabel>
                  <Message
                    v-if="$form.newPassword?.invalid"
                    severity="success"
                    variant="simple"
                    class="mt-2"
                    >{{ $form.newPassword.error?.message }}</Message
                  >
                </div>
              </div>
              <Button
                :label="$t('clientarea.account.button')"
                icon="fas fa-save"
                class="mt-3 float-end"
                type="submit"
                :loading="isLoading"
              />
              <Message
                v-if="status != null"
                severity="success"
                size="small"
                variant="simple"
                >{{ status }}</Message
              >
            </Form>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Dialog>
  </div>
</template>

<script setup>
import axios from "axios";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { onMounted, ref } from "vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Message from "primevue/message";

import Tabs from "primevue/tabs";
import TabList from "primevue/tablist";
import Tab from "primevue/tab";
import TabPanels from "primevue/tabpanels";
import TabPanel from "primevue/tabpanel";
import { Form } from "@primevue/forms";
import InputText from "primevue/inputtext";
import FloatLabel from "primevue/floatlabel";
import Password from "primevue/password";
import InputMask from "primevue/inputmask";

const isLoading = ref(false);
const trips = ref(null);
const detailsDialog = ref(false);
const accountDialog = ref(false);
const userInfo = ref(null);
const firstName = ref(null);
const lastName = ref(null);
const phone = ref(null);
const oldPassword = ref(null);
const newPassword = ref(null);

const status = ref(null);
const currentTrip = ref([]);
async function fetchTrips() {
  await axios
    .get("base/user/reservation?lang=" + localStorage.getItem("locale"), {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("_token"),
      },
    })
    .then((response) => {
      trips.value = response.data;
    });
}

async function fetchUserInfo(token) {
  await axios
    .get("account/get/user/info?lang=" + localStorage.getItem("locale"), {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((response) => {
      userInfo.value = response.data;
    });
}

const infoResolver = ({ values }) => {
  const errors = {};

  if (!userInfo.value.first_name) {
    errors.firstname = [{ message: "Please enter your first name." }];
  }
  if (!userInfo.value.last_name) {
    errors.lastname = [{ message: "Please enter your last name." }];
  }
  if (!userInfo.value.phone) {
    errors.phone = [{ message: "Please enter your phone number." }];
  }

  return {
    errors,
  };
};

const passwordResolver = ({ values }) => {
  const errors = {};

  if (!values.oldPassword) {
    errors.oldPassword = [{ message: "Please enter your old password." }];
  }
  if (!values.newPassword) {
    errors.newPassword = [{ message: "Please enter your new password." }];
  } else {
    if (values.newPassword.length < 8) {
      errors.newPassword = [
        { message: "Password should be at least 8 char long." },
      ];
    }
  }

  return {
    errors,
  };
};

const onFormSubmit = ({ valid }) => {
  if (valid) {
    ChangeAcconutInformation();
  }
};
const onPasswordSubmit = ({ valid }) => {
  if (valid) {
    ChangePassword();
  }
};

function displayDetails(payload) {
  detailsDialog.value = true;
  currentTrip.value = payload;
}

const formatDate = (date) => {
  var formatted = new Date(date);
  return formatted.toLocaleDateString("en-UK");
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "USD",
  }).format(price);
};

async function refundTrip(id) {
  await axios
    .post(
      "base/cancel/reservation/" + id,
      {},
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("_token"),
        },
      }
    )
    .then((response) => {
      console.log(response);
    });
}

async function ChangeAcconutInformation() {
  isLoading.value = true;

  await axios
    .put("account/update/user/info", userInfo.value, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("_token"),
      },
    })
    .then((response) => {
      if (response.status == 200) {
        isLoading.value = false;
        status.value = "Personal information has been successfully changed!";
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    });
}
async function ChangePassword() {
  isLoading.value = true;
  var info = {
    old_password: oldPassword.value,
    new_password: newPassword.value,
  };
  await axios
    .put("account/user/password/update", info, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("_token"),
      },
    })
    .then((response) => {
      if (response.status == 201) {
        isLoading.value = false;
        status.value = "Password has been successfully changed!";
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    })
    .catch((e) => {
      status.value = e.response.data.message;
    });
}

onMounted(() => {
  fetchTrips();
  fetchUserInfo(localStorage.getItem("_token"));
});
</script>
