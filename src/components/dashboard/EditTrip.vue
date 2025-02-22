<template>
  <div class="d-flex justify-content-center align-content-center w-100">
    <div
      class="d-flex justify-content-center align-content-center flex-wrap w-90"
    >
      <div class="w-100">
        <h2 class="text-center">Edit Trip {{ $route.params.tripId }}</h2>
      </div>
      <Form
        v-slot="$form"
        :resolver="resolver"
        :initialValues="initialValues"
        @submit="onFormSubmit"
        class="w-100"
      >
        <!-- Availability -->
        <div
          id="availability-container"
          class="d-flex align-item-center w-100 mt-2 mb-3"
        >
          <span :class="['fs-5 text-nowrap', isEng ? 'me-3' : 'ms-3']"
            >Availability :
          </span>
          <div class="pt-1">
            <ToggleSwitch v-model="trip.isAvailable" name="status" />
          </div>
        </div>
        <!-- title -->
        <div
          id="title-container"
          class="d-flex align-content-center flex-wrap w-100 my-5"
        >
          <div class="">
            <FloatLabel variant="on">
              <InputText
                id="titleEn"
                type="text"
                v-model="trip.enTitle"
                name="titleEn"
                class="w-100"
              />
              <label for="titleEn"
                ><i
                  :class="[
                    'fa-solid fa-heading text-main-color',
                    isEng ? 'me-2' : 'ms-2',
                  ]"
                ></i
                ><span class="text-nowrap">Title in English</span></label
              >
            </FloatLabel>
            <Message
              v-if="$form.titleEn?.invalid"
              severity="error"
              size="small"
              variant="simple"
              class="w-100"
              >{{ $form.titleEn.error?.message }}</Message
            >
          </div>
          <div class="">
            <FloatLabel variant="on">
              <InputText
                id="titleAr"
                type="text"
                name="titleAr"
                v-model="trip.arTitle"
                class="w-100"
              />
              <label for="titleAr"
                ><i
                  :class="[
                    'fa-solid fa-heading text-main-color',
                    isEng ? 'me-2' : 'ms-2',
                  ]"
                ></i
                ><span class="text-nowrap">Title in Arabic</span></label
              >
            </FloatLabel>
            <Message
              v-if="$form.titleAr?.invalid"
              severity="error"
              size="small"
              variant="simple"
              class="w-100"
              >{{ $form.titleAr.error?.message }}</Message
            >
          </div>
        </div>

        <!-- description -->
        <div
          id="description-container"
          class="d-flex align-content-center flex-wrap w-100 my-5"
        >
          <div class="">
            <FloatLabel variant="on">
              <Textarea
                id="descriptionEn"
                name="descriptionEn"
                v-model="trip.enDescription"
                @input="autoResize($event)"
                rows="3"
                class="w-100"
              />
              <label for="descriptionEn"
                ><i
                  :class="[
                    'fa-solid fa-paragraph text-main-color',
                    isEng ? 'me-2' : 'ms-2',
                  ]"
                ></i
                ><span class="text-nowrap">Description in English</span></label
              >
            </FloatLabel>
            <Message
              v-if="$form.descriptionEn?.invalid"
              severity="error"
              size="small"
              variant="simple"
              class="w-100"
              >{{ $form.descriptionEn.error?.message }}</Message
            >
          </div>
          <div class="">
            <FloatLabel variant="on">
              <Textarea
                id="descriptionAr"
                name="descriptionAr"
                v-model="trip.arDescription"
                @input="autoResize($event)"
                rows="3"
                class="w-100"
              />
              <label for="descriptionAr"
                ><i
                  :class="[
                    'fa-solid fa-paragraph text-main-color',
                    isEng ? 'me-2' : 'ms-2',
                  ]"
                ></i
                ><span class="text-nowrap">Description in Arabic</span></label
              >
            </FloatLabel>
            <Message
              v-if="$form.descriptionAr?.invalid"
              severity="error"
              size="small"
              variant="simple"
              class="w-100"
              >{{ $form.descriptionAr.error?.message }}</Message
            >
          </div>
        </div>
        <!-- Full Desciption -->
        <div
          id="fullDescription-container"
          class="d-flex align-content-center flex-wrap w-100 my-5"
        >
          <div class="">
            <FloatLabel variant="on">
              <Textarea
                id="fullDescriptionEn"
                name="fullDescriptionEn"
                v-model="trip.enFullDescription"
                @input="autoResize($event)"
                rows="6"
                class="w-100"
              />
              <label for="fullDescriptionEn"
                ><i
                  :class="[
                    'fa-solid fa-paragraph text-main-color',
                    isEng ? 'me-2' : 'ms-2',
                  ]"
                ></i
                ><span class="text-nowrap"
                  >Full Description in English</span
                ></label
              >
            </FloatLabel>
            <Message
              v-if="$form.fullDescriptionEn?.invalid"
              severity="error"
              size="small"
              variant="simple"
              class="w-100"
              >{{ $form.fullDescriptionEn.error?.message }}</Message
            >
          </div>
          <div class="">
            <FloatLabel variant="on">
              <Textarea
                id="fullDescriptionAr"
                name="fullDescriptionAr"
                v-model="trip.arFullDescription"
                @input="autoResize($event)"
                rows="6"
                class="w-100"
              />
              <label for="fullDescriptionAr"
                ><i
                  :class="[
                    'fa-solid fa-paragraph text-main-color',
                    isEng ? 'me-2' : 'ms-2',
                  ]"
                ></i
                ><span class="text-nowrap"
                  >Full Description in Arabic</span
                ></label
              >
            </FloatLabel>
            <Message
              v-if="$form.fullDescriptionAr?.invalid"
              severity="error"
              size="small"
              variant="simple"
              class="w-100"
              >{{ $form.fullDescriptionAr.error?.message }}</Message
            >
          </div>
        </div>
        <!--Categoty -->
        <div
          id="category-container"
          class="d-flex align-content-center flex-wrap w-100 my-5"
        >
          <div>
            <Select
              v-model="trip.categoryId"
              :options="categories"
              name="category"
              optionValue="id"
              optionLabel="categoryName"
              placeholder="Select a Category"
              class="w-100"
              @change="categorySelected"
            />
            <Message
              v-if="$form.category?.invalid"
              severity="error"
              size="small"
              variant="simple"
              class="w-100"
              >{{ $form.category.error?.message }}</Message
            >
          </div>
          <div>
            <Select
              v-model="trip.eventType"
              :options="eventTypes"
              optionValue="typeName"
              id="type"
              name="type"
              optionLabel="typeName"
              placeholder="Select a Type"
              class="w-100"
            />
            <Message
              v-if="$form.type?.invalid"
              severity="error"
              size="small"
              variant="simple"
              class="w-100"
              >{{ $form.type.error?.message }}</Message
            >
          </div>
        </div>
        <!-- HeighLights -->
        <div
          id="heighlights-container"
          class="d-flex align-content-center flex-wrap w-100 my-5"
        >
          <div class="w-100">
            <div class="w-100">
              <i
                :class="[
                  'fa-solid fa-highlighter text-main-color',
                  isEng ? 'me-2' : 'ms-2',
                ]"
              ></i>
              <span class="fs-5 text-nowrap">Heighlights</span>
            </div>
            <DataTable
              v-if="trip.eventHighlights != null"
              :value="trip.eventHighlights"
              class="w-100"
            >
              <Column header="In English" style="width: 42.5%">
                <template #body="slotProps">
                  <Textarea v-model="slotProps.data.enTitle" fluid></Textarea>
                </template>
              </Column>
              <Column header="In Arabic" style="width: 42.5%">
                <template #body="slotProps">
                  <Textarea v-model="slotProps.data.arTitle" fluid></Textarea>
                </template>
              </Column>
              <Column style="width: 15%">
                <template #body="slotProps">
                  <Button
                    icon="pi pi-trash"
                    severity="danger"
                    rounded
                    variant="text"
                    @click="removeHighlight(slotProps.index)"
                  ></Button>
                </template>
              </Column>
            </DataTable>
            <div
              class="d-flex justify-content-center align-items-center w-100 mt-4"
            >
              <Button
                icon="pi pi-plus"
                label="Add"
                variant="text"
                @click="addHighlight"
              ></Button>
            </div>
          </div>
        </div>
        <!-- Includs -->
        <div
          id="include-container"
          class="d-flex align-content-center w-100 my-5"
        >
          <div class="w-100">
            <div class="w-100">
              <i
                :class="[
                  'fa-regular fa-square-plus text-main-color',
                  isEng ? 'me-2' : 'ms-2',
                ]"
              ></i>
              <span class="fs-5 text-nowrap">Includes</span>
            </div>
            <DataTable
              v-if="trip.eventIncludes != null"
              :value="trip.eventIncludes"
              class="w-100"
            >
              <Column header="In English" style="width: 35%">
                <template #body="slotProps">
                  <Textarea v-model="slotProps.data.enTitle" fluid></Textarea>
                </template>
              </Column>

              <Column header="In Arabic" style="width: 35%">
                <template #body="slotProps">
                  <Textarea v-model="slotProps.data.arTitle" fluid></Textarea>
                </template>
              </Column>

              <Column header="Availability" style="width: 10%">
                <template #body="slotProps">
                  <ToggleSwitch v-model="slotProps.data.status" />
                </template>
              </Column>
              <Column style="width: 10%">
                <template #body="slotProps">
                  <Button
                    icon="pi pi-trash"
                    severity="danger"
                    rounded
                    variant="text"
                    @click="removeInclude(slotProps.index)"
                  ></Button>
                </template>
              </Column>
            </DataTable>
            <div
              class="d-flex justify-content-center align-items-center w-100 mt-4"
            >
              <Button
                icon="pi pi-plus"
                label="Add"
                variant="text"
                @click="addInclude"
              ></Button>
            </div>
          </div>
        </div>
        <!-- About Activity-->
        <div
          id="about-container"
          class="d-flex align-content-center w-100 my-5"
        >
          <div class="w-100">
            <div class="w-100">
              <i
                :class="[
                  'fa-solid fa-circle-info text-main-color',
                  isEng ? 'me-2' : 'ms-2',
                ]"
              ></i>
              <span class="fs-5 text-nowrap">About Activity</span>
            </div>
            <DataTable
              v-if="trip.aboutEvent != null"
              :value="trip.aboutEvent"
              class="w-100"
            >
              <Column header="Icon" style="width: 5%">
                <template #body="slotProps">
                  <IconPicker
                    v-model="slotProps.data.icon"
                    class="text-main-color"
                  />
                </template>
              </Column>

              <Column header="Title in English" style="width: 15%">
                <template #body="slotProps">
                  <Textarea v-model="slotProps.data.enSubTitle"></Textarea>
                </template>
              </Column>

              <Column header="Description in English" style="width: 30%">
                <template #body="slotProps">
                  <Textarea v-model="slotProps.data.enTitle" fluid></Textarea>
                </template>
              </Column>

              <Column header="Title in Arabic" style="width: 15%">
                <template #body="slotProps">
                  <Textarea v-model="slotProps.data.arSubTitle"></Textarea>
                </template>
              </Column>

              <Column header="Description in Arabic" style="width: 30%">
                <template #body="slotProps">
                  <Textarea v-model="slotProps.data.arTitle" fluid></Textarea>
                </template>
              </Column>
              <Column style="width: 5%">
                <template #body="slotProps">
                  <Button
                    icon="pi pi-trash"
                    severity="danger"
                    rounded
                    variant="text"
                    @click="removeaboutActivity(slotProps.index)"
                  ></Button>
                </template>
              </Column>
            </DataTable>
            <div
              class="d-flex justify-content-center align-items-center w-100 mt-4"
            >
              <Button
                icon="pi pi-plus"
                label="Add"
                variant="text"
                @click="addAboutActivity"
              ></Button>
            </div>
          </div>
        </div>

        <!-- Duration & start date & end date -->
        <div
          id="time-container"
          class="d-flex justify-content-between align-content-center flex-wrap w-100 my-5"
        >
          <div class="w-100 mb-4">
            <i
              :class="[
                'pi pi-calendar-clock text-main-color',
                isEng ? 'me-2' : 'ms-2',
              ]"
            ></i>
            <span class="fs-5 text-nowrap">Date & Time</span>
          </div>
          <div
            class="d-flex justify-content-between align-content-center w-100"
          >
            <div class="w-30 mx-2">
              <FloatLabel variant="on">
                <DatePicker
                  v-model="trip.startDate"
                  inputId="start_date"
                  showIcon
                  name="startDate"
                  iconDisplay="input"
                  fluid
                  @date-select="formatedStartDate"
                />
                <Message
                  v-if="$form.startDate?.invalid"
                  severity="error"
                  size="small"
                  variant="simple"
                  class="w-100"
                  >{{ $form.startDate.error?.message }}</Message
                >
                <label for="start_date"
                  ><i
                    :class="[
                      'fa-regular fa-calendar-plus text-main-color',
                      isEng ? 'me-2' : 'ms-2',
                    ]"
                  ></i
                  ><span class="text-nowrap">Start Date</span></label
                >
              </FloatLabel>
            </div>
            <div class="w-30 mx-2">
              <FloatLabel variant="on">
                <DatePicker
                  v-model="trip.endDate"
                  inputId="end_date"
                  name="endDate"
                  showIcon
                  iconDisplay="input"
                  fluid
                  @data-select="formatedEndDate"
                />
                <Message
                  v-if="$form.endDate?.invalid"
                  severity="error"
                  size="small"
                  variant="simple"
                  class="w-100"
                  >{{ $form.endDate.error?.message }}</Message
                >
                <label for="end_date"
                  ><i
                    :class="[
                      'fa-regular fa-calendar-xmark text-main-color',
                      isEng ? 'me-2' : 'ms-2',
                    ]"
                  ></i
                  ><span class="text-nowrap">End Date</span></label
                >
              </FloatLabel>
            </div>
            <div class="w-30 mx-2">
              <FloatLabel variant="on">
                <!-- <InputText
                  type="text"
                  id="duration"
                  v-model="trip.duration"
                  fluid
                  @data-select="formatedDuration"
                ></InputText> -->
                <InputMask
                  id="duration"
                  name="duration"
                  v-model="trip.duration"
                  :defaultValue="trip.duration"
                  mask="99 99:99:99"
                  placeholder="DD HH:MM:SS"
                  fluid
                />
                <Message
                  v-if="$form.duration?.invalid"
                  severity="error"
                  size="small"
                  variant="simple"
                  class="w-100"
                  >{{ $form.duration.error?.message }}</Message
                >
                <label for="duration"
                  ><i
                    :class="[
                      'fa-regular fa-clock text-main-color',
                      isEng ? 'me-2' : 'ms-2',
                    ]"
                  ></i
                  ><span class="text-nowrap">Duration</span></label
                >
              </FloatLabel>
            </div>
          </div>
        </div>
        <!-- price adult & price child & discount -->
        <div
          id="pay-container"
          class="d-flex justify-content-between align-content-center flex-wrap w-100 my-5"
        >
          <div class="w-100 mb-4">
            <i
              :class="['pi pi-dollar text-main-color', isEng ? 'me-2' : 'ms-2']"
            ></i>
            <span class="fs-5 text-nowrap">Prices & Discounts</span>
          </div>
          <div
            class="d-flex justify-content-between align-content-center w-100"
          >
            <div class="w-20 mx-2">
              <FloatLabel variant="on">
                <InputText
                  type="text"
                  id="adult_price"
                  v-model="trip.adultPrice"
                  fluid
                ></InputText>
                <label for="adult_price"
                  ><i
                    :class="[
                      'fa-solid fa-person-half-dress text-main-color',
                      isEng ? 'me-2' : 'ms-2',
                    ]"
                  ></i
                  ><span class="text-nowrap">Adult Price</span></label
                >
              </FloatLabel>
            </div>
            <div class="w-20 mx-2">
              <FloatLabel variant="on">
                <InputText
                  type="text"
                  id="adult_discount"
                  v-model="trip.adultDiscountAmount"
                  fluid
                ></InputText>
                <label for="adult_discount"
                  ><i
                    :class="[
                      'fa-solid fa-percent text-main-color',
                      isEng ? 'me-2' : 'ms-2',
                    ]"
                  ></i
                  ><span class="text-nowrap">Adult Discount</span></label
                >
              </FloatLabel>
            </div>
            <div class="w-20 mx-2">
              <FloatLabel variant="on">
                <InputText
                  type="text"
                  id="children_price"
                  v-model="trip.childPrice"
                  fluid
                ></InputText>
                <label for="children_price"
                  ><i
                    :class="[
                      'fa-solid fa-child-reaching text-main-color',
                      isEng ? 'me-2' : 'ms-2',
                    ]"
                  ></i
                  ><span class="text-nowrap">Children Price</span></label
                >
              </FloatLabel>
            </div>
            <div class="w-20 mx-2">
              <FloatLabel variant="on">
                <InputText
                  type="text"
                  id="children_discount"
                  v-model="trip.childDiscountAmount"
                  fluid
                ></InputText>
                <label for="children_discount"
                  ><i
                    :class="[
                      'fa-solid fa-percent text-main-color',
                      isEng ? 'me-2' : 'ms-2',
                    ]"
                  ></i
                  ><span class="text-nowrap">Children Discount</span></label
                >
              </FloatLabel>
            </div>
          </div>
        </div>
        <!-- Enroll Member -->
        <div
          id="Members-container"
          class="d-flex align-content-center flex-wrap w-100 my-5"
        >
          <div class="w-100 mb-4">
            <i
              :class="[
                'pi pi-user-plus text-main-color',
                isEng ? 'me-2' : 'ms-2',
              ]"
            ></i>
            <span class="fs-5 text-nowrap">Members Count</span>
          </div>
          <div class="w-30 mx-2">
            <FloatLabel variant="on">
              <InputNumber
                v-model="trip.enrollMembers"
                inputId="enroll_member"
                :useGrouping="false"
                fluid
              />
              <label for="enroll_member"
                ><i
                  :class="[
                    'pi pi-users text-main-color',
                    isEng ? 'me-2' : 'ms-2',
                  ]"
                ></i
                ><span class="text-nowrap">Enroll Members</span></label
              >
            </FloatLabel>
          </div>
        </div>
        <!-- event images -->
        <div
          id="images-container"
          class="d-flex align-content-center flex-wrap w-100 mt-2 mb-3"
        >
          <div class="w-100 mb-3">
            <i
              :class="[
                'fa-regular fa-image text-main-color ',
                isEng ? 'me-2' : 'ms-2',
              ]"
            ></i>
            <span class="fs-5 text-nowrap">Event Images</span>
          </div>
          <div class="w-100 d-flex justify-content-center flex-wrap">
            <div
              v-for="(image, i) in trip.eventImages"
              :key="i"
              class="image-container mx-3 my-2 relative"
              @mouseenter="isImageHovered = true"
              @mouseleave="isImageHovered = false"
            >
              <img :src="image.image" :alt="'image' + i" class="trip-imgs" />
              <div
                v-show="isImageHovered"
                class="overlay-imgs d-flex justify-content-center align-items-center"
              >
                <i
                  class="pi pi-eye mx-1 text-second-color fs-3 cursor-pointer"
                  @click="viewImage(image)"
                ></i>

                <i
                  class="pi pi-trash mx-1 text-danger fs-3 cursor-pointer"
                  @click="deleteImage(i)"
                ></i>
              </div>
            </div>
          </div>
          <div
            class="d-flex justify-content-center align-items-center w-100 mt-4"
          >
            <input
              ref="fileInputImage"
              type="file"
              accept="image/*"
              class="d-none"
              @change="addImage"
            />
            <Button
              icon="pi pi-plus"
              label="Add"
              variant="text"
              @click="triggerFileInputImage"
            ></Button>
          </div>
        </div>
        <!-- show image dialog -->
        <Dialog
          v-model:visible="showImageDialog"
          modal
          :style="{ width: '80%' }"
          pt:root="border-0 bg-transparent"
          pt:header="p-0 pb-1 justify-content-end"
          pt:content="p-0"
          pt:pcclosebutton:severity="danger"
        >
          <img :src="currentImage" alt="Full Image" class="full-image" />
        </Dialog>
        <!-- Map -->
        <div
          id="map-container"
          class="d-flex justify-content-between align-content-center flex-wrap w-100 mt-2 mb-3"
        >
          <div class="w-100 mb-3">
            <i
              :class="[
                'fa-solid fa-location-dot text-main-color',
                isEng ? 'me-2' : 'ms-2',
              ]"
            ></i>
            <span class="fs-5 text-nowrap">Meeting Point</span>
          </div>

          <div id="map" class="my-2"></div>
          <div
            class="w-100 d-flex justify-content-center align-items-center flex-wrap my-2"
          >
            <span class="w-100 fs-5 my-1">Meeting Point Description</span>
            <Textarea
              v-model="trip.arMeetingPoint"
              @input="autoResize($event)"
              name="ar_meeting_point_description"
              fluid
              class="my-3"
            ></Textarea>
            <Textarea
              v-model="trip.enMeetingPoint"
              @input="autoResize($event)"
              name="en_meeting_point_description"
              fluid
              class="my-3"
            ></Textarea>
          </div>
        </div>
        <!-- submit button -->
        <div
          class="w-100 d-flex justify-content-center align-items-center my-3"
        >
          <Button type="submit" label="Update"></Button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import ToggleSwitch from "primevue/toggleswitch";
import IconPicker from "./Vue3IconPicker.vue";
import Textarea from "primevue/textarea";
import InputText from "primevue/inputtext";
import FloatLabel from "primevue/floatlabel";
import { Form } from "@primevue/forms";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import DatePicker from "primevue/datepicker";
import Message from "primevue/message";
import Dialog from "primevue/dialog";
import InputNumber from "primevue/inputnumber";
import Select from "primevue/select";
import InputMask from "primevue/inputmask";
import axios from "axios";

export default {
  components: {
    ToggleSwitch,
    IconPicker,
    Textarea,
    FloatLabel,
    InputText,
    Form,
    DataTable,
    Column,
    Button,
    DatePicker,
    Dialog,
    Message,
    InputNumber,
    Select,
    InputMask,
  },
  data() {
    return {
      isEng: null,
      isImageHovered: false,
      isMainImageHovered: false,
      showImageDialog: false,
      currentImage: "",
      trip: {
        id: "",
        enTitle: "",
        arTitle: "",
        enDescription: "",
        arDescription: "",
        enFullDescription: "",
        arFullDescription: "",
        childPrice: "",
        adultPrice: "",
        childDiscountAmount: "",
        adultDiscountAmount: "",
        startDate: "",
        endDate: "",
        // quantity: null,
        enrollMembers: null,
        duration: "",
        eventType: "",
        arMeetingPoint: "",
        enMeetingPoint: "",
        metingPointLng: "",
        metingPointLat: "",
        isAvailable: "",
        // "categorySlug",
        aboutEvent: [],
        eventHighlights: [],
        eventIncludes: [],
        eventImages: [],
        categoryId: null,
        enCategory: "",
        arCategory: "",
        eventType: null,
      },
      categories: [],
      // categorySelected:,
      map: null,
      marker: null,
      typeSelected: null,
      eventTypes: [
        {
          id: 1,
          typeName: "Culture",
        },
        {
          id: 2,
          typeName: "Food",
        },
        {
          id: 3,
          typeName: "Nature",
        },
        {
          id: 4,
          typeName: "Sports",
        },
      ],
    };
  },
  computed: {
    point() {
      if (this.trip.metingPointLat && this.trip.metingPointLng) {
        return {
          lat: parseFloat(this.trip.metingPointLat),
          lng: parseFloat(this.trip.metingPointLng),
        };
      } else {
        return { lat: 30.033333, lng: 31.233334 };
      }
    },
  },
  methods: {
    formatedStartDate() {
      const date = new Date(this.trip.startDate);
      this.trip.startDate = date.toISOString().split("T")[0];
    },
    formatedEndDate() {
      const date = new Date(this.trip.endDate);
      this.trip.endDate = date.toISOString().split("T")[0];
    },
    // formatedDuration() {
    //   const date = new date(this.trip.duration);
    //   console.log(date);
    // },
    categorySelected() {
      // let result = this.categories.filter(
      //   (item) => item.id == this.trip.categoryId
      // );
      // this.trip.arCategory = result[0].categoryName;
      // this.trip.enCategory = result[0].categoryName;
    },
    removeHighlight(index) {
      this.trip.eventHighlights.splice(index, 1);
      if (this.trip.eventHighlights.length == 0) {
        this.trip.eventHighlights = null;
      }
    },
    removeInclude(index) {
      this.trip.eventIncludes.splice(index, 1);
      if (this.trip.eventIncludes.length == 0) {
        this.trip.eventIncludes = null;
      }
    },
    removeaboutActivity(index) {
      this.trip.aboutEvent.splice(index, 1);
      if (this.trip.aboutEvent.length == 0) {
        this.trip.aboutEvent = null;
      }
    },
    addInclude() {
      if (this.trip.eventIncludes != null) {
        this.trip.eventIncludes.push({
          enTitle: "",
          arTitle: "",
          status: false,
        });
      } else {
        this.trip.eventIncludes = [];
        this.trip.eventIncludes.push({
          enTitle: "",
          arTitle: "",
          status: false,
        });
      }
    },
    addHighlight() {
      if (this.trip.eventHighlights != null) {
        this.trip.eventHighlights.push({ enTitle: "", arTitle: "" });
      } else {
        this.trip.eventHighlights = [];
        this.trip.eventHighlights.push({ enTitle: "", arTitle: "" });
      }
    },
    addAboutActivity() {
      if (this.trip.aboutEvent != null) {
        this.trip.aboutEvent.push({
          enTitle: "",
          arTitle: "",
          enSubTitle: "",
          arSubTitle: "",
          icon: "fa-solid fa-circle",
        });
      } else {
        this.trip.aboutEvent = [];
        this.trip.aboutEvent.push({
          enTitle: "",
          arTitle: "",
          enSubTitle: "",
          arSubTitle: "",
          icon: "fa-solid fa-circle",
        });
      }
    },
    autoResize(event) {
      const textarea = event.target;
      textarea.style.height = "auto"; // Reset height to auto
      textarea.style.height = textarea.scrollHeight + "px"; // Set height to content height
    },
    deleteImage(index) {
      this.trip.eventImages.splice(index, 1);
    },
    deleteMainImage() {
      this.trip.eventImage = "";
    },
    viewImage(image) {
      this.currentImage = image;
      this.showImageDialog = true;
    },
    viewMainImage(image) {
      this.currentImage = image;
      this.showImageDialog = true;
    },
    triggerFileInputImage() {
      this.$refs.fileInputImage.click(); // Trigger the hidden file input
    },
    triggerFileInputMainImage() {
      this.$refs.fileInputMainImage.click();
    },
    addImage(event) {
      const file = event.target.files?.[0]; // Safely access the first file
      if (!file) {
        console.error("No file selected");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        this.trip.eventImages.push(e.target.result); // Add the image to the gallery
      };
      reader.readAsDataURL(file); // Read the file as a Data URL
    },
    initMap() {
      console.log(this.point);
      // Initialize the map
      this.map = new google.maps.Map(document.getElementById("map"), {
        center: this.point,
        zoom: 10,
      });

      // Add a marker to the map
      const svgIcon = {
        path: "M288 0C422.4 0 512 35.2 512 80l0 16 0 32c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l0 160c0 17.7-14.3 32-32 32l0 32c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-32-192 0 0 32c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-32c-17.7 0-32-14.3-32-32l0-160c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32c0 0 0 0 0 0l0-32s0 0 0 0l0-16C64 35.2 153.6 0 288 0zM128 160l0 96c0 17.7 14.3 32 32 32l112 0 0-160-112 0c-17.7 0-32 14.3-32 32zM304 288l112 0c17.7 0 32-14.3 32-32l0-96c0-17.7-14.3-32-32-32l-112 0 0 160zM144 400a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm288 0a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM384 80c0-8.8-7.2-16-16-16L208 64c-8.8 0-16 7.2-16 16s7.2 16 16 16l160 0c8.8 0 16-7.2 16-16z",
        fillColor: "#ff1d48", // Fill color of the icon
        fillOpacity: 1, // Opacity
        strokeWeight: 0, // No border
        scale: 0.05, // Scale the size
      };
      this.marker = new google.maps.Marker({
        position: {
          lat: this.trip.metingPointLat,
          lng: this.trip.metingPointLng,
        },
        map: this.map,
        icon: svgIcon,
        animation: google.maps.Animation.BOUNCE,
        title: "Meeting Point",
        draggable: false, // Allow the marker to be dragged
      });

      // Add click event to the map
      this.map.addListener("click", (event) => {
        this.updatePoint(event.latLng.lat(), event.latLng.lng());
      });
    },
    updatePoint(lat, lng) {
      // Update the point and move the marker
      this.trip.metingPointLat = lat;
      this.trip.metingPointLng = lng;
      this.marker.setPosition({ lat, lng });
    },
    updateTrip() {
      console.log("Trip Before Update", this.trip);
      axios
        .put(
          "base/edit/event/status/" + this.trip.slug,
          {
            adultDiscountAmount: this.trip.adultDiscountAmount,
            adultPrice: this.trip.adultPrice,
            // arCategory: this.trip.arCategory,
            arDescription: this.trip.arDescription,
            arFullDescription: this.trip.arFullDescription,
            arTitle: this.trip.arTitle,
            categoryId: this.trip.categoryId,
            childDiscountAmount: this.trip.childDiscountAmount,
            childPrice: this.trip.childPrice,
            duration: this.trip.duration,
            // enCategory: this.trip.enCategory,
            enDescription: this.trip.enDescription,
            enFullDescription: this.trip.enFullDescription,
            enMeetingPoint: this.trip.enMeetingPoint,
            enTitle: this.trip.enTitle,
            endDate: this.trip.endDate,
            enrollMembers: this.trip.enrollMembers,
            eventHighlight: this.trip.eventHighlights,
            eventImages: this.trip.eventImages,
            eventIncludes: this.trip.eventIncludes,
            // eventProbs:
            // eventRate: 0
            // eventType: "Culture"
            // id: 2
            isAvailable: this.trip.isAvailable,
            metingPointLat: this.trip.metingPointLat,
            metingPointLng: this.trip.metingPointLng,
            // quantity:
            // slug: "From-San-Francisco"
            startDate: this.trip.startDate,
          },
          {
            headers: {
              Authorization:
                "Bearer " +
                (localStorage.getItem("_token") ||
                  sessionStorage.getItem("_token")),
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.status == 200) {
            this.$router.push({ name: "dash.trips" });
          }
        })
        .catch((e) => console.log(e));
    },
    getTrip() {
      axios
        .get("base/admin/event/details/" + this.$route.params.tripId, {
          headers: {
            Authorization:
              "Bearer " +
              (localStorage.getItem("_token") ||
                sessionStorage.getItem("_token")),
          },
        })
        .then((res) => {
          if (res.status == 200) {
            this.trip = res.data[0];
            console.log(this.trip);
          }
        })
        .catch((e) => console.log(e));
    },
    getCategories() {
      axios
        .get("base/view/category?lang=" + localStorage.getItem("locale"), {
          headers: {
            Authorization:
              "Bearer " +
              (localStorage.getItem("_token") ||
                sessionStorage.getItem("_token")),
          },
        })
        .then((res) => {
          if (res.status == 200) {
            this.categories = res.data;
            console.log(this.categories);
          }
        })
        .catch((e) => console.log(e));
    },
    resolver() {
      const errors = {};

      if (!this.trip.enTitle) {
        errors.titleEn = [{ message: "English Title is required." }];
      }

      if (!this.trip.arTitle) {
        errors.titleAr = [{ message: "Arabic Title is required." }];
      }

      // description validation
      if (!this.trip.enDescription) {
        errors.descriptionEn = [
          { message: "English description is required." },
        ];
      }

      if (!this.trip.arDescription) {
        errors.descriptionAr = [{ message: "Arabic description is required." }];
      }

      // Full description validation
      if (!this.trip.enFullDescription) {
        errors.fullDescriptionEn = [
          { message: "English full description is required." },
        ];
      }

      if (!this.trip.arFullDescription) {
        errors.fullDescriptionAr = [
          { message: "Arabic full description is required." },
        ];
      }
      // category validation
      if (!this.trip.categoryId) {
        errors.category = [{ message: "You must select a event category" }];
      }

      if (!this.trip.eventType) {
        errors.type = [{ message: "You must select a event type" }];
      }
      if (!this.trip.startDate) {
        errors.startDate = [{ message: "Start Date is required" }];
      }
      if (!this.trip.endDate) {
        errors.endDate = [{ message: "End Date is required" }];
      }
      if (!this.trip.duration) {
        errors.duration = [{ message: "Duration is required" }];
      }
      console.log(errors);
      return {
        errors,
      };
    },
    onFormSubmit({ valid }) {
      if (valid) {
        this.updateTrip();
      }
    },
  },
  mounted() {
    // Define the global initMap function
    // window.initMap = () => {
    //   this.initMap();
    // };
    this.initMap();
  },
  beforeMount() {
    this.isEng = localStorage.getItem("locale") == "en";
    this.getCategories();
    this.getTrip();
  },
};
</script>

<style scoped>
#descriptionAr,
#descriptionEn {
  height: 7rem;
}
/* #heighlights-container div table tbody tr td textarea,
#include-container div table tbody tr td textarea,
#about-container div table tbody tr td textarea {
  resize: none;
  overflow-y: hidden;
} */
textarea {
  resize: none;
  overflow-y: hidden;
}

/* image */
.image-container {
  width: 13%;
  height: 7.5rem;
}
.trip-imgs {
  width: 100%;
  height: 100%;
  border-radius: 0.8rem;
}

.overlay-imgs {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  /* height: 7.5rem; */
  background: rgba(0, 0, 0, 0.5);
  gap: 10px;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  border-radius: 0.8rem;
}
.image-container:hover .overlay-imgs {
  opacity: 1;
  pointer-events: auto;
}
.image-container:hover .trip-imgs {
  filter: blur(3px);
}
.overlay-imgs div {
  border-radius: 0;
  height: fit-content;
  background: rgba(48, 48, 48, 0.5);
  color: white;
}
.full-image {
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  background-attachment: fixed;
  background-size: cover;
  /* box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5); */
}
.main-img-container {
  width: 70%;
  height: 16rem;
}
.trip-main-img {
  width: 100%;
  height: 100%;
  border-radius: 0.8rem;
}
.overlay-main-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 16rem;
  background: rgba(0, 0, 0, 0.5);
  gap: 10px;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  border-radius: 0.8rem;
}
.main-img-container:hover .overlay-main-img {
  opacity: 1;
  pointer-events: auto;
}
.main-img-container:hover .trip-main-img {
  filter: blur(3px);
}
.overlay-main-img div {
  border-radius: 0;
  height: fit-content;
  background: rgba(48, 48, 48, 0.5);
  color: white;
}
/* #images-container .modal .modal-dialog .modal-content .modal-header .btn-close {
  --bs-btn-close-color: #fff;
} */
/* #images-container .modal .modal-dialog .modal-content{
  background-color: transparent;
}
#images-container .modal .modal-dialog .modal-content .modal-header {
  background-color: transparent;
}
#images-container .modal .modal-dialog .modal-content .modal-body {
  background-color: transparent;
} */

/* map */
#map {
  width: 100%;
  height: 25rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}
/* tables */
::v-deep #heighlights-container .p-datatable-header-cell {
  border: 0px;
}
::v-deep .p-datatable-tbody > tr > td {
  padding: 0.3rem;
}
/* textarea */
::v-deep #heighlights-container .p-textarea,
#include-container .p-textarea,
#about-container .p-textarea {
  border: 0px;
  box-shadow: none;
}
::v-deep #heighlights-container .p-textarea:enabled:focus,
#include-container .p-textarea:enabled:focus,
#about-container .p-textarea:enabled:focus {
  border: 1px solid var(--p-textarea-focus-border-color);
}

/* Responsive */
@media (min-width: 768px) {
  #title-container,
  #category-container,
  #description-container,
  #fullDescription-container {
    justify-content: space-between;
  }
  #title-container div,
  #category-container div,
  #description-container div,
  #fullDescription-container div {
    width: 40%;
  }
}

@media (max-width: 768px) {
  #title-container,
  #category-container,
  #description-container,
  #fullDescription-container {
    justify-content: center;
  }
  #title-container div,
  #category-container div,
  #description-container div,
  #fullDescription-container div {
    width: 80%;
    margin: 1rem 0;
  }
}

@media (min-width: 1440px) {
  .image-container {
    width: 9.5%;
    height: 6.6rem;
  }
  .overlay-imgs {
    height: 6.6rem;
  }
}
@media (max-width: 1440px) {
  .image-container {
    width: 12%;
    height: 6rem;
  }
  .overlay-imgs {
    height: 6rem;
  }
}
@media (max-width: 1023px) {
  .image-container {
    width: 13.5%;
    height: 5.8rem;
  }
  .overlay-imgs {
    height: 5.8rem;
  }
}
@media (max-width: 768px) {
  .image-container {
    width: 20%;
    height: 5rem;
  }
  .overlay-imgs {
    height: 5rem;
  }
}
</style>
